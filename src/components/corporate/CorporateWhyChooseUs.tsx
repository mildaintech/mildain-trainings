'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CorporateWhyChooseUs() {
const features = [
    "Practical training led by expert trainers",
    "Serving for 10+ years in IT training",
    "Global operations across sectors",
    "Access 50+ training programs",
    "Over 9000 trainings successfully delivered globally",
    "Hands-on training on emerging and competitive tools"

  ];

  return (
    <section className="py-10 md:py-20 bg-background overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 items-center">
          
          <div className="flex flex-col items-start order-2 lg:order-1">
            <h2 className="mb-6">
             Why Corporates <span className="text-primary"> Trust Mildain?</span>
            </h2>
            
            <p className="max-w-xl mb-8">
              Empower your team with training from top industry trainers in a flexible setting that aligns perfectly with your organizational goals
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 w-full">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0" fill="currentColor" stroke="white" />
                  <span className="text-[14px] md:text-[16px] lg:text-[18px] text-foreground font-semibold">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-lg order-1 lg:order-2 border border-border">
            <img 
              src="/images/corporate/why-choose.webp" 
              alt="Why Choose Mildain Training" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}