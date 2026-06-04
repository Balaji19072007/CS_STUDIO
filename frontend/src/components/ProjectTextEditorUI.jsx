import React, { useState, useEffect } from 'react';
import * as feather from 'feather-icons';

const Icon = ({ name, className = '' }) => {
    if (!name || !feather.icons[name]) return null;
    return <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`} dangerouslySetInnerHTML={{ __html: feather.icons[name].toSvg({ class: 'w-full h-full' }) }} />;
};

const ProjectTextEditorUI = ({ projectId, code, onClose }) => {
    const [text, setText] = useState('');
    const [view, setView] = useState('editor'); // editor, preview, stats
    const [notification, setNotification] = useState(null);

    const showNotification = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleClearText = () => {
        if(window.confirm('Are you sure you want to clear all text?')) {
            setText('');
            showNotification('Text cleared successfully!');
        }
    };

    const handleDownloadWebsite = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Text Editor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { 
                        sans: ['Inter', 'sans-serif'],
                        mono: ['Fira Code', 'monospace']
                    }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .light .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center p-4 transition-colors duration-300 relative overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none"></div>
    
    <div class="w-full max-w-5xl glass-panel rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col h-[80vh]">
        
        <!-- Header -->
        <div class="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                    <i data-feather="edit-3"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-extrabold tracking-tight">Mini Text Editor</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Text Processing System</p>
                </div>
            </div>
            <div class="flex gap-3">
                <button onclick="toggleTheme()" class="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-sm">
                    <i data-feather="moon" id="theme-icon"></i>
                </button>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex flex-1 overflow-hidden flex-col md:flex-row relative">
            
            <!-- Sidebar -->
            <div class="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-2 bg-white/30 dark:bg-gray-900/30">
                <button onclick="setView('editor')" id="nav-editor" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left bg-purple-600 text-white shadow-md">
                    <i data-feather="edit-2" class="w-5 h-5"></i> Edit Text
                </button>
                <button onclick="setView('preview')" id="nav-preview" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
                    <i data-feather="eye" class="w-5 h-5"></i> Display Text
                </button>
                <button onclick="setView('stats')" id="nav-stats" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
                    <i data-feather="bar-chart-2" class="w-5 h-5"></i> Statistics
                </button>
                <div class="mt-auto">
                    <button onclick="clearText()" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/20">
                        <i data-feather="trash-2" class="w-5 h-5"></i> Clear Text
                    </button>
                </div>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-6 md:p-8 bg-white/50 dark:bg-gray-900/50" id="content-area">
                
                <!-- Editor View -->
                <div id="view-editor" class="view-section h-full flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Workspace</h2>
                        <span id="charCountBadge" class="text-xs font-bold px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-500/30">0 chars</span>
                    </div>
                    <textarea id="editorInput" onkeyup="updateCount()" onchange="updateCount()" placeholder="Start typing here..." class="flex-1 w-full p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-inner resize-none"></textarea>
                    <button onclick="saveText()" class="mt-4 w-full md:w-auto self-end px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        <i data-feather="save" class="w-5 h-5"></i> Save Changes
                    </button>
                </div>

                <!-- Preview View -->
                <div id="view-preview" class="view-section hidden h-full flex flex-col text-left">
                    <h2 class="text-xl font-bold mb-4">Display Text</h2>
                    <div id="previewContent" class="flex-1 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-y-auto shadow-inner text-gray-800 dark:text-gray-300">
                        <!-- Preview content goes here -->
                    </div>
                </div>

                <!-- Stats View -->
                <div id="view-stats" class="view-section hidden max-w-3xl mx-auto w-full pt-8">
                    <h2 class="text-2xl font-bold mb-8 text-center">Document Statistics</h2>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transform transition-transform hover:scale-105">
                            <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                                <i data-feather="type" class="w-8 h-8"></i>
                            </div>
                            <h3 class="text-5xl font-extrabold text-gray-900 dark:text-white mb-2" id="statChars">0</h3>
                            <p class="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Characters</p>
                        </div>
                        
                        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transform transition-transform hover:scale-105">
                            <div class="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6">
                                <i data-feather="align-left" class="w-8 h-8"></i>
                            </div>
                            <h3 class="text-5xl font-extrabold text-gray-900 dark:text-white mb-2" id="statWords">0</h3>
                            <p class="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Words</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
        <!-- Toast Notification -->
        <div id="toast" class="absolute bottom-6 right-6 transform translate-y-20 opacity-0 transition-all duration-300 px-6 py-3 rounded-xl font-bold shadow-lg z-50 pointer-events-none bg-green-500 text-white flex items-center gap-2">
            <i data-feather="check-circle" class="w-5 h-5"></i>
            <span id="toastMsg">Message</span>
        </div>
    </div>

    <script>
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            const icon = document.documentElement.classList.contains('dark') ? 'sun' : 'moon';
            document.getElementById('theme-icon').outerHTML = \`<i data-feather="\${icon}" id="theme-icon"></i>\`;
            feather.replace();
        }

        function showToast(msg, isError = false) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMsg').textContent = msg;
            toast.className = \`absolute bottom-6 right-6 transform transition-all duration-300 px-6 py-3 rounded-xl font-bold shadow-lg z-50 flex items-center gap-2 \${isError ? 'bg-red-500' : 'bg-green-500'} text-white\`;
            setTimeout(() => { toast.classList.remove('translate-y-20', 'opacity-0'); }, 10);
            setTimeout(() => { toast.classList.add('translate-y-20', 'opacity-0'); }, 3000);
        }

        function updateCount() {
            const text = document.getElementById('editorInput').value;
            document.getElementById('charCountBadge').textContent = text.length + ' chars';
        }

        function saveText() {
            updateCount();
            showToast('Text saved successfully!');
        }

        function clearText() {
            if(confirm('Are you sure you want to clear all text?')) {
                document.getElementById('editorInput').value = '';
                updateCount();
                showToast('Text cleared successfully!');
                if(!document.getElementById('view-editor').classList.contains('hidden')) {
                    document.getElementById('editorInput').focus();
                }
            }
        }

        function setView(view) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.nav-btn').forEach(el => {
                el.classList.remove('bg-purple-600', 'text-white', 'shadow-md');
                el.classList.add('text-gray-600', 'dark:text-gray-400');
            });
            
            const btn = document.getElementById('nav-' + view);
            if(btn) {
                btn.classList.add('bg-purple-600', 'text-white', 'shadow-md');
                btn.classList.remove('text-gray-600', 'dark:text-gray-400');
            }
            
            document.getElementById('view-' + view).classList.remove('hidden');

            const text = document.getElementById('editorInput').value;

            if(view === 'preview') {
                const preview = document.getElementById('previewContent');
                preview.textContent = text || 'No text to display...';
                if(!text) preview.classList.add('opacity-50', 'italic');
                else preview.classList.remove('opacity-50', 'italic');
            } else if (view === 'stats') {
                document.getElementById('statChars').textContent = text.length;
                document.getElementById('statWords').textContent = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
            } else if (view === 'editor') {
                document.getElementById('editorInput').focus();
            }
        }

        // Initialize
        feather.replace();
        document.getElementById('editorInput').value = "Hello World!\\n\\nThis is a sample document in the Mini Text Editor.";
        updateCount();
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mini-text-editor.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Website source code downloaded!');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            {notification && (
                <div className={`absolute top-6 right-6 px-6 py-3 rounded-xl font-bold shadow-2xl z-[200] animate-in slide-in-from-top-4 flex items-center gap-2 ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                    <Icon name={notification.type === 'error' ? 'alert-circle' : 'check-circle'} className="w-5 h-5" />
                    {notification.msg}
                </div>
            )}

            <div className="relative w-full max-w-6xl bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[90vh] md:h-[85vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg text-white">
                            <Icon name="edit-3" className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Mini Text Editor</h2>
                            <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Text Processing System UI Demo</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleDownloadWebsite}
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors border border-purple-200 dark:border-purple-500/20"
                        >
                            <Icon name="download" className="w-4 h-4" />
                            Download Website
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Icon name="x" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible bg-white/30 dark:bg-gray-900/30 flex-shrink-0">
                        <button 
                            onClick={() => setView('editor')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${view === 'editor' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <Icon name="edit-2" className="w-5 h-5" /> Edit Text
                        </button>
                        <button 
                            onClick={() => setView('preview')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${view === 'preview' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <Icon name="eye" className="w-5 h-5" /> Display Text
                        </button>
                        <button 
                            onClick={() => setView('stats')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${view === 'stats' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <Icon name="bar-chart-2" className="w-5 h-5" /> Statistics
                        </button>
                        <div className="md:mt-auto hidden md:block">
                            <button 
                                onClick={handleClearText}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
                            >
                                <Icon name="trash-2" className="w-5 h-5" /> Clear Text
                            </button>
                        </div>
                        
                        {/* Mobile Download Button */}
                        <button 
                            onClick={handleDownloadWebsite}
                            className="md:hidden flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-purple-600 bg-purple-50"
                        >
                            <Icon name="download" className="w-5 h-5" /> Download
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-white/50 dark:bg-gray-900/50">
                        {view === 'editor' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Workspace</h3>
                                    <span className="text-xs font-bold px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-500/30">
                                        {text.length} chars
                                    </span>
                                </div>
                                <textarea 
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Start typing your document here..."
                                    className="flex-1 w-full p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-inner resize-none"
                                />
                                <div className="flex justify-between mt-4">
                                    <button 
                                        onClick={handleClearText}
                                        className="md:hidden px-6 py-3.5 rounded-xl font-bold transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
                                    >
                                        Clear
                                    </button>
                                    <button 
                                        onClick={() => showNotification('Text saved successfully!')}
                                        className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <Icon name="save" className="w-5 h-5" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {view === 'preview' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col text-left">
                                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">Display Text</h2>
                                <div className={`flex-1 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-y-auto shadow-inner ${!text ? 'text-gray-400 italic' : 'text-gray-800 dark:text-gray-300'}`}>
                                    {text || 'No text to display...'}
                                </div>
                            </div>
                        )}

                        {view === 'stats' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto w-full pt-4 md:pt-12">
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">Document Statistics</h2>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transform transition-transform hover:scale-105">
                                        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                                            <Icon name="type" className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{text.length}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Characters</p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transform transition-transform hover:scale-105">
                                        <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-6">
                                            <Icon name="align-left" className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm">Total Words</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTextEditorUI;
