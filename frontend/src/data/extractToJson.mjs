// Helper to extract phase data to JSON
import { C_PROGRAMMING_PHASES, cProgrammingPhaseHighlights } from './cProgrammingPhaseFallbacks.js';
import { JAVA_PROGRAMMING_PHASES } from './javaProgrammingPhaseFallbacks.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

fs.writeFileSync(
  path.join(__dirname, 'cProgrammingPhasesData.json'),
  JSON.stringify(C_PROGRAMMING_PHASES, null, 2)
);
console.log('C phases data written:', (C_PROGRAMMING_PHASES.length / 1024).toFixed(0), 'phases');

fs.writeFileSync(
  path.join(__dirname, 'cProgrammingPhaseHighlights.json'),
  JSON.stringify(cProgrammingPhaseHighlights, null, 2)
);
console.log('C highlights written');

fs.writeFileSync(
  path.join(__dirname, 'javaProgrammingPhasesData.json'),
  JSON.stringify(JAVA_PROGRAMMING_PHASES, null, 2)
);
console.log('Java phases data written:', (JAVA_PROGRAMMING_PHASES.length / 1024).toFixed(0), 'phases');
