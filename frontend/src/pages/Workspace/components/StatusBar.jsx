import React from 'react';

const StatusBar = ({ activeTab, projectName }) => {
  return (
    <div
      className="flex items-center justify-between px-4 text-[11px] flex-shrink-0"
      style={{
        height: '26px',
        background: 'linear-gradient(90deg, #1a3a5c 0%, #1e3a5c 100%)',
        borderTop: '1px solid rgba(56,139,253,0.2)',
        color: 'rgba(255,255,255,0.5)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {projectName && (
          <div className="flex items-center gap-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            {projectName}
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
          </svg>
          {activeTab === 'web' ? 'Web Studio' : activeTab === 'code' ? 'Code Editor' : 'AI Studio'}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
          Saved
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
        <div className="flex items-center gap-1.5 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Auto Save</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="font-medium" style={{ color: '#4ade80' }}>ON</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
