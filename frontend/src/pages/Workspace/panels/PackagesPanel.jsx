import React, { useState, useMemo } from 'react';
import { Search, X, Check, Package } from 'lucide-react';

// ─── Package registry ─────────────────────────────────────────────────────────
const PACKAGES = [
  // CSS Frameworks
  { id: 'bootstrap',  name: 'Bootstrap',     version: '5.3.2', cat: 'CSS Frameworks', desc: 'Popular responsive CSS framework.',     tags: ['css','responsive','grid'],  cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', extra: 'rel="stylesheet"' }, { tag: 'script', attr: 'src', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js' }] },
  { id: 'tailwind',   name: 'Tailwind CSS',  version: '3.x',   cat: 'CSS Frameworks', desc: 'Utility-first CSS framework.',          tags: ['css','utility'],            cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://cdn.tailwindcss.com' }] },
  { id: 'bulma',      name: 'Bulma',         version: '0.9.4', cat: 'CSS Frameworks', desc: 'Modern CSS framework based on Flexbox.',tags: ['css','flexbox'],            cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css', extra: 'rel="stylesheet"' }] },
  // Icons
  { id: 'fontawesome',name: 'Font Awesome',  version: '6.5.0', cat: 'Icons',          desc: 'Icon library with 2000+ icons.',       tags: ['icons','svg'],              cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', extra: 'rel="stylesheet"' }] },
  { id: 'lucide',     name: 'Lucide Icons',  version: '0.3.x', cat: 'Icons',          desc: 'Clean and consistent icon set.',       tags: ['icons'],                    cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://unpkg.com/lucide@latest' }] },
  // Animations
  { id: 'animatecss', name: 'Animate.css',   version: '4.1.1', cat: 'Animations',     desc: 'Ready-to-use CSS animations.',         tags: ['animation','css'],          cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', extra: 'rel="stylesheet"' }] },
  { id: 'aos',        name: 'AOS',           version: '2.3.4', cat: 'Animations',     desc: 'Animate On Scroll library.',           tags: ['animation','scroll'],       cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://unpkg.com/aos@2.3.4/dist/aos.css', extra: 'rel="stylesheet"' }, { tag: 'script', attr: 'src', url: 'https://unpkg.com/aos@2.3.4/dist/aos.js' }] },
  { id: 'gsap',       name: 'GSAP',          version: '3.12',  cat: 'Animations',     desc: 'Professional animation library.',      tags: ['animation','js'],           cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js' }] },
  // JS Libraries
  { id: 'chartjs',    name: 'Chart.js',      version: '4.4.0', cat: 'JavaScript',     desc: 'Simple, flexible charts.',            tags: ['charts','graphs','js'],     cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://cdn.jsdelivr.net/npm/chart.js' }] },
  { id: 'threejs',    name: 'Three.js',      version: 'r158',  cat: 'JavaScript',     desc: '3D graphics library for the web.',     tags: ['3d','webgl','js'],          cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' }] },
  { id: 'jquery',     name: 'jQuery',        version: '3.7.1', cat: 'JavaScript',     desc: 'Fast, small, feature-rich JS library.',tags: ['js','dom'],                 cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://code.jquery.com/jquery-3.7.1.min.js' }] },
  { id: 'alpinejs',   name: 'Alpine.js',     version: '3.x',   cat: 'JavaScript',     desc: 'Lightweight JS framework.',            tags: ['js','framework'],           cdnLinks: [{ tag: 'script', attr: 'src', url: 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js', extra: 'defer' }] },
  { id: 'swiper',     name: 'Swiper',        version: '11.x',  cat: 'JavaScript',     desc: 'Mobile-touch slider component.',       tags: ['slider','js'],              cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', extra: 'rel="stylesheet"' }, { tag: 'script', attr: 'src', url: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js' }] },
  // Fonts
  { id: 'inter',      name: 'Inter Font',    version: 'latest',cat: 'Fonts',          desc: 'Modern sans-serif font by Rasmus.',   tags: ['font'],                     cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', extra: 'rel="stylesheet"' }] },
  { id: 'poppins',    name: 'Poppins Font',  version: 'latest',cat: 'Fonts',          desc: 'Geometric sans-serif typeface.',      tags: ['font'],                     cdnLinks: [{ tag: 'link', attr: 'href', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', extra: 'rel="stylesheet"' }] },
];

const CATS = ['All', ...new Set(PACKAGES.map(p => p.cat))];
const CAT_EMOJI = { 'CSS Frameworks': '🎨', 'Icons': '✨', 'Animations': '🎬', 'JavaScript': '⚡', 'Fonts': '🔤' };

// ─── Inject CDN into index.html ───────────────────────────────────────────────
function injectCDN(html, pkg) {
  let content = html;
  pkg.cdnLinks.forEach(link => {
    // Check if already injected
    if (content.includes(link.url)) return;
    const tag = link.tag === 'link'
      ? `  <link ${link.extra || ''} ${link.attr}="${link.url}" />`
      : `  <script ${link.extra || ''} ${link.attr}="${link.url}"></${'script'}>`;
    // Inject before </head>
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${tag}\n</head>`);
    } else {
      content += '\n' + tag;
    }
  });
  return content;
}

function removeCDN(html, pkg) {
  let content = html;
  pkg.cdnLinks.forEach(link => {
    const escaped = link.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(`[\\t ]*<[^>]+${escaped}[^>]*>(</${'script'}>)?\\n?`, 'g'), '');
  });
  return content;
}

// ─────────────────────────────────────────────────────────────────────────────
const PackagesPanel = ({ files, setFiles }) => {
  const [search, setSearch]       = useState('');
  const [cat, setCat]             = useState('All');
  const [installed, setInstalled] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cs_studio_pkgs') || '[]'); } catch { return []; }
  });

  const saveInstalled = (arr) => {
    setInstalled(arr);
    localStorage.setItem('cs_studio_pkgs', JSON.stringify(arr));
  };

  const isInstalled = (id) => installed.includes(id);

  const getHtmlFile = () => files.find(f => f.name === 'index.html');

  const install = (pkg) => {
    const htmlFile = getHtmlFile();
    if (htmlFile) {
      const newContent = injectCDN(htmlFile.content, pkg);
      setFiles(prev => prev.map(f => f.name === 'index.html' ? { ...f, content: newContent } : f));
    }
    saveInstalled([...installed, pkg.id]);
  };

  const uninstall = (pkg) => {
    const htmlFile = getHtmlFile();
    if (htmlFile) {
      const newContent = removeCDN(htmlFile.content, pkg);
      setFiles(prev => prev.map(f => f.name === 'index.html' ? { ...f, content: newContent } : f));
    }
    saveInstalled(installed.filter(id => id !== pkg.id));
  };

  const filtered = useMemo(() =>
    PACKAGES.filter(p =>
      (cat === 'All' || p.cat === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    ), [search, cat]);

  const installedPkgs = PACKAGES.filter(p => installed.includes(p.id));

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pt-2 pb-2 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search packages…"
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: '#e2e8f0' }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="px-3 py-2 flex gap-1 overflow-x-auto flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {CATS.map(c => (
          <button key={c}
            onClick={() => setCat(c)}
            className="text-[10px] font-semibold whitespace-nowrap px-2 py-1 rounded-full border transition-all"
            style={cat === c
              ? { background: '#3b82f6', color: '#fff', borderColor: '#3b82f6' }
              : { background: 'transparent', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.1)' }
            }
          >{c === 'All' ? 'All' : (CAT_EMOJI[c] || '') + ' ' + c.split(' ')[0]}</button>
        ))}
      </div>

      {/* Installed banner */}
      {installedPkgs.length > 0 && cat === 'All' && !search && (
        <div className="px-3 py-2 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Installed ({installedPkgs.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {installedPkgs.map(p => (
              <span key={p.id} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                <Check className="w-2.5 h-2.5" />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Package list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filtered.map(pkg => {
          const inst = isInstalled(pkg.id);
          return (
            <div key={pkg.id}
              className="rounded-xl p-3"
              style={{
                background: inst ? 'rgba(74,222,128,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${inst ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-semibold text-white">{pkg.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                      v{pkg.version}
                    </span>
                  </div>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{pkg.desc}</p>
                </div>
                <button
                  onClick={() => inst ? uninstall(pkg) : install(pkg)}
                  className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
                  style={inst
                    ? { background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }
                    : { background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }
                  }
                >
                  {inst ? <><X className="w-3 h-3" />Remove</> : <>+ Install</>}
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {pkg.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackagesPanel;
