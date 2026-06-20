import React, { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import JSZip from 'jszip';
import { RotateCcw, Monitor, Tablet, Smartphone, ExternalLink, Download, CloudRain, ChevronDown, Plus, FilePlus } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme.jsx';

// ─── File type icons ───────────────────────────────────────────────────────────
const HtmlIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.7 11.5l-.4-4h8l.4-3.5H4.9l.8 8.8h7.2l-.3 3-3.1.9-3.2-.9-.2-2H2.6l.4 5.3 8.5 2.4 8.5-2.4 1-11.5h-11.3z"/>
  </svg>
);
const CssIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.7 11.5l-.4-4h8l.4-3.5H4.9l.8 8.8h7.2l-.3 3-3.1.9-3.2-.9-.2-2H2.6l.4 5.3 8.5 2.4 8.5-2.4 1-11.5h-11.3z"/>
  </svg>
);
const JsIcon = () => (
  <div className="w-4 h-4 bg-[#F7DF1E] text-black flex items-center justify-center font-bold rounded-sm flex-shrink-0" style={{fontSize:'7px'}}>JS</div>
);
const GenericIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>
);

const getIcon = (type) => {
  if (type === 'html') return <HtmlIcon />;
  if (type === 'css')  return <CssIcon />;
  if (type === 'js')   return <JsIcon />;
  return <GenericIcon />;
};

// ─── Build the HTML document that goes into the iframe ─────────────────────────
function buildDoc(files) {
  const get = (name) => files.find(f => f.name === name)?.content ?? '';
  const getByType = (type) => files.find(f => f.type === type)?.content ?? '';

  // Start from index.html if it exists
  let html = get('index.html');

  if (!html) {
    // No index.html — build a minimal doc from whatever CSS/JS exists
    const css = getByType('css');
    const js  = getByType('js');
    html = [
      '<!DOCTYPE html>',
      '<html><head>',
      css ? `<style>${css}</style>` : '',
      '</head><body>',
      js  ? `<script>${js}<${'/'+'script>'}` : '',
      '</body></html>',
    ].join('\n');
  } else {
    // Inline every referenced stylesheet
    html = html.replace(
      /<link\s[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi,
      (_, href) => {
        const css = get(href);
        return css ? `<style>${css}</style>` : '';
      }
    );
    // Also handle reversed attribute order
    html = html.replace(
      /<link\s[^>]*href=["']([^"']+)["'][^>]*rel=["']stylesheet["'][^>]*\/?>/gi,
      (_, href) => {
        const css = get(href);
        return css ? `<style>${css}</style>` : '';
      }
    );
    // Inline every referenced script
    html = html.replace(
      /<script\s[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi,
      (_, src) => {
        const js = get(src);
        return js ? `<script>${js}<${'/'+'script>'}` : '';
      }
    );
  }

  // Inject a tiny console-relay script so we can show logs in the panel
  const relay = [
    '<script>',
    '(function(){',
    "  var orig={log:console.log,error:console.error,warn:console.warn};",
    "  ['log','error','warn'].forEach(function(m){",
    "    console[m]=function(){",
    "      var args=Array.prototype.slice.call(arguments).map(String);",
    "      window.parent.postMessage({type:'CONSOLE_MESSAGE',level:m==='log'?'info':m,args:args},'*');",
    "      orig[m].apply(console,arguments);",
    "    };",
    "  });",
    "  window.onerror=function(msg,url,line){",
    "    window.parent.postMessage({type:'CONSOLE_MESSAGE',level:'error',args:[msg+' (line '+line+')']}, '*');",
    "    return false;",
    "  };",
    '})();',
    '</' + 'script>',
  ].join('\n');

  if (html.includes('<head>')) {
    html = html.replace('<head>', '<head>\n' + relay);
  } else if (html.includes('<html>')) {
    html = html.replace('<html>', '<html>\n<head>' + relay + '</head>');
  } else {
    html = relay + '\n' + html;
  }

  return html;
}

// ─── Main component ────────────────────────────────────────────────────────────
const WebStudioTab = ({ activeFile, setActiveFile, files, setFiles, settings }) => {
  const { isDark } = useTheme();
  const [previewSize, setPreviewSize] = useState(settings?.preview?.previewDevice || 'desktop');
  const [logs, setLogs] = useState([]);
  // Build srcDoc synchronously so the iframe isn't blank on first render
  const [srcDoc, setSrcDoc] = useState(() => buildDoc(files));
  const iframeRef = useRef(null);
  const debounceRef = useRef(null);

  // Open tabs state
  const [openTabs, setOpenTabs] = useState(() => activeFile ? [activeFile] : []);
  const closedTabsRef = useRef(new Set());

  useEffect(() => {
    if (activeFile && !openTabs.includes(activeFile) && !closedTabsRef.current.has(activeFile)) {
      setOpenTabs(prev => [...prev, activeFile]);
    }
    if (activeFile) {
      closedTabsRef.current.delete(activeFile);
    }
  }, [activeFile, openTabs]);

  useEffect(() => {
    setOpenTabs(prev => prev.filter(tab => files.some(f => f.name === tab)));
  }, [files]);

  const closeTab = (name, e) => {
    e.stopPropagation();
    closedTabsRef.current.add(name);
    setOpenTabs(prev => {
      const next = prev.filter(n => n !== name);
      if (activeFile === name) {
        const remainingFiles = next.filter(n => {
          const f = files.find(file => file.name === n);
          return f && f.type !== 'folder';
        });
        setActiveFile(remainingFiles[remainingFiles.length - 1] || '');
      }
      return next;
    });
  };

  // Helper: read/write file content
  const getContent  = (name) => files.find(f => f.name === name)?.content ?? '';
  const setContent  = useCallback((name, val) =>
    setFiles(prev => prev.map(f => f.name === name ? { ...f, content: val } : f)),
    [setFiles]
  );

  // Rebuild preview when files change (debounced 700 ms)
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSrcDoc(buildDoc(files)), 700);
    return () => clearTimeout(debounceRef.current);
  }, [files]);

  // Console relay
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === 'CONSOLE_MESSAGE') {
        setLogs(prev => [...prev, { level: e.data.level, msg: e.data.args.join(' ') }]);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const refresh     = () => { setSrcDoc(buildDoc(files)); setLogs([]); };
  const openNewTab  = () => { const w = window.open(); w?.document.write(buildDoc(files)); w?.document.close(); };

  const download = async () => {
    const zip = new JSZip();
    files.forEach(f => {
      if (f.type === 'folder') {
        zip.folder(f.name);
      } else {
        zip.file(f.name, f.content);
      }
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'cs-studio-project.zip',
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const createFile = () => {
    const raw = prompt('New file name (e.g. about.html):');
    if (!raw?.trim()) return;
    const name = raw.trim();
    if (files.find(f => f.name === name)) { alert(`"${name}" already exists.`); return; }
    let type = 'html';
    if (name.endsWith('.css'))  type = 'css';
    if (name.endsWith('.js'))   type = 'js';
    if (name.endsWith('.json')) type = 'json';
    setFiles(prev => [...prev, { name, type, content: '' }]);
    setActiveFile(name);
  };

  const deleteFile = (name, e) => {
    e.stopPropagation();
    setFiles(prev => {
      const next = prev.filter(f => f.name !== name);
      if (activeFile === name) {
        // Switch to the rightmost file that is not a folder
        const remainingFiles = next.filter(f => f.type !== 'folder');
        setActiveFile(remainingFiles[remainingFiles.length - 1]?.name ?? '');
      }
      return next;
    });
  };

  const language = () => {
    if (activeFile.endsWith('.html')) return 'html';
    if (activeFile.endsWith('.css'))  return 'css';
    if (activeFile.endsWith('.js'))   return 'javascript';
    if (activeFile.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  const currentFile = files.find(f => f.name === activeFile && f.type !== 'folder');

  // Preview container sizing
  const previewClass = {
    desktop: 'w-full h-full',
    tablet:  'w-[768px] h-[900px] flex-shrink-0',
    mobile:  'w-[390px] h-[700px] flex-shrink-0',
  }[previewSize];

  return (
    <div className="flex-1 flex overflow-hidden min-h-0">

      {/* ── LEFT: Editor ── */}
      <div className="flex-1 flex flex-col min-w-0" style={{ borderRight: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', background: isDark ? '#0d1117' : '#ffffff' }}>

        {/* Tab bar */}
        <div className="flex items-center overflow-x-auto flex-shrink-0" style={{ minHeight: 40, background: isDark ? '#111827' : '#f8fafc', borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}>
          {openTabs.map(tabName => {
            const f = files.find(f => f.name === tabName);
            if (!f || f.type === 'folder') return null;
            return (
              <button
                key={f.name}
                onClick={() => setActiveFile(f.name)}
                className="group relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap transition-all border-b-2"
                style={activeFile === f.name
                  ? { background: isDark ? '#0d1117' : '#ffffff', color: isDark ? '#60a5fa' : '#2563eb', borderBottomColor: isDark ? '#3B82F6' : '#3B82F6' }
                  : { borderBottomColor: 'transparent', color: isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8' }
                }
              >
                {getIcon(f.type)}
                <span title={f.name}>{f.name.split('/').pop()}</span>
                <span
                  onClick={(e) => closeTab(f.name, e)}
                  className="ml-1.5 w-4 h-4 flex items-center justify-center text-xs rounded opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}
                  onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = isDark ? 'white' : 'black'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.5)' : '#94a3b8'; }}
                  title="Close tab"
                >×</span>
              </button>
            );
          })}
          <button
            onClick={createFile}
            className="px-2 py-2 transition-colors flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            title="New file"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Monaco */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {currentFile ? (
            <Editor
              height="100%"
              language={language()}
              theme={isDark ? 'vs-dark' : 'light'}
              value={getContent(activeFile)}
              onChange={(v) => setContent(activeFile, v ?? '')}
              options={{
                minimap: { enabled: settings?.editor?.minimap ?? true },
                fontSize: settings?.editor?.fontSize ?? 13,
                fontFamily: `'${settings?.editor?.fontFamily || 'JetBrains Mono'}','Fira Code','Cascadia Code',monospace`,
                fontLigatures: true,
                wordWrap: settings?.editor?.wordWrap ?? 'on',
                lineNumbers: settings?.editor?.lineNumbers ?? 'on',
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
                tabSize: settings?.editor?.tabSize ?? 2,
                renderLineHighlight: 'all',
                smoothScrolling: true,
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4 select-none" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)' }}>
              <svg className="w-20 h-20 mb-2 opacity-90 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h2 className="text-2xl font-semibold tracking-wider opacity-90">CS Studio</h2>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Preview + Console ── */}
      <div className="flex flex-col min-w-0 flex-shrink-0" style={{ width: '45vw', background: isDark ? '#0a0f1a' : '#f1f5f9' }}>

        {/* Preview toolbar */}
        <div className="flex items-center justify-between px-3 py-2 flex-shrink-0" style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #cbd5e1', background: isDark ? '#111827' : '#e2e8f0' }}>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.5)' }}>Live Preview</span>

          <div className="flex items-center gap-1.5">
            <button onClick={refresh} className="p-1.5 rounded-md transition-colors" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(15,23,42,0.5)' }} onMouseEnter={e=>e.currentTarget.style.color=isDark?'white':'#1e293b'} onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.4)':'rgba(15,23,42,0.5)'} title="Refresh">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="flex rounded-lg overflow-hidden" style={{ border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #cbd5e1' }}>
              {[['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]].map(([id, Icon]) => (
                <button
                  key={id}
                  onClick={() => setPreviewSize(id)}
                  title={id}
                  className="p-1.5 transition-colors"
                  style={previewSize === id
                    ? { background: isDark ? 'rgba(59,130,246,0.3)' : '#ffffff', color: isDark ? '#60a5fa' : '#2563eb' }
                    : { background: isDark ? 'rgba(255,255,255,0.04)' : 'transparent', color: isDark ? 'rgba(255,255,255,0.35)' : '#64748b' }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <button onClick={openNewTab} className="p-1.5 rounded-md transition-colors" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(15,23,42,0.5)' }} onMouseEnter={e=>e.currentTarget.style.color=isDark?'white':'#1e293b'} onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.4)':'rgba(15,23,42,0.5)'} title="Open in new tab">
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-4" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1' }} />

            <button onClick={download} className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#475569' }} onMouseEnter={e=>{e.currentTarget.style.background=isDark?'rgba(255,255,255,0.07)':'#e2e8f0';e.currentTarget.style.color=isDark?'white':'#1e293b'}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=isDark?'rgba(255,255,255,0.55)':'#475569'}}>
              <Download className="w-3.5 h-3.5" />
              Download
            </button>

            <button
              onClick={() => alert('🚀 Deployment coming soon!')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <CloudRain className="w-3.5 h-3.5" />
              Deploy
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Preview pane */}
        <div
          className="flex-1 min-h-0 overflow-auto flex items-start justify-center p-4"
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)'
              : 'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className={`bg-white shadow-2xl rounded overflow-hidden transition-all duration-300 ${previewClass}`}>
            <iframe
              ref={iframeRef}
              title="Live Preview"
              srcDoc={srcDoc}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-modals allow-forms"
            />
          </div>
        </div>

        {/* Console */}
        <div className="h-40 flex flex-col flex-shrink-0" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', background: isDark ? '#0d1117' : '#f8fafc' }}>
          <div className="flex items-center justify-between px-3 py-1.5 flex-shrink-0" style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0', background: isDark ? '#111827' : '#e2e8f0' }}>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.4)' }}>Console</span>
              {logs.length > 0 && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-500 text-white rounded-full">{logs.length}</span>
              )}
            </div>
            <button
              onClick={() => setLogs([])}
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors"
              style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)' }}
              onMouseEnter={e=>{e.currentTarget.style.color=isDark?'white':'#0f172a';e.currentTarget.style.background=isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.05)'}}
              onMouseLeave={e=>{e.currentTarget.style.color=isDark?'rgba(255,255,255,0.3)':'rgba(15,23,42,0.4)';e.currentTarget.style.background='transparent'}}
            >Clear</button>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1 font-mono text-[11px]" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#334155' }}>
            {logs.length === 0
              ? <span className="text-slate-400 dark:text-slate-600 text-[11px]">Console output will appear here…</span>
              : logs.map((log, i) => (
                  <div key={i} className={`flex items-start gap-2 ${log.level === 'error' ? 'text-red-500' : log.level === 'warn' ? 'text-amber-500' : 'text-emerald-500 dark:text-emerald-400'}`}>
                    <span className="opacity-40 flex-shrink-0">{log.level === 'error' ? '✖' : log.level === 'warn' ? '⚠' : '›'}</span>
                    <span className="whitespace-pre-wrap break-all">{log.msg}</span>
                  </div>
                ))
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default WebStudioTab;
