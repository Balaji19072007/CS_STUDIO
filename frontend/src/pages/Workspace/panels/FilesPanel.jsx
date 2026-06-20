import React, { useState, useEffect, useMemo } from 'react';
import { Plus, FolderPlus, Upload, Trash2, Copy, Edit3, Download, ChevronRight, ChevronDown } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme.jsx';

const HtmlIcon = () => <svg className="w-4 h-4 flex-shrink-0 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.7 11.5l-.4-4h8l.4-3.5H4.9l.8 8.8h7.2l-.3 3-3.1.9-3.2-.9-.2-2H2.6l.4 5.3 8.5 2.4 8.5-2.4 1-11.5h-11.3z"/></svg>;
const CssIcon  = () => <svg className="w-4 h-4 flex-shrink-0 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.7 11.5l-.4-4h8l.4-3.5H4.9l.8 8.8h7.2l-.3 3-3.1.9-3.2-.9-.2-2H2.6l.4 5.3 8.5 2.4 8.5-2.4 1-11.5h-11.3z"/></svg>;
const JsIcon   = () => <div className="w-4 h-4 bg-[#F7DF1E] text-black flex items-center justify-center font-bold rounded-sm flex-shrink-0" style={{fontSize:'7px'}}>JS</div>;
const MdIcon   = () => <div className="w-4 h-4 bg-blue-700 text-white flex items-center justify-center font-bold rounded-sm flex-shrink-0" style={{fontSize:'7px'}}>MD</div>;
const FolderIcon = () => <svg className="w-4 h-4 flex-shrink-0 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>;

const getFileIcon = (type) => {
  if (type === 'html') return <HtmlIcon />;
  if (type === 'css')  return <CssIcon />;
  if (type === 'js')   return <JsIcon />;
  if (type === 'md')   return <MdIcon />;
  if (type === 'folder') return <FolderIcon />;
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
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [selectedFolder, setSelectedFolder] = useState('');

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

  const toggleFolder = (folderPath, e) => {
    e.stopPropagation();
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderPath)) next.delete(folderPath);
      else next.add(folderPath);
      return next;
    });
  };

  const createFile = (parentFolder = selectedFolder) => {
    const name = prompt(`File name (e.g. about.html)${parentFolder ? ` in ${parentFolder}` : ''}:`)?.trim();
    if (!name) return;
    const fullPath = parentFolder ? `${parentFolder}/${name}` : name;
    if (files.find(f => f.name === fullPath)) { alert(`"${fullPath}" already exists.`); return; }
    let type = 'html';
    if (name.endsWith('.css'))  type = 'css';
    if (name.endsWith('.js'))   type = 'js';
    if (name.endsWith('.md'))   type = 'md';
    if (name.endsWith('.json')) type = 'json';
    const newFiles = [...files, { name: fullPath, type, content: '' }];
    setFiles(newFiles);
    setActiveFile(fullPath);
    if (parentFolder) {
      setExpandedFolders(prev => new Set(prev).add(parentFolder));
    }
  };

  const createFolder = (parentFolder = selectedFolder) => {
    const name = prompt(`Folder name${parentFolder ? ` in ${parentFolder}` : ''}:`)?.trim();
    if (!name) return;
    const fullPath = parentFolder ? `${parentFolder}/${name}` : name;
    if (files.find(f => f.name === fullPath)) { alert(`"${fullPath}" already exists.`); return; }
    const newFiles = [...files, { name: fullPath, type: 'folder', content: '' }];
    setFiles(newFiles);
    if (parentFolder) {
      setExpandedFolders(prev => new Set(prev).add(parentFolder));
    }
  };

  const renameFile = (file) => {
    closeCtx();
    const parts = file.name.split('/');
    const currentBase = parts.pop();
    const parentPath = parts.join('/');
    
    const newName = prompt('Rename to:', currentBase)?.trim();
    if (!newName || newName === currentBase) return;
    
    const newFullPath = parentPath ? `${parentPath}/${newName}` : newName;
    if (files.find(f => f.name === newFullPath)) { alert(`"${newFullPath}" already exists.`); return; }
    
    if (file.type === 'folder') {
      setFiles(prev => prev.map(f => {
        if (f.name === file.name) return { ...f, name: newFullPath };
        if (f.name.startsWith(file.name + '/')) {
          return { ...f, name: f.name.replace(file.name + '/', newFullPath + '/') };
        }
        return f;
      }));
      if (activeFile.startsWith(file.name + '/')) {
        setActiveFile(activeFile.replace(file.name + '/', newFullPath + '/'));
      }
      if (selectedFolder === file.name || selectedFolder.startsWith(file.name + '/')) {
        setSelectedFolder(selectedFolder.replace(file.name, newFullPath));
      }
    } else {
      setFiles(prev => prev.map(f => f.name === file.name ? { ...f, name: newFullPath } : f));
      if (activeFile === file.name) setActiveFile(newFullPath);
    }
  };

  const duplicateFile = (file) => {
    closeCtx();
    const parts = file.name.split('/');
    const currentBase = parts.pop();
    const parentPath = parts.join('/');
    
    const dot = currentBase.lastIndexOf('.');
    const base = dot > 0 ? currentBase.slice(0, dot) : currentBase;
    const ext  = dot > 0 ? currentBase.slice(dot) : '';
    
    let newBase = base + '-copy' + ext;
    let count = 2;
    let newFullPath = parentPath ? `${parentPath}/${newBase}` : newBase;
    
    while (files.find(f => f.name === newFullPath)) {
      newBase = base + '-copy' + count++ + ext;
      newFullPath = parentPath ? `${parentPath}/${newBase}` : newBase;
    }
    
    setFiles([...files, { ...file, name: newFullPath }]);
  };

  const deleteFile = (file) => {
    closeCtx();
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    
    let next;
    if (file.type === 'folder') {
      next = files.filter(f => f.name !== file.name && !f.name.startsWith(file.name + '/'));
      if (selectedFolder === file.name || selectedFolder.startsWith(file.name + '/')) {
        setSelectedFolder('');
      }
    } else {
      next = files.filter(f => f.name !== file.name);
    }
    
    setFiles(next);
    if (activeFile === file.name || (file.type === 'folder' && activeFile.startsWith(file.name + '/'))) {
      const remainingFiles = next.filter(f => f.type !== 'folder');
      setActiveFile(remainingFiles[remainingFiles.length - 1]?.name ?? '');
    }
  };

  const downloadFile = (file) => {
    closeCtx();
    const blob = new Blob([file.content || ''], { type: 'text/plain' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: file.name.split('/').pop() });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const iconBtn = {
    padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer',
    background: 'transparent', color: isDark ? 'rgba(255,255,255,0.3)' : '#64748b',
    transition: 'color 0.15s',
  };

  // Build tree from flat files
  const treeRoot = useMemo(() => {
    const root = { name: '', path: '', type: 'folder', children: [], depth: -1 };
    const nodeMap = { '': root };

    const sortedFiles = [...files].sort((a, b) => a.name.localeCompare(b.name));

    sortedFiles.forEach(f => {
      const parts = f.name.split('/');
      const basename = parts.pop();
      let currentPath = '';
      let current = root;

      parts.forEach(part => {
        const parentPath = currentPath;
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        if (!nodeMap[currentPath]) {
          const newNode = { name: part, path: currentPath, type: 'folder', children: [], depth: current.depth + 1 };
          nodeMap[currentPath] = newNode;
          current.children.push(newNode);
        }
        current = nodeMap[currentPath];
      });

      if (f.type === 'folder') {
        const folderPath = f.name;
        if (!nodeMap[folderPath]) {
          const newNode = { ...f, name: basename, path: folderPath, children: [], depth: current.depth + 1 };
          nodeMap[folderPath] = newNode;
          current.children.push(newNode);
        } else {
          Object.assign(nodeMap[folderPath], { ...f, name: basename });
        }
      } else {
        current.children.push({ ...f, name: basename, path: f.name, depth: current.depth + 1 });
      }
    });

    const sortChildren = (node) => {
      if (!node.children) return;
      node.children.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name);
      });
      node.children.forEach(sortChildren);
    };
    sortChildren(root);

    return root;
  }, [files]);

  const renderTree = (nodes) => {
    return nodes.map(node => {
      const isExpanded = expandedFolders.has(node.path);
      const isSelected = selectedFolder === node.path;
      const isActive = activeFile === node.path;
      
      return (
        <div key={node.path}>
          <button
            onClick={(e) => {
              if (node.type === 'folder') {
                setSelectedFolder(node.path);
                toggleFolder(node.path, e);
              } else {
                setActiveFile(node.path);
              }
            }}
            onContextMenu={(e) => openCtx(e, node)}
            className="group w-full flex items-center gap-1.5 py-1.5 text-left text-xs transition-all"
            style={{
              paddingLeft: `${(node.depth + 1) * 12 + 8}px`,
              paddingRight: '12px',
              background: isActive 
                ? (isDark ? 'rgba(59,130,246,0.18)' : 'rgba(59,130,246,0.1)') 
                : isSelected && node.type === 'folder'
                  ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')
                  : 'transparent',
              color: isActive 
                ? (isDark ? '#60a5fa' : '#2563eb') 
                : (isDark ? 'rgba(255,255,255,0.55)' : '#475569')
            }}
            onMouseEnter={e => { if (!isActive && !(isSelected && node.type === 'folder')) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { if (!isActive && !(isSelected && node.type === 'folder')) e.currentTarget.style.background = 'transparent'; }}
          >
            {node.type === 'folder' && (
              <span className="opacity-50" onClick={(e) => toggleFolder(node.path, e)}>
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </span>
            )}
            {node.type !== 'folder' && <span className="w-3 h-3" />}
            {getFileIcon(node.type)}
            <span className="flex-1 truncate">{node.name}</span>
            <span
              onClick={(e) => { e.stopPropagation(); openCtx(e, node); }}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded"
              style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#64748b', fontSize: '14px', lineHeight: 1 }}
            >⋯</span>
          </button>
          {node.type === 'folder' && isExpanded && (
            <div>{renderTree(node.children)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full" onClick={() => setSelectedFolder('')}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 flex-shrink-0"
        style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}
        onClick={e => e.stopPropagation()}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest flex-1" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.4)' }}>
          Files
        </span>
        <button style={iconBtn} title="New File" onClick={() => createFile(selectedFolder)}
          onMouseEnter={e=>e.currentTarget.style.color=isDark?'#60a5fa':'#3b82f6'}
          onMouseLeave={e=>e.currentTarget.style.color=isDark?'rgba(255,255,255,0.3)':'#64748b'}
        ><Plus className="w-3.5 h-3.5" /></button>
        <button style={iconBtn} title="New Folder" onClick={() => createFolder(selectedFolder)}
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
            <button onClick={() => createFile('')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{ background: isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)', color: isDark ? '#60a5fa' : '#3b82f6', border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(59,130,246,0.2)' }}
            >+ Create first file</button>
          </div>
        ) : (
          renderTree(treeRoot.children)
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-[9999]"
          style={{ ...CTX_STYLE(isDark), top: contextMenu.y, left: contextMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          {contextMenu.file.type === 'folder' && (
            <>
              <button
                onClick={() => { closeCtx(); createFile(contextMenu.file.path); }}
                style={CTX_BTN(isDark)}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              ><Plus className="w-3.5 h-3.5" /> New File</button>
              <button
                onClick={() => { closeCtx(); createFolder(contextMenu.file.path); }}
                style={CTX_BTN(isDark)}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              ><FolderPlus className="w-3.5 h-3.5" /> New Folder</button>
              <div style={{ height: 1, background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0', margin: '4px 0' }} />
            </>
          )}
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
