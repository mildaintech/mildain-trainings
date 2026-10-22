import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutStats from '@/components/about/AboutStats';
import MissionVision from '@/components/about/MissionVision';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import AboutCTA from '@/components/about/Aboutcta';

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-white">
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <MissionVision />
      <WhyChooseUs />
      <AboutCTA />
      <Footer />
    </main>
  );
}