import React, { useState, useEffect } from 'react';
import * as feather from 'feather-icons';

const Icon = ({ name, className = '' }) => {
    if (!name || !feather.icons[name]) return null;
    return <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`} dangerouslySetInnerHTML={{ __html: feather.icons[name].toSvg({ class: 'w-full h-full' }) }} />;
};

const ProjectStudentManagementUI = ({ projectId, code, onClose }) => {
    const [students, setStudents] = useState([]);
    const [view, setView] = useState('dashboard'); // dashboard, add, edit
    const [searchQuery, setSearchQuery] = useState('');
    const [currentStudent, setCurrentStudent] = useState({ rollNo: '', name: '', marks: '' });
    const [notification, setNotification] = useState(null);

    const showNotification = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        if (!currentStudent.rollNo || !currentStudent.name || !currentStudent.marks) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        if (students.some(s => s.rollNo === currentStudent.rollNo)) {
            showNotification('Roll Number already exists!', 'error');
            return;
        }

        setStudents([...students, currentStudent]);
        setCurrentStudent({ rollNo: '', name: '', marks: '' });
        setView('dashboard');
        showNotification('Student added successfully!');
    };

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        setStudents(students.map(s => s.rollNo === currentStudent.rollNo ? currentStudent : s));
        setCurrentStudent({ rollNo: '', name: '', marks: '' });
        setView('dashboard');
        showNotification('Student updated successfully!');
    };

    const handleDeleteStudent = (rollNo) => {
        if(window.confirm('Are you sure you want to delete this student?')) {
            setStudents(students.filter(s => s.rollNo !== rollNo));
            showNotification('Student deleted successfully!');
        }
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.rollNo.toString().includes(searchQuery)
    );

    const getGrade = (marks) => {
        const m = parseFloat(marks);
        if (m >= 90) return { letter: 'A+', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
        if (m >= 80) return { letter: 'A', color: 'text-green-500 bg-green-500/10 border-green-500/20' };
        if (m >= 70) return { letter: 'B', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' };
        if (m >= 60) return { letter: 'C', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' };
        if (m >= 50) return { letter: 'D', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' };
        return { letter: 'F', color: 'text-red-500 bg-red-500/10 border-red-500/20' };
    };

    const handleDownloadWebsite = () => {
        const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] }
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
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
    
    <div class="w-full max-w-5xl glass-panel rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col h-[80vh]">
        
        <!-- Header -->
        <div class="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white/50 dark:bg-gray-900/50">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <i data-feather="users"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-extrabold tracking-tight">Student Portal</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Management System</p>
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
                <button onclick="setView('dashboard')" id="nav-dashboard" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left bg-blue-500 text-white shadow-md">
                    <i data-feather="grid" class="w-5 h-5"></i> Dashboard
                </button>
                <button onclick="setView('add')" id="nav-add" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
                    <i data-feather="user-plus" class="w-5 h-5"></i> Add Student
                </button>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-6 md:p-8" id="content-area">
                <!-- Dashboard View -->
                <div id="view-dashboard" class="view-section">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-xl font-bold">All Students</h2>
                        <div class="relative w-64">
                            <i data-feather="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <input type="text" id="searchInput" onkeyup="renderTable()" placeholder="Search students..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-100 dark:bg-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    <th class="p-4 font-bold border-b border-gray-200 dark:border-gray-700">Roll No</th>
                                    <th class="p-4 font-bold border-b border-gray-200 dark:border-gray-700">Name</th>
                                    <th class="p-4 font-bold border-b border-gray-200 dark:border-gray-700">Marks</th>
                                    <th class="p-4 font-bold border-b border-gray-200 dark:border-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="studentTableBody" class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                                <!-- Dynamic Rows -->
                            </tbody>
                        </table>
                        <div id="emptyState" class="hidden p-12 text-center text-gray-500 dark:text-gray-400">
                            <i data-feather="users" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                            <p class="text-lg font-medium">No students found</p>
                            <p class="text-sm mt-1 opacity-70">Add a new student to get started.</p>
                        </div>
                    </div>
                </div>

                <!-- Add/Edit View -->
                <div id="view-form" class="view-section hidden max-w-lg mx-auto">
                    <h2 class="text-2xl font-bold mb-6" id="formTitle">Add New Student</h2>
                    <form id="studentForm" onsubmit="handleFormSubmit(event)" class="space-y-5">
                        <input type="hidden" id="formMode" value="add">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Roll Number</label>
                            <input type="text" id="rollNo" required class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <input type="text" id="name" required class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Marks (Out of 100)</label>
                            <input type="number" id="marks" required min="0" max="100" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium">
                        </div>
                        <button type="submit" class="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all transform hover:-translate-y-0.5">
                            Save Student Record
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Toast Notification -->
        <div id="toast" class="absolute bottom-6 right-6 transform translate-y-20 opacity-0 transition-all duration-300 px-6 py-3 rounded-xl font-bold shadow-lg z-50 pointer-events-none bg-green-500 text-white">
            Message
        </div>
    </div>

    <script>
        let students = [
            { rollNo: '101', name: 'Balu', marks: '95' },
            { rollNo: '102', name: 'Sita', marks: '88' }
        ];

        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            const icon = document.documentElement.classList.contains('dark') ? 'sun' : 'moon';
            document.getElementById('theme-icon').outerHTML = \`<i data-feather="\${icon}" id="theme-icon"></i>\`;
            feather.replace();
        }

        function showToast(msg, isError = false) {
            const toast = document.getElementById('toast');
            toast.textContent = msg;
            toast.className = \`absolute bottom-6 right-6 transform transition-all duration-300 px-6 py-3 rounded-xl font-bold shadow-lg z-50 \${isError ? 'bg-red-500' : 'bg-green-500'} text-white\`;
            setTimeout(() => { toast.classList.remove('translate-y-20', 'opacity-0'); }, 10);
            setTimeout(() => { toast.classList.add('translate-y-20', 'opacity-0'); }, 3000);
        }

        function setView(view) {
            document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.nav-btn').forEach(el => {
                el.classList.remove('bg-blue-500', 'text-white', 'shadow-md');
                el.classList.add('text-gray-600', 'dark:text-gray-400');
            });
            
            if(view === 'dashboard') {
                document.getElementById('view-dashboard').classList.remove('hidden');
                document.getElementById('nav-dashboard').classList.add('bg-blue-500', 'text-white', 'shadow-md');
                document.getElementById('nav-dashboard').classList.remove('text-gray-600', 'dark:text-gray-400');
                renderTable();
            } else if (view === 'add') {
                document.getElementById('view-form').classList.remove('hidden');
                document.getElementById('nav-add').classList.add('bg-blue-500', 'text-white', 'shadow-md');
                document.getElementById('nav-add').classList.remove('text-gray-600', 'dark:text-gray-400');
                document.getElementById('formTitle').textContent = 'Add New Student';
                document.getElementById('formMode').value = 'add';
                document.getElementById('studentForm').reset();
                document.getElementById('rollNo').disabled = false;
            }
        }

        function renderTable() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const filtered = students.filter(s => s.name.toLowerCase().includes(query) || s.rollNo.includes(query));
            const tbody = document.getElementById('studentTableBody');
            const emptyState = document.getElementById('emptyState');
            
            tbody.innerHTML = '';
            
            if (filtered.length === 0) {
                emptyState.classList.remove('hidden');
                document.querySelector('table').classList.add('hidden');
            } else {
                emptyState.classList.add('hidden');
                document.querySelector('table').classList.remove('hidden');
                
                filtered.forEach(s => {
                    const grade = parseFloat(s.marks) >= 90 ? 'A+' : parseFloat(s.marks) >= 80 ? 'A' : parseFloat(s.marks) >= 70 ? 'B' : parseFloat(s.marks) >= 60 ? 'C' : 'F';
                    const gradeClass = grade === 'A+' ? 'text-emerald-500 bg-emerald-500/10' : grade === 'F' ? 'text-red-500 bg-red-500/10' : 'text-blue-500 bg-blue-500/10';
                    
                    const tr = document.createElement('tr');
                    tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors';
                    tr.innerHTML = \`
                        <td class="p-4 font-mono font-medium text-sm border-b border-gray-100 dark:border-gray-800">#\${s.rollNo}</td>
                        <td class="p-4 font-bold border-b border-gray-100 dark:border-gray-800">\${s.name}</td>
                        <td class="p-4 border-b border-gray-100 dark:border-gray-800">
                            <div class="flex items-center gap-3">
                                <span class="font-bold">\${s.marks}%</span>
                                <span class="px-2 py-0.5 rounded text-xs font-bold \${gradeClass}">\${grade}</span>
                            </div>
                        </td>
                        <td class="p-4 border-b border-gray-100 dark:border-gray-800 text-right">
                            <button onclick="editStudent('\${s.rollNo}')" class="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"><i data-feather="edit-2" class="w-4 h-4"></i></button>
                            <button onclick="deleteStudent('\${s.rollNo}')" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors ml-1"><i data-feather="trash-2" class="w-4 h-4"></i></button>
                        </td>
                    \`;
                    tbody.appendChild(tr);
                });
                feather.replace();
            }
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const rollNo = document.getElementById('rollNo').value;
            const name = document.getElementById('name').value;
            const marks = document.getElementById('marks').value;
            const mode = document.getElementById('formMode').value;

            if (mode === 'add') {
                if (students.some(s => s.rollNo === rollNo)) {
                    showToast('Roll Number already exists!', true);
                    return;
                }
                students.push({ rollNo, name, marks });
                showToast('Student added successfully!');
            } else {
                const idx = students.findIndex(s => s.rollNo === rollNo);
                if(idx !== -1) students[idx] = { rollNo, name, marks };
                showToast('Student updated successfully!');
            }
            setView('dashboard');
        }

        function editStudent(rollNo) {
            const student = students.find(s => s.rollNo === rollNo);
            if(!student) return;
            
            setView('add');
            document.getElementById('formTitle').textContent = 'Edit Student';
            document.getElementById('formMode').value = 'edit';
            document.getElementById('rollNo').value = student.rollNo;
            document.getElementById('rollNo').disabled = true;
            document.getElementById('name').value = student.name;
            document.getElementById('marks').value = student.marks;
        }

        function deleteStudent(rollNo) {
            if(confirm('Are you sure you want to delete this student?')) {
                students = students.filter(s => s.rollNo !== rollNo);
                renderTable();
                showToast('Student deleted successfully!');
            }
        }

        // Initialize
        feather.replace();
        renderTable();
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student-management-system.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Website source code downloaded!');
    };

    const handleEditClick = (student) => {
        setCurrentStudent(student);
        setView('edit');
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
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg text-white">
                            <Icon name="users" className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Student Portal</h2>
                            <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">Management System UI Demo</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleDownloadWebsite}
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors border border-indigo-200 dark:border-indigo-500/20"
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
                            onClick={() => {setView('dashboard'); setCurrentStudent({ rollNo: '', name: '', marks: '' });}}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${view === 'dashboard' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <Icon name="grid" className="w-5 h-5" /> Dashboard
                        </button>
                        <button 
                            onClick={() => {setView('add'); setCurrentStudent({ rollNo: '', name: '', marks: '' });}}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${view === 'add' || view === 'edit' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            <Icon name={view === 'edit' ? 'edit' : 'user-plus'} className="w-5 h-5" /> {view === 'edit' ? 'Edit Student' : 'Add Student'}
                        </button>
                        
                        {/* Mobile Download Button */}
                        <button 
                            onClick={handleDownloadWebsite}
                            className="md:hidden flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-indigo-600 bg-indigo-50"
                        >
                            <Icon name="download" className="w-5 h-5" /> Download
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                        {view === 'dashboard' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                    <div>
                                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">All Students</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track student performance</p>
                                    </div>
                                    <div className="relative w-full sm:w-72">
                                        <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Search by name or roll no..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {filteredStudents.length > 0 ? (
                                    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    <th className="p-4 font-bold border-b border-gray-200 dark:border-gray-800">Roll No</th>
                                                    <th className="p-4 font-bold border-b border-gray-200 dark:border-gray-800">Name</th>
                                                    <th className="p-4 font-bold border-b border-gray-200 dark:border-gray-800">Marks</th>
                                                    <th className="p-4 font-bold border-b border-gray-200 dark:border-gray-800 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {filteredStudents.map(s => {
                                                    const grade = getGrade(s.marks);
                                                    return (
                                                        <tr key={s.rollNo} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                            <td className="p-4 font-mono font-medium text-sm text-gray-600 dark:text-gray-400 border-b border-gray-50 dark:border-gray-800/50">#{s.rollNo}</td>
                                                            <td className="p-4 font-bold text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-800/50">{s.name}</td>
                                                            <td className="p-4 border-b border-gray-50 dark:border-gray-800/50">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="font-extrabold text-gray-900 dark:text-white">{s.marks}%</span>
                                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${grade.color}`}>{grade.letter}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-right border-b border-gray-50 dark:border-gray-800/50">
                                                                <button onClick={() => handleEditClick(s)} className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors" title="Edit">
                                                                    <Icon name="edit-2" className="w-4 h-4" />
                                                                </button>
                                                                <button onClick={() => handleDeleteStudent(s.rollNo)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors ml-1" title="Delete">
                                                                    <Icon name="trash-2" className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-gray-900/20">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
                                            <Icon name="users" className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No students found</h4>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                            {searchQuery ? `No results match "${searchQuery}". Try a different term.` : "Your database is empty. Add a new student to get started."}
                                        </p>
                                        {!searchQuery && (
                                            <button onClick={() => setView('add')} className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5">
                                                Add First Student
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {(view === 'add' || view === 'edit') && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto w-full pt-4 md:pt-10">
                                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${view === 'add' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-amber-500 to-orange-600'}`}>
                                            <Icon name={view === 'add' ? 'user-plus' : 'edit-3'} className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{view === 'add' ? 'Add New Student' : 'Edit Student'}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Fill in the details below</p>
                                        </div>
                                    </div>

                                    <form onSubmit={view === 'add' ? handleAddStudent : handleUpdateStudent} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Roll Number</label>
                                            <input 
                                                type="text" 
                                                required
                                                disabled={view === 'edit'}
                                                value={currentStudent.rollNo}
                                                onChange={(e) => setCurrentStudent({...currentStudent, rollNo: e.target.value})}
                                                placeholder="e.g. 101"
                                                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white text-base font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner disabled:opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Full Name</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={currentStudent.name}
                                                onChange={(e) => setCurrentStudent({...currentStudent, name: e.target.value})}
                                                placeholder="e.g. Balu Kumar"
                                                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white text-base font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Marks (Out of 100)</label>
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    required
                                                    min="0"
                                                    max="100"
                                                    step="0.1"
                                                    value={currentStudent.marks}
                                                    onChange={(e) => setCurrentStudent({...currentStudent, marks: e.target.value})}
                                                    placeholder="0 - 100"
                                                    className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white text-base font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner"
                                                />
                                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 font-bold text-gray-400">%</span>
                                            </div>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-lg shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                        >
                                            <Icon name="save" className="w-5 h-5" />
                                            {view === 'add' ? 'Save Student Record' : 'Update Record'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectStudentManagementUI;
