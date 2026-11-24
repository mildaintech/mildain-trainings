import React from 'react';
import { Metadata } from 'next';
import { getDynamicSeoMetadata, getPageSchemaData } from '@/lib/seo';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutStats from '@/components/about/AboutStats';
import MissionVision from '@/components/about/MissionVision';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import AboutCTA from '@/components/about/Aboutcta';
import { ScrollButton } from '@/components/layout/ScrollButton';
import StickyBottomBar from '@/components/shared/StickyBottomBar';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeoMetadata('/about-us');
}

export default async function AboutPage() {
  const schemaData = await getPageSchemaData('/about-us');

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      )}
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