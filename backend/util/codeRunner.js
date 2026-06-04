const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Executes code non-interactively for a single test case.
 * This is a simplified wrapper for controllers to use for test runs.
 * @param {string} language - Code language.
 * @param {string} code - Code content.
 * @param {string} input - The standard input for the test case.
 * @param {string[]} testArgs - The command line arguments for the test case.
 * @returns {Promise<{stdout: string, stderr: string, exitCode: number}>}
 */
async function runCodeTest(language, code, input, testArgs = []) {
  // Reduced timeout to 5 seconds for better user experience
  const TIMEOUT_MS = 5000;
  // Use local temp dir to avoid system temp strictness and ensure compatibility with project structure
  const tempDir = path.join(__dirname, '../temp_exec');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  console.log('Using CodeRunner V3 with tempDir:', tempDir);

  const sessionId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  let sourceFile, executable, runCommand, runArgs, tempFiles = [];
  let execCwd = tempDir; // Default execution directory

  try {
    const cleanedCode = code.replace(/^-\s+/gm, '');

    // Pre-create dummy files for File Handling challenges (Phase 15)
    try {
      require('fs').writeFileSync(require('path').join(tempDir, 'data.txt'), 'Welcome to File Handling');
      require('fs').writeFileSync(require('path').join(tempDir, 'sample.txt'), 'Sample file content');
    } catch (e) {}

    switch (language.toLowerCase()) {
      case 'python':
        sourceFile = path.join(tempDir, `${sessionId}.py`);
        fs.writeFileSync(sourceFile, cleanedCode);
        runCommand = 'python';
        runArgs = [sourceFile];
        tempFiles.push(sourceFile);
        break;

      case 'c':
      case 'cpp':
      case 'c++': {
        const ext = language.toLowerCase() === 'c' ? '.c' : '.cpp';
        const compiler = language.toLowerCase() === 'c' ? 'gcc' : 'g++';
        sourceFile = path.join(tempDir, `${sessionId}${ext}`);
        executable = path.join(tempDir, `${sessionId}${process.platform === 'win32' ? '.exe' : ''}`);

        fs.writeFileSync(sourceFile, cleanedCode);

        // Compilation
        const compileProcess = spawn(compiler, [sourceFile, '-o', executable], { timeout: 15000, cwd: tempDir });
        let compileError = '';

        compileProcess.stderr.on('data', (data) => {
          compileError += data.toString();
        });

        await new Promise((resolve, reject) => {
          compileProcess.on('error', (err) => reject(new Error(`${compiler} not found. ${err.message}`)));
          compileProcess.on('close', (code) => {
            if (code !== 0) {
              reject(new Error(compileError || `Compilation failed with exit code ${code}`));
            } else {
              resolve();
            }
          });
        });

        runCommand = executable;
        runArgs = [];
        tempFiles.push(sourceFile, executable);
        break;
      }

      case 'java': {
        console.log('[JAVA DEBUG] Starting Java execution...');
        // Create a unique directory for Java execution to support any class name and avoid collisions
        const runDir = path.join(tempDir, sessionId);
        console.log('[JAVA DEBUG] Run directory:', runDir);
        if (!fs.existsSync(runDir)) {
          fs.mkdirSync(runDir, { recursive: true });
          console.log('[JAVA DEBUG] Created run directory');
        }

        // Detect class name
        const classMatch = cleanedCode.match(/(?:public\s+)?class\s+(\w+)/);
        let className = classMatch ? classMatch[1] : 'Main';
        console.log('[JAVA DEBUG] Detected class name:', className);

        sourceFile = path.join(runDir, `${className}.java`);
        const classFile = path.join(runDir, `${className}.class`);
        console.log('[JAVA DEBUG] Source file:', sourceFile);
        console.log('[JAVA DEBUG] Class file:', classFile);

        fs.writeFileSync(sourceFile, cleanedCode);
        console.log('[JAVA DEBUG] Wrote source file, length:', cleanedCode.length);

        // Compilation
        console.log('[JAVA DEBUG] Starting compilation with javac...');
        const compileProcess = spawn('javac', [sourceFile], { timeout: 10000, cwd: runDir });
        let compileError = '';

        compileProcess.stderr.on('data', (data) => {
          compileError += data.toString();
          console.log('[JAVA DEBUG] Compile stderr:', data.toString());
        });

        compileProcess.stdout.on('data', (data) => {
          console.log('[JAVA DEBUG] Compile stdout:', data.toString());
        });

        await new Promise((resolve, reject) => {
          compileProcess.on('error', (err) => {
            console.error('[JAVA DEBUG] Compile process error:', err);
            reject(new Error(`javac not found. ${err.message}`));
          });
          compileProcess.on('close', (code) => {
            console.log('[JAVA DEBUG] Compile process closed with code:', code);
            console.log('[JAVA DEBUG] Files in runDir:', fs.readdirSync(runDir));

            if (code !== 0) {
              console.error('[JAVA DEBUG] Compilation failed:', compileError);
              reject(new Error(compileError || `Compilation failed with exit code ${code}`));
            } else if (!fs.existsSync(classFile)) {
              console.log('[JAVA DEBUG] Expected class file not found, searching for any .class file...');
              // Try to find ANY .class file if the specific one is missing
              // This happens if the user defines 'class Solution' but the file was named 'Main.java' (and it wasn't public)
              const generatedClass = fs.readdirSync(runDir).find(f => f.endsWith('.class'));
              if (generatedClass) {
                // Update className to the file that was actually generated
                className = path.basename(generatedClass, '.class');
                console.log('[JAVA DEBUG] Found alternative class file:', generatedClass, 'Using className:', className);
                resolve();
              } else {
                console.error('[JAVA DEBUG] No .class file found after compilation');
                reject(new Error('Compilation failed: Class file was not created. Ensure your class name matches the filename or use public class Main.'));
              }
            } else {
              console.log('[JAVA DEBUG] Compilation successful, class file exists');
              resolve();
            }
          });
        });

        runCommand = 'java';
        // Pass classpath via -cp argument with absolute path
        runArgs = ['-cp', runDir, className];
        execCwd = runDir; // Execute inside the unique directory

        console.log('[JAVA DEBUG] Execution command:', runCommand, runArgs.join(' '));
        console.log('[JAVA DEBUG] Execution CWD:', execCwd);

        // Mark directory for cleanup
        tempFiles.push(runDir);
        break;
      }

      case 'javascript':
      case 'js':
        sourceFile = path.join(tempDir, `${sessionId}.js`);
        fs.writeFileSync(sourceFile, cleanedCode);
        runCommand = 'node';
        runArgs = [sourceFile];
        tempFiles.push(sourceFile);
        break;

      default:
        throw new Error(`Unsupported language: ${language}`);
    }

    // Execution
    const childProcess = spawn(runCommand, [...runArgs, ...testArgs], {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: TIMEOUT_MS,
      cwd: execCwd,
      env: process.env // CLASSPATH env var is no longer needed/relied upon
    });

    try {
      const logMsg = `[${new Date().toISOString()}] CMD: ${runCommand} ARGS: ${JSON.stringify(runArgs)} CWD: ${execCwd} FILES: ${JSON.stringify(fs.readdirSync(execCwd))}\n`;
      fs.appendFileSync(path.join(__dirname, '../debug_java.log'), logMsg);
    } catch (e) { console.error('Log failed', e); }

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    // Send input if provided
    if (input) {
      childProcess.stdin.write(input);
      childProcess.stdin.end();
    }

    childProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    const result = await new Promise((resolve) => {
      childProcess.on('close', (code) => {
        if (code !== 0 || stderr) {
          let debugInfo = '';
          try {
            const files = execCwd && fs.existsSync(execCwd) ? fs.readdirSync(execCwd).join(', ') : 'N/A';
            const command = runCommand || 'N/A';
            const args = runArgs ? runArgs.join(' ') : 'N/A';
            debugInfo = `\n[DEBUG Info]\nRunDir: ${execCwd || 'N/A'}\nFiles: ${files}\nCommand: ${command} ${args}\n`;
          } catch (e) {
            debugInfo = `\n[DEBUG Info]\nError: ${e.message}\n`;
          }
          resolve({ stdout, stderr: (stderr || '') + debugInfo, exitCode: code });
        } else {
          resolve({ stdout, stderr, exitCode: code });
        }
      });
      childProcess.on('error', (err) => {
        stderr += `Execution error: ${err.message}`;
        resolve({ stdout: '', stderr, exitCode: 1 });
      });
      childProcess.on('timeout', () => {
        timedOut = true;
        childProcess.kill();
        stderr += 'Execution timed out.';
        resolve({ stdout: '', stderr, exitCode: 1 });
      });
    });

    if (timedOut) {
      result.stderr = 'Execution timed out. Try to optimize your solution.';
      result.exitCode = 1;
    }

    return result;

  } catch (error) {
    console.error(`Error during single test run for ${language}:`, error.message);
    let debugInfo = '';
    try {
      const files = execCwd && fs.existsSync(execCwd) ? fs.readdirSync(execCwd).join(', ') : 'N/A';
      const command = runCommand || 'N/A';
      const args = runArgs ? runArgs.join(' ') : 'N/A';
      debugInfo = `\n[DEBUG Info]\nRunDir: ${execCwd || 'N/A'}\nFiles: ${files}\nCommand: ${command} ${args}\n`;
    } catch (e) {
      debugInfo = `\n[DEBUG Info]\nError: ${e.message}\n`;
    }
    return { stdout: '', stderr: error.message + debugInfo, exitCode: 1 };
  } finally {
    // Cleanup temporary files
    // cleanupFiles(tempFiles); // DISABLED FOR DEBUGGING
    console.log('Skipping cleanup for debug');
  }
}

// Helper function to clean up multiple files
// Helper function to clean up multiple files or directories
function cleanupFiles(files) {
  files.forEach(file => {
    if (file && fs.existsSync(file)) {
      try {
        const stats = fs.lstatSync(file);
        if (stats.isDirectory()) {
          // Node 14.14+ supports rmSync
          if (fs.rmSync) {
            fs.rmSync(file, { recursive: true, force: true });
          } else {
            // Fallback for older nodes if needed (rmdirSync with recursive is deprecated but usually works on recent older nodes, but rmSync is standard now)
            fs.rmdirSync(file, { recursive: true });
          }
        } else {
          fs.unlinkSync(file);
        }
      } catch (e) {
        console.error('Error cleaning file/dir:', file, e.message);
      }
    }
  });
}

module.exports = { runCodeTest };