// src/components/common/Footer.jsx

import React, { memo } from 'react';
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="dark-gradient w-full border-t border-gray-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright Text */}
                    <p className="text-sm text-gray-400 text-center md:text-left">
                        &copy; 2025 CS Studio. All rights reserved.
                    </p>

                    {/* Social Media */}
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Twitter">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="https://github.com/Balaji19072007?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="GitHub">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/balaji-reddy-590583290/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="YouTube">
                            <Youtube className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer);