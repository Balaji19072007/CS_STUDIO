import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import CodeEditor from '../../../components/problems/CodeEditor.jsx';
import socketService from '../../../services/socketService.js';
import { useTheme } from '../../../hooks/useTheme.jsx';

const CodeEditorTab = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { isDark } = useTheme();
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  // Parse query params and route state
  const sourceParam = searchParams.get('source') || location.state?.source;
  const langParam = searchParams.get('lang') || location.state?.lang;

  // Helper to map URL lang param to Editor supported language
  const getLanguageFromParam = (param) => {
    if (!param) return 'Python'; // Default
    const lower = param.toLowerCase();
    if (lower === 'c') return 'C';
    if (lower === 'cpp' || lower === 'c++') return 'C++';
    if (lower === 'java') return 'Java';
    if (lower === 'python' || lower === 'py') return 'Python';
    if (lower === 'javascript' || lower === 'js') return 'JavaScript';
    return 'Python'; // Fallback
  };

  const initialLanguage = getLanguageFromParam(langParam);

  let initialCode;
  if (sourceParam) {
    try {
      initialCode = decodeURIComponent(sourceParam);
    } catch (error) {
      initialCode = sourceParam;
    }
  }

  // Initialize socket service when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || 'anonymous';
    if (!socketService.isConnected) {
      socketService.connect(token);
    }

    const updateStatus = () => {
      setConnectionStatus(socketService.isConnected ? 'connected' : 'disconnected');
    };

    updateStatus();
    const statusInterval = setInterval(updateStatus, 2000);
    return () => clearInterval(statusInterval);
  }, []);

  const handleRetryConnection = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      socketService.manualReconnect();
    }
  };

  const monacoTheme = isDark ? 'vs-dark' : 'vs-light';

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative" style={{ background: isDark ? '#060B14' : '#ffffff' }}>
      
      {/* Top action bar specifically for Code Editor tab */}
      <div className="flex items-center justify-between p-3 border-b" style={{ background: isDark ? '#0A1122' : '#f8fafc', borderColor: isDark ? '#1e293b' : '#e2e8f0' }}>
        <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: isDark ? 'white' : '#1e293b' }}>
          <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M4 19a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4z"/></svg>
          CS Studio Compiler
        </h3>
        
        {/* Connection Status Indicator */}
        <div className="flex items-center">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
            connectionStatus === 'connected'
              ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
              : connectionStatus === 'connecting'
                ? (isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700')
                : (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 \${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse'
                : connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse'
                : 'bg-red-500'
            }`}></div>
            {connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
          </div>
          {connectionStatus !== 'connected' && (
            <button
              onClick={handleRetryConnection}
              className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Retry
            </button>
          )}
        </div>
      </div>

      {/* Editor takes remaining height */}
      <div className="flex-1 relative overflow-hidden">
        <CodeEditor
          key={initialLanguage}
          theme={monacoTheme}
          initialCode={initialCode}
          language={initialLanguage}
        />
      </div>
    </div>
  );
};

export default CodeEditorTab;
