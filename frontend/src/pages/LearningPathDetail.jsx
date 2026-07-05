import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as feather from '../util/featherIcons';
import SEO from '../components/common/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { NotFoundPage } from '../components/common/ErrorPages';

const LEARNING_PATHS_DETAIL_DATA = {
    'full-stack-engineer': {
        title: 'Full Stack Engineer',
        description: 'Master both frontend and backend development to build complete web applications from scratch.',
        long_description: 'This comprehensive learning path will take you from absolute beginner to a capable Full Stack Engineer. You will learn the foundations of web development with HTML, CSS, and JavaScript, before diving into advanced frontend frameworks like React. On the backend, you will master Node.js, databases (SQL & NoSQL), and API design, giving you the skills to architect and deploy production-ready applications.',
        icon: 'layout',
        color: 'from-purple-600 to-indigo-600',
        modules: [
            { title: 'Frontend Basics', description: 'HTML, CSS, JavaScript fundamentals.', roadmap: 'frontend-development' },
            { title: 'Advanced Frontend', description: 'React, State Management, TailWind CSS.', roadmap: 'frontend-development' },
            { title: 'Backend Fundamentals', description: 'Node.js, Express, REST APIs.', roadmap: 'backend-development' },
            { title: 'Databases', description: 'SQL (PostgreSQL), NoSQL (MongoDB).', roadmap: 'database-development' },
            { title: 'Full Stack Integration', description: 'Connecting frontend to backend, Auth.', roadmap: 'fullstack-development' },
            { title: 'Deployment', description: 'Docker, CI/CD, AWS basics.', roadmap: 'deployment-development' }
        ]
    },
    'data-scientist': {
        title: 'Data Scientist',
        description: 'Learn to extract insights from data using Python, statistics, and machine learning models.',
        long_description: 'Data Science is one of the most highly sought-after fields today. This path starts with Python programming and statistical mathematics, teaching you how to analyze and visualize large datasets. You will progress into building predictive machine learning models and deploying them using modern data science pipelines.',
        icon: 'bar-chart-2',
        color: 'from-blue-600 to-cyan-600',
        modules: [
            { title: 'Python for Data', description: 'Pandas, NumPy, Matplotlib.', roadmap: 'data-science-python' },
            { title: 'Data Wrangling', description: 'Cleaning, processing, and EDA.', roadmap: 'data-science-wrangling' },
            { title: 'Statistical Modeling', description: 'Probability, hypothesis testing, A/B tests.', roadmap: 'data-science-modeling' },
            { title: 'Machine Learning', description: 'Scikit-learn, Regression, Classification.', roadmap: 'ai-ml-core' },
            { title: 'Big Data', description: 'Spark, Hadoop ecosystems.', roadmap: 'data-science-bigdata' }
        ]
    },
    'cyber-security-specialist': {
        title: 'Cyber Security Specialist',
        description: 'Defend systems against attacks, learn ethical hacking, and master network security protocols.',
        long_description: 'In an increasingly connected world, security is paramount. This path teaches you the foundations of networking and cryptography before moving into defensive security (Blue Team) and offensive security (Red Team) strategies. You will learn to secure web applications, networks, and infrastructure against modern threats.',
        icon: 'shield',
        color: 'from-red-600 to-rose-600',
        modules: [
            { title: 'Security Foundations', description: 'Networking, Cryptography basics.', roadmap: 'cyber-security-foundations' },
            { title: 'Defensive Security', description: 'Firewalls, IDS/IPS, SOC operations.', roadmap: 'cyber-security-defensive' },
            { title: 'Web App Security', description: 'OWASP Top 10, Secure Coding.', roadmap: 'cyber-security-webapp' },
            { title: 'Offensive Security', description: 'Ethical hacking, Penetration testing.', roadmap: 'cyber-security-offensive' },
            { title: 'Incident Response', description: 'Forensics, Malware Analysis.', roadmap: 'cyber-security-forensics' }
        ]
    },
    'ai-ml-engineer': {
        title: 'AI / ML Engineer',
        description: 'Build the future with neural networks, deep learning, and scalable AI architectures.',
        long_description: 'Artificial Intelligence is revolutionizing every industry. This path covers the hardcore mathematics (Linear Algebra, Calculus) required for AI, before diving deep into machine learning algorithms and deep learning architectures (CNNs, RNNs, Transformers). You will learn to build, train, and deploy AI models into production.',
        icon: 'cpu',
        color: 'from-pink-600 to-rose-600',
        modules: [
            { title: 'Math for AI', description: 'Linear Algebra, Calculus, Stats.', roadmap: 'ai-ml-math' },
            { title: 'Core ML Algorithms', description: 'Supervised & Unsupervised Learning.', roadmap: 'ai-ml-core' },
            { title: 'Deep Learning', description: 'Neural Networks, PyTorch/TensorFlow.', roadmap: 'ai-ml-deeplearning' },
            { title: 'Production ML', description: 'MLOps, Model Deployment, Scaling.', roadmap: 'ai-ml-production' }
        ]
    }
};

const LearningPathDetail = () => {
    const { pathSlug } = useParams();
    const pathData = LEARNING_PATHS_DETAIL_DATA[pathSlug];

    useEffect(() => {
        if (typeof feather !== 'undefined' && feather.replace) {
            feather.replace();
        }
    }, [pathSlug]);

    if (!pathData) {
        return <NotFoundPage />;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <SEO 
                title={`${pathData.title} Learning Path`}
                description={pathData.description}
            />
            
            <div className="pt-24 pb-12 relative z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs items={[
                        { label: 'Learning Paths', path: '/learning-paths' },
                        { label: pathData.title, path: `/learning-paths/${pathSlug}` }
                    ]} />
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${pathData.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <i data-feather={pathData.icon} className="w-12 h-12 text-white"></i>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                                {pathData.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                {pathData.long_description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Curriculum Modules</h2>
                
                <div className="space-y-6">
                    {pathData.modules.map((mod, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col sm:flex-row items-center p-6 gap-6">
                            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                {idx + 1}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{mod.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{mod.description}</p>
                            </div>
                            <Link 
                                to={`/roadmaps/${mod.roadmap}`}
                                className="inline-flex items-center px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-primary-500 hover:text-white text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex-shrink-0"
                            >
                                View Roadmap <i data-feather="arrow-right" className="w-4 h-4 ml-2"></i>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningPathDetail;
