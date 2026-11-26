'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import QueryForm from '@/components/shared/QueryForm';

export default function CoursesHeader() {
  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden flex items-center bg-[#0f2623]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2623] via-[#183631] to-[#2e6157] opacity-95" />

      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)',
        }}
      />

      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#2e7373]/25 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[360px] h-[360px] rounded-full bg-[#2e6157]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">

          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 mb-7">
              <Link href="/" className="text-[13px] md:text-[14px] text-white/80 font-medium hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[13px] md:text-[14px] text-white font-semibold">Courses</span>
            </nav>

            <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#8fd4c8] mb-4">
              Our Courses
            </span>

            <h1 className="text-[40px] sm:text-[48px] md:text-[56px] xl:text-[60px] font-bold leading-[1.07] tracking-tight mb-6 text-white">
              Explore{' '}
              <span className="bg-gradient-to-r from-[#a8e0d6] via-white to-[#a8e0d6] bg-clip-text text-transparent">
                Online Courses & Certification Programs
              </span>
            </h1>

            <p className="text-[17px] md:text-[19px] text-white/85 leading-relaxed letter-spacing-[0.07em] max-w-[660px]">
              As technology is advancing rapidly, the skills you currently hold may not be sufficient to meet required goals or targets. Keeping yourself current and upskilled with in-demand courses opens ways for a promotion, a competitive salary hike, a career change, or more. Structured training can create a link between your skills and the opportunities waiting ahead of you.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px]">
              <QueryForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}