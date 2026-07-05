// frontend/src/pages/Roadmaps.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import * as feather from '../util/featherIcons';
import { useTheme } from '../hooks/useTheme.jsx';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';

// Updated roadmap data with all parts for each roadmap
import { contentService } from '../services/contentService';

// Icon mapping for roadmaps
const ROADMAP_ICONS = {
  'prog-langs': 'code',
  'fullstack': 'layout',
  'mobile': 'smartphone',
  'cybersec': 'shield',
  'devops': 'cloud',
  'ai-ml': 'cpu',
  'data-science': 'bar-chart-2'
};

// Color gradients for roadmaps
const ROADMAP_GRADIENTS = {
  'prog-langs': 'from-blue-700 to-blue-600',
  'fullstack': 'from-purple-700 to-purple-600',
  'mobile': 'from-green-700 to-green-600',
  'cybersec': 'from-red-700 to-red-600',
  'devops': 'from-orange-700 to-orange-600',
  'ai-ml': 'from-pink-700 to-pink-600',
  'data-science': 'from-indigo-700 to-indigo-600'
};


// --- Roadmap Category Card ---
const RoadmapCategoryCard = ({ roadmap, isExpanded, onToggleExpand }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggleExpand(roadmap.id);
  };

  const handleViewRoadmap = (e, roadmap, child = null) => {
    e.stopPropagation();

    // ... (keep navigation logic same as before, simplified for brevity in this view, 
    // strictly copying the switch case logic is fine, but for clean code I'll assume the original switch is preserved 
    // or I'll just copy the important mapping part if I was replacing the whole file. 
    // SINCE I AM REPLACING CONTENT, I MUST INCLUDE THE NAVIGATION LOGIC OR IT WILL BE LOST. 
    // I will include the full switch case again to be safe.)

    if (child) {
      switch (child.id) {
        case 'c-lang': navigate('/roadmaps/c-programming'); break;
        case 'python-lang': navigate('/roadmaps/python-programming'); break;
        case 'java-lang': navigate('/roadmaps/java-programming'); break;
        case 'frontend-dev': navigate('/roadmaps/frontend-development'); break;
        case 'backend-dev': navigate('/roadmaps/backend-development'); break;
        case 'database-dev': navigate('/roadmaps/database-development'); break;
        case 'deployment-dev': navigate('/roadmaps/deployment-development'); break;
        case 'fullstack-dev': navigate('/roadmaps/fullstack-development'); break;
        case 'android-dev': navigate('/roadmaps/android-development'); break;
        case 'ios-dev': navigate('/roadmaps/ios-development'); break;
        case 'crossplatform-dev': navigate('/roadmaps/cross-development'); break;
        case 'backend-mobile': navigate('/roadmaps/backend-apis-mobile-development'); break;
        case 'publishing-mobile': navigate('/roadmaps/publishing-mobile-development'); break;
        case 'foundations-sec': navigate('/roadmaps/cyber-security-foundations'); break;
        case 'defensive-sec': navigate('/roadmaps/cyber-security-defensive'); break;
        case 'webapp-sec': navigate('/roadmaps/cyber-security-webapp'); break;
        case 'offensive-sec': navigate('/roadmaps/cyber-security-offensive'); break;
        case 'forensics-sec': navigate('/roadmaps/cyber-security-forensics'); break;
        case 'fundamentals-devops': navigate('/roadmaps/devops-fundamentals'); break;
        case 'container-devops': navigate('/roadmaps/devops-container'); break;
        case 'orchestration-devops': navigate('/roadmaps/devops-orchestration'); break;
        case 'observability-devops': navigate('/roadmaps/devops-observability'); break;
        case 'math-ai': navigate('/roadmaps/ai-ml-math'); break;
        case 'coreml-ai': navigate('/roadmaps/ai-ml-core'); break;
        case 'deeplearning-ai': navigate('/roadmaps/ai-ml-deeplearning'); break;
        case 'production-ai': navigate('/roadmaps/ai-ml-production'); break;
        case 'python-ds': navigate('/roadmaps/data-science-python'); break;
        case 'wrangling-ds': navigate('/roadmaps/data-science-wrangling'); break;
        case 'modeling-ds': navigate('/roadmaps/data-science-modeling'); break;
        case 'bigdata-ds': navigate('/roadmaps/data-science-bigdata'); break;
        default:
          // Fallback for demo
          console.log(`Navigating to ${child.title}`);
      }
    } else {
      // alert(`Viewing roadmap for: ${roadmap.title}`);
    }
  };

  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    onToggleExpand(roadmap.id);
  };

  return (
    <div className={`mb-4 rounded-lg transition-all duration-300 border group ${isDark
      ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
      } ${isExpanded ? 'ring-1 ring-primary-500/20 border-primary-500/30' : ''}`}>

      {/* Header - Clickable */}
      <div
        className="cursor-pointer p-4 sm:p-5"
        onClick={handleCardClick}
      >
        <div className="flex flex-row items-center gap-4">
          {/* Icon Box */}
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${ROADMAP_GRADIENTS[roadmap.id]} flex items-center justify-center flex-shrink-0 shadow-md transform group-hover:scale-105 transition-transform duration-300`}>
            <i data-feather={ROADMAP_ICONS[roadmap.id]} className="w-6 h-6 text-white stroke-[1.5]"></i>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-base sm:text-lg font-bold mb-2 truncate ${isDark ? 'text-white' : 'text-gray-900 group-hover:text-primary-600'} transition-colors`}>
              {roadmap.title}
            </h3>

            <div className="flex flex-row items-center gap-2 text-xs font-medium overflow-x-auto no-scrollbar">
              <div className={`flex items-center flex-shrink-0 px-2.5 py-1 rounded-md ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                <i data-feather="clock" className="w-3 h-3 mr-1.5 text-primary-500"></i>
                <span className="whitespace-nowrap">~6 Months</span>
              </div>

              {roadmap.children && (
                <div className={`flex items-center flex-shrink-0 px-2.5 py-1 rounded-md ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  <i data-feather="layers" className="w-3 h-3 mr-1.5 text-primary-500"></i>
                  <span className="whitespace-nowrap">{roadmap.children.length} Modules</span>
                </div>
              )}
            </div>
          </div>

          {/* Expand Toggle */}
          <div className="flex items-center self-start sm:self-center">
            <button
              onClick={handleToggle}
              className={`p-1.5 rounded-md transition-all duration-300 ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-400'
                } ${isExpanded ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 rotate-180' : ''}`}
            >
              <i data-feather="chevron-down" className="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
        <div className="overflow-hidden">
          <div className={`p-6 sm:p-8 pt-0 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-100'}`}>
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <i data-feather="map" className="w-4 h-4 text-primary-500"></i>
                  <span>Specialization Tracks</span>
                </h4>
              </div>

              <div className="flex flex-col gap-3">
                {roadmap.children && roadmap.children.map((child, index) => (
                  <div
                    key={child.id}
                    className={`group/card flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${isDark
                      ? 'bg-gray-800 border-gray-700 hover:border-primary-500/50 hover:bg-gray-750'
                      : 'bg-white border-gray-200 hover:border-primary-200 hover:shadow-md'
                      }`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                          {index + 1}
                        </span>
                        <h5 className={`text-base font-bold truncate ${isDark ? 'text-white' : 'text-gray-900 group-hover/card:text-primary-600'} transition-colors`}>
                          {child.title}
                        </h5>
                      </div>

                      {/* Description - Hidden on Mobile */}
                      <p className={`text-sm hidden sm:block line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {child.short_description}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleViewRoadmap(e, roadmap, child)}
                      className={`flex-shrink-0 inline-flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${isDark
                        ? 'bg-primary-900/20 text-primary-400 border border-primary-500/30 hover:bg-primary-600 hover:text-white'
                        : 'bg-primary-50 text-primary-600 border border-primary-200 hover:bg-primary-600 hover:text-white'}`}
                    >
                      <span className="hidden sm:inline mr-2">Start</span>
                      <i data-feather="arrow-right" className="w-4 h-4"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Roadmaps Component ---
const Roadmaps = () => {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  // const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedRoadmapId, setExpandedRoadmapId] = useState(null);

  useEffect(() => {
    if (typeof feather !== 'undefined') {
      feather.replace();
    }

    const toggleVisibility = () => {
      // setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleToggleExpand = (roadmapId) => {
    setExpandedRoadmapId(prev => prev === roadmapId ? null : roadmapId);
  };

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-[#0f1117]' : 'bg-gray-50'}`}>
      <SEO 
        title="Developer Roadmaps"
        description="Step-by-step developer roadmaps and study guides. Pick your path and start your journey towards becoming an expert software engineer."
      />

      {/* Hero Section - Minimal */}
      <div className={`pt-24 pb-10 relative z-10 px-4 text-center ${isDark ? 'bg-gray-900' : 'bg-white'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-center">
             <Breadcrumbs items={[{ label: 'Roadmaps', path: '/roadmaps' }]} />
          </div>
          <h1 className={`text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Master Your <span className="text-primary-500">Dream Career</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Step-by-step guides and curated resources to help you become an expert in your field.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20" id="roadmaps-list">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {contentService.getPublishedContent('learningPath').map((roadmap) => (
              <RoadmapCategoryCard
                key={roadmap.id}
                roadmap={roadmap}
                isExpanded={expandedRoadmapId === roadmap.id}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA - Minimal & Professional */}
      <div className="py-20 px-4">
        <div className={`max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="px-6 py-12 md:p-16 text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Stop planning, start coding.
            </h2>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Join thousands of developers building their future with our comprehensive paths.
            </p>
            <Link
              to={isLoggedIn ? "/problems" : "/signup"}
              className={`inline-flex items-center px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 shadow-lg hover:transform hover:-translate-y-1 ${isDark
                ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-primary-900/30'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200'}`}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started Now'}
              <i data-feather="arrow-right" className="ml-2 w-4 h-4"></i>
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Roadmaps;
