import React, { useState, useEffect } from 'react';

const SETTINGS_KEY = 'cs_studio_settings';

export const DEFAULT_SETTINGS = {
  editor: {
    fontSize: 13,
    wordWrap: 'on',
    tabSize: 2,
    lineNumbers: 'on',
    minimap: true,
    autoSave: true,
    fontFamily: 'JetBrains Mono',
  },
  preview: {
    autoRefresh: true,
    previewDevice: 'desktop',
    openLinksNewTab: false,
  },
  workspace: {
    defaultTemplate: 'blank',
    defaultProjectName: 'My Project',
    restoreLastSession: true,
  },
};

export function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch (_) {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

// ─────────────────────────────────────────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className="relative flex-shrink-0 transition-colors rounded-full"
    style={{
      width: 36, height: 20,
      background: value ? '#3b82f6' : 'rgba(255,255,255,0.12)',
    }}
  >
    <span
      className="absolute top-1 rounded-full transition-all"
      style={{
        left: value ? 18 : 2,
        width: 12, height: 12,
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    />
  </button>
);

const Select = ({ value, onChange, options, style }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    className="rounded-lg outline-none text-xs px-2 py-1.5"
    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', ...style }}
  >
    {options.map(o => (
      <option key={o.value || o} value={o.value || o} style={{ background: '#1e293b' }}>
        {o.label || o}
      </option>
    ))}
  </select>
);

const Row = ({ label, hint, children }) => (
  <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
    <div className="flex-1 min-w-0 pr-3">
      <p className="text-xs font-medium text-white">{label}</p>
      {hint && <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{hint}</p>}
    </div>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest pt-4 pb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
    {children}
  </p>
);

// ─── Main component ────────────────────────────────────────────────────────────
const SettingsPanel = ({ settings, onSettingsChange }) => {
  const update = (section, key, value) => {
    const next = { ...settings, [section]: { ...settings[section], [key]: value } };
    onSettingsChange(next);
    saveSettings(next);
  };

  const FONT_FAMILIES = [
    { value: 'JetBrains Mono', label: 'JetBrains Mono' },
    { value: 'Fira Code',      label: 'Fira Code' },
    { value: 'Cascadia Code',  label: 'Cascadia Code' },
    { value: 'Consolas',       label: 'Consolas' },
    { value: 'monospace',      label: 'System Mono' },
  ];

  const FONT_SIZES = [10,11,12,13,14,15,16,18,20].map(v => ({ value: String(v), label: `${v}px` }));
  const TAB_SIZES  = [2, 4].map(v => ({ value: String(v), label: `${v} spaces` }));

  return (
    <div className="flex-1 overflow-y-auto px-3 py-1">

      {/* ── Editor ── */}
      <SectionTitle>Editor</SectionTitle>

      <Row label="Font Size">
        <Select
          value={String(settings.editor.fontSize)}
          onChange={v => update('editor', 'fontSize', Number(v))}
          options={FONT_SIZES}
        />
      </Row>

      <Row label="Font Family">
        <Select
          value={settings.editor.fontFamily}
          onChange={v => update('editor', 'fontFamily', v)}
          options={FONT_FAMILIES}
          style={{ minWidth: 120 }}
        />
      </Row>

      <Row label="Tab Size">
        <Select
          value={String(settings.editor.tabSize)}
          onChange={v => update('editor', 'tabSize', Number(v))}
          options={TAB_SIZES}
        />
      </Row>

      <Row label="Word Wrap" hint="Wrap long lines in editor">
        <Toggle value={settings.editor.wordWrap === 'on'} onChange={v => update('editor', 'wordWrap', v ? 'on' : 'off')} />
      </Row>

      <Row label="Line Numbers">
        <Toggle value={settings.editor.lineNumbers === 'on'} onChange={v => update('editor', 'lineNumbers', v ? 'on' : 'off')} />
      </Row>

      <Row label="Minimap" hint="Show code minimap on the right">
        <Toggle value={settings.editor.minimap} onChange={v => update('editor', 'minimap', v)} />
      </Row>

      <Row label="Auto Save" hint="Save changes automatically">
        <Toggle value={settings.editor.autoSave} onChange={v => update('editor', 'autoSave', v)} />
      </Row>

      {/* ── Preview ── */}
      <SectionTitle>Preview</SectionTitle>

      <Row label="Auto Refresh" hint="Refresh preview on code change">
        <Toggle value={settings.preview.autoRefresh} onChange={v => update('preview', 'autoRefresh', v)} />
      </Row>

      <Row label="Default Device">
        <Select
          value={settings.preview.previewDevice}
          onChange={v => update('preview', 'previewDevice', v)}
          options={[
            { value: 'desktop', label: 'Desktop' },
            { value: 'tablet',  label: 'Tablet' },
            { value: 'mobile',  label: 'Mobile' },
          ]}
        />
      </Row>

      <Row label="Open Links in New Tab">
        <Toggle value={settings.preview.openLinksNewTab} onChange={v => update('preview', 'openLinksNewTab', v)} />
      </Row>

      {/* ── Workspace ── */}
      <SectionTitle>Workspace</SectionTitle>

      <Row label="Default Project Name">
        <input
          value={settings.workspace.defaultProjectName}
          onChange={e => update('workspace', 'defaultProjectName', e.target.value)}
          className="rounded-lg outline-none text-xs px-2 py-1.5 w-32"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0' }}
        />
      </Row>

      <Row label="Restore Last Session" hint="Reopen last project on launch">
        <Toggle value={settings.workspace.restoreLastSession} onChange={v => update('workspace', 'restoreLastSession', v)} />
      </Row>

      {/* Reset */}
      <div className="py-4 mt-2">
        <button
          onClick={() => { onSettingsChange(DEFAULT_SETTINGS); saveSettings(DEFAULT_SETTINGS); }}
          className="w-full py-2 rounded-xl text-xs font-semibold transition-colors"
          style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.08)'}
        >
          Reset to Defaults
        </button>
      </div>

    </div>
  );
};

export default SettingsPanel;
