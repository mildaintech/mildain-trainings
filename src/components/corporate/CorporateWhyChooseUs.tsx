'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CorporateWhyChooseUs() {
  const features = [
    "Industry-aligned Projects",
    "Hands-on Learning",
    "Customized Training Solutions",
    "Real-world Scenarios",
    "Certified Instructors",
    "Knowledge Transfer Guarantee"
  ];

  return (
    <section className="py-10 md:py-20 bg-background overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 items-center">
          
          <div className="flex flex-col items-start order-2 lg:order-1">
            <h2 className="mb-6">
              Why Choose <span className="text-primary">Mildain Training?</span>
            </h2>
            
            <p className="max-w-xl mb-10">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 w-full">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0" fill="currentColor" stroke="white" />
                  <span className="text-[16px] md:text-[18px] lg:text-[20px] text-foreground font-semibold">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-lg order-1 lg:order-2 border border-border">
            <img 
              src="/images/corporate/why-choose.png" 
              alt="Why Choose Mildain Training" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}