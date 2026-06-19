import React from 'react';
import { Sparkles, Bot, Zap, Code2 } from 'lucide-react';

const AIStudioTab = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#060B14]">
      
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="relative bg-white dark:bg-[#0A1122] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
          <Bot className="w-16 h-16 text-blue-600 dark:text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-display">AI Studio</h2>
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            Coming Soon
          </div>
        </div>
      </div>

      <p className="max-w-md text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
        We're building the future of coding. Generate websites from prompts, modify logic instantly, and let AI be your ultimate pair-programmer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        
        <div className="bg-slate-50 dark:bg-[#0A1122] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50">
          <Sparkles className="w-6 h-6 text-purple-500 mb-4 mx-auto" />
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Prompt to UI</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Describe what you want, and watch it build instantly in Web Studio.</p>
        </div>

        <div className="bg-slate-50 dark:bg-[#0A1122] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50">
          <Zap className="w-6 h-6 text-yellow-500 mb-4 mx-auto" />
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Auto-Refactor</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Highlight bad code and let AI optimize it for performance and readability.</p>
        </div>

        <div className="bg-slate-50 dark:bg-[#0A1122] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50">
          <Code2 className="w-6 h-6 text-blue-500 mb-4 mx-auto" />
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Smart Completion</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Context-aware multi-line completions that actually understand your codebase.</p>
        </div>

      </div>

    </div>
  );
};

export default AIStudioTab;
