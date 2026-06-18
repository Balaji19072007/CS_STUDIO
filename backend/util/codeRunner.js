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

  // Create a deterministic hash for the code to cache compilation across test cases!
  const crypto = require('crypto');
  const codeHash = crypto.createHash('md5').update(code).digest('hex');
  const sessionId = `test_${codeHash}`;
  
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
        // Python doesn't need compilation caching since it's interpreted, but we use the hash anyway
        sourceFile = path.join(tempDir, `py_${Date.now()}_${Math.random().toString(36).substring(2,7)}.py`);
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

        // ONLY COMPILE IF THE EXECUTABLE DOES NOT ALREADY EXIST
        if (!fs.existsSync(executable)) {
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
          
          // Only add source file to tempFiles if we just created it (to delete later, actually we shouldn't delete cached ones yet!)
          // Wait, if we delete the executable at the end of the run, the cache is destroyed!
          // We will ONLY delete python scripts and let a cron job or startup script clean the tempDir of executables.
        } else {
            // Executable already exists from a previous test case in this same run! Skip compilation!
        }

        runCommand = executable;
        runArgs = [];
        // DO NOT add to tempFiles so they aren't deleted after the first test case
        break;
      }

      case 'java': {
        const runDir = path.join(tempDir, sessionId);
        if (!fs.existsSync(runDir)) {
          fs.mkdirSync(runDir, { recursive: true });
        }

        // Detect class name
        const classMatch = cleanedCode.match(/(?:public\s+)?class\s+(\w+)/);
        let className = classMatch ? classMatch[1] : 'Main';

        sourceFile = path.join(runDir, `${className}.java`);
        const classFile = path.join(runDir, `${className}.class`);

        // ONLY COMPILE IF THE CLASS FILE DOES NOT ALREADY EXIST
        if (!fs.existsSync(classFile)) {
            fs.writeFileSync(sourceFile, cleanedCode);

            // Compilation
            const compileProcess = spawn('javac', [sourceFile], { timeout: 10000, cwd: runDir });
            let compileError = '';

            compileProcess.stderr.on('data', (data) => {
              compileError += data.toString();
            });

            await new Promise((resolve, reject) => {
              compileProcess.on('error', (err) => {
                reject(new Error(`javac not found. ${err.message}`));
              });
              compileProcess.on('close', (code) => {
                if (code !== 0) {
                  reject(new Error(compileError || `Compilation failed with exit code ${code}`));
                } else if (!fs.existsSync(classFile)) {
                  const generatedClass = fs.readdirSync(runDir).find(f => f.endsWith('.class'));
                  if (generatedClass) {
                    className = path.basename(generatedClass, '.class');
                    resolve();
                  } else {
                    reject(new Error('Compilation failed: Class file was not created. Ensure your class name matches the filename or use public class Main.'));
                  }
                } else {
                  resolve();
                }
              });
            });
        } else {
             // If class file already exists but maybe a different class name was compiled, detect it
             const generatedClass = fs.readdirSync(runDir).find(f => f.endsWith('.class'));
             if (generatedClass) {
                 className = path.basename(generatedClass, '.class');
             }
        }

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
      const logMsg = `[${new Date().toISOString()}] CMD: ${runCommand} ARGS: ${JSON.stringify(runArgs)} CWD: ${execCwd} FILES: ${JSON.stringify(fs.readdirSync(execCwd))}`;
      console.log(logMsg);
    } catch (e) { console.error('Log failed', e); }

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    // Send input if provided
    if (input) {
      childProcess.stdin.on('error', (err) => {
        if (err.code !== 'EPIPE' && err.code !== 'EOF') {
          console.error('Error writing to stdin:', err.message);
        }
      });
      try {
        childProcess.stdin.write(input);
        childProcess.stdin.end();
      } catch (err) {
        // Ignore synchronous write errors if stream is already closed
      }
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
          try {
            const files = execCwd && fs.existsSync(execCwd) ? fs.readdirSync(execCwd).join(', ') : 'N/A';
            const command = runCommand || 'N/A';
            const args = runArgs ? runArgs.join(' ') : 'N/A';
            console.error(`[DEBUG Info] RunDir: ${execCwd || 'N/A'} Files: ${files} Command: ${command} ${args}`);
          } catch (e) {
            console.error(`[DEBUG Info] Error: ${e.message}`);
          }
          resolve({ stdout, stderr: stderr || '', exitCode: code });
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
    try {
      const files = execCwd && fs.existsSync(execCwd) ? fs.readdirSync(execCwd).join(', ') : 'N/A';
      const command = runCommand || 'N/A';
      const args = runArgs ? runArgs.join(' ') : 'N/A';
      console.error(`[DEBUG Info] RunDir: ${execCwd || 'N/A'} Files: ${files} Command: ${command} ${args}`);
    } catch (e) {
      console.error(`[DEBUG Info] Error: ${e.message}`);
    }
    return { stdout: '', stderr: error.message, exitCode: 1 };
  } finally {
    cleanupFiles(tempFiles);
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