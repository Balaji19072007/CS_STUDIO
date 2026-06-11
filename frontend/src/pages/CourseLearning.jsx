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
import { courseRatingAPI } from '../config/api';
import CourseRatingModal from '../components/common/CourseRatingModal';

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
    const [userProgress, setUserProgress] = useState({});
    const [selectedPhaseId, setSelectedPhaseId] = useState(null);
    const [certificate, setCertificate] = useState(null);
    const [certificateStatus, setCertificateStatus] = useState('');
    const [certificateError, setCertificateError] = useState('');
    const [showCourseRating, setShowCourseRating] = useState(false);
    const [hasRatedCourse, setHasRatedCourse] = useState(false);

    // Check if user already rated this course
    useEffect(() => {
        if (!user || !courseId) return;
        const checkRatingStatus = async () => {
            try {
                const res = await courseRatingAPI.checkCourseRatingStatus(courseId);
                if (res.data?.success) {
                    setHasRatedCourse(res.data.hasRated);
                }
            } catch (err) {
                console.error("Failed to check course rating status", err);
            }
        };
        checkRatingStatus();
    }, [user, courseId]);

    // Trigger course rating at milestones (3, 13, 23...)
    useEffect(() => {
        if (hasRatedCourse || !user || !phases.length || Object.keys(userProgress).length === 0) return;
        
        let completedCount = 0;
        Object.values(userProgress).forEach(val => {
            // Filter out phase progress objects (which have 'percentage' key)
            if (val && val.percentage === undefined && isProgressCompleted(val)) {
                completedCount++;
            }
        });

        // The milestones: 3, 13, 23, 33...
        const lastShown = sessionStorage.getItem(`course_rating_shown_${courseId}`);
        if ((completedCount > 0 && completedCount % 10 === 3) && parseInt(lastShown) !== completedCount) {
            // Slight delay so it doesn't pop up too aggressively immediately upon completing the topic
            const timer = setTimeout(() => {
                setShowCourseRating(true);
                sessionStorage.setItem(`course_rating_shown_${courseId}`, completedCount.toString());
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [userProgress, hasRatedCourse, courseId, phases, user]);

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
    }, [topicId, quizId, phases, expandedPhaseId]);

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

    const selectItem = (item) => {
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
        <div className={`${isEmbedded ? 'h-full' : 'h-[100dvh] lg:h-[calc(100dvh-4rem)]'} flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden`}>


            <div className="flex-1 flex overflow-hidden relative">
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div 
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300" 
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} 
                    lg:translate-x-0 
                    fixed lg:relative 
                    inset-y-0 left-0 lg:inset-auto
                    z-[70] lg:z-30 
                    w-[85vw] max-w-[340px] lg:w-[320px] lg:max-w-none 
                    h-[100dvh] lg:h-full 
                    bg-white dark:bg-slate-900 
                    border-r border-gray-200 dark:border-gray-800 
                    flex flex-col transition-all duration-300 ease-in-out
                `}>
                    {/* Mobile Header with Close Button */}
                    <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
                        <span className="font-bold text-gray-900 dark:text-white text-lg">Course Content</span>
                        <button 
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Global Course Progress */}
                    <div className="px-5 py-4 lg:py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-slate-900/50">
                        <div className="flex justify-between items-end mb-2 lg:mb-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Course Progress</span>
                            <span className="text-sm lg:text-xs font-bold text-blue-600 dark:text-blue-400">{courseProgressPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 lg:h-1 overflow-hidden mb-2 lg:mb-1">
                            <div 
                                className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${courseProgressPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[11px] lg:text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                            <span>Topics: {completedCourseTopics}/{totalCourseTopics}</span>
                            <span>Quizzes: {completedCourseQuizzes}/{totalCourseQuizzes}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-4 lg:space-y-5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
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

                {/* Main Content */}
                <main id="topic-scroll-container" className="flex-1 overflow-y-auto bg-white dark:bg-[#0B1120] relative flex flex-col">
                    {/* Mobile Header for Sidebar Toggle */}
                    <div className="lg:hidden sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                        <button 
                            onClick={() => setIsSidebarOpen(true)} 
                            className="p-2 -ml-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <span className="font-bold text-gray-900 dark:text-white truncate flex-1 text-sm">
                            {course?.title || 'Course Content'}
                        </span>
                    </div>

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
                        <div className="min-h-full w-full bg-white dark:bg-[#0B1120]">
                            {/* ── Hero Banner ── */}
                            <div className="relative w-full overflow-hidden" style={{ minHeight: 260 }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f4b] via-[#1a2f6e] to-[#0B1120]" />
                                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
                                <div className="relative z-10 px-8 md:px-14 lg:px-20 py-12 md:py-16">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-5 tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                        Interactive Learning Experience
                                    </div>
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                                        {course?.title || 'C Programming'}
                                    </h1>
                                    <p className="text-blue-100/80 text-base md:text-lg leading-relaxed max-w-3xl mb-8 font-medium">
                                        {course?.overview_description || course?.description || 'Master C Programming from the ground up — write valid C programs, understand why the language still powers operating systems, embedded devices, tooling, and performance-critical software.'}
                                    </p>
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <button
                                            onClick={() => {
                                                if (phases.length > 0 && phases[0].items.length > 0) {
                                                    setExpandedPhaseId(phases[0].id);
                                                    selectItem(phases[0].items[0]);
                                                }
                                            }}
                                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-sm"
                                        >
                                            Start Learning
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                        </button>
                                        <div className="flex items-center gap-5 text-sm text-blue-200/70 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                                {phases.length} Phases
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                {totalCourseTopics} Topics
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                                Certificate at 100%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Progress bar (if started) ── */}
                            {courseProgressPercentage > 0 && (
                                <div className="px-8 md:px-14 lg:px-20 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/50 flex items-center gap-4">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Your Progress</span>
                                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700" style={{ width: `${courseProgressPercentage}%` }} />
                                    </div>
                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{completedItems}/{totalItems} complete</span>
                                </div>
                            )}

                            {/* ── Body ── */}
                            <div className="px-8 md:px-14 lg:px-20 py-10 space-y-10">

                                {/* ── What You'll Learn ── */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                                        </span>
                                        What You'll Learn
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            'Write complete, well-structured C programs confidently',
                                            'Understand variables, data types, and the compile pipeline',
                                            'Master pointers, memory management, and arrays',
                                            'Build functions, structs, and modular programs',
                                            'Handle file I/O, strings, and standard libraries',
                                            'Apply logic with loops, conditionals, and recursion',
                                        ].map((point, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                                                <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                                </div>
                                                <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* ── How It Works ── */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </span>
                                        How This Course Works
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[
                                            { step: '1', label: 'Learn the Concept', icon: '📖', color: 'blue' },
                                            { step: '2', label: 'Study the Example', icon: '💡', color: 'cyan' },
                                            { step: '3', label: 'Solve the Challenge', icon: '⚔️', color: 'purple' },
                                            { step: '4', label: 'Move to Next Lesson', icon: '✅', color: 'green' },
                                        ].map((s) => (
                                            <div key={s.step} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 gap-2">
                                                <div className="text-2xl">{s.icon}</div>
                                                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Step {s.step}</div>
                                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* ── Course Phases Roadmap ── */}
                                <section>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                                        </span>
                                        Course Roadmap
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {phases.map((phase, idx) => {
                                            const phaseProgress = userProgress[phase.id];
                                            const pct = phaseProgress?.percentage || 0;
                                            const isStarted = pct > 0;
                                            const isDone = pct === 100;
                                            return (
                                                <button
                                                    key={phase.id}
                                                    onClick={() => {
                                                        setExpandedPhaseId(phase.id);
                                                        if (phase.items.length > 0) selectItem(phase.items[0]);
                                                    }}
                                                    className="flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group
                                                        bg-white dark:bg-slate-800/50
                                                        border-slate-200 dark:border-slate-700/50
                                                        hover:border-blue-300 dark:hover:border-blue-600/50"
                                                >
                                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5
                                                        ${isDone ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' :
                                                          isStarted ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' :
                                                          'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                                        {isDone ? '✓' : idx + 1}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {phase.title}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                            {phase.items.filter(i => i.type === 'topic').length} topics
                                                            {phase.items.filter(i => i.type === 'quiz').length > 0 && ` · ${phase.items.filter(i => i.type === 'quiz').length} quiz`}
                                                        </div>
                                                        {isStarted && (
                                                            <div className="mt-1.5 h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )
                }
                </main>
            </div>
            
            {/* Render the Course Rating Modal */}
            {showCourseRating && !hasRatedCourse && (
                <CourseRatingModal 
                    courseId={courseId} 
                    courseTitle={course?.title}
                    onClose={() => {
                        setShowCourseRating(false);
                        // Once they close it, we check if they rated it so we don't bother them again this session
                        courseRatingAPI.checkCourseRatingStatus(courseId).then(res => {
                            if (res.data?.success) setHasRatedCourse(res.data.hasRated);
                        }).catch(console.error);
                    }} 
                />
            )}
        </div>
    );
};

export default CourseLearning;
