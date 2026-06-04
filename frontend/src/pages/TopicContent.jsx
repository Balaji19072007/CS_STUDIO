import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCourse, getTopic, getTopicContent, getPracticeProblems, getCourseChallenge } from '../api/courseApi';
import { markTopicComplete, updateCourseProgress } from '../api/progressApi';
import { TopicSkeleton } from '../components/common/SkeletonLoader';
import { useAuth } from '../hooks/useAuth';
import {
    getCoursePresentation,
    getGeneratedTopicContent,
    getGeneratedTopicMeta,
    shouldUseGeneratedTopicContent,
} from '../data/coursePresentation.js';
import {
    getFallbackTopicContent,
    getFallbackTopicLearningMeta,
    hasFallbackTopicContent,
} from '../data/cProgrammingPhaseFallbacks.js';

const getSolvedTopicKey = (topicId) => `course_challenge_solved_${topicId}`;

const getLocallySolvedChallenge = (topicId) => {
    if (!topicId) {
        return null;
    }

    const raw = sessionStorage.getItem(getSolvedTopicKey(topicId));
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const mergeSolvedState = (challenge, topicId) => {
    if (!challenge) {
        return null;
    }

    const localSolved = getLocallySolvedChallenge(topicId);
    if (!localSolved || challenge.solved) {
        return challenge;
    }

    return {
        ...challenge,
        solved: true,
        solved_at: localSolved.solvedAt || challenge.solved_at || null,
    };
};

const splitBulletLines = (rawText = '') =>
    rawText
        .split(/\r\n|\r|\n|•/)
        .map((line) => line.trim().replace(/^[-*]\s*/, ''))
        .filter(Boolean);

const TopicContent = ({
    embedded = false,
    topicId = null,
    courseId = null,
    courseTitle = '',
    onNext,
    onPrevious,
    isFirst,
    isLast,
}) => {
    const { courseId: paramCourseId, topicId: paramTopicId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const resolvedTopicId = topicId || paramTopicId;
    const resolvedCourseId = courseId || paramCourseId;

    const [topic, setTopic] = useState(null);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [practiceProblems, setPracticeProblems] = useState([]);
    const [courseChallenge, setCourseChallenge] = useState(null);
    const [resolvedCourseTitle, setResolvedCourseTitle] = useState(courseTitle || '');
    const [loading, setLoading] = useState(true);
    const [, setCompleting] = useState(false);

    useEffect(() => {
        if (courseTitle) {
            setResolvedCourseTitle(courseTitle);
        }
    }, [courseTitle]);

    useEffect(() => {
        if (!resolvedTopicId) {
            return;
        }

        const fetchTopicData = async () => {
            setLoading(true);
            try {
                const coursePromise =
                    courseTitle || !resolvedCourseId
                        ? Promise.resolve(courseTitle ? { title: courseTitle } : null)
                        : getCourse(resolvedCourseId).catch(() => null);

                const [topicData, content, problems, challenge, courseData] = await Promise.all([
                    getTopic(resolvedTopicId),
                    getTopicContent(resolvedTopicId),
                    getPracticeProblems(resolvedTopicId),
                    getCourseChallenge(resolvedTopicId),
                    coursePromise,
                ]);

                setTopic(topicData);
                setContentBlocks(content);
                setPracticeProblems(problems);
                setCourseChallenge(mergeSolvedState(challenge, resolvedTopicId));
                setResolvedCourseTitle(courseData?.title || courseTitle || '');
            } catch (error) {
                console.error('Error fetching topic content:', error);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    const scrollContainer = document.getElementById('topic-scroll-container');
                    if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
                }, 100);
            }
        };

        fetchTopicData();

        const handleFocus = () => {
            if (!resolvedTopicId) {
                return;
            }

            getCourseChallenge(resolvedTopicId)
                .then((challenge) => setCourseChallenge(mergeSolvedState(challenge, resolvedTopicId)))
                .catch((error) => console.error('Error reloading challenge:', error));
        };

        const handleChallengeSolved = (event) => {
            if (event.detail?.topicId !== resolvedTopicId) {
                return;
            }

            setCourseChallenge((current) =>
                current
                    ? mergeSolvedState(
                          {
                              ...current,
                              solved: true,
                              solved_at: event.detail?.solvedAt || current.solved_at || null,
                          },
                          resolvedTopicId
                      )
                    : current
            );

            getCourseChallenge(resolvedTopicId)
                .then((challenge) => setCourseChallenge(mergeSolvedState(challenge, resolvedTopicId)))
                .catch((error) => console.error('Error reloading solved challenge:', error));
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('course-challenge-solved', handleChallengeSolved);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('course-challenge-solved', handleChallengeSolved);
        };
    }, [courseTitle, resolvedCourseId, resolvedTopicId]);

    const handleMarkComplete = async () => {
        if (!user) {
            alert('Please sign in to track progress');
            return false;
        }

        try {
            setCompleting(true);
            await markTopicComplete(user.id, resolvedTopicId);
            await updateCourseProgress(user.id, resolvedCourseId);
            window.dispatchEvent(
                new CustomEvent('course-progress-updated', {
                    detail: {
                        courseId: resolvedCourseId,
                    },
                })
            );
            return true;
        } catch (error) {
            console.error('Error marking topic complete:', error);
            alert('Failed to update progress');
            return false;
        } finally {
            setCompleting(false);
        }
    };

    const presentation = useMemo(
        () => getCoursePresentation(resolvedCourseTitle),
        [resolvedCourseTitle]
    );

    const fallbackLessonMeta = useMemo(
        () => getFallbackTopicLearningMeta(resolvedTopicId),
        [resolvedTopicId]
    );

    const lessonMeta = useMemo(() => {
        if (!topic) {
            return {
                description: '',
                goals: [],
                practiceHint: '',
                estimatedTime: '',
            };
        }

        if (fallbackLessonMeta) {
            return fallbackLessonMeta;
        }

        return getGeneratedTopicMeta({
            courseTitle: resolvedCourseTitle,
            topicTitle: topic.title,
        });
    }, [fallbackLessonMeta, resolvedCourseTitle, topic]);

    const displayContentBlocks = useMemo(() => {
        if (!topic) {
            return contentBlocks;
        }

        if (shouldUseGeneratedTopicContent(contentBlocks)) {
            if (hasFallbackTopicContent(topic.id)) {
                return getFallbackTopicContent(topic.id);
            }

            return getGeneratedTopicContent({
                topicId: topic.id,
                topicTitle: topic.title,
                courseTitle: resolvedCourseTitle,
            });
        }

        return contentBlocks;
    }, [contentBlocks, resolvedCourseTitle, topic]);

    const topicDescription =
        topic?.description && topic.description.trim().length > 30
            ? topic.description
            : lessonMeta.description;

    const isProject = topic?.title?.toLowerCase().includes('project') || courseChallenge?.title?.toLowerCase().includes('project');

    const challengeHints = useMemo(() => {
        let hints = courseChallenge?.hints || [];
        if (Array.isArray(hints) && hints.length === 1 && typeof hints[0] === 'string' && hints[0].startsWith('{')) {
            hints = hints[0].replace(/^{|}$/g, '').split('","').map(s => s.replace(/^"|"$/g, ''));
        }
        return Array.isArray(hints) ? hints.filter(Boolean) : [];
    }, [courseChallenge]);

    const challengeChecklist = useMemo(() => {
        if (!courseChallenge) {
            return [];
        }

        if (challengeHints.length > 0) {
            return challengeHints.slice(0, 3);
        }

        return (lessonMeta.goals || []).slice(0, 3);
    }, [challengeHints, courseChallenge, lessonMeta.goals]);

    const extractCodeText = (rawText = '') => {
        if (rawText.includes('```')) {
            return rawText.match(/```[a-zA-Z+#]*\n([\s\S]*?)```/)?.[1]?.trim() || rawText.match(/```[a-zA-Z+#]*([\s\S]*?)```/)?.[1]?.trim() || rawText;
        }
        return rawText.trim();
    };

    const extractLanguage = (rawText = '') => {
        if (rawText.includes('```')) {
            const match = rawText.match(/```([a-zA-Z+#]*)\n/);
            return match ? match[1].toLowerCase() : null;
        }
        return null;
    };

    const renderContentBlock = (block) => {
        const codeText = extractCodeText(block.content_text);

        switch (block.content_type) {
            case 'definition':
                return (
                    <div key={block.id} className="mb-8">
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Definition</h3>
                        <p className="text-lg font-light leading-relaxed text-gray-800 dark:text-gray-200 sm:text-xl">{block.content_text}</p>
                    </div>
                );

            case 'explanation':
                return (
                    <div 
                        key={block.id} 
                        className="mb-8 text-lg font-light leading-loose tracking-wide text-gray-800 dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: block.content_text }}
                    />
                );

            case 'syntax': {
                const lang = extractLanguage(block.content_text) || presentation.syntaxLanguage;
                let title = 'Syntax';
                let titleClass = 'text-purple-300 dark:text-purple-400';
                let bgGradient = 'from-purple-500 to-pink-500';
                
                if (lang === 'bash') {
                    title = 'Bash';
                    titleClass = 'text-green-300 dark:text-green-400';
                    bgGradient = 'from-green-500 to-emerald-500';
                } else if (lang === 'output' || lang === 'plaintext') {
                    title = 'Output';
                    titleClass = 'text-gray-300 dark:text-gray-400';
                    bgGradient = 'from-gray-500 to-slate-500';
                }

                return (
                    <div key={block.id} className="relative group mb-8">
                        <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${bgGradient} opacity-20 blur transition duration-500 group-hover:opacity-30`}></div>
                        <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700/50 bg-[#1E293B] shadow-xl dark:shadow-2xl">
                            <div className="flex items-center justify-between border-b border-gray-800 dark:border-gray-700 bg-slate-900 dark:bg-[#1E293B] px-6 py-3">
                                <h3 className={`text-sm font-bold uppercase tracking-wider ${titleClass}`}>{title}</h3>
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500/20"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/20"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500/20"></div>
                                </div>
                            </div>
                            <div className="p-1">
                                <SyntaxHighlighter
                                    language={lang === 'output' || lang === 'plaintext' ? 'text' : lang}
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, borderRadius: '0.5rem', background: 'transparent' }}
                                    showLineNumbers={title !== 'Output'}
                                >
                                    {codeText}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                );
            }

            case 'code-only':
                return (
                    <div key={block.id} className="group relative overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800 bg-[#1E293B] dark:bg-[#0F172A] shadow-xl dark:shadow-2xl transition-colors dark:hover:border-blue-500/30 mb-8">
                        <SyntaxHighlighter
                            language={presentation.syntaxLanguage}
                            style={vscDarkPlus}
                            customStyle={{ margin: 0, padding: '1.5rem', borderRadius: '0.5rem', background: 'transparent' }}
                            showLineNumbers={true}
                        >
                            {codeText}
                        </SyntaxHighlighter>
                    </div>
                );

            case 'example':
                const isCodeOnly = codeText.startsWith('// [CODE_ONLY]\n');
                const displayCodeText = isCodeOnly ? codeText.replace('// [CODE_ONLY]\n', '') : codeText;
                
                return (
                    <div key={block.id} className="space-y-4">
                        {!isCodeOnly && (
                            <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                                <span className="rounded-lg bg-blue-100 dark:bg-blue-500/20 px-3 py-2 text-sm text-blue-700 dark:text-blue-400">Code</span>
                                Example
                            </h3>
                        )}
                        <div className={`group relative overflow-hidden rounded-xl border border-gray-300 dark:border-gray-800 bg-[#1E293B] dark:bg-[#0F172A] shadow-xl dark:shadow-2xl transition-colors dark:hover:border-blue-500/30 ${isCodeOnly ? 'mb-8' : ''}`}>
                            {!isCodeOnly && (
                                <div className="absolute right-0 top-0 p-4">
                                    <span className="text-xs font-mono text-gray-500">{presentation.exampleFile}</span>
                                </div>
                            )}
                            <SyntaxHighlighter
                                language={presentation.syntaxLanguage}
                                style={vscDarkPlus}
                                customStyle={{ margin: 0, padding: '1.5rem', paddingBottom: isCodeOnly ? '1.5rem' : '3rem', borderRadius: '0.5rem', background: 'transparent' }}
                                showLineNumbers={true}
                            >
                                {displayCodeText}
                            </SyntaxHighlighter>
                            {!isCodeOnly && (
                                <button
                                    onClick={() => {
                                        if (presentation.playgroundLanguage) {
                                            navigate(`/code?lang=${presentation.playgroundLanguage}&source=${encodeURIComponent(displayCodeText)}`);
                                            return;
                                        }

                                        navigator.clipboard.writeText(displayCodeText);
                                    }}
                                    className={`absolute bottom-4 right-4 rounded-lg px-4 py-2 text-xs font-bold shadow-lg transition-all ${presentation.buttonClass}`}
                                >
                                    Try Yourself
                                </button>
                            )}
                        </div>
                    </div>
                );

            case 'note':
                return (
                    <div key={block.id} className="mb-8">
                        <h3 className="mb-2 text-lg font-bold text-emerald-700 dark:text-emerald-400">Key Points</h3>
                        <ul className="mt-2 space-y-2">
                            {splitBulletLines(block.content_text).map((line, index) => (
                                <li key={index} className="flex items-start gap-3 text-lg font-medium leading-relaxed text-slate-800 dark:text-gray-300">
                                    <span className="mt-1.5 flex-shrink-0 text-emerald-500">•</span>
                                    <span dangerouslySetInnerHTML={{ __html: line }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'tip':
                return (
                    <div key={block.id} className="mb-8">
                        <h3 className="mb-2 text-lg font-bold text-amber-700 dark:text-amber-400">Practice Notes</h3>
                        <ul className="mt-2 space-y-2">
                            {splitBulletLines(block.content_text).map((line, index) => (
                                <li key={index} className="flex items-start gap-3 text-lg font-medium leading-relaxed text-slate-800 dark:text-gray-300">
                                    <span className="mt-1.5 text-amber-500 dark:text-amber-400">•</span>
                                    <span dangerouslySetInnerHTML={{ __html: line }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            default:
                return (
                    <div key={block.id} className="text-slate-800 font-medium dark:text-gray-300 transition-colors">
                        <p>{block.content_text}</p>
                    </div>
                );
        }
    };

    if (loading) {
        return <TopicSkeleton />;
    }

    return (
        <div className={embedded ? 'h-full overflow-y-auto bg-gray-50 dark:bg-[#0F172A] transition-colors' : 'min-h-screen bg-gray-50 dark:bg-[#0F172A] transition-colors'}>
            {!embedded && (
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-[#1E293B] px-4 py-3 shadow-lg transition-colors">
                    <button
                        onClick={() => navigate(`/courses/${resolvedCourseId}/learn`)}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2 text-gray-600 dark:text-gray-400 transition-all hover:bg-gray-200 dark:hover:text-white"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">{topic?.title}</h1>
                    <div className="w-10"></div>
                </header>
            )}

            <main className={`max-w-7xl space-y-12 py-10 text-left ${embedded ? 'px-8 sm:px-12 lg:px-16' : 'mx-auto px-4 sm:px-6 lg:px-8'}`}>
                <div className="space-y-4 border-b border-gray-300 dark:border-gray-800 pb-8 transition-colors">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em] ${presentation.chipClass}`}>
                            {presentation.trackLabel}
                        </span>
                        {resolvedCourseTitle ? <span className="text-sm text-gray-500 dark:text-gray-400">{resolvedCourseTitle}</span> : null}
                        {lessonMeta.estimatedTime ? <span className="text-sm text-gray-500 dark:text-gray-500">{lessonMeta.estimatedTime}</span> : null}
                    </div>
                    <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl transition-colors">
                        {topic?.title}
                    </h1>
                    {topicDescription ? (
                        <p className="max-w-3xl text-xl font-medium leading-relaxed text-slate-700 dark:text-gray-300 transition-colors">
                            {topicDescription}
                        </p>
                    ) : null}
                    <div className={`mt-6 h-1.5 w-24 rounded-full ${presentation.accentSoftClass || 'bg-blue-200'}`}></div>
                </div>

                {lessonMeta.goals?.length ? (
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <h2 className={`text-sm font-bold uppercase tracking-[0.24em] ${presentation.accentTextClass || 'text-blue-500'}`}>Lesson Goals</h2>
                            <div className="mt-4 space-y-3">
                                {lessonMeta.goals.map((goal) => (
                                    <div key={goal} className="flex items-start gap-3 text-lg font-medium leading-relaxed text-slate-800 dark:text-gray-300">
                                        <span className={`mt-2.5 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-gray-500`} />
                                        <span>{goal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className={`text-sm font-bold uppercase tracking-[0.24em] ${presentation.accentTextClass || 'text-blue-500'}`}>Practice Focus</h2>
                            <p className="mt-4 text-lg font-medium leading-relaxed text-slate-800 dark:text-gray-300">{lessonMeta.practiceHint}</p>
                        </div>
                    </div>
                ) : null}

                {isProject && courseChallenge ? (
                    <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white dark:bg-[#151f32] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-colors mt-8">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full pointer-events-none blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60 flex items-center justify-center text-blue-700 dark:text-blue-300 shadow-inner">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                </div>
                                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Project Details</h2>
                            </div>

                            <div className="prose prose-lg prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 prose-p:leading-relaxed prose-p:mb-6 prose-li:leading-relaxed prose-ul:my-6 prose-ul:list-disc prose-ul:ml-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:ml-6 prose-strong:text-blue-700 dark:prose-strong:text-blue-400">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {courseChallenge.description?.split('<!-- SPLIT -->')[0] || courseChallenge.description}
                                </ReactMarkdown>
                            </div>

                            <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800/60 flex flex-col items-end gap-10">
                                {/* Environment Note */}
                                <div className="bg-indigo-50/80 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r-2xl rounded-l-md p-8 md:p-10 text-left shadow-sm w-full">
                                    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
                                        <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-800/60 flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-indigo-900 dark:text-indigo-200 text-sm uppercase tracking-[0.2em] mb-3">Project Environment Note</h4>
                                            <p className="text-indigo-800/90 dark:text-indigo-200/90 text-[17px] leading-loose font-medium">
                                                The frontend UI and backend infrastructure for this project has already been completely built for you. Your only task is to focus purely on writing the core logic in C.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Start Button */}
                                <div className="w-full flex justify-end">
                                    <button
                                        onClick={() => navigate(`/course-project/${courseChallenge.id}`, { state: { from: location.pathname } })}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-4 group"
                                    >
                                        Start Project
                                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        {displayContentBlocks
                            .slice()
                            .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                            .map(renderContentBlock)}

                        {courseChallenge ? (
                            <section className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-white dark:bg-gray-900/90 p-6 shadow-md sm:p-8 transition-colors">
                                <div className={`absolute inset-x-0 top-0 h-20 ${courseChallenge.solved ? 'bg-gradient-to-r from-emerald-500/10 dark:from-emerald-500/20 to-green-500/0' : 'bg-gradient-to-r from-blue-600/10 dark:from-blue-600/20 via-indigo-500/10 dark:via-indigo-500/15 to-transparent'}`}></div>
                                <div className="relative z-10">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                        <div className="max-w-2xl">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">Mastery Challenge</p>
                                            <h3 className={`mt-2 text-2xl font-extrabold tracking-tight ${courseChallenge.solved ? 'text-emerald-600 dark:text-emerald-300' : 'text-gray-900 dark:text-white'}`}>
                                                {courseChallenge.solved ? 'Challenge Completed' : 'Prove This Topic in Code'}
                                            </h3>
                                            <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">{courseChallenge.description}</p>
                                        </div>
                                        <div className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${courseChallenge.solved ? 'border-emerald-400/40 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200' : 'border-indigo-400/30 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-100'}`}>
                                            {courseChallenge.solved ? 'Solved' : 'Required to continue'}
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-3 lg:grid-cols-3">
                                        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 p-4">
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">Input</h4>
                                            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                {courseChallenge.input_format || 'No input is required for this challenge.'}
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 p-4">
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">Output</h4>
                                            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                {courseChallenge.output_format || 'Your program output must match the expected result exactly.'}
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-950/50 p-4">
                                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">Checklist</h4>
                                            <div className="mt-2 space-y-2">
                                                {challengeChecklist.map((item) => (
                                                    <div key={item} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                                            {courseChallenge.title?.toLowerCase().includes('project') ? 'Course Project' : 'Course Challenge'}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {courseChallenge.solved
                                                ? `You can review the solution or move to the next lesson.`
                                                : `Solve this ${courseChallenge.title?.toLowerCase().includes('project') ? 'project' : 'challenge'} to unlock the next lesson in the course path.`}
                                        </p>
                                        <button
                                            onClick={() => navigate(courseChallenge.title?.toLowerCase().includes('project') ? `/course-project/${courseChallenge.id}` : `/course-challenge/${courseChallenge.id}`, { state: { from: location.pathname } })}
                                            className={`rounded-lg px-6 py-2.5 text-sm font-bold transition-colors ${courseChallenge.solved ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-sm'}`}
                                        >
                                            {courseChallenge.solved ? `Review ${courseChallenge.title?.toLowerCase().includes('project') ? 'Project' : 'Challenge'}` : `Open ${courseChallenge.title?.toLowerCase().includes('project') ? 'Project' : 'Challenge'}`}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        ) : practiceProblems.length > 0 ? (
                            <section className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-white dark:bg-gray-900/90 p-8 shadow-xl dark:shadow-2xl sm:p-10 transition-colors">
                                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-blue-600/10 dark:from-blue-600/20 to-transparent"></div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Practice Problems</h3>
                                    <div className="mt-8 space-y-6">
                                        {practiceProblems.map((problem) => (
                                            <div key={problem.id} className="flex flex-col items-start justify-between gap-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-6 sm:flex-row sm:items-center">
                                                <p className="flex-1 text-lg font-light text-gray-700 dark:text-gray-300">{problem.problem_description}</p>
                                                <button
                                                    onClick={() => navigate(`/challenge/${problem.id}`, { state: { from: location.pathname } })}
                                                    className="w-full rounded-lg border border-indigo-500/50 bg-indigo-50 dark:bg-indigo-600/20 px-6 py-3 text-sm font-bold text-indigo-700 dark:text-indigo-200 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-600/40 hover:text-indigo-800 dark:hover:text-white sm:w-auto"
                                                >
                                                    Solve Practice Problem
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ) : null}
                    </>
                )}

                {/* Tips are now rendered sequentially above */}

                <div className="mt-12 flex items-center justify-between border-t border-gray-800 pt-8">
                    <button
                        onClick={onPrevious}
                        disabled={isFirst}
                        className={`rounded-xl px-6 py-3 font-bold transition-all ${isFirst ? 'cursor-not-allowed bg-gray-800/50 text-gray-600' : 'border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        Previous
                    </button>

                    <button
                        onClick={async () => {
                            if (courseChallenge && !courseChallenge.solved) {
                                return;
                            }

                            const progressUpdated = courseChallenge?.solved ? true : await handleMarkComplete();

                            if (courseChallenge?.solved) {
                                window.dispatchEvent(
                                    new CustomEvent('course-progress-updated', {
                                        detail: {
                                            courseId: resolvedCourseId,
                                        },
                                    })
                                );
                            }

                            if (progressUpdated && onNext) {
                                onNext();
                            }
                        }}
                        disabled={courseChallenge && !courseChallenge.solved}
                        title={courseChallenge && !courseChallenge.solved ? 'Complete the challenge to continue' : ''}
                        className={`rounded-xl px-8 py-3 font-bold transition-all ${courseChallenge && !courseChallenge.solved ? 'cursor-not-allowed bg-gray-800/50 text-gray-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500'}`}
                    >
                        {isLast ? 'Finish Course' : 'Next Lesson'}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TopicContent;
