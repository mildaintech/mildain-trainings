'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const galleryData = [
  {
    id: 0,
    image: "/images/corporate/gallery1.jpg",
    title: "AWS Security training",
    subtitle: "(NTPC)"
  },
  {
    id: 1,
    image: "/images/corporate/gallery2.jpg",
    title: "AWS Security training",
    subtitle: "(NetApp)"
  },
  {
    id: 2,
    image: "/images/corporate/gallery3.jpg",
    title: "Cyber Security training",
    subtitle: "(EY)"
  },
  {
    id: 3,
    image: "/images/corporate/gallery4.jpg",
    title: "AWS Security training",
    subtitle: "(PWC)"
  },
  {
    id: 4,
    image: "/images/corporate/gallery1.jpg",
    title: "AWS Security training",
    subtitle: "(NetApp)"
  }
];

export default function CorporateGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#0FA753] w-full overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-[36px] md:text-[44px] lg:text-[48px] font-bold text-white text-center mb-10 tracking-wide">
          Training Gallery
        </h2>

        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[750px] rounded-2xl overflow-hidden shadow-2xl group">
          
          <img 
            src={galleryData[currentIndex].image} 
            alt={galleryData[currentIndex].title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          <div className="absolute bottom-0 left-0 w-full h-[150px] md:h-[200px] bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end items-center pb-8 md:pb-12 text-center px-4">
            <h3 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-bold text-white mb-2 leading-tight">
              {galleryData[currentIndex].title}
            </h3>
            <p className="text-[18px] md:text-[22px] text-gray-200 font-bold">
              {galleryData[currentIndex].subtitle}
            </p>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-6 md:mt-8 w-full">
          {galleryData.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                currentIndex === index 
                  ? 'ring-4 ring-white scale-[1.02] shadow-xl opacity-100 z-10' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-[80px] md:h-[100px] bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end items-center pb-3 md:pb-4 px-2 text-center">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-bold text-white leading-tight mb-1 line-clamp-1">
                  {item.title}
                </span>
                <span className="text-[10px] md:text-[12px] text-gray-300 font-medium">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}