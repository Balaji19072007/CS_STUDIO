import React, { useEffect } from "react";
import { MouseGlow } from "@/components/site/MouseGlow";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Metrics } from "@/components/site/Metrics";
import { Showcase } from "@/components/site/Showcase";
import { Paths } from "@/components/site/Paths";
import { Arena } from "@/components/site/Arena";
import { Community } from "@/components/site/Community";
import { AlgoVisualizer } from "@/components/site/AlgoVisualizer";
import { TechMarquee } from "@/components/site/TechMarquee";
import { Testimonials } from "@/components/site/Testimonials";
import { Certificates } from "@/components/site/Certificates";
import { WhyUs } from "@/components/site/WhyUs";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "CS Studio — Build. Learn. Compete. Grow.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = "The all-in-one coding ecosystem: cloud IDE, learning paths, challenges, leaderboards, certificates, and AI tools for developers.";
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <MouseGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <Metrics />
        <Showcase />
        <Paths />
        <Arena />
        <Community />
        <AlgoVisualizer />
        <TechMarquee />
        <Testimonials />
        <Certificates />
        <WhyUs />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
