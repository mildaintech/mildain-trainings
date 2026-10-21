'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CorporateHero() {
  return (
    <div className="relative w-full h-auto min-h-[500px] lg:h-[calc(100vh-76px)] lg:min-h-[550px] lg:max-h-[650px] mt-[64px] lg:mt-[76px] bg-[#effaf3] overflow-hidden flex flex-col justify-center">
      
      <div className="absolute top-0 right-0 w-full h-full lg:w-[60%] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#effaf3] via-[#effaf3]/90 to-transparent w-full lg:w-[60%] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#effaf3] via-transparent to-transparent h-full lg:hidden z-10"></div>
        <img 
          src="/images/corporate/hero-team.jpg" 
          alt="Corporate Professionals" 
          className="w-full h-full object-cover object-top lg:object-right"
        />
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center relative z-10 h-full py-16 lg:py-0">
        <div className="w-full max-w-[850px] flex flex-col justify-center items-start text-left">
          
          <h1 className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[68px] font-bold text-[#333333] leading-[1.1] tracking-tight mb-6">
            Upskill Your <br />
            Workforce, Accelerate <br />
            <span className="text-[#0AA34F]">AI & Digital Readiness</span>
          </h1>

          <p className="text-[18px] sm:text-[22px] lg:text-[24px] leading-relaxed max-w-[650px] mb-8 text-[#4a4a4a] font-medium">
            Give your workforce access to an AI-first learning platform, covering expert-led programs in AI, data, power skills, and industry-recognized certifications.
          </p>

          <Button asChild className="bg-[#0AA34F] hover:bg-[#088a42] text-white text-[18px] lg:text-[20px] px-8 py-6 h-[54px] lg:h-[60px] rounded-md shadow-md transition-all cursor-pointer font-bold">
            <Link href="#train-your-team">Train Your Team</Link>
          </Button>

        </div>
      </main>
    </div>
  );
}