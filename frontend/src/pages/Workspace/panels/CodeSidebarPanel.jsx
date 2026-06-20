import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme.jsx';
import { File, Plus, Trash2, Copy, Play, Check, ChevronRight, Settings2 } from 'lucide-react';
import socketService from '../../../services/socketService.js';

// --- Helper Functions ---
const getStarterCode = (lang) => {
  switch (lang) {
    case 'Python': return 'print("Hello World")';
    case 'Java': return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}';
    case 'JavaScript': return 'console.log("Hello World");';
    case 'C': return '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
    case 'C++': return '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}';
    default: return '';
  }
};

const getExtension = (lang) => {
  switch (lang) {
    case 'Python': return '.py';
    case 'Java': return '.java';
    case 'JavaScript': return '.js';
    case 'C': return '.c';
    case 'C++': return '.cpp';
    default: return '.txt';
  }
};

// --- DATA ---
const SNIPPETS = {
  Python: [
    { name: 'For Loop', code: 'for i in range(10):\n    pass' },
    { name: 'While Loop', code: 'while True:\n    break' },
    { name: 'Function', code: 'def my_function():\n    pass' },
    { name: 'Class', code: 'class MyClass:\n    def __init__(self):\n        pass' },
    { name: 'Dictionary', code: 'my_dict = {"key": "value"}' },
    { name: 'File Handling', code: 'with open("file.txt", "r") as f:\n    content = f.read()' },
  ],
  Java: [
    { name: 'Class', code: 'public class MyClass {\n    \n}' },
    { name: 'ArrayList', code: 'ArrayList<String> list = new ArrayList<>();' },
    { name: 'HashMap', code: 'HashMap<String, Integer> map = new HashMap<>();' },
    { name: 'For Loop', code: 'for (int i = 0; i < 10; i++) {\n    \n}' },
    { name: 'Switch', code: 'switch (value) {\n    case 1:\n        break;\n    default:\n        break;\n}' },
  ],
  'C++': [
    { name: 'For Loop', code: 'for (int i = 0; i < 10; i++) {\n    \n}' },
    { name: 'Function', code: 'void myFunction() {\n    \n}' },
    { name: 'Struct', code: 'struct MyStruct {\n    int data;\n};' },
    { name: 'Pointer', code: 'int* ptr = &var;' },
    { name: 'Linked List', code: 'struct Node {\n    int data;\n    Node* next;\n};' },
  ],
};
SNIPPETS['C'] = SNIPPETS['C++'];

const PRACTICE_TEMPLATES = [
  { name: 'Hello World', category: 'Beginner', code: {
    Python: 'print("Hello World")',
    Java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
    'C++': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}'
  }},
  { name: 'Binary Search', category: 'Algorithms', code: {
    Python: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\narr = [1, 2, 3, 4, 5]\nprint(binary_search(arr, 3))',
    Java: 'public class Main {\n    public static int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        System.out.println(binarySearch(arr, 3));\n    }\n}',
    'C++': '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint binarySearch(vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    vector<int> arr = {1, 2, 3, 4, 5};\n    cout << binarySearch(arr, 3) << endl;\n    return 0;\n}'
  }}
];

// --- MAIN COMPONENT ---
const CodeSidebarPanel = ({
  activeNav, codeFiles, setCodeFiles, activeCodeFileId, setActiveCodeFileId,
  codeHistory, setCodeHistory, notes, setNotes, codeSettings, setCodeSettings
}) => {
  const { isDark } = useTheme();
  
  const activeFile = codeFiles.find(f => f.id === activeCodeFileId) || codeFiles[0];
  const activeLanguage = activeFile?.language || 'Python';

  // State for Language Selector Modal
  const [showLangSelector, setShowLangSelector] = useState(false);

  // Stats computation
  const executionsToday = codeHistory.filter(h => new Date(h.timestamp).toDateString() === new Date().toDateString()).length;
  const lastRun = codeHistory[0]?.timestamp ? new Date(codeHistory[0].timestamp).toLocaleTimeString() : 'Never';

  const handleCreateFile = (lang) => {
    const id = 'cf_' + Date.now();
    const name = `main_${Math.floor(Math.random() * 1000)}${getExtension(lang)}`;
    const newFile = { id, name, language: lang, code: getStarterCode(lang), createdAt: Date.now(), updatedAt: Date.now() };
    setCodeFiles(prev => [...prev, newFile]);
    setActiveCodeFileId(id);
    setShowLangSelector(false);
  };

  const handleLanguageSelect = (lang) => {
    const existingFile = codeFiles.find(f => f.language === lang);
    if (existingFile) {
      setActiveCodeFileId(existingFile.id);
    } else {
      handleCreateFile(lang);
    }
  };

  const handleDeleteFile = (id, e) => {
    e.stopPropagation();
    if (codeFiles.length <= 1) return alert('Cannot delete the last file.');
    if (!confirm('Delete this file?')) return;
    const newFiles = codeFiles.filter(f => f.id !== id);
    setCodeFiles(newFiles);
    if (activeCodeFileId === id) {
      const sameLangFile = newFiles.find(f => f.language === activeLanguage);
      if (sameLangFile) {
        setActiveCodeFileId(sameLangFile.id);
      } else {
        setActiveCodeFileId(newFiles[0].id);
      }
    }
  };

  const handleDuplicateFile = (file, e) => {
    e.stopPropagation();
    const id = 'cf_' + Date.now();
    const newFile = { ...file, id, name: `copy_${file.name}`, createdAt: Date.now(), updatedAt: Date.now() };
    setCodeFiles(prev => [...prev, newFile]);
    setActiveCodeFileId(id);
  };

  const handleInsertSnippet = (code) => {
    // We emit an event to the document that CodeEditorTab will listen to.
    const event = new CustomEvent('cs_insert_snippet', { detail: code });
    document.dispatchEvent(event);
  };

  const handleLoadTemplate = (templateCode) => {
    if (!confirm('Replace current code with template?')) return;
    const event = new CustomEvent('cs_load_template', { detail: templateCode });
    document.dispatchEvent(event);
  };

  // Styles
  const bgClass = isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100';
  const borderClass = isDark ? 'border-white/10' : 'border-slate-200';
  const textClass = isDark ? 'text-white' : 'text-slate-800';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <>
      <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        
        {/* RECENT FILES */}
        {activeNav === 'recent' && (
          <div className="space-y-4">
            
            {/* Language Selector at the top */}
            <div className="space-y-1.5">
              <label className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>Language</label>
              <select
                value={activeLanguage}
                onChange={(e) => handleLanguageSelect(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded border ${borderClass} ${bgClass} ${textClass} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
              >
                {['Python', 'Java', 'JavaScript', 'C', 'C++'].map(lang => (
                  <option 
                    key={lang} 
                    value={lang}
                    className={isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}
                  >
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] font-bold uppercase tracking-wider ${textMuted}`}>Recent Files ({codeFiles.filter(f => f.language === activeLanguage).length})</label>
              {codeFiles.filter(f => f.language === activeLanguage).map(file => (
                <div 
                  key={file.id} 
                  onClick={() => setActiveCodeFileId(file.id)}
                  className={`group w-full text-left px-3 py-2 rounded border transition-all cursor-pointer flex justify-between items-center ${activeCodeFileId === file.id ? (isDark ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50') : `${borderClass} ${bgClass}`}`}
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${textClass} truncate`}>{file.name}</p>
                    <p className={`text-[10px] ${textMuted} truncate`}>{new Date(file.updatedAt).toLocaleTimeString()}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => handleDuplicateFile(file, e)} className="text-slate-400 hover:text-blue-400" title="Duplicate"><Copy size={14}/></button>
                    <button onClick={(e) => handleDeleteFile(file.id, e)} className="text-slate-400 hover:text-red-400" title="Delete"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => handleCreateFile(activeLanguage)}
                className="w-full mt-4 py-2 border-2 border-dashed rounded text-sm font-medium transition-colors"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
              >
                + New File
              </button>
            </div>
          </div>
        )}

        {/* SNIPPETS */}
        {activeNav === 'snippets' && (
          <div className="space-y-4">
            <p className={`text-xs font-semibold ${textMuted} uppercase tracking-wider`}>{activeLanguage} Snippets</p>
            {SNIPPETS[activeLanguage] ? SNIPPETS[activeLanguage].map(snippet => (
              <button 
                key={snippet.name}
                onClick={() => handleInsertSnippet(snippet.code)}
                className={`w-full text-left px-3 py-2 rounded border ${borderClass} ${bgClass} transition-colors`}
              >
                <span className={`text-sm ${textClass}`}>{snippet.name}</span>
              </button>
            )) : <p className="text-xs text-slate-500">No snippets for this language.</p>}
          </div>
        )}

        {/* PRACTICE */}
        {activeNav === 'practice' && (
          <div className="space-y-4">
            {PRACTICE_TEMPLATES.map(template => {
              const code = template.code[activeLanguage] || template.code['Python']; // fallback
              return (
                <button 
                  key={template.name}
                  onClick={() => handleLoadTemplate(code)}
                  className={`w-full text-left px-3 py-2 rounded border ${borderClass} ${bgClass} transition-colors`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-blue-500`}>{template.category}</p>
                  <span className={`text-sm font-semibold ${textClass}`}>{template.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* HISTORY */}
        {activeNav === 'history' && (
          <div className="space-y-4">
            <div className={`p-3 rounded border ${borderClass} bg-black/5 dark:bg-white/5 space-y-1`}>
              <p className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>Statistics</p>
              <div className="flex justify-between"><span className="text-xs">Files</span><span className="text-xs font-bold">{codeFiles.length}</span></div>
              <div className="flex justify-between"><span className="text-xs">Runs Today</span><span className="text-xs font-bold">{executionsToday}</span></div>
              <div className="flex justify-between"><span className="text-xs">Total Runs</span><span className="text-xs font-bold">{codeHistory.length}</span></div>
            </div>

            <p className={`text-[10px] font-semibold uppercase tracking-wider ${textMuted} pt-2`}>Recent Executions</p>
            {codeHistory.length === 0 ? <p className="text-xs text-slate-500">No executions yet.</p> : codeHistory.map((run, i) => (
              <div key={i} className={`p-2 rounded border ${borderClass} ${bgClass}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-bold ${run.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{run.status}</span>
                  <span className={`text-[10px] ${textMuted}`}>{new Date(run.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className={`text-xs ${textClass}`}>{run.filename} ({run.language})</p>
              </div>
            ))}
          </div>
        )}

        {/* NOTES */}
        {activeNav === 'notes' && (
          <div className="space-y-3">
            <button 
              onClick={() => {
                const note = prompt('New Note:');
                if (note) setNotes(prev => [...prev, { id: Date.now(), text: note }]);
              }}
              className="w-full py-2 border-2 border-dashed rounded text-sm font-medium transition-colors"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
            >
              + Add Note
            </button>
            {notes.map(note => (
              <div key={note.id} className={`p-3 rounded border ${borderClass} ${bgClass} relative group`}>
                <p className={`text-sm ${textClass} whitespace-pre-wrap`}>{note.text}</p>
                <button 
                  onClick={() => setNotes(prev => prev.filter(n => n.id !== note.id))}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400"
                ><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {activeNav === 'settings' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className={`text-[10px] uppercase font-bold tracking-wider ${textMuted}`}>Editor Settings</p>
              <div className="flex justify-between items-center">
                <span className="text-xs">Font Size</span>
                <input 
                  type="number" className="w-16 px-2 py-1 text-xs rounded border bg-transparent"
                  value={codeSettings.editor.fontSize}
                  onChange={e => setCodeSettings(s => ({...s, editor: {...s.editor, fontSize: parseInt(e.target.value)}}))}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Tab Size</span>
                <input 
                  type="number" className="w-16 px-2 py-1 text-xs rounded border bg-transparent"
                  value={codeSettings.editor.tabSize}
                  onChange={e => setCodeSettings(s => ({...s, editor: {...s.editor, tabSize: parseInt(e.target.value)}}))}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CARD: Coding Session */}
      <div className="flex-shrink-0 px-3 py-3" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0' }}>
        <div className="rounded-xl p-3 mb-3" style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #e2e8f0' }}>
          <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.4)' }}>
            Coding Session
          </p>
          <div className="space-y-1">
            <div className="flex justify-between"><span className="text-xs opacity-70">Language</span><span className="text-xs font-semibold">{activeLanguage}</span></div>
            <div className="flex justify-between"><span className="text-xs opacity-70">Status</span><span className="text-xs font-semibold text-green-500">Connected</span></div>
            <div className="flex justify-between"><span className="text-xs opacity-70">Last Run</span><span className="text-xs font-semibold">{lastRun}</span></div>
          </div>
        </div>
      </div>


    </>
  );
};

export default CodeSidebarPanel;
