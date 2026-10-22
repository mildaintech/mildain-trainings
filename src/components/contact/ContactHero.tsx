'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';

const locations = ['Bengaluru', 'Noida', 'Austin'];

export default function ContactHero() {
  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[500px] mt-[64px] lg:mt-[76px] overflow-hidden flex items-center bg-[#04140c]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#04140c] via-[#0a3a21] to-[#0AA34F] opacity-95" />

      <img
        src="/images/home/hero1.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-right opacity-20 mix-blend-overlay pointer-events-none"
      />

      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)',
        }}
      />

      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#22e07a]/25 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[360px] h-[360px] rounded-full bg-[#0AA34F]/30 blur-[120px] pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-20 py-16">
        <div className="w-full max-w-[720px] flex flex-col items-start text-left">
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 mb-7"
          >
            <Link
              href="/"
              className="text-[13px] md:text-[14px] text-white/80 font-medium hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[13px] md:text-[14px] text-white font-semibold">Contact Us</span>
          </nav>

          <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#7ef0b0] mb-4">
            We'd love to hear from you
          </span>

          <h1 className="text-[42px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-extrabold leading-[1.05] tracking-tight mb-6 text-white">
            Get in{' '}
            <span className="bg-gradient-to-r from-[#9bf5c1] via-white to-[#9bf5c1] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-[17px] md:text-[19px] lg:text-[21px] text-white/85 leading-relaxed font-normal max-w-[600px]">
            We're here to help. No matter your requirement, there's a team ready to help you connect and move
            forward.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-9">
            {locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white/90 text-[13px] md:text-[14px] font-medium"
              >
                <MapPin className="w-3.5 h-3.5 text-[#7ef0b0]" />
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}