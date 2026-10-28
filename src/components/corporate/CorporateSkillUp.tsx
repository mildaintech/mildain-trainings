'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';

export default function CorporateSkillUp() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoClick = () => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    setIsVideoOpen(true);
  };

  return (
    <section className="py-8 md:py-16 bg-background overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="flex flex-col items-start mb-10 md:mb-14">
          <div className="inline-block border-[1.5px] border-primary text-primary px-4 py-1.5 rounded-sm text-sm md:text-base font-bold mb-6 bg-card shadow-sm">
            Mildain SkillUp+
          </div>
          
          <h2 className="mb-4">
            Explore the AI-first Learning Platform
          </h2>
          
          <p className="max-w-[900px] mb-0">
            Our unique learning platform blends expert-led live sessions, async content, and hands-on projects to deliver an industry-leading 80% completion rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg group cursor-pointer border border-border">
            <img 
              src="/images/corporate/corporate-explore-1.png" 
              alt="Learning Platform Interface" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div 
            onClick={handleVideoClick}
            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-primary"
          >
            <img 
              src="/images/corporate/corporate-explore-2.png" 
              alt="Video Learning Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-6 right-6 z-20">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-border">
                <Play className="w-5 h-5 md:w-6 md:h-6 text-destructive ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center border-t border-border pt-12 mb-16">
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="mb-0 leading-tight">
              <span className="text-foreground">Mildain </span>
              <span className="text-primary">SkillUp+</span>
              <br />
              <span className="text-foreground">Offerings</span>
            </h3>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col space-y-2">
              <p className="text-[16px] md:text-[18px] text-muted-foreground font-medium leading-snug mb-0">
                Live, expert-led <br className="hidden sm:block" /> sessions monthly
              </p>
              <span className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-foreground leading-none">
                500
              </span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-[16px] md:text-[18px] text-muted-foreground font-medium leading-snug mb-0">
                Async learning <br className="hidden sm:block" /> programs
              </p>
              <span className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-foreground leading-none">
                1800
              </span>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-[16px] md:text-[18px] text-muted-foreground font-medium leading-snug mb-0">
                Hands-on projects, labs, <br className="hidden sm:block" /> and assessments
              </p>
              <span className="text-[40px] md:text-[48px] lg:text-[56px] font-extrabold text-foreground leading-none">
                1200
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Button asChild className="relative overflow-hidden group bg-btn-gradient text-primary-foreground text-[16px] md:text-[18px] px-8 py-6 h-[50px] md:h-[56px] rounded-md shadow-md transition-all cursor-pointer font-bold w-full sm:w-auto">
            <Link href="#free-trial" className="relative z-10">
              Get a Free Trial
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-2 border-primary bg-transparent text-primary hover:bg-primary/10 text-[16px] md:text-[18px] px-8 py-6 h-[50px] md:h-[56px] rounded-md transition-all cursor-pointer font-bold w-full sm:w-auto">
            <Link href="#explore-skillup">Explore Mildain SkillUp+</Link>
          </Button>
        </div>

      </div>

      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-foreground/70 hover:text-foreground bg-muted/50 hover:bg-muted p-2.5 rounded-full transition-colors z-50 border border-border"
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
            }}
          >
            <X size={24} />
          </button>
          
          <div className="w-full max-w-4xl aspect-video bg-card rounded-xl overflow-hidden border border-border shadow-2xl relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Platform Video Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}