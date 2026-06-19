import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildCertificateSvg } from './frontend/src/utils/certificateUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockCertificate = {
  userName: 'Balaji Reddy',
  courseTitle: 'Introduction to C Programming',
  issuedAt: '2026-06-19T00:00:00Z',
  certificateId: 'CST-20260619-BALAJI01'
};

const svg = buildCertificateSvg(mockCertificate);

const outPath = path.join(__dirname, 'frontend', 'public', 'cert-sample.svg');
fs.writeFileSync(outPath, svg, 'utf8');
console.log('Preview updated successfully!');
