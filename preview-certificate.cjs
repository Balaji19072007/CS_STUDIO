const fs = require('fs');
const path = require('path');

const learner = 'Balaji Reddy';
const course = 'Introduction to C Programming';
const issuedOn = '2026/06/19';
const certId = 'CST-20260619-BALAJI01';

// ── Distressed stamp generator ──
function getStampBumps(cx, cy, R, r, N, color) {
  let s = '';
  for (let i = 0; i < N; i++) {
    const a = (i / N) * 2 * Math.PI;
    const x = (cx + R * Math.cos(a)).toFixed(1);
    const y = (cy + R * Math.sin(a)).toFixed(1);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" filter="url(#distress)"/>`;
  }
  return s;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="3300" height="2550" viewBox="0 0 3300 2550"
     style="background-color: #F8F9FA;">
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
    
    <!-- Distressed ink filter for the blue stamp -->
    <filter id="distress" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -1.8" in="noise" result="coloredNoise" />
      <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" result="comp" />
    </filter>

    <!-- Stamp Text Paths -->
    <path id="stampTop" d="M1410,1950 a210,210 0 0,1 420,0"/>
    <path id="stampBot" d="M1425,1950 a195,195 0 0,0 390,0"/>

    <symbol id="trophy" viewBox="0 0 100 100">
      <path d="M20,20 L80,20 L75,50 C70,70 55,80 50,80 C45,80 30,70 25,50 Z" fill="none" stroke="#110CA6" stroke-width="6"/>
      <line x1="50" y1="80" x2="50" y2="95" stroke="#110CA6" stroke-width="8"/>
      <line x1="30" y1="95" x2="70" y2="95" stroke="#110CA6" stroke-width="8"/>
      <path d="M20,20 C10,20 10,40 25,40" fill="none" stroke="#110CA6" stroke-width="5"/>
      <path d="M80,20 C90,20 90,40 75,40" fill="none" stroke="#110CA6" stroke-width="5"/>
    </symbol>
  </defs>

  <!-- Base Border -->
  <rect x="250" y="250" width="2800" height="2050" fill="none" stroke="#333333" stroke-width="4"/>

  <!-- Waves (Right Side) -->
  <path d="M 1200,2550 Q 1500,2300 1800,2550 Z" fill="#E2E5E9" />
  
  <!-- Shifted Gold wave -->
  <path d="M 2400,0 Q 2800,1200 1600,2550 L 3300,2550 L 3300,0 Z" fill="#F4C05A" />
  
  <!-- Shifted Dark Blue wave -->
  <path d="M 2650,0 Q 3050,1200 1850,2550 L 3300,2550 L 3300,0 Z" fill="#0A2240" />

  <!-- ── CONTENT ── -->
  <g transform="translate(350, 600)">
    <text class="title" x="0" y="0">CERTIFICATE</text>
    <text class="subtitle" x="15" y="140">OF ACHIEVEMENT</text>
  </g>

  <!-- Name -->
  <g transform="translate(350, 1150)">
    <text class="name" x="0" y="0">${learner}</text>
  </g>

  <!-- Description -->
  <g transform="translate(350, 1300)">
    <text class="desc" x="0" y="0">This certificate is proudly presented to acknowledge the successful</text>
    <text class="desc" x="0" y="70">completion of the course <tspan font-weight="bold" fill="#333333">${course}</tspan>.</text>
    <text class="desc" x="0" y="140">Your dedication and hard work have yielded excellent results.</text>
  </g>

  <!-- ── FOOTER ROW ── -->
  <!-- DATE -->
  <g transform="translate(350, 1900)">
    <text class="label" x="0" y="0">DATE</text>
    <text class="value" x="0" y="90">${issuedOn}</text>
  </g>

  <!-- CERT ID -->
  <g transform="translate(750, 1900)">
    <text class="label" x="0" y="0">ID</text>
    <text class="value" x="0" y="90">${certId}</text>
  </g>

  <!-- SIGNATURE -->
  <g transform="translate(1300, 1900)">
    <text class="label" x="0" y="0">SIGNATURE</text>
    <g transform="translate(0, -30) scale(0.65)" opacity="0.95">
      <!-- Traced signature -->
      <path d="M 30,120 C 15,50 80,10 130,50 C 180,90 160,180 100,160 C 40,140 60,70 120,40 C 180,10 260,50 280,90 C 300,130 280,150 240,130" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
      <path d="M 240,130 C 200,110 230,70 270,60 C 310,50 360,70 380,110 C 400,150 360,170 320,140 C 280,110 310,80 360,70 C 410,60 460,80 480,110" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
      <path d="M 480,110 C 500,140 490,170 460,170 C 430,170 450,130 480,100 C 510,70 560,60 580,90 C 600,120 530,150 380,190 L 730,130" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>

  <!-- ── BLUE DISTRESSED STAMP ── (On the white/gold wave boundary) -->
  <g transform="translate(1950, 1950)" opacity="0.95">
    <!-- Outer scalloped edge -->
    ${getStampBumps(0, 0, 220, 12, 45, '#110CA6')}
    
    <!-- Outer ring -->
    <circle cx="0" cy="0" r="195" fill="none" stroke="#110CA6" stroke-width="8" filter="url(#distress)"/>
    <circle cx="0" cy="0" r="175" fill="none" stroke="#110CA6" stroke-width="3" filter="url(#distress)"/>
    
    <!-- Top arc text -->
    <text class="stamp-text" font-size="30" letter-spacing="10" filter="url(#distress)">
      <textPath xlink:href="#stampTop" startOffset="50%" text-anchor="middle">CS STUDIO</textPath>
    </text>

    <!-- Bottom arc text -->
    <text class="stamp-text" font-size="26" letter-spacing="8" filter="url(#distress)">
      <textPath xlink:href="#stampBot" startOffset="50%" text-anchor="middle">OFFICIAL SEAL</textPath>
    </text>

    <!-- Center Box / Lines -->
    <line x1="-160" y1="-45" x2="160" y2="-45" stroke="#110CA6" stroke-width="5" filter="url(#distress)"/>
    <line x1="-160" y1="55" x2="160" y2="55" stroke="#110CA6" stroke-width="5" filter="url(#distress)"/>
    
    <!-- CERTIFIED block text -->
    <text class="stamp-text" font-size="70" x="0" y="30" text-anchor="middle" letter-spacing="3" filter="url(#distress)">CERTIFIED</text>
    
    <!-- Small icons -->
    <use xlink:href="#trophy" x="-30" y="-125" width="60" height="60" filter="url(#distress)"/>
    <use xlink:href="#trophy" x="-30" y="-125" width="60" height="60" filter="url(#distress)" transform="rotate(180)"/>
    
    <!-- Decorative stars -->
    <path d="M-150,0 L-130,0 M-140,-10 L-140,10" stroke="#110CA6" stroke-width="3" filter="url(#distress)"/>
    <path d="M130,0 L150,0 M140,-10 L140,10" stroke="#110CA6" stroke-width="3" filter="url(#distress)"/>
  </g>

</svg>`;

const outPath = path.join(__dirname, 'frontend', 'public', 'cert-sample.svg');
fs.writeFileSync(outPath, svg, 'utf8');
console.log('Done!');
