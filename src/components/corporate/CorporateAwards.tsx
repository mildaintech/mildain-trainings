'use client';

import React from 'react';

const awardsData = [
  {
    id: 1,
    image: "/images/corporate/award-gold.png",
    title: "Partnership for Excellence Awards (2017-Canada)"
  },
  {
    id: 2,
    image: "/images/corporate/award-platinum.png",
    title: "Engineering the Leadership Awards (2017-USA)"
  },
  {
    id: 3,
    image: "/images/corporate/award-it.png",
    title: "Trade and IT Development Awards (2020-India)"
  },
  {
    id: 4,
    image: "/images/corporate/award-sme.png",
    title: "SME Asia Awards (2020-Singapore)"
  }
];

export default function CorporateAwards() {
  return (
    <section className="py-16 md:py-24 bg-[#fafafa] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-[36px] md:text-[44px] lg:text-[48px] font-bold text-[#1f2937] text-center mb-12 md:mb-16 tracking-tight">
          Awards & Accolades
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1200px] mx-auto">
          {awardsData.map((award) => (
            <div 
              key={award.id} 
              className="flex flex-col items-center justify-center p-8 rounded-xl bg-transparent hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(10,163,79,0.25)] transition-all duration-300 cursor-pointer group text-center min-h-[280px]"
            >
              <div className="h-[120px] md:h-[140px] flex items-center justify-center mb-6">
                <img 
                  src={award.image} 
                  alt={award.title} 
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold text-[#1f2937] leading-snug px-2">
                {award.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}