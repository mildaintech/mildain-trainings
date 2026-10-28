'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CorporateHero() {
  return (
    <div className="relative w-full h-auto min-h-[350px] lg:h-[calc(100vh-76px)] lg:min-h-[500px] lg:max-h-[500px] mt-[64px] lg:mt-[76px] bg-muted overflow-hidden flex flex-col justify-center">
      
      <div className="absolute top-0 right-0 w-full h-full lg:w-[50%] z-0">
        <img 
          src="/images/corporate/corporate-banner.png" 
          alt="Corporate Professionals" 
          className="w-full h-full object-cover object-top lg:object-right relative z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/10 to-transparent w-full lg:w-[60%] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent h-full lg:hidden z-10 pointer-events-none"></div>
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center relative z-20 h-full py-16 lg:py-0">
        <div className="w-full max-w-[850px] flex flex-col justify-center items-start text-left">
          
          <h1 className="mb-6">
            Upskill Your <br />
            Workforce, Accelerate <br />
            <span className="text-primary">AI & Digital Readiness</span>
          </h1>

          <p className="max-w-[650px] mb-8">
            Give your workforce access to an AI-first learning platform, covering expert-led programs in AI, data, power skills, and industry-recognized certifications.
          </p>

          <Button asChild className="relative overflow-hidden group bg-btn-gradient text-primary-foreground text-[18px] lg:text-[20px] px-8 py-6 h-[54px] lg:h-[60px] rounded-md shadow-md transition-all cursor-pointer font-bold">
            <Link href="#train-your-team" className="relative z-10">
              Train Your Team
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            </Link>
          </Button>

        </div>
      </main>
    </div>
  );
}