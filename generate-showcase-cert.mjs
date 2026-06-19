import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildCertificateSvg } from './frontend/src/utils/certificateUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockCertificate = {
  userName: 'System Admin',
  courseTitle: 'Introduction to C Programming',
  issuedAt: '2026-06-19T00:00:00Z',
  certificateId: 'CST-20260619-ADMIN01'
};

const svg = buildCertificateSvg(mockCertificate);

const outPath = path.join(__dirname, 'frontend', 'public', 'certificate-showcase.svg');
fs.writeFileSync(outPath, svg, 'utf8');
console.log('Showcase certificate generated successfully!');
