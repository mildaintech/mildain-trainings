'use client';

import React from 'react';

const awardsData = [
  {
    id: 1,
    image: "/images/corporate/gold-award-winner-2027.png",
    title: "Partnership for Excellence Awards (2017-Canada)"
  },
  {
    id: 2,
    image: "/images/corporate/platinum-award-winner-2017.png",
    title: "Engineering the Leadership Awards (2017-USA)"
  },
  {
    id: 3,
    image: "/images/corporate/it-development-award-winner-2019.png",
    title: "Trade and IT Development Awards (2020-India)"
  },
  {
    id: 4,
    image: "/images/corporate/sme-asia-award-winner-2020.png",
    title: "SME Asia Awards (2020-Singapore)"
  }
];

export default function CorporateAwards() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-center mb-12 md:mb-16">
          Awards & Accolades
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1200px] mx-auto">
          {awardsData.map((award) => (
            <div 
              key={award.id} 
              className="relative overflow-hidden group flex flex-col items-center justify-center p-8 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-btn-gradient hover:text-primary-foreground transition-all duration-300 cursor-pointer text-center min-h-[280px] shadow-sm hover:shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>

              <div className="h-[120px] md:h-[140px] flex items-center justify-center mb-6 relative z-10">
                <img 
                  src={award.image} 
                  alt={award.title} 
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <h3 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold text-foreground group-hover:text-primary-foreground leading-snug px-2 transition-colors relative z-10 mb-0">
                {award.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}