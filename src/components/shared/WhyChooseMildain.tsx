'use client';

import React from 'react';
import {
  GraduationCap,
  BookOpenCheck,
  FlaskConical,
  CalendarClock,
  Route,
  BadgeCheck,
} from 'lucide-react';

/* ---------- content (edit freely) ---------- */

const features = [
  {
    icon: GraduationCap,
    title: 'Expert-Led Live Training',
    description:
      'Learn through live sessions led by experienced industry practitioners, with room to ask questions in the moment.',
  },
  {
    icon: BookOpenCheck,
    title: 'Industry-Aligned Curriculum',
    description:
      'Course content aligned with leading certification bodies such as ISACA, so you learn what the exam and the job demand.',
  },
  {
    icon: FlaskConical,
    title: 'Hands-On Practice',
    description:
      'Sandbox scenarios and practical exercises help you apply new skills right away instead of only reading about them.',
  },
  {
    icon: CalendarClock,
    title: 'Flexible Learning Model',
    description:
      'A 100% flexible learning model that fits around your work schedule, so you can upskill without pausing your job.',
  },
  {
    icon: Route,
    title: 'Customized Learning Paths',
    description:
      'Training shaped around your goals, role and experience level, whether you are an individual or a full team.',
  },
  {
    icon: BadgeCheck,
    title: 'Support Until You Certify',
    description:
      'A learning kit and expert supervision guide you throughout the course, right up to your certification exam.',
  },
];

const stats = [
  { value: '25,000', label: 'Professionals trained across sectors' },
  { value: '500', label: 'Enterprise clients assisted globally' },
  { value: '30', label: 'Tech partners adding strength to every project' },
];

/* Inline colors on purpose: global heading/paragraph styles can override
   utility classes, which makes text unreadable on the dark panel. */
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
      {/* soft background glow */}
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Left: brand panel */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0f2623] p-8 md:p-10 lg:col-span-5">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#0f2623] via-[#183631] to-[#2e6157] opacity-95" />
            <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={gridPattern} />
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2e7373]/30 blur-[90px]" />
            <div aria-hidden className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#8fd4c8]/10 blur-[100px]" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8fd4c8]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8fd4c8]" />
                Why Mildain
              </span>

              <h2 className="mb-0 mt-6 text-[32px] font-extrabold leading-[1.15] tracking-tight md:text-[38px]" style={onDark}>
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#a8e0d6] via-white to-[#a8e0d6] bg-clip-text text-transparent">
                  Mildain Trainings?
                </span>
              </h2>

              <p className="mb-0 mt-5 text-[16px] leading-[1.75] md:text-[17px]" style={onDarkSoft}>
                Practical, expert-led learning designed to helPractical, expert-led learning designed to help you earn certifications and apply new skills on the job.Practical, expert-led learning designed to help you earn certifications and apply new skills on the job.Practical, expert-led learning designed to help you earn certifications and apply new skills on the job.p you earn certifications and apply new skills on the job.
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

          {/* Right: feature cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl md:p-7"
              >
                {/* big faint number */}
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

                {/* animated bottom accent */}
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