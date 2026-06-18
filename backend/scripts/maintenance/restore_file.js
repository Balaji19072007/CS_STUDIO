const fs = require('fs');
const readline = require('readline');
const path = 'C:\\\\Users\\\\yerus\\\\.gemini\\\\antigravity-ide\\\\brain\\\\db4e66d4-b235-4313-881c-ebf15f129367\\\\.system_generated\\\\logs\\\\transcript.jsonl';

async function processLineByLine() {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let fileContent = '';
  
  for await (const line of rl) {
    if (line.includes('cProgrammingChallengeFallbacks.js') && line.includes('CodeContent')) {
        const data = JSON.parse(line);
        if (data.tool_calls) {
            for (const call of data.tool_calls) {
                if (call.name === 'write_to_file' && call.args && call.args.TargetFile && call.args.TargetFile.includes('cProgrammingChallengeFallbacks.js')) {
                    fileContent = call.args.CodeContent;
                }
            }
        }
    }
  }
  
  if (fileContent) {
      fs.writeFileSync('c:\\\\files\\\\projects\\\\CS studio\\\\backend\\\\data\\\\cProgrammingChallengeFallbacks.js', fileContent);
      console.log('Restored file!');
  } else {
      console.log('Could not find the file in logs.');
  }
}

processLineByLine();
