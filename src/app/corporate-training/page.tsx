import React from 'react';
import CorporateHero from '@/components/corporate/CorporateHero';
import { Metadata } from 'next';
import CorporatePartnerLogos from '@/components/corporate/CorporatePartnerLogos';
import CorporateSkillUp from '@/components/corporate/CorporateSkillUp';
import CorporateWhyChooseUs from '@/components/corporate/CorporateWhyChooseUs';
import CorporateCategories from '@/components/corporate/CorporateCategories';
import CorporateHowItWorks from '@/components/corporate/CorporateHowItWorks';
import CorporateCertifications from '@/components/corporate/CorporateCertifications';
import CorporateGallery from '@/components/corporate/CorporateGallery';
import CorporateAwards from '@/components/corporate/CorporateAwards';
import CorporateLearningImpact from '@/components/corporate/CorporateLearningImpact';
import CorporateFAQ from '@/components/corporate/CorporateFAQ';
import StickyBottomBar from '@/components/shared/StickyBottomBar';
import CorporateTestimonialForm from '@/components/corporate/CorporateTestimonialForm';
import { ScrollButton } from '@/components/layout/ScrollButton';

export const metadata: Metadata = {
  title: 'Corporate Training Solutions | Mildain Trainings',
  description: 'Empower your workforce with enterprise-grade training, customized learning paths, and scalable delivery for teams of all sizes.',
};

export default function CorporatePage() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-background">
      <CorporateHero />
      <CorporatePartnerLogos />
      <CorporateSkillUp />
      <CorporateWhyChooseUs />
      <CorporateCategories />
      <CorporateHowItWorks />
      <CorporateCertifications />
      <CorporateTestimonialForm />
      <CorporateGallery />
      <CorporateAwards />
      <CorporateLearningImpact />
      <CorporateFAQ />
      <StickyBottomBar />
      <ScrollButton />
    </main>
  );
}