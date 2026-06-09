const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Store active processes: socket.id -> { process, tempFiles }
const activeExecutions = new Map();

const TEMP_DIR = path.join(__dirname, '../temp/socket_exec');
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('🔌 Socket connected:', socket.id);

        socket.on('join-notifications', (userId) => {
            socket.join(`user-${userId}`);
            console.log(`User ${userId} joined notification room`);
        });

        socket.on('execute-code', async ({ code, language, input, args: cmdArgsStr }) => {
            if (!code) {
                socket.emit('execution-output', { output: 'No code provided.\n', isError: true });
                return;
            }

            // Kill any existing execution for this socket
            if (activeExecutions.has(socket.id)) {
                cleanupExecution(socket.id);
            }

            const sessionId = `exec_${socket.id}_${Date.now()}`;
            let sourceFile, executable;
            let tempFiles = [];

            try {
                const { cmd, args, srcFile, exe, files } = prepareExecution(language, code, sessionId);
                sourceFile = srcFile;
                executable = exe;
                tempFiles = files;

                // Compilation Step (for C/C++/Java)
                if (['c', 'cpp', 'java'].includes(language.toLowerCase())) {
                    // Silent compilation
                    try {
                        await compileCode(language, srcFile, exe);
                    } catch (compileErr) {
                        socket.emit('execution-output', { output: `Compilation Error:\n${compileErr.message}\n`, isError: true });
                        socket.emit('execution-result', { success: false, output: '' });
                        cleanupFiles(tempFiles);
                        return;
                    }
                }

                socket.emit('waiting-for-input');

                // For Java, we need to run from the java directory
                const execCwd = language.toLowerCase() === 'java' ? path.dirname(srcFile) : TEMP_DIR;
                
                const additionalArgs = cmdArgsStr ? cmdArgsStr.split(/\s+/).filter(Boolean) : [];
                const finalArgs = [...args, ...additionalArgs];
                const child = spawn(cmd, finalArgs, { cwd: execCwd });

                // Store process for input/stop handling
                activeExecutions.set(socket.id, { process: child, tempFiles });

                // Handle Input (if initial input provided)
                if (input) {
                    child.stdin.write(input);
                    child.stdin.end(); // If interactive, usually we don't end immediately, but for now this matches simple runner
                }

                child.stdout.on('data', (data) => {
                    socket.emit('execution-output', { output: data.toString(), isError: false });
                });

                child.stderr.on('data', (data) => {
                    socket.emit('execution-output', { output: data.toString(), isError: true });
                });

                child.on('close', (code) => {
                    socket.emit('execution-output', { output: `\nProcess exited with code ${code}\n`, isError: code !== 0 });
                    socket.emit('execution-result', { success: code === 0, output: '' });
                    cleanupExecution(socket.id);
                });

                child.on('error', (err) => {
                    socket.emit('execution-output', { output: `Execution Start Error: ${err.message}\n`, isError: true });
                    cleanupExecution(socket.id);
                });

            } catch (err) {
                socket.emit('execution-output', { output: `Error: ${err.message}\n`, isError: true });
                cleanupFiles(tempFiles);
            }
        });

        socket.on('send-input', (inputData) => {
            const exec = activeExecutions.get(socket.id);
            if (exec && exec.process && !exec.process.killed) {
                try {
                    exec.process.stdin.write(inputData + '\n');
                } catch (e) {
                    console.error("Failed to write input:", e);
                }
            }
        });

        socket.on('stop-execution', () => {
            cleanupExecution(socket.id);
            socket.emit('execution-output', { output: '\nExecution stopped by user.\n', isError: true });
        });

        socket.on('disconnect', () => {
            cleanupExecution(socket.id);
            console.log('🔌 Socket disconnected:', socket.id);
        });
    });
};

function prepareExecution(language, code, sessionId) {
    // Remove markdown code fences if present
    let cleanedCode = code.replace(/^```[a-z]*\n/i, '').replace(/\n```$/, '');

    let cmd, args, srcFile, exe;
    let files = [];

    switch (language.toLowerCase()) {
        case 'python':
            srcFile = path.join(TEMP_DIR, `${sessionId}.py`);
            fs.writeFileSync(srcFile, cleanedCode);
            cmd = process.platform === 'win32' ? 'python' : 'python3';
            args = ['-u', srcFile]; // -u for unbuffered output
            files.push(srcFile);
            break;

        case 'javascript':
        case 'js':
            srcFile = path.join(TEMP_DIR, `${sessionId}.js`);
            
            // Inject a patch so that rl.close() automatically destroys the piped stdin 
            // otherwise the open pipe from the parent keeps the Node.js event loop alive forever.
            let jsWrapper = `
// CS Studio Auto-Patch: Ensure process exits when readline closes
const _cs_readline = require('readline');
if (_cs_readline.Interface) {
    const _cs_origClose = _cs_readline.Interface.prototype.close;
    _cs_readline.Interface.prototype.close = function() {
        _cs_origClose.call(this);
        process.stdin.destroy();
    };
}
`;
            fs.writeFileSync(srcFile, jsWrapper + cleanedCode);
            cmd = 'node';
            args = [srcFile];
            files.push(srcFile);
            break;

        case 'c':
            let cFiles = [];
            exe = path.join(TEMP_DIR, `${sessionId}.exe`);

            // Check for multi-file format: // File: filename.c
            const cFileBlocks = cleanedCode.split(/\/\/\s*File:\s*([a-zA-Z0-9_\-\.]+)/i);
            if (cFileBlocks.length > 1) {
                for (let i = 1; i < cFileBlocks.length; i += 2) {
                    const filename = cFileBlocks[i];
                    let content = cFileBlocks[i+1];
                    
                    if (filename.endsWith('.c') && !content.includes('setvbuf') && /((?:int|void)\s+main\s*\([^)]*\)\s*\{)/.test(content)) {
                        content = content.replace(/((?:int|void)\s+main\s*\([^)]*\)\s*\{)/, '$1 setvbuf(stdout, NULL, _IONBF, 0);');
                    }
                    
                    const filePath = path.join(TEMP_DIR, `${sessionId}_${filename}`);
                    fs.writeFileSync(filePath, content);
                    files.push(filePath);
                    if (filename.endsWith('.c')) {
                        cFiles.push(filePath);
                    }
                }
                srcFile = cFiles;
            } else {
                srcFile = path.join(TEMP_DIR, `${sessionId}.c`);
                if (!cleanedCode.includes('<stdio.h>')) {
                    cleanedCode = '#include <stdio.h>\n' + cleanedCode;
                }
                if (!cleanedCode.includes('setvbuf')) {
                    cleanedCode = cleanedCode.replace(/((?:int|void)\s+main\s*\([^)]*\)\s*\{)/, '$1 setvbuf(stdout, NULL, _IONBF, 0);');
                }
                fs.writeFileSync(srcFile, cleanedCode);
                files.push(srcFile);
            }
            
            cmd = exe;
            args = [];
            files.push(exe);
            break;

        case 'cpp':
        case 'c++':
            let cppFiles = [];
            exe = path.join(TEMP_DIR, `${sessionId}.exe`);

            const cppFileBlocks = cleanedCode.split(/\/\/\s*File:\s*([a-zA-Z0-9_\-\.]+)/i);
            if (cppFileBlocks.length > 1) {
                for (let i = 1; i < cppFileBlocks.length; i += 2) {
                    const filename = cppFileBlocks[i];
                    let content = cppFileBlocks[i+1];
                    
                    if ((filename.endsWith('.cpp') || filename.endsWith('.c++')) && !content.includes('setvbuf') && /((?:int|void)\s+main\s*\([^)]*\)\s*\{)/.test(content)) {
                        content = content.replace(/((?:int|void)\s+main\s*\([^)]*\)\s*\{)/, '$1 setvbuf(stdout, NULL, _IONBF, 0);');
                    }
                    
                    const filePath = path.join(TEMP_DIR, `${sessionId}_${filename}`);
                    fs.writeFileSync(filePath, content);
                    files.push(filePath);
                    if (filename.endsWith('.cpp') || filename.endsWith('.c++')) {
                        cppFiles.push(filePath);
                    }
                }
                srcFile = cppFiles;
            } else {
                srcFile = path.join(TEMP_DIR, `${sessionId}.cpp`);
                if (!cleanedCode.includes('<stdio.h>') && !cleanedCode.includes('<iostream>')) {
                    cleanedCode = '#include <iostream>\n' + cleanedCode;
                }
                if (!cleanedCode.includes('setvbuf')) {
                    cleanedCode = cleanedCode.replace(/((?:int|void)\s+main\s*\([^)]*\)\s*\{)/, '$1 setvbuf(stdout, NULL, _IONBF, 0);');
                }
                fs.writeFileSync(srcFile, cleanedCode);
                files.push(srcFile);
            }
            
            cmd = exe;
            args = [];
            files.push(exe);
            break;

        case 'java':
            // Java is tricky because class name must match file name. 
            // Detect the class name from the code
            const classMatch = cleanedCode.match(/(?:public\s+)?class\s+(\w+)/);
            const className = classMatch ? classMatch[1] : 'Main';

            // Create a unique directory for Java execution
            const javaDir = path.join(TEMP_DIR, sessionId);
            fs.mkdirSync(javaDir);
            srcFile = path.join(javaDir, `${className}.java`);
            fs.writeFileSync(srcFile, cleanedCode);

            // We run inside the unique directory with proper classpath
            cmd = 'java';
            // Add -cp argument to specify classpath as current directory
            args = ['-cp', '.', className];

            // Special return for Java to indicate explicit files/dirs to cleanup
            return {
                cmd,
                args,
                srcFile,
                exe: null,
                files: [javaDir] // Cleanup the whole directory
            };

        default:
            throw new Error(`Unsupported language: ${language}`);
    }

    return { cmd, args, srcFile, exe, files };
}

function compileCode(language, srcFile, exe) {
    return new Promise((resolve, reject) => {
        let compileCmd, compileArgs;
        
        const filesArray = Array.isArray(srcFile) ? srcFile : [srcFile];
        const basenames = filesArray.map(f => path.basename(f));

        if (language === 'c') {
            compileCmd = 'gcc';
            compileArgs = [...basenames, '-o', path.basename(exe)];
        } else if (language === 'cpp' || language === 'c++') {
            compileCmd = 'g++';
            compileArgs = [...basenames, '-o', path.basename(exe)];
        } else if (language === 'java') {
            compileCmd = 'javac';
            compileArgs = [...basenames];
        }

        // For Java, CWD should be the file's directory
        const cwd = language === 'java' ? path.dirname(filesArray[0]) : TEMP_DIR;

        const proc = spawn(compileCmd, compileArgs, { cwd });
        let stderr = '';

        proc.stderr.on('data', (d) => stderr += d.toString());

        proc.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(stderr || 'Compilation failed'));
        });

        proc.on('error', (err) => reject(new Error(`Compiler not found: ${err.message}`)));
    });
}

function cleanupExecution(socketId) {
    const exec = activeExecutions.get(socketId);
    if (exec) {
        if (exec.process && !exec.process.killed) {
            exec.process.kill();
        }
        cleanupFiles(exec.tempFiles);
        activeExecutions.delete(socketId);
    }
}

function cleanupFiles(files) {
    if (!files) return;
    files.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                const stat = fs.statSync(file);
                if (stat.isDirectory()) {
                    fs.rmSync(file, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(file);
                }
            }
        } catch (e) {
            console.error(`Failed to cleanup ${file}:`, e.message);
        }
    });
}
