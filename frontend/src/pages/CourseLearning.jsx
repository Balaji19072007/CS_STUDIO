import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse, getPhases, getTopics } from '../api/courseApi';
import { getQuizzes } from '../api/quizApi';
import { useAuth } from '../contexts/AuthContext';
import { getAllUserProgressForCourse } from '../api/progressApi';
import { getMyCertificates, issueCourseCertificate } from '../api/certificateApi.js';
import { downloadCertificate } from '../utils/certificateUtils.js';
import TopicContent from './TopicContent';
import QuizPage from './QuizPage';
import { LearningSkeleton } from '../components/common/SkeletonLoader';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { supabase } from '../config/supabase';

const isProgressCompleted = (entry) =>
    Boolean(entry?.completed === true || entry?.status === 'completed' || entry?.completed_at);

const CourseLearning = ({ embeddedCourseId }) => {
    const { courseId: paramCourseId, topicId: paramTopicId, quizId: paramQuizId } = useParams();
    const courseId = embeddedCourseId || paramCourseId;
    const isEmbedded = Boolean(embeddedCourseId);
    
    const [localTopicId, setLocalTopicId] = useState(() => {
        return isEmbedded ? (sessionStorage.getItem('cs_embedded_topic') || null) : null;
    });
    const [localQuizId, setLocalQuizId] = useState(() => {
        return isEmbedded ? (sessionStorage.getItem('cs_embedded_quiz') || null) : null;
    });

    useEffect(() => {
        if (isEmbedded) {
            if (localTopicId) sessionStorage.setItem('cs_embedded_topic', localTopicId);
            else sessionStorage.removeItem('cs_embedded_topic');
            
            if (localQuizId) sessionStorage.setItem('cs_embedded_quiz', localQuizId);
            else sessionStorage.removeItem('cs_embedded_quiz');
        }
    }, [localTopicId, localQuizId, isEmbedded]);

    const topicId = isEmbedded ? localTopicId : paramTopicId;
    const quizId = isEmbedded ? localQuizId : paramQuizId;
    const certificateCourseId = courseId === 'c-programming' ? 'c-lang' : courseId;
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [phases, setPhases] = useState([]);
    const [expandedPhaseId, setExpandedPhaseId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userProgress, setUserProgress] = useState({});
    const [selectedPhaseId, setSelectedPhaseId] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [certificateStatus, setCertificateStatus] = useState('');
    const [certificateError, setCertificateError] = useState('');

    useEffect(() => {
        const handleReset = () => {
            setLocalTopicId(null);
            setLocalQuizId(null);
            setSelectedPhaseId(null);
            if (isEmbedded) {
                sessionStorage.removeItem('cs_embedded_topic');
                sessionStorage.removeItem('cs_embedded_quiz');
            }
        };
        window.addEventListener('reset-course-learning', handleReset);
        return () => window.removeEventListener('reset-course-learning', handleReset);
    }, [isEmbedded]);

    // Fetch Course & Phases with Topics and Quizzes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch from Supabase (all courses are there now)
                const courseData = await getCourse(courseId);
                setCourse(courseData);

                // Fetch all phases
                const phasesData = await getPhases(courseId);
                console.log('📦 Phases:', phasesData);

                // For each phase, fetch topics AND quizzes, then merge by order_index
                const phasesWithItems = await Promise.all(
                    phasesData.map(async (phase) => {
                        try {
                            const [topics, quizzes] = await Promise.all([
                                getTopics(phase.id),
                                getQuizzes(phase.id)
                            ]);

                            console.log(`Phase ${phase.id} - Topics:`, topics);
                            console.log(`Phase ${phase.id} - Quizzes:`, quizzes);

                            // Dynamically inject quizzes for C programming if needed
                            let items = [];
                            if ((courseData?.title?.toLowerCase().includes('c programming') || phase.id.startsWith('c-phase') || courseId === 'c-programming') && phase.order_index !== 18) {
                                const topicItems = topics.map(t => ({ ...t, type: 'topic' }));
                                const quizItems = quizzes.map(q => ({ ...q, type: 'quiz' })).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
                                
                                let topicCount = 0;
                                let quizIndex = 0;
                                
                                topicItems.forEach((topic) => {
                                    items.push(topic);
                                    topicCount++;
                                    if (topicCount % 4 === 0) {
                                        if (quizIndex < quizItems.length) {
                                            items.push(quizItems[quizIndex++]);
                                        } else {
                                            items.push({
                                                id: `${phase.id}-quiz-${quizIndex + 1}`,
                                                title: `Quiz ${quizIndex + 1}`,
                                                type: 'quiz',
                                                phase_id: phase.id
                                            });
                                            quizIndex++;
                                        }
                                    }
                                });
                                // Add a final quiz for the phase if the last item isn't already a quiz
                                if (items.length > 0 && items[items.length - 1].type !== 'quiz') {
                                    if (quizIndex < quizItems.length) {
                                        items.push(quizItems[quizIndex++]);
                                    } else {
                                        items.push({
                                            id: `${phase.id}-quiz-final`,
                                            title: `Phase ${phase.order_index || ''} Final Quiz`.trim(),
                                            type: 'quiz',
                                            phase_id: phase.id
                                        });
                                    }
                                }
                                
                                // Append any leftover quizzes
                                while (quizIndex < quizItems.length) {
                                    items.push(quizItems[quizIndex++]);
                                }
                            } else {
                                items = [
                                    ...topics.map(t => ({ ...t, type: 'topic' })),
                                    ...quizzes.map(q => ({ ...q, type: 'quiz' }))
                                ].sort((a, b) => a.order_index - b.order_index);
                            }

                            return {
                                ...phase,
                                items // Combined topics + quizzes
                            };
                        } catch (err) {
                            console.error(`Error fetching items for phase ${phase.id}:`, err);
                            return { ...phase, items: [] };
                        }
                    })
                );

                console.log('✅ Final Phases with Items:', phasesWithItems);
                setPhases(phasesWithItems);

                // Auto-expand logic is now handled in a separate useEffect

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    // Auto-expand the correct phase in the sidebar when topic/quiz changes
    useEffect(() => {
        if (phases.length > 0) {
            const currentId = topicId || quizId;
            if (currentId) {
                const targetPhase = phases.find(p => p.items.some(item => item.id === currentId));
                if (targetPhase && expandedPhaseId !== targetPhase.id) {
                    setExpandedPhaseId(targetPhase.id);
                }
            } else if (!expandedPhaseId) {
                setExpandedPhaseId(phases[0].id);
            }
        }
    }, [topicId, quizId, phases]);

    // Fetch user progress (Optimized: Single Batch Request)
    useEffect(() => {
        const loadProgress = async () => {
            if (!user) return;

            try {
                const userId = user.id;

                // 1. Fetch ALL progress for this course in one query
                // This replaces the 135+ individual API calls
                const allProgress = await getAllUserProgressForCourse(userId, courseId);
                console.log('⚡ Fetched allProgress:', allProgress);

                // Fetch passed quizzes to merge into progress
                const { data: passedQuizzes } = await supabase
                    .from('user_quiz_attempts')
                    .select('quiz_id, completed_at')
                    .eq('user_id', userId)
                    .eq('passed', true);

                // 2. Convert to lookup map for fast access: { topicId: progressObject }
                const progressMap = {};
                if (allProgress) {
                    allProgress.forEach(p => {
                        progressMap[p.topic_id] = p;
                    });
                }
                if (passedQuizzes) {
                    passedQuizzes.forEach(q => {
                        progressMap[q.quiz_id] = { completed: true, completed_at: q.completed_at };
                    });
                }

                // 3. Calculate Phase Progress Locally
                // We have the full phases structure and the full progress map, so we don't need API calls for this
                phases.forEach(phase => {
                    const topics = phase.items.filter(i => i.type === 'topic');
                    const totalTopics = topics.length;

                    if (totalTopics > 0) {
                        const completedTopics = topics.filter(t => isProgressCompleted(progressMap[t.id])).length;
                        const percentage = Math.round((completedTopics / totalTopics) * 100);

                        progressMap[phase.id] = {
                            total: totalTopics,
                            completed: completedTopics,
                            percentage: percentage
                        };
                    } else {
                        progressMap[phase.id] = { total: 0, completed: 0, percentage: 0 };
                    }
                });

                setUserProgress(progressMap);
                console.log('📊 Batch Progress Loaded:', Object.keys(progressMap).length, 'entries');

            } catch (error) {
                console.error('Error loading progress:', error);
            }
        };

        if (phases.length > 0) {
            loadProgress();
        }

        window.addEventListener('course-progress-updated', loadProgress);
        return () => window.removeEventListener('course-progress-updated', loadProgress);
    }, [phases, courseId, user]);

    useEffect(() => {
        const loadCertificate = async () => {
            if (!user) return;

            try {
                const certificates = await getMyCertificates();
                const matchingCertificate = certificates.find((item) =>
                    item.courseId === certificateCourseId ||
                    item.courseTitle === course?.title ||
                    (certificateCourseId === 'c-lang' && item.courseTitle === 'C Programming')
                );
                if (matchingCertificate) {
                    setCertificate(matchingCertificate);
                }
            } catch (error) {
                console.error('Error loading certificates:', error);
            }
        };

        loadCertificate();
    }, [user, courseId, certificateCourseId, course?.title]);

    const togglePhase = (phase) => {
        const isExpanding = expandedPhaseId !== phase.id;
        setExpandedPhaseId(isExpanding ? phase.id : null);
        
        if (isExpanding && (phase.order_index === 1 || phase.order_index === 18)) {
            if (phase.items && phase.items.length > 0) {
                selectItem(phase.items[0], phase.id);
                return;
            }
        }

        if (isExpanding && phase.intro_content?.length) {
            setSelectedPhaseId(phase.id);
            if (isEmbedded) {
                setLocalTopicId(null);
                setLocalQuizId(null);
            } else {
                if (topicId || quizId) {
                    navigate(`/courses/${courseId}/learn`);
                }
            }
        }
    };

    const selectItem = (item, phaseId) => {
        setSelectedPhaseId(null);

        if (isEmbedded) {
            if (item.type === 'topic') {
                setLocalTopicId(item.id);
                setLocalQuizId(null);
            } else if (item.type === 'quiz') {
                setLocalQuizId(item.id);
                setLocalTopicId(null);
            }
        } else {
            if (item.type === 'topic') {
                navigate(`/courses/${courseId}/learn/topic/${item.id}`);
            } else if (item.type === 'quiz') {
                navigate(`/courses/${courseId}/learn/quiz/${item.id}`);
            }
        }

        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    const allItems = phases.flatMap(p => p.items);
    const currentIndex = allItems.findIndex(item => item.id === (topicId || quizId));
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === allItems.length - 1;

    const goToNext = () => {
        if (!isLast) {
            const nextItem = allItems[currentIndex + 1];
            selectItem(nextItem);
        } else {
            if (isEmbedded) {
                setLocalTopicId(null);
                setLocalQuizId(null);
            } else {
                navigate(`/courses/${courseId}/learn`);
            }
        }
    };

    const goToPrevious = () => {
        if (!isFirst) {
            const prevItem = allItems[currentIndex - 1];
            selectItem(prevItem);
        }
    };

    const totalCourseTopics = phases.reduce((acc, phase) => acc + phase.items.filter(i => i.type === 'topic').length, 0);
    const completedCourseTopics = phases.reduce((acc, phase) => acc + (userProgress[phase.id]?.completed || 0), 0);
    
    const totalCourseQuizzes = phases.reduce((acc, phase) => acc + phase.items.filter(i => i.type === 'quiz').length, 0);
    const completedCourseQuizzes = phases.reduce((acc, phase) => acc + phase.items.filter(i => i.type === 'quiz' && isProgressCompleted(userProgress[i.id])).length, 0);

    const totalItems = totalCourseTopics + totalCourseQuizzes;
    const completedItems = completedCourseTopics + completedCourseQuizzes;
    const courseProgressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    const isCourseComplete = totalItems > 0 && completedItems >= totalItems;
    const selectedPhase = phases.find((phase) => phase.id === selectedPhaseId);

    const handleIssueCertificate = async () => {
        if (!user) {
            setCertificateError('Please sign in to issue your certificate.');
            return;
        }

        setCertificateStatus('Issuing certificate...');
        setCertificateError('');

        try {
            const result = await issueCourseCertificate(certificateCourseId);
            const issuedCertificate = result.certificate || result;
            setCertificate(issuedCertificate);
            setCertificateStatus('Certificate is ready.');
        } catch (error) {
            setCertificateStatus('');
            setCertificateError(error.message || 'Unable to issue certificate right now.');
        }
    };

    const copyVerificationLink = async () => {
        const certificateId = certificate?.certificateId || certificate?.id;
        if (!certificateId) return;

        const verificationUrl =
            certificate.verificationUrl ||
            `${window.location.origin}/#/certificates/verify/${certificateId}`;

        await navigator.clipboard.writeText(verificationUrl);
        setCertificateStatus('Verification link copied.');
    };

    const renderPhaseIntro = (phase) => {
        if (!phase?.intro_content?.length) return null;

        return (
            <div className="min-h-full bg-white dark:bg-slate-900 px-6 py-8 sm:px-10 lg:px-14 text-left">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
                        <p className="text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                            Phase {phase.order_index}
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                            {phase.title}
                        </h2>
                        {phase.description && (
                            <p className="mt-3 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
                                {phase.description}
                            </p>
                        )}
                    </div>

                    <div className="space-y-7 text-lg leading-8 text-gray-800 dark:text-gray-200">
                        {phase.intro_content.map((block, index) => {
                            const codeText = block.content_text || '';
                            const isCodeOnly = codeText.startsWith('// [CODE_ONLY]\n');
                            const displayCodeText = isCodeOnly ? codeText.replace('// [CODE_ONLY]\n', '') : codeText;

                            if (block.type === 'example') {
                                return (
                                    <div key={`${phase.id}-intro-${index}`} className="overflow-hidden rounded-xl border border-gray-200 bg-[#0F172A] shadow-lg dark:border-gray-800">
                                        <SyntaxHighlighter
                                            language="c"
                                            style={vscDarkPlus}
                                            customStyle={{
                                                margin: 0,
                                                padding: '1.25rem',
                                                borderRadius: 0,
                                                background: 'transparent',
                                            }}
                                            showLineNumbers={!isCodeOnly}
                                        >
                                            {displayCodeText}
                                        </SyntaxHighlighter>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={`${phase.id}-intro-${index}`}
                                    className="course-phase-intro"
                                    dangerouslySetInnerHTML={{ __html: block.content_text }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };



    if (loading) {
        return <LearningSkeleton />;
    }

    return (
        <div className={`${isEmbedded ? 'h-full' : 'h-screen'} flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden`}>


            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-[320px] max-w-[86vw] h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300`}>
                    {/* Global Course Progress */}
                    <div className="px-5 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/50">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Course Progress</span>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{courseProgressPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden mb-1">
                            <div 
                                className="bg-blue-500 h-1 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${courseProgressPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                            <span>Topics: {completedCourseTopics}/{totalCourseTopics}</span>
                            <span>Quizzes: {completedCourseQuizzes}/{totalCourseQuizzes}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                        {phases.map((phase, i) => (
                            <div key={phase.id} className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700/50 shadow-sm">
                                <button
                                    onClick={() => togglePhase(phase)}
                                    className={`w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${selectedPhaseId === phase.id ? 'ring-1 ring-blue-200 dark:ring-blue-500/30' : ''}`}
                                >
                                    <span className="text-gray-900 dark:text-white font-medium text-sm text-left flex-1 pr-4">Phase {i + 1}: {phase.title}</span>
                                    <svg className={`w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400 transition-transform ${expandedPhaseId === phase.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                {expandedPhaseId === phase.id && (
                                    <div className="bg-white dark:bg-slate-900/50 border-t border-gray-200 dark:border-gray-700/50 py-1">
                                        {phase.items.map((item) => {
                                            const isCompleted = isProgressCompleted(userProgress[item.id]);
                                            const isQuiz = item.type === 'quiz';
                                            const isActive = item.id === (topicId || quizId);

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => selectItem(item, phase.id)}
                                                    className={`w-full px-4 py-2.5 flex items-center gap-3 transition-all duration-300 border-l-[3px] group relative overflow-hidden ${isActive
                                                        ? 'bg-blue-50 dark:bg-blue-600/10 border-blue-500 text-blue-600 dark:text-blue-400 translate-x-1 shadow-[inset_4px_0_0_0_rgba(59,130,246,0.5)]'
                                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-gray-200'
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent dark:from-blue-500/10 dark:to-transparent opacity-50" />
                                                    )}

                                                    <div className="flex-shrink-0 relative z-10 w-5 flex items-center justify-center">
                                                        {isQuiz ? (
                                                            <span className={`font-bold text-[17px] text-slate-700 dark:text-gray-300 transition-transform ${isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : ''}`}>Q</span>
                                                        ) : isCompleted ? (
                                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white shadow-sm transition-transform ${isActive ? 'scale-110' : ''} ${isActive ? 'bg-blue-500 shadow-blue-500/50' : 'bg-green-500 shadow-green-500/40'}`}>
                                                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                            </div>
                                                        ) : (
                                                            <div className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-blue-500 dark:bg-blue-400 w-2.5 h-2.5 shadow-[0_0_8px_rgba(59,130,246,0.6)] dark:shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-gray-400 dark:bg-gray-600 group-hover:bg-gray-600 dark:group-hover:bg-gray-400'}`}></div>
                                                        )}
                                                    </div>
                                                    <div className={`flex-1 text-left truncate relative z-10 transition-colors ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                                                        <div className={`text-sm ${isActive ? 'font-semibold' : ''}`}>{item.title}</div>
                                                        {isQuiz && isCompleted && userProgress[item.id]?.completed_at && (
                                                            <div className="text-[10px] text-green-600 dark:text-green-400 mt-0.5 font-medium">
                                                                Completed: {new Date(userProgress[item.id].completed_at).toLocaleDateString()} {new Date(userProgress[item.id].completed_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {isQuiz && isCompleted && (
                                                        <div className="flex-shrink-0 ml-2 relative z-10 flex items-center justify-center">
                                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white shadow-sm transition-transform ${isActive ? 'scale-110' : ''} ${isActive ? 'bg-blue-500 shadow-blue-500/50' : 'bg-green-500 shadow-green-500/40'}`}>
                                                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Certificate Card Embedded in Sidebar */}
                        <div className="mt-2 bg-[#EBE1D1] dark:bg-[#2A241A] rounded-xl p-5 shadow-sm mb-4 border border-[#d3c8b6] dark:border-[#3A3326]">
                            <h2 className="text-[#F09900] font-bold text-center text-[20px] mb-2">Certificate</h2>
                            <p className="text-slate-800 dark:text-gray-300 text-center text-[12px] leading-relaxed mx-2 mb-4 font-medium">
                                Finish every topic in this course to unlock your completion certificate.
                            </p>
                            
                            <div className="bg-black/5 dark:bg-white/5 rounded-[12px] p-3 mb-4 border border-black/5 dark:border-white/5">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-slate-600 dark:text-gray-400 text-[14px] font-medium">Completion</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{courseProgressPercentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#F09900] rounded-full" style={{ width: `${courseProgressPercentage}%` }}></div>
                                </div>
                            </div>

                            {isCourseComplete && certificate ? (
                                <div className="bg-[#D1E8D9] dark:bg-[#1A3A2A] border border-[#B8DEC4] dark:border-[#2A5A3A] rounded-xl p-3 mb-5 text-center">
                                    <span className="text-[#5DBA7D] dark:text-[#7DDA9D] text-[13px] font-medium">Certificate issued on {new Date(certificate.createdAt || Date.now()).toLocaleDateString()}</span>
                                </div>
                            ) : null}

                            {certificateStatus && <p className="mb-3 text-xs font-medium text-blue-700 dark:text-blue-300 text-center">{certificateStatus}</p>}
                            {certificateError && <p className="mb-3 text-xs font-medium text-red-600 dark:text-red-300 text-center">{certificateError}</p>}

                            <div className="flex flex-col gap-2.5">
                                <button
                                    onClick={() => {
                                        if (isCourseComplete && certificate) {
                                            navigate(`/certificates/verify/${certificate.certificateId || certificate.id}`);
                                        } else if (isCourseComplete) {
                                            handleIssueCertificate();
                                        }
                                    }}
                                    disabled={!isCourseComplete}
                                    className={`w-full py-1.5 rounded-lg font-bold text-sm transition-all ${
                                        isCourseComplete
                                            ? 'bg-[#F09900] hover:bg-[#E08A00] text-black shadow-sm'
                                            : 'bg-[#D6CDBA] dark:bg-[#4A443A] text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Open My Certificate
                                </button>

                                {isCourseComplete && (
                                    <>
                                        <button
                                            onClick={() => certificate && downloadCertificate(certificate)}
                                            disabled={!certificate}
                                            className={`w-full py-1.5 rounded-lg font-bold text-sm transition-all ${
                                                certificate
                                                    ? 'bg-white text-black hover:bg-gray-50 shadow-sm'
                                                    : 'bg-white/80 dark:bg-white/10 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            Download Certificate
                                        </button>

                                        <button
                                            onClick={copyVerificationLink}
                                            disabled={!certificate}
                                            className={`w-full py-1.5 rounded-lg font-bold text-sm transition-all ${
                                                certificate
                                                    ? 'bg-white text-[#F0D590] hover:bg-gray-50 shadow-sm'
                                                    : 'bg-white/80 dark:bg-white/10 text-[#F0D590]/50 cursor-not-allowed'
                                            }`}
                                        >
                                            Copy Verification Link
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay */}
                {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-20" onClick={() => setIsSidebarOpen(false)}></div>}

                {/* Main Content */}
                <main id="topic-scroll-container" className="flex-1 overflow-y-auto bg-white dark:bg-[#0B1120] relative">
                    {(topicId || quizId) ? (
                        <div className="h-full">
                            {topicId ? (
                                <TopicContent
                                    embedded={true}
                                    topicId={topicId}
                                    onNext={goToNext}
                                    onPrevious={goToPrevious}
                                    isFirst={isFirst}
                                    isLast={isLast}
                                />
                            ) : (
                                <QuizPage
                                    embedded={true}
                                    quizId={quizId}
                                    onNext={goToNext}
                                    onPrevious={goToPrevious}
                                    isFirst={isFirst}
                                    isLast={isLast}
                                />
                            )}
                        </div>
                    ) : selectedPhase ? (
                        renderPhaseIntro(selectedPhase)
                    ) : (
                        <div className="min-h-full p-6 md:p-10 lg:px-12 w-full flex flex-col justify-start max-w-7xl mx-auto">
                            {/* Modern Welcome Banner */}
                            <div className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-2xl group">
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 transition-all duration-700"></div>
                                {/* Decorative glowing orbs */}
                                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/30 transition-all duration-700"></div>
                                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-700"></div>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                                
                                <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center">
                                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-200 font-medium text-sm mb-6 backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                                        Interactive Learning Experience
                                    </div>
                                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200 mb-6 tracking-tight drop-shadow-sm">
                                        Welcome to <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{course?.title || 'C Programming'}</span>
                                    </h1>
                                    <p className="text-blue-100/90 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
                                        {course?.overview_description || "Master C Programming from the ground up. You will not only write valid C programs, but you will also understand why the language still matters in operating systems, embedded devices, tooling, and performance-critical software."}
                                    </p>
                                    <button 
                                        onClick={() => {
                                            if (phases.length > 0 && phases[0].items.length > 0) {
                                                setExpandedPhaseId(phases[0].id);
                                                selectItem(phases[0].items[0], phases[0].id);
                                            }
                                        }}
                                        className="relative overflow-hidden group bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Start Learning Now
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                        </span>
                                        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-1000 ease-in-out"></div>
                                    </button>
                                </div>
                            </div>

                            {/* Three Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                                {/* Total Phases */}
                                <div className="group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-white/40 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700/50 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:rotate-3 transition-transform duration-300">
                                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                        </div>
                                        <div>
                                            <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">Total Phases</h3>
                                            <span className="text-4xl font-black text-slate-900 dark:text-white drop-shadow-sm">{phases.length}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Topics */}
                                <div className="group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-white/40 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 border border-emerald-200 dark:border-emerald-700/50 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:rotate-3 transition-transform duration-300">
                                            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        </div>
                                        <div>
                                            <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">Total Topics</h3>
                                            <span className="text-4xl font-black text-slate-900 dark:text-white drop-shadow-sm">{totalItems}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate */}
                                <div className="group relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 backdrop-blur-md rounded-3xl p-8 border border-amber-200/50 dark:border-amber-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-700/40 dark:to-amber-600/40 border border-amber-300 dark:border-amber-500/50 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:-rotate-3 transition-transform duration-300">
                                            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                        </div>
                                        <div>
                                            <h3 className="text-amber-700 dark:text-amber-500 font-bold text-sm uppercase tracking-widest mb-1">Certificate</h3>
                                            <span className="text-2xl font-black text-amber-900 dark:text-amber-300 drop-shadow-sm">At 100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
                                {/* How This Course Works */}
                                <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors duration-500">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 dark:bg-cyan-900/10 rounded-bl-full -mr-20 -mt-20 pointer-events-none transition-transform group-hover:scale-105 duration-700"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            </div>
                                            <h3 className="text-slate-900 dark:text-white font-extrabold text-2xl tracking-tight">
                                                How This Course Works
                                            </h3>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                                            Learn the concept, study the example, solve the mastery challenge, then move to the next lesson. The flow is designed to feel like a structured tutorial experience rather than a static reading page.
                                        </p>
                                    </div>
                                </div>

                                {/* What You Will Learn */}
                                <div className="group relative bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors duration-500">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mr-20 -mt-20 pointer-events-none transition-transform group-hover:scale-105 duration-700"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                            </div>
                                            <h3 className="text-slate-900 dark:text-white font-extrabold text-2xl tracking-tight">
                                                What You Will Learn
                                            </h3>
                                        </div>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 flex-shrink-0">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                                                </div>
                                                <span className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">Read and write complete C programs confidently and understand logic building.</span>
                                            </li>
                                            <li className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mt-1 flex-shrink-0">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                                                </div>
                                                <span className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">Explain the compile pipeline, primitive types, variables, and basic memory management.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CourseLearning;
