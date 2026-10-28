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
    <section className="w-full bg-background pt-10 pb-4 md:pt-14 md:pb-4">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-center mb-6 md:mb-8">
          Upskilled Globally, Exceeding <span className="text-primary font-bold">25K</span> Members
        </h2>

        <div className="flex justify-center items-center gap-4 sm:gap-8 md:gap-24">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex flex-col items-center group">
              
              <div className="flex items-center gap-1 md:gap-1.5 mb-2 md:mb-3">
                <h3 className="mb-0 leading-none">{platform.rating}</h3>
                <svg className="w-4 h-4 md:w-6 md:h-6 text-[#FFB800]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="bg-background rounded-lg shadow-sm shadow-primary/10 border border-border w-[100px] sm:w-32 h-12 md:w-44 md:h-16 flex items-center justify-center px-3 md:px-5 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 group-hover:-translate-y-1">
                <img 
                  src={platform.logo} 
                  alt={platform.alt} 
                  className="max-h-6 md:max-h-10 max-w-full object-contain transition-all duration-300"
                />
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}