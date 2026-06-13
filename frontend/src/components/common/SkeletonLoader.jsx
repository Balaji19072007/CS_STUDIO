import React from 'react';
import { cn } from '../../lib/utils';

// Basic Building Block
export const Skeleton = ({ className }) => (
    <div className={`bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl ${className}`} />
);

export const TopicSkeleton = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0F172A] px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors duration-300">
            {/* Title Section */}
            <div className="space-y-4 pb-8 border-b border-gray-200 dark:border-gray-800">
                <Skeleton className="h-10 sm:h-12 w-3/4 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800/50" />
                <div className="w-24 h-1.5 bg-blue-200 dark:bg-blue-600/30 rounded-full mt-6 animate-pulse"></div>
            </div>

            {/* Content Blocks */}
            <div className="space-y-12">
                {/* Definition-like block */}
                <div className="relative p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1E293B]/50 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400/50 to-cyan-400/50 dark:from-blue-500/50 dark:to-cyan-500/50"></div>
                    <Skeleton className="h-4 w-24 mb-6 bg-blue-200 dark:bg-blue-500/20" />
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700/50" />
                        <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700/50" />
                        <Skeleton className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700/50" />
                    </div>
                </div>

                {/* Text blocks */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-[95%] bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-[90%] bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-[85%] bg-gray-200 dark:bg-gray-800" />
                </div>

                {/* Code/Syntax Block */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded bg-purple-200 dark:bg-purple-500/20" />
                        <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <div className="h-48 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-gray-200 dark:border-gray-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                        <div className="p-4 space-y-3">
                            <Skeleton className="h-3 w-3/4 bg-gray-300 dark:bg-gray-800" />
                            <Skeleton className="h-3 w-1/2 bg-gray-300 dark:bg-gray-800" />
                            <Skeleton className="h-3 w-2/3 bg-gray-300 dark:bg-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Example Block - Complex Card */}
                <div className="space-y-4">
                    <Skeleton className="h-8 w-40 bg-gray-200 dark:bg-gray-800" />
                    <div className="bg-gray-50 dark:bg-[#1E293B]/30 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                            <Skeleton className="h-6 w-24 rounded-lg bg-blue-100 dark:bg-blue-600/20" />
                        </div>
                        <Skeleton className="h-32 w-full bg-white dark:bg-[#0F172A] rounded-lg border border-gray-200 dark:border-gray-800" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Dashboard Skeleton (High fidelity matching UserHomePage)
export const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0f111a] pt-6 sm:pt-8 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-3 sm:gap-4 pb-4 sm:pb-6 md:pb-8 border-b border-gray-200 dark:border-gray-800">
                    <div className="space-y-3 w-full md:w-1/2 flex flex-col items-center md:items-start">
                        <Skeleton className="h-8 sm:h-10 w-64 bg-gray-300 dark:bg-gray-800" />
                        <Skeleton className="h-4 sm:h-5 w-48 bg-gray-200 dark:bg-gray-800/60" />
                    </div>
                    <div className="hidden md:block">
                        <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-800" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                        {/* Daily Challenge Hero Card */}
                        <div className="relative h-48 sm:h-64 rounded-2xl sm:rounded-3xl bg-gray-200 dark:bg-gray-800 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                        </div>

                        {/* Grid: Activity + Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {/* Activity Graph */}
                            <div className="h-60 rounded-3xl bg-gray-200 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 p-6 space-y-6">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-24 dark:bg-gray-700" />
                                    <Skeleton className="h-5 w-20 rounded-full dark:bg-gray-700" />
                                </div>
                                <div className="h-32 w-full flex items-end justify-between px-2">
                                    {[...Array(7)].map((_, i) => (
                                        <Skeleton key={i} className={`w-8 rounded-t-lg dark:bg-gray-700 ${i % 2 === 0 ? 'h-20' : 'h-12'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-col gap-4 justify-between h-60">
                                <div className="h-full rounded-3xl bg-gray-200 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-12 h-12 rounded-xl dark:bg-gray-700" />
                                        <div>
                                            <Skeleton className="h-5 w-24 mb-2 dark:bg-gray-700" />
                                            <Skeleton className="h-3 w-32 dark:bg-gray-700" />
                                        </div>
                                    </div>
                                    <Skeleton className="w-6 h-6 rounded-full dark:bg-gray-700" />
                                </div>
                                <div className="h-full rounded-3xl bg-gray-200 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-12 h-12 rounded-xl dark:bg-gray-700" />
                                        <div>
                                            <Skeleton className="h-5 w-24 mb-2 dark:bg-gray-700" />
                                            <Skeleton className="h-3 w-32 dark:bg-gray-700" />
                                        </div>
                                    </div>
                                    <Skeleton className="w-6 h-6 rounded-full dark:bg-gray-700" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-4 space-y-6 sm:space-y-8">
                        {/* Rank Card */}
                        <div className="h-64 rounded-3xl bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 p-6 flex flex-col items-center justify-center space-y-4">
                            <Skeleton className="w-20 h-20 rounded-full dark:bg-gray-700" />
                            <Skeleton className="w-32 h-6 dark:bg-gray-700" />
                            <Skeleton className="w-48 h-4 dark:bg-gray-700" />
                        </div>

                        {/* Mastery Widget */}
                        <div className="h-auto rounded-3xl bg-gray-200 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 p-6 space-y-6">
                            <Skeleton className="w-40 h-6 dark:bg-gray-700" />
                            <div className="space-y-4">
                                <Skeleton className="w-full h-8 rounded-full dark:bg-gray-700" />
                                <Skeleton className="w-full h-8 rounded-full dark:bg-gray-700" />
                                <Skeleton className="w-full h-8 rounded-full dark:bg-gray-700" />
                            </div>
                        </div>

                        {/* Recommended List */}
                        <div className="rounded-3xl bg-gray-200 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 p-6 space-y-4">
                            <div className="flex justify-between">
                                <Skeleton className="w-24 h-5 dark:bg-gray-700" />
                                <Skeleton className="w-16 h-4 dark:bg-gray-700" />
                            </div>
                            <Skeleton className="w-full h-16 rounded-2xl dark:bg-gray-700" />
                            <Skeleton className="w-full h-16 rounded-2xl dark:bg-gray-700" />
                            <Skeleton className="w-full h-16 rounded-2xl dark:bg-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Challenge Skeleton (Split View)
export const ChallengeSkeleton = () => {
    return (
        <div className="h-screen bg-gray-50 dark:bg-[#0F172A] flex flex-col overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E293B] px-4 flex items-center justify-between shrink-0 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <Skeleton className="w-48 h-5 bg-gray-200 dark:bg-gray-700" />
                </div>
                <Skeleton className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-0 lg:p-6 lg:gap-6">
                {/* Left Panel */}
                <div className="w-full h-full lg:rounded-xl md:w-[46%] flex flex-col border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300 shadow-xl overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-1 pt-1 gap-1">
                        <Skeleton className="flex-1 h-12 bg-blue-50 dark:bg-gray-800 rounded-t-lg" />
                        <Skeleton className="flex-1 h-12 bg-gray-100 dark:bg-gray-800/50 rounded-t-lg" />
                        <Skeleton className="flex-1 h-12 bg-gray-100 dark:bg-gray-800/50 rounded-t-lg" />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 space-y-8 animate-pulse">
                        <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-800" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800/50" />
                            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800/50" />
                            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800/50" />
                        </div>

                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
                            <Skeleton className="h-12 w-full bg-gray-100 dark:bg-gray-800/30 rounded-lg" />
                        </div>

                        <Skeleton className="h-32 w-full bg-gray-100 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-800" />
                    </div>
                </div>

                {/* Right Panel - Editor Proxy */}
                <div className="w-full h-[60vh] lg:h-full lg:rounded-xl md:w-[54%] flex flex-col gap-4 bg-transparent mt-4 lg:mt-0 transition-colors duration-300">
                    <div className="flex-1 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl lg:rounded-xl flex flex-col overflow-hidden">
                        <div className="h-12 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-4 flex items-center justify-between">
                            <Skeleton className="w-24 h-4 bg-gray-200 dark:bg-gray-700" />
                            <div className="flex gap-2">
                                <Skeleton className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                                <Skeleton className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                        <div className="flex-1 p-4 space-y-2 relative overflow-hidden bg-[#1e1e1e]">
                            {/* Line numbers and code */}
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-4 w-6 bg-gray-600/50" />
                                    <Skeleton className={`h-4 bg-gray-700/50 ${i === 3 ? 'w-1/4' : i === 7 ? 'w-1/3' : 'w-1/2'}`} />
                                </div>
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e1e1e]/50 pointer-events-none"></div>
                        </div>
                        <div className="h-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-4 flex items-center justify-end gap-3">
                            <Skeleton className="w-20 h-8 rounded-lg bg-gray-300 dark:bg-gray-700" />
                            <Skeleton className="w-24 h-8 rounded-lg bg-blue-400 dark:bg-blue-600" />
                        </div>
                    </div>
                    <div className="h-64 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] shadow-xl lg:rounded-xl flex flex-col overflow-hidden">
                        <div className="h-10 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-4 flex items-center">
                            <Skeleton className="w-28 h-4 bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <div className="flex-1 p-4">
                            <Skeleton className="w-48 h-4 bg-gray-200 dark:bg-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Profile Skeleton
export const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-8 w-48 mb-6 bg-gray-200 dark:bg-gray-700" />

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3 flex justify-center">
                            <Skeleton className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <div className="lg:w-2/3 space-y-6">
                            <div className="flex gap-4">
                                <div className="w-1/2 space-y-2">
                                    <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                                    <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                                </div>
                                <div className="w-1/2 space-y-2">
                                    <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                                    <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
                                <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
                                <Skeleton className="h-32 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Learning Skeleton (Sidebar + Content)
export const LearningSkeleton = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-[#0F172A] overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="h-14 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-700/50 px-4 flex items-center justify-between shadow-lg relative z-20 shrink-0 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="w-48 h-6 bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="hidden lg:flex w-80 h-full bg-white dark:bg-[#0F172A] border-r border-gray-200 dark:border-gray-800 flex-col p-4 space-y-4 shrink-0 transition-colors duration-300">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="rounded-xl overflow-hidden bg-gray-50 dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700/50 p-4 space-y-2 transition-colors duration-300">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-32 bg-gray-300 dark:bg-gray-700/80" />
                                <Skeleton className="h-4 w-4 bg-gray-300 dark:bg-gray-700/80" />
                            </div>
                            {i === 0 && (
                                <div className="space-y-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700/50">
                                    <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700/30 rounded" />
                                    <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700/30 rounded" />
                                    <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700/30 rounded" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Content Placeholder */}
                <div className="flex-1 bg-gray-50 dark:bg-[#0F172A] p-8 flex flex-col items-center justify-center space-y-8 animate-pulse transition-colors duration-300">
                    <Skeleton className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800/50" />
                    <div className="text-center space-y-4 w-full flex flex-col items-center">
                        <Skeleton className="h-8 w-1/3 bg-gray-200 dark:bg-gray-800/50" />
                        <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800/50" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Quiz Skeleton
export const QuizSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] p-8 flex items-center justify-center transition-colors duration-300">
            <div className="max-w-3xl w-full text-center space-y-8">
                <Skeleton className="h-12 w-3/4 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg" />

                <div className="bg-white dark:bg-[#1E293B] rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl text-left space-y-6 transition-colors duration-300">
                    <Skeleton className="h-8 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-700/50" />
                        <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-700/50" />
                        <Skeleton className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700/50" />
                        <Skeleton className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700/50" />
                    </div>
                </div>

                <Skeleton className="h-16 w-48 mx-auto rounded-full bg-blue-100 dark:bg-blue-600/20" />

                <div className="mt-12 text-left space-y-4">
                    <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-800" />
                    <div className="space-y-3">
                        <Skeleton className="h-20 w-full rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50" />
                        <Skeleton className="h-20 w-full rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Problems Skeleton (List View)
export const ProblemsSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] pb-20 transition-colors duration-300">
            {/* Hero Section */}
            <div className="pt-24 pb-12 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-6 w-1/2 md:w-1/3 mx-auto bg-gray-200 dark:bg-gray-800/50" />
                    <Skeleton className="h-12 w-48 mx-auto rounded-full bg-gray-200 dark:bg-gray-800" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
                {/* Filters Skeleton */}
                <div className="mb-10 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                    <Skeleton className="w-full md:w-96 h-10 bg-gray-200 dark:bg-gray-800" />
                    <div className="flex gap-4 w-full md:w-auto">
                        <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                        <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                    </div>
                </div>

                {/* Problem Cards Skeleton */}
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-[#1E293B] rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="space-y-2 w-full sm:w-2/3">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-6 w-48 bg-gray-200 dark:bg-gray-700" />
                                    <Skeleton className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700/50" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-16 bg-gray-100 dark:bg-gray-700/30" />
                                    <Skeleton className="h-4 w-16 bg-gray-100 dark:bg-gray-700/30" />
                                </div>
                            </div>
                            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
                                <Skeleton className="h-4 w-24 bg-gray-100 dark:bg-gray-700/30" />
                                <Skeleton className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// ─── SkeletonCard ──────────────────────────────────────────────────
export const SkeletonCard = ({ className = '', compact = false }) => (
  <div className={cn(
    'rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden bg-white dark:bg-gray-800/50',
    className
  )}>
    {!compact && (
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/5 to-transparent -translate-x-full animate-shimmer" />
      </div>
    )}
    <div className={compact ? 'p-4 space-y-3' : 'p-5 sm:p-6 space-y-4'}>
      <Skeleton className={cn('bg-gray-200 dark:bg-gray-700', compact ? 'h-4 w-3/4' : 'h-5 w-2/3')} />
      <Skeleton className={cn('bg-gray-100 dark:bg-gray-700/50', compact ? 'h-3 w-full' : 'h-4 w-full')} />
      <Skeleton className={cn('bg-gray-100 dark:bg-gray-700/50', compact ? 'h-3 w-4/5' : 'h-4 w-4/5')} />
      {!compact && (
        <div className="pt-3 flex items-center justify-between">
          <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      )}
    </div>
  </div>
);

// ─── SkeletonLesson ───────────────────────────────────────────────
export const SkeletonLesson = () => (
  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
    <div className="space-y-4">
      <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <Skeleton className="h-8 sm:h-10 w-3/4 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700/60" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-20 rounded-full bg-gray-100 dark:bg-gray-700/30" />
        <Skeleton className="h-6 w-24 rounded-full bg-gray-100 dark:bg-gray-700/30" />
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700/50 pt-8 space-y-6">
      <Skeleton className="h-40 w-full rounded-xl bg-gray-100 dark:bg-gray-800/50" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700/50" />
        <Skeleton className="h-4 w-[95%] bg-gray-200 dark:bg-gray-700/50" />
        <Skeleton className="h-4 w-[88%] bg-gray-200 dark:bg-gray-700/50" />
        <Skeleton className="h-4 w-[92%] bg-gray-200 dark:bg-gray-700/50" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700/50" />
        <Skeleton className="h-4 w-[85%] bg-gray-200 dark:bg-gray-700/50" />
        <Skeleton className="h-4 w-[78%] bg-gray-200 dark:bg-gray-700/50" />
      </div>
    </div>

    <div className="border-t border-gray-200 dark:border-gray-700/50 pt-8 space-y-4">
      <Skeleton className="h-48 w-full rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/30" />
      <Skeleton className="h-48 w-full rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/30" />
    </div>

    <div className="flex items-center justify-between pt-4">
      <Skeleton className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-10 w-28 rounded-xl bg-blue-200 dark:bg-blue-500/20" />
    </div>
  </div>
);

// ─── SkeletonQuiz ─────────────────────────────────────────────────
export const SkeletonQuiz = () => (
  <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </div>

    <Skeleton className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />

    <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 sm:p-8 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16 bg-gray-100 dark:bg-gray-700/50" />
        <Skeleton className="h-6 sm:h-7 w-3/4 bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 shrink-0" />
            <Skeleton className="h-4 flex-1 bg-gray-100 dark:bg-gray-700/30" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
        <Skeleton className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-32 rounded-xl bg-emerald-200 dark:bg-emerald-500/20" />
      </div>
    </div>

    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
      ))}
    </div>
  </div>
);

// ─── SkeletonDashboard (improved) ─────────────────────────────────
export const SkeletonDashboard = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-8 sm:h-9 w-56 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-700/60" />
      </div>
      <Skeleton className="h-9 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5 space-y-3">
          <Skeleton className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-7 w-16 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-24 bg-gray-100 dark:bg-gray-700/50" />
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-20 bg-gray-100 dark:bg-gray-700/50" />
        </div>
        <div className="flex items-end justify-between gap-2 h-32 pt-4">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className={`flex-1 rounded-t-lg bg-gray-200 dark:bg-gray-700 ${i % 3 === 0 ? 'h-24' : i % 3 === 1 ? 'h-16' : 'h-20'}`} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5 sm:p-6 space-y-4">
        <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col items-center gap-3 py-4">
          <Skeleton className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-100 dark:bg-gray-700/50" />
        </div>
      </div>
    </div>

    <Skeleton className="h-48 w-full rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50" />
  </div>
);

export default { TopicSkeleton, DashboardSkeleton, ChallengeSkeleton, ProfileSkeleton, LearningSkeleton, QuizSkeleton, ProblemsSkeleton, Skeleton, SkeletonCard, SkeletonLesson, SkeletonQuiz, SkeletonDashboard };
