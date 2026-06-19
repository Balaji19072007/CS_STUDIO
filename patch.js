const fs = require('fs');

const b64 = fs.readFileSync('sig_b64.txt', 'utf8').trim();

const code = `import { jsPDF } from 'jspdf';

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const formatCertificateDate = (value) => {
  const d = value ? new Date(value) : new Date();
  if (isNaN(d.getTime())) return new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\\//g, '/');
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return \`\${yyyy}/\${mm}/\${dd}\`;
};

export const buildCertificateFileName = (certificate) => {
  const slug = (certificate?.courseTitle || 'course').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return \`\${slug || 'course'}-certificate\`;
};

function getStampBumps(cx, cy, R, r, N, color) {
  let s = '';
  for (let i = 0; i < N; i++) {
    const a = (i / N) * 2 * Math.PI;
    const x = (cx + R * Math.cos(a)).toFixed(1);
    const y = (cy + R * Math.sin(a)).toFixed(1);
    s += \`<circle cx="\${x}" cy="\${y}" r="\${r}" fill="\${color}" filter="url(#distress)"/>\`;
  }
  return s;
}

export const buildCertificateSvg = (certificate) => {
  const learner   = escapeXml(certificate?.userName    || 'CS Studio Learner');
  const course    = escapeXml(certificate?.courseTitle || 'Course Completion');
  const issuedOn  = escapeXml(formatCertificateDate(certificate?.issuedAt));
  const certId    = escapeXml(certificate?.certificateId || certificate?.id || 'N/A');

  return \`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="100%" height="100%" viewBox="0 0 3300 2550"
     style="background-color: #F8F9FA;"
     role="img" aria-label="CS Studio Certificate of Achievement">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&amp;family=Playfair+Display:ital@0;1&amp;family=Great+Vibes&amp;display=swap');
      .title { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 190px; fill: #0A2240; letter-spacing: 45px; }
      .subtitle { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 55px; fill: #0A2240; letter-spacing: 30px; }
      .name { font-family: 'Great Vibes', 'Brush Script MT', cursive; font-size: 290px; fill: #222222; }
      .desc { font-family: 'Playfair Display', serif; font-size: 44px; fill: #7A7A7A; }
      .label { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 40px; fill: #0A2240; letter-spacing: 12px; }
      .value { font-family: 'Montserrat', sans-serif; font-weight: 600; font-size: 38px; fill: #555555; letter-spacing: 8px; }
      .stamp-text { font-family: 'Montserrat', sans-serif; font-weight: 800; fill: #110CA6; }
    </style>
    
    <filter id="distress" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1.8" in="noise" result="coloredNoise" />
      <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" result="comp" />
    </filter>

    <symbol id="trophy" viewBox="0 0 100 100">
      <path d="M20,20 L80,20 L75,50 C70,70 55,80 50,80 C45,80 30,70 25,50 Z" fill="none" stroke="#110CA6" stroke-width="6"/>
      <line x1="50" y1="80" x2="50" y2="95" stroke="#110CA6" stroke-width="8"/>
      <line x1="30" y1="95" x2="70" y2="95" stroke="#110CA6" stroke-width="8"/>
      <path d="M20,20 C10,20 10,40 25,40" fill="none" stroke="#110CA6" stroke-width="5"/>
      <path d="M80,20 C90,20 90,40 75,40" fill="none" stroke="#110CA6" stroke-width="5"/>
    </symbol>
    
    <!-- Clip path to keep waves strictly inside the border area -->
    <clipPath id="borderClip">
      <rect x="250" y="250" width="2800" height="2050" />
    </clipPath>
  </defs>

  <!-- Waves Clipped inside the border -->
  <g clip-path="url(#borderClip)">
    <!-- Small Grey wave at bottom -->
    <path d="M 1200,2550 Q 1500,2300 1800,2550 Z" fill="#E2E5E9" />
    
    <!-- Gold wave -->
    <path d="M 2400,0 Q 2800,1200 1600,2550 L 3300,2550 L 3300,0 Z" fill="#F4C05A" />
    
    <!-- Dark Blue wave -->
    <path d="M 2650,0 Q 3050,1200 1850,2550 L 3300,2550 L 3300,0 Z" fill="#0A2240" />
  </g>

  <!-- Base Border -->
  <rect x="250" y="250" width="2800" height="2050" fill="none" stroke="#333333" stroke-width="4"/>

  <!-- ── CONTENT ── -->
  <g transform="translate(350, 600)">
    <text class="title" x="0" y="0">CERTIFICATE</text>
    <text class="subtitle" x="15" y="140">OF ACHIEVEMENT</text>
  </g>

  <!-- Name -->
  <g transform="translate(350, 1150)">
    <text class="name" x="0" y="0">\${learner}</text>
  </g>

  <!-- Description -->
  <g transform="translate(350, 1300)">
    <text class="desc" x="0" y="0">This certificate is proudly presented to acknowledge the successful</text>
    <text class="desc" x="0" y="70">completion of the course <tspan font-weight="bold" fill="#333333">\${course}</tspan>.</text>
    <text class="desc" x="0" y="140">Your dedication and hard work have yielded excellent results.</text>
  </g>

  <!-- ── FOOTER ROW ── -->
  <!-- DATE & ID -->
  <g transform="translate(350, 1850)">
    <text class="label" x="0" y="0">DATE</text>
    <text class="value" x="0" y="70">\${issuedOn}</text>
    <text class="label" x="0" y="180">ID</text>
    <text class="value" x="0" y="250">\${certId}</text>
  </g>

  <!-- SIGNATURE -->
  <g transform="translate(1300, 1850)">
    
    <text class="label" x="0" y="0">SIGNATURE</text>
    <image href="data:image/png;base64,${b64}" x="-40" y="10" width="550" height="250" opacity="0.95"/>
    <line x1="-50" y1="210" x2="450" y2="210" stroke="#333" stroke-width="3"/>
    
    <g transform="translate(420, 150) rotate(-10)" opacity="0.92">
      \${getStampBumps(0, 0, 200, 10, 40, '#110CA6')}
      <circle cx="0" cy="0" r="180" fill="none" stroke="#110CA6" stroke-width="8" filter="url(#distress)"/>
      <circle cx="0" cy="0" r="160" fill="none" stroke="#110CA6" stroke-width="3" filter="url(#distress)"/>
      
      <path id="stampTopArc" d="M-135,0 a135,135 0 0,1 270,0" fill="none"/>
      <text class="stamp-text" font-size="28" letter-spacing="8" filter="url(#distress)">
        <textPath xlink:href="#stampTopArc" startOffset="50%" text-anchor="middle">CS STUDIO</textPath>
      </text>

      <path id="stampBotArc" d="M-125,0 a125,125 0 0,0 250,0" fill="none"/>
      <text class="stamp-text" font-size="24" letter-spacing="6" filter="url(#distress)">
        <textPath xlink:href="#stampBotArc" startOffset="50%" text-anchor="middle">OFFICIAL SEAL</textPath>
      </text>

      <line x1="-150" y1="-40" x2="150" y2="-40" stroke="#110CA6" stroke-width="5" filter="url(#distress)"/>
      <line x1="-150" y1="50" x2="150" y2="50" stroke="#110CA6" stroke-width="5" filter="url(#distress)"/>
      
      <text class="stamp-text" font-size="65" x="0" y="25" text-anchor="middle" letter-spacing="3" filter="url(#distress)">CERTIFIED</text>
      
      <use xlink:href="#trophy" x="-25" y="-115" width="50" height="50" filter="url(#distress)"/>
      <use xlink:href="#trophy" x="-25" y="-115" width="50" height="50" filter="url(#distress)" transform="rotate(180)"/>
      
      <path d="M-140,0 L-120,0 M-130,-10 L-130,10" stroke="#110CA6" stroke-width="3" filter="url(#distress)"/>
      <path d="M120,0 L140,0 M130,-10 L130,10" stroke="#110CA6" stroke-width="3" filter="url(#distress)"/>
    </g>
  </g>
</svg>\`;
};

// Simple approach using standard browser PDF generation via iframe print (preserves vector quality and fonts perfectly)
export const downloadCertificateAsPdf = (certificate) => {
  const svg = buildCertificateSvg(certificate);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // We use the browser's native print-to-PDF which handles custom fonts and vector SVGs beautifully
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  
  iframe.onload = () => {
    try {
      iframe.contentWindow.print();
    } catch (e) {
      console.error('Error printing certificate', e);
    }
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    }, 2000);
  };
  
  // Create a minimal HTML document to wrap the SVG so it scales to fit the printed page exactly
  const htmlContent = \`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page { size: landscape; margin: 0; }
          body, html { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; background: #F8F9FA; }
          svg { width: 100%; height: 100%; object-fit: contain; }
        </style>
      </head>
      <body>\${svg}</body>
    </html>
  \`;
  
  iframe.srcdoc = htmlContent;
  document.body.appendChild(iframe);
};

// Rasterized jsPDF approach (Fallback if native print is not preferred)
export const downloadCertificateAsJspdf = async (certificate) => {
  const svgString = buildCertificateSvg(certificate);
  const width = 3300;
  const height = 2550;
  
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F8F9FA'; 
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);
    
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [width, height]
    });
    
    pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    pdf.save(buildCertificateFileName(certificate) + '.pdf');
  };
  img.src = url;
};

// We will use the jspdf approach as primary, but if fonts fail, they can rely on SVG download.
export const downloadCertificate = (certificate) => {
  downloadCertificateAsJspdf(certificate);
};
`;

fs.writeFileSync('frontend/src/utils/certificateUtils.js', code, 'utf8');
console.log('Successfully updated certificateUtils.js');
