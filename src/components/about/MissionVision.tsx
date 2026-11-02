'use client';

import React from 'react';
import { Target, Eye, Lightbulb, ShieldCheck, Users, Rocket } from 'lucide-react';

const values = [
  { icon: Lightbulb, title: 'Practical Learning', text: 'Skills you can apply on the job from day one.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'Honest guidance and transparent communication.' },
  { icon: Users, title: 'Learner First', text: 'Every program is shaped around learner outcomes.' },
  { icon: Rocket, title: 'Continuous Growth', text: 'We keep improving as the industry evolves.' },
];

export default function MissionVision() {
  return (
    <section className="py-14 md:py-20 bg-background overflow-hidden border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-3 text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-primary mb-4">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            Purpose
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </span>
          <h2 className="text-[32px] md:text-[44px] font-extrabold text-foreground tracking-tight leading-tight">
            Our Mission &amp;{' '}
            <span className="text-primary">Vision</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
          <div className="group relative bg-card rounded-3xl border border-border p-8 md:p-10 overflow-hidden hover:border-primary/40 hover:shadow-[0_20px_50px_-15px_rgba(46,97,87,0.25)] transition-all duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-btn-gradient" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300">
              <Target className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-[24px] md:text-[28px] font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-[17px] md:text-[19px] text-muted-foreground leading-relaxed">
              To make high-quality, industry-relevant training accessible to professionals and organizations, helping
              them gain the skills and certifications that drive career and business growth.
            </p>
          </div>

          <div className="group relative bg-card rounded-3xl border border-border p-8 md:p-10 overflow-hidden hover:border-primary/40 hover:shadow-[0_20px_50px_-15px_rgba(46,97,87,0.25)] transition-all duration-300">
            <div className="absolute top-0 left-0 h-1 w-full bg-btn-gradient" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300">
              <Eye className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-[24px] md:text-[28px] font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-[17px] md:text-[19px] text-muted-foreground leading-relaxed">
              To be a trusted global partner in workforce upskilling, known for training that is practical,
              transparent and focused on measurable outcomes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(46,97,87,0.3)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-[20px] font-bold text-foreground mb-1.5">{title}</h4>
              <p className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed mb-0">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}