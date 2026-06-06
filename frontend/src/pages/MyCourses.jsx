import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, PlayCircle, ArrowRight, Award, ArrowLeft } from 'lucide-react';
import { getEnrolledCourses } from '../api/courseApi';
import FullPageLoader from '../components/common/FullPageLoader';

const MyCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getEnrolledCourses();
                setCourses(data || []);
            } catch (error) {
                console.error("Failed to fetch enrolled courses", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <FullPageLoader message="Loading your courses..." />;
    }

    const ongoingCourses = courses.filter(c => c.progress < 100);
    const completedCourses = courses.filter(c => c.progress >= 100);

    const CourseCard = ({ course, isCompleted }) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative">
            <div className="h-48 sm:h-56 relative overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                {course.coverImage && course.coverImage !== '/api/placeholder/400/300' ? (
                    <img 
                        src={course.coverImage} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 group-hover:scale-110 transition-transform duration-700">
                        {course.icon || '💻'}
                    </div>
                )}
                
                {isCompleted ? (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                    </div>
                ) : (
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        {course.progress}%
                    </div>
                )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{course.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 line-clamp-2 flex-1 leading-relaxed">{course.description}</p>
                
                {!isCompleted && (
                    <div className="mb-8">
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 relative"
                                style={{ width: `${course.progress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                )}

                <Link 
                    to={`/courses/${course.id}`}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                        isCompleted 
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" 
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                    }`}
                >
                    {isCompleted ? (
                        <>
                            Review Course
                            <CheckCircle className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Continue Learning
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Link>
            </div>
        </div>
    );

    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <button 
                        onClick={() => navigate(-1)}
                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all mb-6"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl">
                            <BookOpen className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        My Courses
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
                        Track your learning progress, review completed materials, and pick up exactly where you left off.
                    </p>
                </div>

                {/* Stats Overview */}
                {courses.length > 0 && (
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 md:gap-4 mt-6 md:mt-0 w-full sm:w-auto">
                        <div className="bg-white dark:bg-gray-800 p-2.5 sm:px-6 sm:py-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-start gap-2 sm:gap-4 overflow-hidden">
                            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl shrink-0">
                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">Total Enrolled</p>
                                <p className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-none mt-0.5 sm:mt-1">{courses.length}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-2.5 sm:px-6 sm:py-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-start gap-2 sm:gap-4 overflow-hidden">
                            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-500/20 rounded-xl shrink-0">
                                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider truncate">Completed</p>
                                <p className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-none mt-0.5 sm:mt-1">{completedCourses.length}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {courses.length === 0 ? (
                <div className="w-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-10 sm:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group min-h-[400px]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-2xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="relative z-10 max-w-2xl">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-inner">
                            <BookOpen className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Your Learning Journey Starts Here</h2>
                        <p className="text-indigo-100 text-lg sm:text-xl mb-10 leading-relaxed font-medium">
                            You haven't enrolled in any courses yet. Explore our structured curriculum, complete challenges, and start building your foundational knowledge step by step.
                        </p>
                        
                        <Link to="/courses" className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 items-center gap-3 text-lg">
                            Browse Course Catalog
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    <div className="hidden lg:block relative z-10 mr-12">
                        <div className="w-64 h-64 border-4 border-white/20 rounded-3xl rotate-12 absolute inset-0 transition-transform duration-700 group-hover:rotate-6"></div>
                        <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/30 flex items-center justify-center transform -rotate-6 transition-transform duration-700 group-hover:rotate-0">
                            <BookOpen className="w-24 h-24 text-white/80" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-16">
                    {ongoingCourses.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">
                                    <Clock className="w-6 h-6" />
                                </span>
                                Ongoing Learning
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {ongoingCourses.map(course => (
                                    <CourseCard key={course.id} course={course} isCompleted={false} />
                                ))}
                            </div>
                        </section>
                    )}

                    {completedCourses.length > 0 && (
                        <section>
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 p-2 rounded-lg">
                                    <Award className="w-6 h-6" />
                                </span>
                                Completed
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {completedCourses.map(course => (
                                    <CourseCard key={course.id} course={course} isCompleted={true} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
