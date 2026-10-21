'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function CorporateSkillUp() {
  return (
    <section className="py-16 md:py-24 bg-[#fafafa] overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="flex flex-col items-start mb-10 md:mb-14">
          <div className="inline-block border-[1.5px] border-[#0AA34F] text-[#0AA34F] px-4 py-1.5 rounded-sm text-sm md:text-base font-bold mb-6 bg-white shadow-sm">
            Mildain SkillUp+
          </div>
          
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1f2937] leading-[1.2] tracking-tight mb-4">
            Explore the AI-first Learning Platform
          </h2>
          
          <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#6b7280] max-w-[900px] leading-relaxed font-medium">
            Our unique learning platform blends expert-led live sessions, async content, and hands-on projects to deliver an industry-leading 80% completion rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" 
              alt="Learning Platform Interface" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-[#00b050]">
            <img 
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop" 
              alt="Video Learning Preview" 
              className="w-full h-full object-cover mix-blend-overlay opacity-40 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-[#e11d48] ml-1.5" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center border-t border-gray-200 pt-12 mb-16">
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-[32px] md:text-[40px] font-bold leading-tight">
              <span className="text-[#1f2937]">Mildain </span>
              <span className="text-[#0AA34F]">SkillUp+</span>
              <br />
              <span className="text-[#1f2937]">Offerings</span>
            </h3>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col space-y-2">
              <p className="text-[16px] md:text-[18px] text-[#6b7280] font-medium leading-snug">
                Live, expert-led <br className="hidden sm:block" /> sessions monthly
              </p>
              <span className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1f2937] leading-none">
                500
              </span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-[16px] md:text-[18px] text-[#6b7280] font-medium leading-snug">
                Async learning <br className="hidden sm:block" /> programs
              </p>
              <span className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1f2937] leading-none">
                1800
              </span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-[16px] md:text-[18px] text-[#6b7280] font-medium leading-snug">
                Hands-on projects, labs, <br className="hidden sm:block" /> and assessments
              </p>
              <span className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-[#1f2937] leading-none">
                1200
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Button asChild className="bg-[#0AA34F] hover:bg-[#088a42] text-white text-[16px] md:text-[18px] px-8 py-6 h-[50px] md:h-[56px] rounded-md shadow-md transition-all cursor-pointer font-bold w-full sm:w-auto">
            <Link href="#free-trial">Get a Free Trial</Link>
          </Button>

          <Button asChild variant="outline" className="border-2 border-[#0AA34F] bg-transparent text-[#0AA34F] hover:bg-[#0AA34F]/10 text-[16px] md:text-[18px] px-8 py-6 h-[50px] md:h-[56px] rounded-md transition-all cursor-pointer font-bold w-full sm:w-auto">
            <Link href="#explore-skillup">Explore Mildain SkillUp+</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}