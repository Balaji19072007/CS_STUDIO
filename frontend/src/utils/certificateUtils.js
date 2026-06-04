const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const formatCertificateDate = (value) => {
  const dateToUse = value ? new Date(value) : new Date();

  // Ensure valid date
  if (isNaN(dateToUse.getTime())) {
    return new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return dateToUse.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const buildCertificateFileName = (certificate) => {
  const courseSlug = (certificate?.courseTitle || 'course')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${courseSlug || 'course'}-certificate.svg`;
};

export const buildCertificateSvg = (certificate) => {
  const learner = escapeXml(certificate?.userName || 'CS Studio Learner');
  const course = escapeXml(certificate?.courseTitle || 'Course Completion');
  const issuedOn = escapeXml(formatCertificateDate(certificate?.issuedAt));
  const certificateId = escapeXml(certificate?.certificateId || certificate?.id || 'N/A');
  const verificationUrl = escapeXml(certificate?.verificationUrl || '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1131" viewBox="0 0 1600 1131" role="img" aria-label="CS Studio Certificate">
  <defs>
    <linearGradient id="pageGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14304A" />
      <stop offset="55%" stop-color="#08131E" />
      <stop offset="100%" stop-color="#04070B" />
    </linearGradient>
    <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EAC86B" />
      <stop offset="50%" stop-color="#F8E7A6" />
      <stop offset="100%" stop-color="#C58A22" />
    </linearGradient>
  </defs>
  <rect width="1600" height="1131" fill="url(#pageGlow)" />
  <rect x="36" y="36" width="1528" height="1059" rx="30" fill="none" stroke="url(#goldBand)" stroke-width="8" />
  <rect x="74" y="74" width="1452" height="983" rx="26" fill="none" stroke="#35506A" stroke-width="2" />
  <text x="800" y="180" text-anchor="middle" fill="#EAC86B" font-family="Georgia, serif" font-size="34" letter-spacing="8">CS STUDIO</text>
  <text x="800" y="270" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-size="64">Certificate of Completion</text>
  <text x="800" y="350" text-anchor="middle" fill="#9FB3C8" font-family="Verdana, sans-serif" font-size="28">This certifies that</text>
  <text x="800" y="470" text-anchor="middle" fill="#F9F3DE" font-family="Georgia, serif" font-size="74">${learner}</text>
  <line x1="420" y1="500" x2="1180" y2="500" stroke="#35506A" stroke-width="2" />
  <text x="800" y="590" text-anchor="middle" fill="#9FB3C8" font-family="Verdana, sans-serif" font-size="26">has successfully completed the guided learning path in</text>
  <text x="800" y="690" text-anchor="middle" fill="#EAC86B" font-family="Georgia, serif" font-size="54">${course}</text>
  <text x="800" y="770" text-anchor="middle" fill="#AFC2D6" font-family="Verdana, sans-serif" font-size="24">Issued on ${issuedOn}</text>
  <rect x="230" y="840" width="1140" height="170" rx="22" fill="#0A1725" stroke="#22384D" />
  <text x="280" y="895" fill="#9FB3C8" font-family="Verdana, sans-serif" font-size="22">Certificate ID</text>
  <text x="280" y="935" fill="#FFFFFF" font-family="Courier New, monospace" font-size="24">${certificateId}</text>
  <text x="280" y="980" fill="#9FB3C8" font-family="Verdana, sans-serif" font-size="16">${verificationUrl}</text>
  <text x="1200" y="910" text-anchor="end" fill="#EAC86B" font-family="Georgia, serif" font-size="30">Verified Record</text>
  <text x="1200" y="950" text-anchor="end" fill="#9FB3C8" font-family="Verdana, sans-serif" font-size="20">Trackable through CS Studio</text>
  <circle cx="1270" cy="920" r="36" fill="#102233" stroke="#EAC86B" stroke-width="3" />
  <path d="M1254 922l12 12l22 -26" fill="none" stroke="#EAC86B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
};

export const downloadCertificate = (certificate) => {
  const svg = buildCertificateSvg(certificate);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = buildCertificateFileName(certificate);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};
