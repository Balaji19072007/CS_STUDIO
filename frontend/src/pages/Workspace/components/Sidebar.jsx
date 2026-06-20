import React, { useState } from 'react';
import { FileCode2, LayoutTemplate, Package, Settings, Plus } from 'lucide-react';
import FilesPanel     from '../panels/FilesPanel.jsx';
import TemplatesPanel from '../panels/TemplatesPanel.jsx';
import PackagesPanel  from '../panels/PackagesPanel.jsx';
import SettingsPanel  from '../panels/SettingsPanel.jsx';
import { useTheme } from '../../../hooks/useTheme.jsx';

const NAV_ITEMS = [
  { id: 'files',     label: 'Files',     Icon: FileCode2 },
  { id: 'templates', label: 'Templates', Icon: LayoutTemplate },
  { id: 'packages',  label: 'Packages',  Icon: Package },
  { id: 'settings',  label: 'Settings',  Icon: Settings },
];

const PANEL_TITLES = {
  files:     'Explorer',
  templates: 'Templates',
  packages:  'Packages',
  settings:  'Settings',
};

const Sidebar = ({
  activeTab, activeFile, setActiveFile,
  files, setFiles,
  projectName, onNewProject,
  settings, onSettingsChange,
  onUseTemplate,
}) => {
  const [activeNav, setActiveNav] = useState('files');
  const { isDark } = useTheme();

  const iconBtnStyle = (active) => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '4px', padding: '10px 0', width: '100%', border: 'none', cursor: 'pointer',
    background: active ? (isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)') : 'transparent',
    color: active ? '#60a5fa' : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.4)'),
    borderLeft: active ? '2px solid #3b82f6' : '2px solid transparent',
    transition: 'all 0.15s',
    fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
  });

  return (
    <div className="flex flex-shrink-0 h-full" style={{ width: 260 }}>

      {/* ── Icon Rail ─────────────────────────────────────────── */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{
          width: 52,
          background: isDark ? '#090e18' : '#f8fafc',
          borderRight: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #e2e8f0',
        }}
      >
        {/* Nav items */}
        <div className="flex flex-col flex-1 pt-2">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                style={iconBtnStyle(active)}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.7)'; e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.4)'; e.currentTarget.style.background = 'transparent'; } }}
                title={label}
              >
                <Icon size={18} />
                <span style={{ fontSize: '8px' }}>{label}</span>
              </button>
            );
          })}
        </div>

        {/* New Project at bottom */}
        <button
          onClick={onNewProject}
          title="New Project"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '4px', padding: '12px 0', width: '100%', border: 'none', cursor: 'pointer',
            background: 'transparent', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)',
            borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0',
            fontSize: '8px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = isDark ? '#60a5fa' : '#3b82f6'; e.currentTarget.style.background = isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <Plus size={18} />
          <span style={{ fontSize: '8px' }}>New</span>
        </button>
      </div>

      {/* ── Content Panel ─────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col min-w-0 h-full"
        style={{ background: isDark ? '#0d1117' : '#f8fafc', borderRight: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-3 py-3 flex-shrink-0"
          style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}
        >
          <div>
            <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{PANEL_TITLES[activeNav]}</p>
            {activeNav === 'files' && (
              <p className="text-[10px] mt-0.5 truncate" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)' }}>
                {projectName || 'No project open'}
              </p>
            )}
          </div>
        </div>

        {/* Panel body */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {activeNav === 'files' && (
            <>
              <FilesPanel
                files={files}
                setFiles={setFiles}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
              />

              {/* Project card */}
              <div className="flex-shrink-0 px-3 py-3" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}>
                <div
                  className="rounded-xl p-3 mb-3"
                  style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #e2e8f0' }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)' }}>
                    Current Project
                  </p>
                  <p className={`text-sm font-semibold truncate mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`} title={projectName}>
                    {projectName || '—'}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px]" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.5)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {files.length} file{files.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <button
                  onClick={onNewProject}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>
            </>
          )}

          {activeNav === 'templates' && (
            <TemplatesPanel onUseTemplate={onUseTemplate} />
          )}

          {activeNav === 'packages' && (
            <PackagesPanel files={files} setFiles={setFiles} />
          )}

          {activeNav === 'settings' && (
            <SettingsPanel settings={settings} onSettingsChange={onSettingsChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
