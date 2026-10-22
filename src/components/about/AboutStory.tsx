'use client';

import React from 'react';
import { CheckCircle2, GraduationCap, Users, Award, Globe2 } from 'lucide-react';

const highlights = [
  'Industry-aligned curriculum built around real job roles',
  'Training for individuals and corporate teams',
  'Preparation for globally recognized certifications',
  'Support from a team across India and the USA',
];

const tiles = [
  { icon: GraduationCap, title: 'Expert-led', text: 'Learn from experienced instructors' },
  { icon: Users, title: 'Corporate Ready', text: 'Programs for teams of every size' },
  { icon: Award, title: 'Certification Focus', text: 'Aligned with leading credentials' },
  { icon: Globe2, title: 'Global Reach', text: 'Offices in India and the USA' },
];

export default function AboutStory() {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[12px] md:text-[13px] font-semibold tracking-[0.2em] uppercase text-[#0AA34F] mb-4">
              <span className="w-8 h-[2px] bg-[#0AA34F] rounded-full" />
              Our Story
            </span>
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#0b1220] leading-[1.1] tracking-tight mb-5">
              Building Skills That{' '}
              <span className="bg-gradient-to-r from-[#0AA34F] to-[#16c96b] bg-clip-text text-transparent">
                Move Careers Forward
              </span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#4b5563] leading-relaxed mb-5">
              Mildain Trainings exists to close the gap between what professionals know and what the industry needs.
              We combine practical, hands-on learning with expert guidance so every learner and every team can grow
              with confidence.
            </p>
            <p className="text-[16px] md:text-[18px] text-[#4b5563] leading-relaxed mb-8">
              Whether you are upskilling a workforce or taking the next step in your own career, we design training
              that is clear, relevant and focused on results.
            </p>

            <ul className="flex flex-col gap-3.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0AA34F] shrink-0 mt-0.5" />
                  <span className="text-[15px] md:text-[16px] text-[#1f2937] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#0AA34F]/15 to-transparent rounded-[2rem] blur-2xl" />
            <div className="relative rounded-3xl bg-gradient-to-br from-[#04140c] via-[#0a3a21] to-[#0AA34F] p-6 md:p-8 shadow-[0_30px_70px_-20px_rgba(10,58,33,0.5)] overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.1] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tiles.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-5 hover:bg-white/15 transition-colors duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#9bf5c1]" />
                    </div>
                    <h3 className="text-[17px] font-bold text-white mb-1">{title}</h3>
                    <p className="text-[14px] text-white/75 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}