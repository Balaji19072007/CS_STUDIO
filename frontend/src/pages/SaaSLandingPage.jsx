import React, { useEffect, useState } from 'react';
import HeroSection from '../components/landing/HeroSection.jsx';
import InfiniteMarquee from '../components/landing/InfiniteMarquee.jsx';
import FeatureBentoGrid from '../components/landing/FeatureBentoGrid.jsx';
import InteractiveDemo from '../components/landing/InteractiveDemo.jsx';
import RoadmapVisualization from '../components/landing/RoadmapVisualization.jsx';
import CommunityFeed from '../components/landing/CommunityFeed.jsx';
import StatsCounters from '../components/landing/StatsCounters.jsx';
import TestimonialsCarousel from '../components/landing/TestimonialsCarousel.jsx';
import CertificateShowcase from '../components/landing/CertificateShowcase.jsx';
import CTASection from '../components/landing/CTASection.jsx';

const SaaSLandingPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative bg-[#F8FAFC] dark:bg-[#0B1120] min-h-screen text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 overflow-x-hidden selection:bg-primary-500/30">
            {/* Global Mouse-Follow Glow Effect */}
            <div 
                className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 hidden md:block"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.05), transparent 40%)`
                }}
            />

            <HeroSection />
            <InfiniteMarquee />
            <StatsCounters />
            <FeatureBentoGrid />
            <InteractiveDemo />
            <RoadmapVisualization />
            <CommunityFeed />
            <TestimonialsCarousel />
            <CertificateShowcase />
            <CTASection />
        </div>
    );
};

export default SaaSLandingPage;
