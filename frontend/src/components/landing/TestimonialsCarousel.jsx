import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    { name: "Sarah Jenkins", role: "Senior Engineer @ TechCorp", content: "The cloud compiler's latency is practically non-existent. It's a frictionless environment that genuinely feels like an enterprise IDE.", initials: "SJ" },
    { name: "Michael T.", role: "CS Undergraduate", content: "The Global Arena completely rewired my learning habits. Competing internationally gives you an edge that standard curriculum simply cannot match.", initials: "MT" },
    { name: "Alex Rivera", role: "Full-Stack Developer", content: "The Immersive Web Studio is flawless. The instantaneous hot-reloading combined with the exquisite UI makes architecting web projects a joy.", initials: "AR" }
];

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 bg-[#F8FAFC] dark:bg-[#0F172A] relative transition-colors duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
            
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
                    >
                        Endorsed by the Elite.
                    </motion.h2>
                </div>

                <div className="relative">
                    <div className="absolute top-0 left-0 text-8xl text-primary-500/10 font-serif leading-none -translate-x-4 -translate-y-8">"</div>
                    <div className="absolute bottom-0 right-0 text-8xl text-primary-500/10 font-serif leading-none translate-x-4 translate-y-12">"</div>
                    
                    <div className="min-h-[250px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium italic mb-10 max-w-4xl mx-auto">
                                    "{testimonials[currentIndex].content}"
                                </p>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black dark:from-white dark:to-gray-300 flex items-center justify-center text-white dark:text-black font-bold text-xl shadow-xl mb-4">
                                        {testimonials[currentIndex].initials}
                                    </div>
                                    <div className="font-bold text-lg text-gray-900 dark:text-white">{testimonials[currentIndex].name}</div>
                                    <div className="text-primary-600 dark:text-primary-400 font-semibold text-sm">{testimonials[currentIndex].role}</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center mt-12 gap-3">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'w-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
