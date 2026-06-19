import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WorkspaceHeader from './components/WorkspaceHeader.jsx';
import Sidebar         from './components/Sidebar.jsx';
import StatusBar       from './components/StatusBar.jsx';
import CodeEditorTab   from './tabs/CodeEditorTab.jsx';
import WebStudioTab    from './tabs/WebStudioTab.jsx';
import AIStudioTab     from './tabs/AIStudioTab.jsx';
import { loadSettings, DEFAULT_SETTINGS, saveSettings } from './panels/SettingsPanel.jsx';

// ─── Starter project files ────────────────────────────────────────────────────
const STARTER_FILES = [
  {
    name: 'index.html', type: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CS Studio</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="header">
    <div class="container">
      <h1>Welcome to CS Studio</h1>
      <p>Build. Code. Preview.</p>
      <button class="btn">Get Started</button>
    </div>
  </header>
  <section class="features">
    <div class="container">
      <div class="feature"><h3>⚡ Fast Development</h3><p>Write code and see changes instantly.</p></div>
      <div class="feature"><h3>🎨 Modern Tools</h3><p>Powerful editor with smart features.</p></div>
      <div class="feature"><h3>☁️ Easy Deployment</h3><p>Deploy your projects with one click.</p></div>
    </div>
  </section>
  <script src="script.js"></script>
</body>
</html>`,
  },
  {
    name: 'style.css', type: 'css',
    content: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: #F8F9FA; color: #333; line-height: 1.6; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
.header { background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%); color: white; padding: 80px 0; text-align: center; }
.header h1 { font-size: 3rem; margin-bottom: 10px; }
.header p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
.btn { background: white; color: #4F46E5; border: none; padding: 12px 24px; font-size: 1rem; font-weight: bold; border-radius: 8px; cursor: pointer; transition: transform 0.2s; }
.btn:hover { transform: translateY(-2px); }
.features { padding: 60px 0; }
.features .container { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: center; }
.feature { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.feature h3 { margin-bottom: 10px; color: #1F2937; }
.feature p { color: #6B7280; font-size: 0.95rem; }`,
  },
  {
    name: 'script.js', type: 'js',
    content: `document.querySelector('.btn').addEventListener('click', () => {
  console.log('Button clicked!');
  alert('Welcome to CS Studio!');
});
console.log('Project ready');`,
  },
];

// ─── Project persistence ──────────────────────────────────────────────────────
const PROJECTS_KEY = 'cs_studio_projects';

function loadProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  const initial = [{
    id: 'default',
    name: 'Personal Portfolio',
    files: JSON.parse(JSON.stringify(STARTER_FILES)),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }];
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(initial));
  return initial;
}

function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

// ─────────────────────────────────────────────────────────────────────────────
const Workspace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || localStorage.getItem('cs_studio_workspace_tab') || 'web');
  const [projects, setProjects]   = useState(loadProjects);
  const [activeProjectId, setActiveProjectId] = useState(() => {
    const saved = localStorage.getItem('cs_studio_active_project');
    const all = loadProjects();
    return all.find(p => p.id === saved) ? saved : all[0]?.id ?? 'default';
  });
  const [activeFile, setActiveFile]   = useState('');
  const [showProjects, setShowProjects] = useState(false);
  const [settings, setSettings]       = useState(loadSettings);

  // Derived
  const activeProject = projects.find(p => p.id === activeProjectId) ?? projects[0];
  const files = activeProject?.files ?? [];

  // Init active file
  useEffect(() => {
    if (!activeFile && files.length > 0) setActiveFile(files[0].name);
  }, [activeProjectId, files]);

  // Persist
  useEffect(() => { setSearchParams({ tab: activeTab }, { replace: true }); localStorage.setItem('cs_studio_workspace_tab', activeTab); }, [activeTab]);
  useEffect(() => { localStorage.setItem('cs_studio_active_project', activeProjectId); }, [activeProjectId]);
  useEffect(() => { saveProjects(projects); }, [projects]);

  // Fullscreen
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const nav = document.querySelector('nav');
    if (nav) nav.style.display = 'none';
    return () => { document.body.style.overflow = ''; if (nav) nav.style.display = ''; };
  }, []);

  // ── File state helper ─────────────────────────────────────────────────────
  const setFiles = (updater) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== activeProjectId) return p;
      const newFiles = typeof updater === 'function' ? updater(p.files) : updater;
      return { ...p, files: newFiles, updatedAt: Date.now() };
    }));
  };

  // ── New project ───────────────────────────────────────────────────────────
  const handleNewProject = () => {
    const name = prompt('Project name:', settings.workspace.defaultProjectName || 'New Project');
    if (!name?.trim()) return;
    const id = 'proj_' + Date.now();
    const newProject = { id, name: name.trim(), files: [], createdAt: Date.now(), updatedAt: Date.now() };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(id);
    setActiveFile('');
    setShowProjects(false);
  };

  // ── Use template ──────────────────────────────────────────────────────────
  const handleUseTemplate = (templateFiles, templateName) => {
    const name = prompt('Project name for this template:', templateName);
    if (!name?.trim()) return;
    const id = 'proj_' + Date.now();
    const fileArr = Object.entries(templateFiles).map(([fname, content]) => {
      let type = 'html';
      if (fname.endsWith('.css')) type = 'css';
      if (fname.endsWith('.js'))  type = 'js';
      if (fname.endsWith('.md'))  type = 'md';
      return { name: fname, type, content };
    });
    const newProject = { id, name: name.trim(), files: fileArr, createdAt: Date.now(), updatedAt: Date.now() };
    setProjects(prev => [...prev, newProject]);
    setActiveProjectId(id);
    setActiveFile(fileArr[0]?.name ?? '');
  };

  // ── Project switcher ──────────────────────────────────────────────────────
  const handleOpenProject = (id) => {
    const p = projects.find(proj => proj.id === id);
    if (!p) return;
    setActiveProjectId(id);
    setActiveFile(p.files?.[0]?.name ?? '');
    setShowProjects(false);
  };

  const handleDeleteProject = (id, e) => {
    e.stopPropagation();
    if (projects.length === 1) { alert('You must have at least one project.'); return; }
    if (!confirm('Delete this project? This cannot be undone.')) return;
    const next = projects.filter(p => p.id !== id);
    setProjects(next);
    if (activeProjectId === id) { setActiveProjectId(next[0].id); setActiveFile(next[0].files?.[0]?.name ?? ''); }
  };

  // ── Settings ──────────────────────────────────────────────────────────────
  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col text-slate-900 dark:text-white z-50 overflow-hidden"
      style={{ background: '#0d1117' }}
    >
      {/* Header */}
      <WorkspaceHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectName={activeProject?.name ?? ''}
        onMyProjects={() => setShowProjects(v => !v)}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">

        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          files={files}
          setFiles={setFiles}
          projectName={activeProject?.name ?? ''}
          onNewProject={handleNewProject}
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onUseTemplate={handleUseTemplate}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ background: '#0d1117' }}>
          {activeTab === 'code' && <CodeEditorTab />}
          {activeTab === 'web' && (
            <WebStudioTab
              activeFile={activeFile}
              setActiveFile={setActiveFile}
              files={files}
              setFiles={setFiles}
              settings={settings}
            />
          )}
          {activeTab === 'ai' && <AIStudioTab />}
        </div>

        {/* My Projects panel */}
        {showProjects && (
          <>
            <div className="absolute inset-0 bg-black/40 z-40" onClick={() => setShowProjects(false)} />
            <div className="absolute top-0 right-0 bottom-0 w-80 z-50 flex flex-col"
              style={{ background: '#111827', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <h2 className="text-sm font-bold text-white tracking-wide">My Projects</h2>
                <button onClick={() => setShowProjects(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {projects.map(p => (
                  <button key={p.id} onClick={() => handleOpenProject(p.id)}
                    className={`group w-full text-left px-4 py-3 rounded-xl border transition-all ${p.id === activeProjectId ? 'border-blue-500/50 bg-blue-600/10' : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {p.id === activeProjectId && <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />}
                          <span className="text-sm font-semibold text-white truncate">{p.name}</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {p.files.length} file{p.files.length !== 1 ? 's' : ''} · {new Date(p.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteProject(p.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0 text-xs"
                      >✕</button>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <button
                  onClick={handleNewProject}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
                >
                  + New Project
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status Bar */}
      <StatusBar activeTab={activeTab} projectName={activeProject?.name ?? ''} />
    </div>
  );
};

export default Workspace;
