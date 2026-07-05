import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import { getAllCourses } from '../api/courseApi';
import SEO from '../components/common/SEO';
import { SkeletonDashboard } from '../components/common/SkeletonLoader';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Ensure C and Java are listed by default if database is empty/unavailable
                let fetchedCourses = [];
                try {
                    fetchedCourses = await getAllCourses();
                } catch (e) {
                    console.warn("Failed to fetch courses from DB, using fallbacks.", e);
                }
                
                // Merge fallbacks if they are missing
                const hasC = fetchedCourses.find(c => c.id === 'c-lang' || c.id === 'c-programming');
                const hasJava = fetchedCourses.find(c => c.id === 'java-programming');
                
                if (!hasC) fetchedCourses.push({ id: 'c-lang', title: 'C Programming', description: 'Master C programming from basics to advanced concepts.', difficulty: 'Beginner to Advanced' });
                if (!hasJava) fetchedCourses.push({ id: 'java-programming', title: 'Java Programming', description: 'Master Java programming from basics to advanced concepts.', difficulty: 'Beginner to Advanced' });

                setCourses(fetchedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, [courses]);

    if (loading) return <SkeletonDashboard />;

    return (
        <div className="w-full min-h-screen dark-gradient-secondary transition-colors duration-300">
            <SEO 
                title="Course Catalog" 
                description="Browse our collection of comprehensive computer science and programming courses."
            />
            
            {/* Hero Section */}
            <div className="pt-24 pb-12 relative z-10 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                        Explore Our <span className="text-primary-600 dark:text-primary-500">Curriculum</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-4">
                        Comprehensive learning paths designed to take you from beginner to industry-ready.
                    </p>
                </div>
            </div>

            {/* Course Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Link 
                            to={`/courses/${course.id}`} 
                            key={course.id}
                            className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group hover:-translate-y-1"
                        >
                            <div className="h-48 bg-gray-100 dark:bg-gray-900 relative overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 dark:from-primary-500/20 dark:to-purple-500/20 group-hover:opacity-100 transition-opacity"></div>
                                {/* Icon representation */}
                                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex items-center justify-center text-3xl font-bold text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 z-10 group-hover:scale-110 transition-transform duration-300">
                                    {course.title.charAt(0)}
                                </div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                                        {course.difficulty || 'Guided'}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {course.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                    {course.description || course.overview_description || `Learn ${course.title} from scratch.`}
                                </p>
                                
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                        View Details
                                    </span>
                                    <i data-feather="arrow-right" className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors transform group-hover:translate-x-1"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
