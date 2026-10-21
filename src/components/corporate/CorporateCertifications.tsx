'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const certifications = [
  "/images/home/partner/comptia.png",
  "/images/home/partner/isaca.png",
  "/images/home/partner/ec-council.png",
  "/images/home/partner/google.png",
  "/images/home/partner/amazon.png",
  "/images/home/partner/isc2.png",
  "/images/home/partner/pmxs.png",
  "/images/home/partner/microsoft.png",
  "" 
];

export default function CorporateCertifications() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0FA753] overflow-hidden flex items-center">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <svg 
          className="absolute w-full h-full object-cover" 
          viewBox="0 0 1440 400" 
          preserveAspectRatio="xMidYMid slice" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H1440V400H0V0Z" fill="#0FA753"/>
          <path d="M-200 400C-200 400 200 50 720 50C1240 50 1640 400 1640 400V0H-200V400Z" fill="#15BF64" fillOpacity="0.3"/>
          <path d="M1640 0C1640 0 1100 350 720 350C340 350 -200 0 -200 0V400H1640V0Z" fill="#0A8742" fillOpacity="0.3"/>
          <path d="M-100 200C200 50 500 -50 900 150C1300 350 1500 200 1500 200V400H-100V200Z" fill="#18D270" fillOpacity="0.15"/>
        </svg>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex flex-col items-start text-white pr-0 lg:pr-8">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold text-white leading-[1.3] tracking-wide mb-8">
              State-of-the-art curriculum co-created and certified by world-class certification bodies, universities and organizations
            </h2>
            <Button asChild className="bg-white hover:bg-gray-100 text-[#0AA34F] text-[16px] md:text-[18px] font-bold px-10 h-[50px] md:h-[54px] rounded-md shadow-lg transition-all cursor-pointer">
              <Link href="#contact-us">Contact Us</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5 w-full max-w-[600px] ml-auto">
            {certifications.map((logo, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-3 md:p-5 h-[70px] sm:h-[85px] md:h-[100px] flex items-center justify-center shadow-md w-full"
              >
                {logo ? (
                  <img 
                    src={logo} 
                    alt={`Certification Partner ${index + 1}`} 
                    className="max-h-full max-w-full object-contain" 
                  />
                ) : null}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}