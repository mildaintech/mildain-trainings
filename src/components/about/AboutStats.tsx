'use client';

import React from 'react';

const stats = [
  { value: '3', label: 'Global Offices' },
  { value: '15', label: 'Countries' },
  { value: '25+', label: 'Industry Partners' },
];

export default function AboutStats() {
  return (
    <section className="relative py-14 md:py-20 bg-[#04140c] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#04140c] via-[#0a3a21] to-[#0AA34F]/80" />
      <div className="absolute -top-20 left-1/3 w-[360px] h-[360px] rounded-full bg-[#22e07a]/20 blur-[110px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md px-5 py-8 md:py-10 text-center hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-[38px] md:text-[52px] font-extrabold leading-none tracking-tight bg-gradient-to-b from-white to-[#9bf5c1] bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-3 text-[13px] md:text-[15px] font-medium text-white/80 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}