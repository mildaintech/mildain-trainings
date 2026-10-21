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
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col items-start order-2 lg:order-1">
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1f2937] leading-[1.2] tracking-tight mb-6">
              Why Choose <span className="text-[#0AA34F]">Mildain Training?</span>
            </h2>
            
            <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#6b7280] leading-relaxed font-medium mb-10">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 w-full">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#0AA34F] w-6 h-6 shrink-0" fill="currentColor" stroke="white" />
                  <span className="text-[16px] md:text-[18px] lg:text-[20px] text-[#1f2937] font-semibold">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg order-1 lg:order-2">
            <img 
              src="/images/corporate/why-choose-us.jpg" 
              alt="Why Choose Mildain Training" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}