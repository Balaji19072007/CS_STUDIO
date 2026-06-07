import React from 'react';

const TECHNOLOGIES = [
    "React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", 
    "Python", "C++", "Java", "Docker", "AWS", "GraphQL", "PostgreSQL",
    "MongoDB", "Redis", "Kafka", "Kubernetes"
];

const InfiniteMarquee = () => {
    // Duplicate the array twice to ensure seamless looping on very wide screens
    const items = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

    return (
        <div className="relative w-full overflow-hidden bg-white/40 dark:bg-black/20 border-y border-gray-200/50 dark:border-white/5 py-6 backdrop-blur-md z-20 transition-colors duration-500">
            {/* Fade edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#F8FAFC] dark:from-[#0B1120] to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F8FAFC] dark:from-[#0B1120] to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
            
            <div className="flex w-max animate-marquee">
                {items.map((tech, index) => (
                    <div 
                        key={index} 
                        className="flex items-center justify-center mx-10 text-gray-500 dark:text-gray-400 font-bold tracking-widest text-sm uppercase hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default"
                    >
                        {tech}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;
