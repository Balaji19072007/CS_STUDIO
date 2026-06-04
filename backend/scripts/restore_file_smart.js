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
      if (line.includes('cProgrammingChallengeFallbacks.js') && line.includes('multi_replace_file_content')) {
          const data = JSON.parse(line);
          if (data.source === 'SYSTEM' && data.content && data.content.includes('The following changes were made by the multi_replace_file_content tool')) {
              // We could parse diffs, but it's hard.
          }
      }
      if (line.includes('cProgrammingChallengeFallbacks.js') && line.includes('view_file')) {
          const data = JSON.parse(line);
          if (data.source === 'SYSTEM' && data.content && data.content.includes('Showing lines')) {
             // Let's just find the latest full content if possible
          }
      }
  }
}
