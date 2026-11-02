'use client';

import React from 'react';
import { GraduationCap, Building2, Award, BookOpen, Globe2, Users } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Instructors',
    text: 'Learn from experienced professionals who bring real-world practice into every session.',
  },
  {
    icon: Award,
    title: 'Certification-Focused',
    text: 'Training mapped to globally recognized certifications from leading industry bodies.',
  },
  {
    icon: Building2,
    title: 'Corporate Training',
    text: 'Customized programs that upskill entire teams and align with your business goals.',
  },
  {
    icon: BookOpen,
    title: 'Structured Curriculum',
    text: 'Clear learning paths with hands-on practice, so concepts turn into usable skills.',
  },
  {
    icon: Globe2,
    title: 'Global Presence',
    text: 'Teams in India and the USA to support learners and organizations across regions.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    text: 'A responsive team ready to help before, during and after your training.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-18 bg-background border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-3 text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            Why Us
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </span>
          <h2 className="mb-4">
            Why Choose{' '}
            <span className="text-primary">Mildain Trainings</span>
          </h2>
          <p className="text-[18px] md:text-[20px] text-muted-foreground leading-relaxed">
            Everything we do is designed to help you learn faster, certify with confidence and apply skills at work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="group relative bg-card rounded-2xl border border-border p-7 md:p-8 overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(46,97,87,0.28)] transition-all duration-300"
            >
              <span className="absolute top-5 right-6 text-[44px] font-extrabold leading-none text-muted group-hover:text-primary/15 transition-colors duration-300 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-all duration-300">
                <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="relative text-[21px] md:text-[23px] font-bold text-foreground mb-2">{title}</h3>
              <p className="relative text-[17px] md:text-[19px] text-muted-foreground leading-relaxed mb-0">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}