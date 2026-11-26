'use client';

import React from 'react';
import {
  GraduationCap,
  BadgeCheck,
  FlaskConical,
  Route,
  BookOpenCheck,
  Headset,
  CalendarClock,
} from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Experiential Workshops',
    description:
      'Learn from experienced trainers through interactive sessions, in-depth explanations, and practical exercises.',
  },
  {
    icon: BadgeCheck,
    title: 'Certification Exam Assistance',
    description:
      'We help with the application and preparation for official certification, so you walk into the exam feeling steadier.',
  },
  {
    icon: FlaskConical,
    title: 'Real-World Hands-On Learning',
    description:
      'You work through labs and exercises built on real scenarios and problems from the industry.',
  },
  {
    icon: Route,
    title: 'Structured Learning Journey',
    description:
      'You start with the basics and move up to intermediate and advanced topics, with guidance at each step.',
  },
  {
    icon: BookOpenCheck,
    title: 'Free Refresher Training',
    description:
      'Revisit key concepts and strengthen your expertise with refresher sessions and updated learning modules.',
  },
  {
    icon: Headset,
    title: 'Post-Training Support',
    description:
      "Learning doesn't stop when the sessions do. You get evaluation, feedback, and help with the practical problems that come up.",
  },
];

const stats = [
  { value: '25K+', label: 'Trainings Delivered Globally Across Sectors' },
  { value: '15+', label: 'Years of Experienced Certified Trainers' },
  { value: '10', label: 'Years of Industry Experience' },
];

const onDark = { color: '#ffffff' };
const onDarkSoft = { color: 'rgba(255,255,255,0.8)' };

const gridPattern: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage: 'radial-gradient(ellipse at 20% 20%, black 10%, transparent 70%)',
  WebkitMaskImage: 'radial-gradient(ellipse at 20% 20%, black 10%, transparent 70%)',
};

export default function WhyChooseMildain() {
  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-background py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0f2623] p-8 md:p-10 lg:col-span-5">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#0f2623] via-[#183631] to-[#2e6157] opacity-95" />
            <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={gridPattern} />
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2e7373]/30 blur-[90px]" />
            <div aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#8fd4c8]/10 blur-[100px]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8fd4c8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8fd4c8]" />
                MILDAIN ADVANTAGE
              </span>

              <h2 className="mb-0 mt-6 text-[32px] font-extrabold leading-[1.15] tracking-tight md:text-[38px]" style={onDark}>
                Why Mildain{' '}
                <span className="bg-gradient-to-r from-[#a8e0d6] via-white to-[#a8e0d6] bg-clip-text text-transparent">
                  Trainings?
                </span>
              </h2>

              <p className="mb-0 mt-5 text-[16px] leading-[1.75] md:text-[17px]" style={onDarkSoft}>
                Realizing you need to upskill is the easy part. Figuring out where to start is what holds back most people. Our trainers upskill you with interactive training sessions along with flexible learning paths. Get hands-on assignments and certification guidance so you build real confidence and ar prepared for the future.
              </p>
            </div>

            <ul className="relative z-10 mt-10 divide-y divide-white/15 border-t border-white/15">
              {stats.map((item) => (
                <li key={item.label} className="flex items-center gap-5 py-4">
                  <span className="min-w-[112px] text-3xl font-extrabold leading-none md:text-4xl" style={onDark}>
                    {item.value}
                  </span>
                  <span className="text-sm leading-snug" style={onDarkSoft}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl md:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-5 top-3 text-6xl font-black leading-none text-foreground/5 transition-colors duration-300 group-hover:text-primary/15"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-btn-gradient shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Icon size={26} strokeWidth={1.8} color="#ffffff" />
                </div>
                <h3 className="relative mb-2 text-[19px] font-bold leading-snug text-foreground">{title}</h3>
                <p className="relative mb-0 text-[15px] leading-relaxed text-foreground/70">{description}</p>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-btn-gradient transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}