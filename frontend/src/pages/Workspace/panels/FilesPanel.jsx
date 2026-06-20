import React, { useState, useEffect, useRef } from 'react';
import { Plus, FolderPlus, Upload, Trash2, Copy, Edit3, Download, ChevronDown } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme.jsx';

const HtmlIcon = () => <svg className="w-4 h-4 flex-shrink-0 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.7 11.5l-.4-4h8l.4-3.5H4.9l.8 8.8h7.2l-.3 3-3.1.9-3.2-.9-.2-2H2.6l.4 5.3 8.5 2.4 8.5-2.4 1-11.5h-11.3z"/></svg>;
const CssIcon  = () => <svg className="w-4 h-4 flex-shrink-0 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.7 11.5l-.4-4h8l.4-3.5H4.9l.8 8.8h7.2l-.3 3-3.1.9-3.2-.9-.2-2H2.6l.4 5.3 8.5 2.4 8.5-2.4 1-11.5h-11.3z"/></svg>;
const JsIcon   = () => <div className="w-4 h-4 bg-[#F7DF1E] text-black flex items-center justify-center font-bold rounded-sm flex-shrink-0" style={{fontSize:'7px'}}>JS</div>;
const MdIcon   = () => <div className="w-4 h-4 bg-blue-700 text-white flex items-center justify-center font-bold rounded-sm flex-shrink-0" style={{fontSize:'7px'}}>MD</div>;

const getFileIcon = (type) => {
  if (type === 'html') return <HtmlIcon />;
  if (type === 'css')  return <CssIcon />;
  if (type === 'js')   return <JsIcon />;
  if (type === 'md')   return <MdIcon />;
  return <div className="w-4 h-4 bg-slate-600 text-white flex items-center justify-center font-bold rounded-sm flex-shrink-0" style={{fontSize:'6px'}}>F</div>;
};

const CTX_STYLE = (isDark) => ({
  background: isDark ? '#1e2d3d' : '#ffffff',
  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
  borderRadius: '8px',
  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  minWidth: '160px',
  padding: '4px',
});

const CTX_BTN = (isDark) => ({
  display: 'flex', alignItems: 'center', gap: '8px',
  width: '100%', padding: '7px 12px', borderRadius: '5px',
  fontSize: '12px', fontWeight: 500, cursor: 'pointer', border: 'none',
  background: 'transparent', color: isDark ? 'rgba(255,255,255,0.7)' : '#475569',
  transition: 'background 0.15s',
});

const FilesPanel = ({ files, setFiles, activeFile, setActiveFile }) => {
  const { isDark } = useTheme();
  const [contextMenu, setContextMenu] = useState(null); // { x, y, file }

  const closeCtx = () => setContextMenu(null);

  useEffect(() => {
    if (!contextMenu) return;
    const handler = () => closeCtx();
    window.addEventListener('click', handler);
    window.addEventListener('keydown', (e) => e.key === 'Escape' && closeCtx());
    return () => {
      window.removeEventListener('click', handler);
    };
  }, [contextMenu]);

  const openCtx = (e, file) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const createFile = () => {
    const name = prompt('File name (e.g. about.html):')?.trim();
    if (!name) return;
    if (files.find(f => f.name === name)) { alert(`"${name}" already exists.`); return; }
    let type = 'html';
    if (name.endsWith('.css'))  type = 'css';
    if (name.endsWith('.js'))   type = 'js';
    if (name.endsWith('.md'))   type = 'md';
    if (name.endsWith('.json')) type = 'json';
    const newFiles = [...files, { name, type, content: '' }];
    setFiles(newFiles);
    setActiveFile(name);
  };

  const renameFile = (file) => {
    closeCtx();
    const newName = prompt('Rename to:', file.name)?.trim();
    if (!newName || newName === file.name) return;
    if (files.find(f => f.name === newName)) { alert(`"${newName}" already exists.`); return; }
    setFiles(prev => prev.map(f => f.name === file.name ? { ...f, name: newName } : f));
    if (activeFile === file.name) setActiveFile(newName);
  };

  const duplicateFile = (file) => {
    closeCtx();
    const dot = file.name.lastIndexOf('.');
    const base = dot > 0 ? file.name.slice(0, dot) : file.name;
    const ext  = dot > 0 ? file.name.slice(dot) : '';
    let newName = base + '-copy' + ext;
    let count = 2;
    while (files.find(f => f.name === newName)) newName = base + '-copy' + count++ + ext;
    setFiles([...files, { ...file, name: newName }]);
  };

  const deleteFile = (file) => {
    closeCtx();
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    const next = files.filter(f => f.name !== file.name);
    setFiles(next);
    if (activeFile === file.name) setActiveFile(next[0]?.name ?? '');
  };

  const downloadFile = (file) => {
    closeCtx();
    const blob = new Blob([file.content || ''], { type: 'text/plain' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: file.name });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const iconBtn = {
    padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer',
    background: 'transparent', color: isDark ? 'rgba(255,255,255,0.3)' : '#64748b',
    transition: 'color 0.15s',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 flex-shrink-0"
        style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest flex-1" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.4)' }}>
          Files
        </span>
        <button style={iconBtn} title="New File" onClick={createFile}
          onMouseEnter={e=>e.currentTarget.style.color=isDark?'#60a5fa':'#3b82f6'}
          onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.3)':'#64748b'}
        ><Plus className="w-3.5 h-3.5" /></button>
        <button style={iconBtn} title="New Folder (coming soon)"
          onMouseEnter={e=>e.currentTarget.style.color=isDark?'#60a5fa':'#3b82f6'}
          onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.3)':'#64748b'}
        ><FolderPlus className="w-3.5 h-3.5" /></button>
        <button style={iconBtn} title="Upload file (coming soon)"
          onMouseEnter={e=>e.currentTarget.style.color=isDark?'#60a5fa':'#3b82f6'}
          onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.3)':'#64748b'}
        ><Upload className="w-3.5 h-3.5" /></button>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto py-1">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-3 px-4 text-center">
            <p className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)' }}>No files yet</p>
            <button onClick={createFile}
              className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)', color: isDark ? '#60a5fa' : '#3b82f6', border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(59,130,246,0.2)' }}
            >+ Create first file</button>
          </div>
        ) : (
          files.map(file => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file.name)}
              onContextMenu={(e) => openCtx(e, file)}
              className="group w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-all"
              style={activeFile === file.name
                ? { background: isDark ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.1)', color: isDark ? '#60a5fa' : '#2563eb' }
                : { color: isDark ? 'rgba(255,255,255,0.55)' : '#475569' }
              }
              onMouseEnter={e => { if (activeFile !== file.name) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={e => { if (activeFile !== file.name) e.currentTarget.style.background = 'transparent'; }}
            >
              {getFileIcon(file.type)}
              <span className="flex-1 truncate">{file.name}</span>
              <span
                onClick={(e) => { e.stopPropagation(); openCtx(e, file); }}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded"
                style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#64748b', fontSize: '14px', lineHeight: 1 }}
              >⋯</span>
            </button>
          ))
        )}
        {files.length > 0 && (
          <button onClick={createFile}
            className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs"
            style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.3)' }}
            onMouseEnter={e=>e.currentTarget.style.color=isDark?'#60a5fa':'#3b82f6'}
            onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.2)':'rgba(15,23,42,0.3)'}
          ><Plus className="w-3 h-3" />New file</button>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[9999]"
          style={{ ...CTX_STYLE(isDark), top: contextMenu.y, left: contextMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          {[
            { label: 'Rename', icon: Edit3, action: () => renameFile(contextMenu.file) },
            { label: 'Duplicate', icon: Copy, action: () => duplicateFile(contextMenu.file) },
            { label: 'Download', icon: Download, action: () => downloadFile(contextMenu.file) },
            { label: 'Delete', icon: Trash2, action: () => deleteFile(contextMenu.file), danger: true },
          ].map(({ label, icon: Icon, action, danger }) => (
            <button
              key={label}
              onClick={action}
              style={{
                ...CTX_BTN(isDark),
                color: danger ? '#f87171' : (isDark ? 'rgba(255,255,255,0.7)' : '#334155'),
              }}
              onMouseEnter={e => e.currentTarget.style.background = danger ? 'rgba(248,113,113,0.1)' : (isDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9')}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesPanel;
