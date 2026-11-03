
import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutStats from '@/components/about/AboutStats';
import MissionVision from '@/components/about/MissionVision';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import AboutCTA from '@/components/about/Aboutcta';
import { ScrollButton } from '@/components/layout/ScrollButton';
import StickyBottomBar from '@/components/shared/StickyBottomBar';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <MissionVision />
      <WhyChooseUs />
      <AboutCTA />
      <ScrollButton />
      <StickyBottomBar />
    </div>
  );
}
