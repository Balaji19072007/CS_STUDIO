import React from 'react';

const AuroraBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500">
            {/* Dark/Light background base handled by the wrapper div */}
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>
            
            {/* Animated glowing orbs for Aurora effect */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/30 dark:bg-primary-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
            
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/30 dark:bg-blue-600/20 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            
            <div className="absolute top-[30%] left-[40%] w-[50%] h-[50%] rounded-full bg-purple-400/30 dark:bg-purple-600/20 blur-[130px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

            {/* Aurora gradient layer */}
            <div 
                className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-color-burn dark:mix-blend-color-dodge z-0 animate-aurora"
                style={{
                    backgroundImage: `repeating-linear-gradient(100deg, transparent 10%, rgba(14, 165, 233, 0.2) 20%, rgba(168, 85, 247, 0.2) 30%, transparent 40%)`,
                    backgroundSize: '200% 200%'
                }}
            ></div>
        </div>
    );
};

export default AuroraBackground;
