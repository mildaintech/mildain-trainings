'use client';

import React from 'react';
import { MonitorPlay } from 'lucide-react';

const steps = [
  {
    id: 1,
    step: "Step 1",
    title: "Assess Skills Gaps",
    description: "Assess skill gaps aligned to business goals, and assign licenses to targeted learner groups."
  },
  {
    id: 2,
    step: "Step 2",
    title: "Learning Journeys by Role",
    description: "Unlimited access to curated courses and structured paths"
  },
  {
    id: 3,
    step: "Step 3",
    title: "Enable Learning at Scale",
    description: "Blended learning across live sessions, async content, and certification prep."
  },
  {
    id: 4,
    step: "Step 4",
    title: "See the impact",
    description: "Track engagement, completion, and adoption through dashboards and reports"
  }
];

export default function CorporateHowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-secondary/5 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 md:mb-16">
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-block border-[1.5px] border-primary text-primary px-4 py-1.5 rounded-sm text-sm md:text-base font-bold mb-6 bg-card shadow-sm">
              How it works
            </div>
            
            <h2 className="mb-0">
              We Build Skills That Drive Business Impact
            </h2>
          </div>
          
          <div className="lg:col-span-6 flex items-end lg:pt-16">
            <p className="mb-0">
              From skills gap assessment to measurable business impact, a structured approach to drive outcome-driven learning for AI and digital skills across your workforce.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div 
              key={item.id} 
              className="relative overflow-hidden group bg-card rounded-xl p-8 flex flex-col items-start transition-all duration-300 hover:shadow-lg border border-border hover:border-primary/50 hover:bg-btn-gradient hover:text-primary-foreground"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>

              <div className="mb-6 text-primary group-hover:text-primary-foreground transition-colors relative z-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="2" y1="17" x2="22" y2="17"></line>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <circle cx="12" cy="9" r="3"></circle>
                  <path d="M7 14c0-2.2 2.2-4 5-4s5 1.8 5 4"></path>
                </svg>
              </div>

              <div className="inline-block border border-primary text-primary group-hover:border-primary-foreground group-hover:text-primary-foreground px-3 py-1 rounded-sm text-xs md:text-sm font-bold mb-6 bg-background group-hover:bg-background/10 shadow-sm transition-colors relative z-10">
                {item.step}
              </div>

              <h3 className="text-[20px] md:text-[22px] font-bold text-foreground group-hover:text-primary-foreground mb-4 leading-tight transition-colors relative z-10">
                {item.title}
              </h3>

              <p className="text-[16px] md:text-[18px] text-muted-foreground group-hover:text-primary-foreground/90 font-medium leading-snug mb-0 transition-colors relative z-10">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}