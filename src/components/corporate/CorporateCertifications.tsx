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
    <section className="relative w-full py-8 md:py-16 bg-btn-gradient border-t border-border overflow-hidden flex items-center">
      
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex flex-col items-start pr-0 lg:pr-8">
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold text-primary-foreground leading-[1.3] tracking-wide mb-8">
              State-of-the-art curriculum co-created and certified by world-class certification bodies, universities and organizations
            </h2>
            <Button asChild className="relative overflow-hidden group bg-btn-gradient text-primary-foreground text-[16px] md:text-[18px] font-bold px-10 h-[50px] md:h-[54px] rounded-md shadow-lg transition-all cursor-pointer">
              <Link href="#contact-us" className="relative z-10">
                Contact Us
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5 w-full max-w-[600px] ml-auto">
            {certifications.map((logo, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-3 md:p-5 h-[70px] sm:h-[85px] md:h-[100px] flex items-center justify-center shadow-md w-full border border-border"
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