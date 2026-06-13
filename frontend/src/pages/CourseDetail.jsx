import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse, getPhases, getTopics } from '../api/courseApi';
import { getCourseOverview } from '../data/courseOverviewData.js';
import { getCoursePresentation } from '../data/coursePresentation.js';
import { SkeletonLesson } from '../components/common/SkeletonLoader';
import { CourseNotFoundPage } from '../components/common/ErrorPages';
import EmptyState from '../components/common/EmptyState';

const getCourseIcon = (title) => {
  const lowerTitle = title?.toLowerCase() || '';
  if (lowerTitle.includes('c programming') || lowerTitle.includes('c language')) return 'C';
  if (lowerTitle.includes('python')) return 'Py';
  if (lowerTitle.includes('java')) return 'Jv';
  if (lowerTitle.includes('c++')) return 'C++';
  if (lowerTitle.includes('c#')) return 'C#';
  if (lowerTitle.includes('frontend') || lowerTitle.includes('web')) return 'UI';
  if (lowerTitle.includes('backend') || lowerTitle.includes('api')) return 'BE';
  if (lowerTitle.includes('data')) return 'DS';
  if (lowerTitle.includes('machine') || lowerTitle.includes('ai')) return 'ML';
  if (lowerTitle.includes('security') || lowerTitle.includes('cyber')) return 'SEC';
  if (lowerTitle.includes('devops') || lowerTitle.includes('cloud') || lowerTitle.includes('docker')) return 'OPS';
  if (lowerTitle.includes('mobile') || lowerTitle.includes('android') || lowerTitle.includes('ios')) return 'APP';
  return 'CS';
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCourse(courseId);
        if (!courseData) {
          setLoading(false);
          return;
        }

        setCourse(courseData);

        const phasesData = await getPhases(courseId);
        const phasesWithCounts = await Promise.all(
          phasesData.map(async (phase) => {
            try {
              const topics = await getTopics(phase.id);
              return {
                ...phase,
                topicsCount: topics.length,
                previewTopics: topics.slice(0, 4).map((topic) => topic.title),
              };
            } catch (error) {
              console.error(`Error loading topics for phase ${phase.id}:`, error);
              return {
                ...phase,
                topicsCount: 0,
                previewTopics: [],
              };
            }
          })
        );

        setPhases(phasesWithCounts);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const totalTopics = useMemo(
    () => phases.reduce((sum, phase) => sum + (phase.topicsCount || 0), 0),
    [phases]
  );

  const totalEstimatedHours = useMemo(
    () => phases.reduce((sum, phase) => sum + (phase.estimated_hours || 0), 0),
    [phases]
  );

  if (loading) {
    return <SkeletonLesson />;
  }

  if (!course) {
    return <CourseNotFoundPage courseName={course?.title} />;
  }

  const overview = getCourseOverview(course.title);
  const presentation = getCoursePresentation(course.title);
  const phasePreview = phases.slice(0, 4);

  return (
    <div className="min-h-screen dark-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-start">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg border border-gray-700 hover:border-gray-500 transition-all group font-medium"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Courses</span>
          </button>
        </div>

        <section className="rounded-[2rem] border border-gray-800 bg-[#111827]/90 shadow-2xl overflow-hidden relative">
          <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-r ${presentation.heroGradient}`} />
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-0">
            <div className="p-8 sm:p-10 lg:p-12 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-2xl border ${presentation.badgeClass} flex items-center justify-center text-2xl font-bold tracking-wide shadow-lg`}>
                  {presentation.badge || getCourseIcon(course.title)}
                </div>
                <div>
                  <p className={`text-sm uppercase tracking-[0.3em] ${presentation.accentTextClass}`}>{presentation.trackLabel}</p>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">{course.title}</h1>
                  <p className="text-sm text-gray-400 mt-3 max-w-2xl">{presentation.strapline}</p>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                {overview.summary}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <div className="px-4 py-2 rounded-xl bg-slate-900/70 border border-gray-800 text-sm text-gray-200">
                  {phases.length} phases
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-900/70 border border-gray-800 text-sm text-gray-200">
                  {totalTopics} topics
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-900/70 border border-gray-800 text-sm text-gray-200">
                  {totalEstimatedHours || course.estimated_hours || 'Self-paced'} study hours
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-900/70 border border-gray-800 text-sm text-gray-200">
                  {course.level || course.difficulty || 'Guided learning'}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 mt-8">
                {presentation.focusAreas.map((item) => (
                  <div key={item} className={`rounded-2xl border ${presentation.accentBorderClass} ${presentation.accentSoftClass} px-4 py-4`}>
                    <p className={`text-xs uppercase tracking-[0.24em] ${presentation.accentTextClass}`}>Focus Area</p>
                    <p className="text-sm text-white mt-2 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => navigate(`/courses/${courseId}/learn`)}
                  className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg ${presentation.buttonClass}`}
                >
                  Start Learning
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  onClick={() => navigate('/certificates')}
                  className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl transition-colors font-semibold border ${presentation.ghostButtonClass}`}
                >
                  View Certificates
                </button>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-gray-800 bg-black/20 p-8 sm:p-10">
              <h2 className="text-xl font-semibold text-white mb-5">How You Will Learn</h2>
              <div className={`rounded-2xl border ${presentation.accentBorderClass} ${presentation.accentSoftClass} p-5 mb-5`}>
                <p className={`text-xs uppercase tracking-[0.24em] ${presentation.accentTextClass}`}>Study Approach</p>
                <p className="text-sm text-gray-200 mt-3 leading-relaxed">
                  {presentation.learningStyle}
                </p>
              </div>
              <div className="space-y-4">
                {overview.whyLearn.map((item) => (
                  <div key={item} className="rounded-2xl border border-gray-800 bg-slate-900/60 p-4">
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-10">
          <section className="rounded-3xl border border-gray-800 bg-[#111827]/90 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">What you will be able to do</h2>
            <div className="space-y-4">
              {overview.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-gray-800">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-800 bg-[#111827]/90 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Before you start</h2>
            <div className="space-y-3">
              {overview.prerequisites.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-900/60 border border-gray-800 px-4 py-3 text-gray-300">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
              <h3 className="text-lg font-semibold text-amber-200 mb-2">Completion certificate</h3>
              <p className="text-sm leading-relaxed text-amber-100/90">
                {overview.certificate}
              </p>
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-gray-800 bg-[#111827]/90 p-8 mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Curriculum Snapshot</h2>
              <p className="text-gray-400 mt-2">
                Browse the first phases to understand how the course builds skill step by step.
              </p>
            </div>
            <button
              onClick={() => navigate(`/courses/${courseId}/learn`)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${presentation.buttonClass}`}
            >
              Open Learning Path
            </button>
          </div>

          {phasePreview.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {phasePreview.map((phase, index) => (
                <div key={phase.id} className="rounded-2xl border border-gray-800 bg-slate-900/60 p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className={`text-xs uppercase tracking-[0.25em] ${presentation.accentTextClass}`}>
                      Phase {index + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {phase.topicsCount || 0} topics
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                  <p className="text-gray-400 mt-2 leading-relaxed">
                    {phase.description || 'Focused lesson sequence for this stage of the course.'}
                  </p>
                  {phase.previewTopics?.length ? (
                    <div className="mt-4 space-y-2">
                      {phase.previewTopics.map((topic) => (
                        <div key={topic} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className={`mt-1 h-1.5 w-1.5 rounded-full ${presentation.accentSoftClass}`} />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {phase.estimated_hours ? (
                    <p className="text-sm text-gray-500 mt-3">{phase.estimated_hours} study hours</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Curriculum coming soon"
              description="Curriculum details will appear here once phases are available for this course."
              compact
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;
