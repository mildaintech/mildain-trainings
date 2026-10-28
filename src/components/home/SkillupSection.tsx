'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SkillupSection() {
  return (
    <section className="relative w-full py-10 md:py-15 bg-btn-gradient overflow-hidden">
      
      <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-20 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" fill="currentColor" className="text-primary-foreground" />
          </pattern>
          <rect width="100" height="100" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col items-start text-left">
            <p className="text-primary-foreground font-bold tracking-wide mb-4 uppercase">
              For Businesses
            </p>
            
            <h2 className="text-primary-foreground mb-6">
              Leadership <br />
              Skill Up+
            </h2>
            
            <p className="text-primary-foreground/90 mb-10 w-full lg:w-11/12">
              Building strong teams with interactive workshops, real-world business scenarios, and sandbox techniques rather than traditional lectures.
            </p>
            
            <Button asChild className="bg-background text-primary hover:bg-background/90 px-10 h-[52px] rounded-sm font-bold text-[18px] transition-all shadow-md">
              <Link href="/get-started">Get Started</Link>
            </Button>
          </div>

          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl aspect-video bg-muted overflow-hidden shadow-2xl rounded-sm border border-primary/20">
              <Image
                src="https://images.unsplash.com/photo-1622676017526-4a8e99f5fdf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mildain Skillup Business Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}