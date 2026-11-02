'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function AboutCTA() {
  return (
    <section className="py-12 md:py-18 bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="relative rounded-3xl overflow-hidden bg-[#0f2623] px-6 py-14 md:px-16 md:py-20 text-center shadow-[0_30px_70px_-20px_rgba(24,54,49,0.55)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2623] via-[#183631] to-[#2e6157]" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
            }}
          />
          <div className="absolute -top-24 -right-16 w-[340px] h-[340px] rounded-full bg-[#2e7373]/25 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-[300px] h-[300px] rounded-full bg-[#2e6157]/30 blur-[100px] pointer-events-none" />

          <div className="relative max-w-[760px] mx-auto">
            <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#8fd4c8]">
              Ready to get started?
            </span>
            <h2 className="mt-4 text-[32px] md:text-[48px] font-extrabold text-white leading-[1.1] tracking-tight">
              Let's Build Your Team's{' '}
              <span className="bg-gradient-to-r from-[#a8e0d6] via-white to-[#a8e0d6] bg-clip-text text-transparent">
                Next Skill Set
              </span>
            </h2>
            <p className="mt-5 text-[16px] md:text-[19px] text-white/85 leading-relaxed">
              Talk to our team about corporate training, partnerships or certification programs. We'll help you find the
              right fit.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-[#183631] hover:bg-[#ebf5f3] px-8 py-4 rounded-xl text-[16px] font-bold shadow-[0_10px_24px_-8px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+918929199704"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-[16px] font-semibold text-white border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                +91-8929199704
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}