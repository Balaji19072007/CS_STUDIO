const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class CodeExecutionService {
  constructor() {
    this.tempDir = path.join(__dirname, 'temp');
    this.setupTempDir();
  }

  setupTempDir() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Execute code with given input
   */
  async executeCode(code, language, input = '') {
    const sessionId = uuidv4();
    const startTime = Date.now();

    try {
      console.log(`⚡ Executing ${language} code (${sessionId})`);

      switch (language.toLowerCase()) {
        case 'python':
          return await this.executePython(code, input, sessionId);

        case 'c':
          return await this.executeC(code, input, sessionId);

        case 'cpp':
        case 'c++':
          return await this.executeCpp(code, input, sessionId);

        case 'java':
          return await this.executeJava(code, input, sessionId);

        case 'javascript':
        case 'js':
          return await this.executeJavaScript(code, input, sessionId);

        default:
          throw new Error(`Unsupported language: ${language}`);
      }
    } catch (error) {
      console.error(`❌ Execution error for ${sessionId}:`, error);
      return {
        success: false,
        output: '',
        error: error.message,
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * Python execution
   */
  async executePython(code, input, sessionId) {
    return new Promise((resolve) => {
      const tempFile = path.join(this.tempDir, `${sessionId}.py`);
      fs.writeFileSync(tempFile, code);

      const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
      const pythonProcess = spawn(pythonCmd, [tempFile], {
        timeout: 10000 // 10 seconds timeout
      });

      this.handleProcessExecution(pythonProcess, input, sessionId, [tempFile], resolve);
    });
  }

  /**
   * C execution
   */
  async executeC(code, input, sessionId) {
    return new Promise((resolve) => {
      const executableName = `${sessionId}${process.platform === 'win32' ? '.exe' : ''}`;
      const executable = path.join(this.tempDir, executableName);

      let cFiles = [];
      let filesToCleanup = [];

      const cFileBlocks = code.split(/\/\/\s*File:\s*([a-zA-Z0-9_\-\.]+)/i);
      if (cFileBlocks.length > 1) {
          for (let i = 1; i < cFileBlocks.length; i += 2) {
              const filename = cFileBlocks[i];
              const content = cFileBlocks[i+1];
              const filePath = path.join(this.tempDir, `${sessionId}_${filename}`);
              fs.writeFileSync(filePath, content);
              filesToCleanup.push(filePath);
              if (filename.endsWith('.c')) {
                  cFiles.push(`${sessionId}_${filename}`);
              }
          }
      } else {
          const sourceFileName = `${sessionId}.c`;
          const sourceFile = path.join(this.tempDir, sourceFileName);
          fs.writeFileSync(sourceFile, code);
          cFiles.push(sourceFileName);
          filesToCleanup.push(sourceFile);
      }

      // Compile C code
      const compileProcess = spawn('gcc', [...cFiles, '-o', executableName], {
        cwd: this.tempDir,
        timeout: 15000
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          this.cleanupFiles(filesToCleanup);
          return resolve({
            success: false,
            output: '',
            error: `C Compilation failed:\n${compileError}`,
            executionTime: 0
          });
        }

        // Execute compiled program
        const cProcess = spawn(executable, [], { timeout: 10000 });
        this.handleProcessExecution(cProcess, input, sessionId, [...filesToCleanup, executable], resolve);
      });

      compileProcess.on('error', (err) => {
        this.cleanupFiles(filesToCleanup);
        resolve({
          success: false,
          output: '',
          error: `C Compiler error: ${err.message}`,
          executionTime: 0
        });
      });
    });
  }

  /**
   * C++ execution
   */
  async executeCpp(code, input, sessionId) {
    return new Promise((resolve) => {
      const executableName = `${sessionId}${process.platform === 'win32' ? '.exe' : ''}`;
      const executable = path.join(this.tempDir, executableName);

      let cppFiles = [];
      let filesToCleanup = [];

      const cppFileBlocks = code.split(/\/\/\s*File:\s*([a-zA-Z0-9_\-\.]+)/i);
      if (cppFileBlocks.length > 1) {
          for (let i = 1; i < cppFileBlocks.length; i += 2) {
              const filename = cppFileBlocks[i];
              const content = cppFileBlocks[i+1];
              const filePath = path.join(this.tempDir, `${sessionId}_${filename}`);
              fs.writeFileSync(filePath, content);
              filesToCleanup.push(filePath);
              if (filename.endsWith('.cpp') || filename.endsWith('.c++')) {
                  cppFiles.push(`${sessionId}_${filename}`);
              }
          }
      } else {
          const sourceFileName = `${sessionId}.cpp`;
          const sourceFile = path.join(this.tempDir, sourceFileName);
          fs.writeFileSync(sourceFile, code);
          cppFiles.push(sourceFileName);
          filesToCleanup.push(sourceFile);
      }

      // Compile C++ code
      const compileProcess = spawn('g++', [...cppFiles, '-o', executableName], {
        cwd: this.tempDir,
        timeout: 15000
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          this.cleanupFiles(filesToCleanup);
          return resolve({
            success: false,
            output: '',
            error: `C++ Compilation failed:\n${compileError}`,
            executionTime: 0
          });
        }

        // Execute compiled program
        const cppProcess = spawn(executable, [], { timeout: 10000 });
        this.handleProcessExecution(cppProcess, input, sessionId, [...filesToCleanup, executable], resolve);
      });

      compileProcess.on('error', (err) => {
        this.cleanupFiles(filesToCleanup);
        resolve({
          success: false,
          output: '',
          error: `C++ Compiler error: ${err.message}`,
          executionTime: 0
        });
      });
    });
  }

  /**
   * Java execution
   */
  async executeJava(code, input, sessionId) {
    return new Promise((resolve) => {
      // Use standard temp directory for the service
      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
      }

      const runDir = path.join(this.tempDir, sessionId);
      if (!fs.existsSync(runDir)) {
        fs.mkdirSync(runDir, { recursive: true });
      }

      // Detect class name - prioritize public class
      const publicClassMatch = code.match(/public\s+class\s+(\w+)/);
      const anyClassMatch = code.match(/class\s+(\w+)/);

      // If there's a public class, MUST use that name for the file
      // Otherwise, use any class name found, or default to Main
      let className = publicClassMatch ? publicClassMatch[1] :
        (anyClassMatch ? anyClassMatch[1] : 'Main');

      const sourceFile = path.join(runDir, `${className}.java`);
      const classFile = path.join(runDir, `${className}.class`);

      fs.writeFileSync(sourceFile, code);

      // Compile Java code
      const compileProcess = spawn('javac', [sourceFile], {
        timeout: 15000,
        cwd: runDir
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (exitCode) => {
        if (exitCode !== 0) {
          // Cleanup handled by caller or final cleanup
          return resolve({
            success: false,
            output: '',
            error: `Java Compilation failed:\n${compileError}`,
            executionTime: 0
          });
        }

        if (!fs.existsSync(classFile)) {
          // Try to find ANY .class file if the specific one is missing
          const generatedClass = fs.readdirSync(runDir).find(f => f.endsWith('.class'));
          if (generatedClass) {
            className = path.basename(generatedClass, '.class');
          } else {
            return resolve({
              success: false,
              output: '',
              error: 'Java Compilation failed: Class file was not created. Ensure your class name matches the filename or use public class Main.',
              executionTime: 0
            });
          }
        }

        // Execute Java program
        const javaProcess = spawn('java', ['-cp', runDir, className], {
          timeout: 10000,
          cwd: runDir
        });

        this.handleProcessExecution(javaProcess, input, sessionId, [sourceFile, runDir], resolve, {
          runDir,
          runCommand: 'java',
          runArgs: ['-cp', runDir, className]
        });
      });

      compileProcess.on('error', (err) => {
        resolve({
          success: false,
          output: '',
          error: `Java Compiler error: ${err.message}`,
          executionTime: 0
        });
      });
    });
  }

  /**
   * JavaScript execution
   */
  async executeJavaScript(code, input, sessionId) {
    return new Promise((resolve) => {
      const tempFile = path.join(this.tempDir, `${sessionId}.js`);
      fs.writeFileSync(tempFile, code);

      const nodeProcess = spawn('node', [tempFile], {
        timeout: 10000
      });

      this.handleProcessExecution(nodeProcess, input, sessionId, [tempFile], resolve);
    });
  }

  /**
   * Common process execution handler
   */
  handleProcessExecution(process, input, sessionId, tempFiles, resolve, debugInfo = null) {
    const startTime = Date.now();
    let output = '';
    let errorOutput = '';

    // Write input to STDIN if provided
    if (input) {
      process.stdin.write(input + '\n');
      process.stdin.end();
    }

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    process.on('close', (code) => {
      const executionTime = Date.now() - startTime;
      this.cleanupFiles(tempFiles);

      if (code !== 0 || errorOutput) {
        // INJECT DEBUG INFO HERE if available
        let debugStr = '';
        if (debugInfo && debugInfo.runDir) {
          try {
            const files = fs.existsSync(debugInfo.runDir) ? fs.readdirSync(debugInfo.runDir).join(', ') : 'N/A';
            debugStr = `\n[DEBUG Info]\nRunDir: ${debugInfo.runDir}\nFiles: ${files}\nCommand: ${debugInfo.runCommand} ${debugInfo.runArgs.join(' ')}\n`;
          } catch (e) {
            debugStr = `\n[DEBUG Info]\nError reading debug info: ${e.message}\n`;
          }
        }
        resolve({
          success: false,
          output: output,
          error: (errorOutput || `Process exited with code ${code}`) + debugStr,
          executionTime: executionTime
        });
      } else {
        resolve({
          success: true,
          output: this.cleanOutput(output),
          error: '',
          executionTime: executionTime
        });
      }
    });

    process.on('error', (err) => {
      const executionTime = Date.now() - startTime;
      this.cleanupFiles(tempFiles);
      resolve({
        success: false,
        output: '',
        error: `Execution error: ${err.message}`,
        executionTime: executionTime
      });
    });

    // Handle timeout
    setTimeout(() => {
      if (process.exitCode === null) {
        process.kill();
        this.cleanupFiles(tempFiles);
        resolve({
          success: false,
          output: '',
          error: 'Execution timeout (10 seconds exceeded)',
          executionTime: Date.now() - startTime
        });
      }
    }, 10000);
  }

  /**
   * Clean and normalize output
   */
  cleanOutput(output) {
    return output
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\s+$/g, '')   // Remove trailing whitespace
      .trim();                // Remove surrounding whitespace
  }

  /**
   * Clean up temporary files
   */
  cleanupFiles(files) {
    files.forEach(file => {
      if (file && fs.existsSync(file)) {
        try {
          fs.unlinkSync(file);
        } catch (e) {
          console.error('Error cleaning file:', file, e.message);
        }
      }
    });
  }
}

module.exports = CodeExecutionService;