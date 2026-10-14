'use client';

import React from 'react';
import Image from 'next/image';

const platforms = [
  {
    id: 1,
    rating: "4.9",
    logo: "/images/justdial.png",
    alt: "Justdial"
  },
  {
    id: 2,
    rating: "4.9",
    logo: "/images/google.png",
    alt: "Google"
  },
  {
    id: 3,
    rating: "4.9",
    logo: "/images/justdial.png",
    alt: "Justdial"
  }
];

export default function TrustSection() {
  return (
    <section className="w-full bg-white pt-10 pb-4 md:pt-14 md:pb-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 text-center mb-6 md:mb-8 tracking-tight">
          Upskilled Globally, Exceeding <span className="text-primary font-semibold">25K</span> Members
        </h2>

        <div className="flex justify-center items-center gap-3 sm:gap-8 md:gap-24">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex flex-col items-center">
              
              <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
                <span className="text-2xl md:text-4xl font-bold text-slate-900">{platform.rating}</span>
                <svg className="w-4 h-4 md:w-6 md:h-6 text-[#FFB800]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-50 w-[90px] sm:w-28 h-10 md:w-40 md:h-14 flex items-center justify-center px-2 md:px-4 hover:shadow-md transition-shadow">
                <img 
                  src={platform.logo} 
                  alt={platform.alt} 
                  className="max-h-5 md:max-h-8 max-w-full object-contain"
                />
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}