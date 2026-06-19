import React from 'react';
import { ArrowLeft, Code2, Globe, Sparkles, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkspaceHeader = ({ activeTab, setActiveTab, projectName, onMyProjects }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 z-10 relative flex-shrink-0"
      style={{
        background: 'linear-gradient(90deg, #0a1628 0%, #0d1b36 100%)',
        borderBottom: '1px solid rgba(56,139,253,0.15)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* ── Left: Back button + breadcrumb ── */}
      <div className="flex items-center gap-3 w-64 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.65)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
            e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
            e.currentTarget.style.color = '#60a5fa';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="text-xs">Back</span>
        </button>

        {projectName && (
          <div className="hidden md:flex items-center gap-2 min-w-0">
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span
              className="text-xs font-semibold truncate max-w-[110px]"
              style={{ color: '#58a6ff' }}
              title={projectName}
            >
              {projectName}
            </span>
          </div>
        )}
      </div>

      {/* ── Center: Tab switcher ── */}
      <div
        className="flex items-center p-1 rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {[
          { id: 'code', label: 'Code Editor', Icon: Code2 },
          { id: 'web',  label: 'Web Studio',  Icon: Globe },
          { id: 'ai',   label: 'AI Studio',   Icon: Sparkles, badge: 'Soon' },
        ].map(({ id, label, Icon, badge }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={active
                ? {
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(99,102,241,0.25))',
                    color: '#60a5fa',
                    boxShadow: '0 0 0 1px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }
                : {
                    color: 'rgba(255,255,255,0.45)',
                  }
              }
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
            >
              <Icon className="w-4 h-4" />
              {label}
              {badge && (
                <span
                  className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase"
                  style={{ background: 'rgba(99,102,241,0.3)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)' }}
                >
                  {badge}
                </span>
              )}
              {active && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: '#3B82F6' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Right: My Projects ── */}
      <div className="w-64 flex-shrink-0 flex justify-end">
        <button
          onClick={onMyProjects}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
            e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
            e.currentTarget.style.color = '#60a5fa';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          }}
        >
          <FolderOpen className="w-4 h-4" />
          My Projects
        </button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
