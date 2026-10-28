'use client';

import React from 'react';

const enterprises = [
  { id: 1, name: "Wipro", logo: "/images/wipro.png" },
  { id: 2, name: "KPMG", logo: "/images/kpmg.png" },
  { id: 3, name: "Navisite", logo: "/images/mahindra.png" },
  { id: 4, name: "Myntra", logo: "/images/myntra.png" },
  { id: 5, name: "Home Credit", logo: "/images/wipro.png" },
  { id: 6, name: "Mahindra Comviva", logo: "/images/mahindra.png" },
  { id: 7, name: "Unisys", logo: "/images/unisys.png" },
  { id: 8, name: "Wipro", logo: "/images/wipro.png" },
  { id: 9, name: "KPMG", logo: "/images/kpmg.png" },
  { id: 10, name: "Navisite", logo: "/images/mahindra.png" }
];

export default function EnterpriseLogos() {
  return (
    <section className="w-full bg-secondary/5 py-16 lg:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-center mb-10 lg:mb-12">
          Trusted by 100+ TechGiants Globally
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {enterprises.map((item) => (
            <div 
              key={item.id} 
              className="bg-card rounded-lg shadow-sm shadow-primary/5 border border-border flex items-center justify-center h-[90px] md:h-[100px] hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 px-4"
            >
              <img 
                src={item.logo} 
                alt={item.name} 
                className="max-h-[38px] md:max-h-[44px] max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}