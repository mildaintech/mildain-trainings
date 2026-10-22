'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const slides = [
  {
    id: 0,
    title: "Master AI and Ace\nSmart Technologies",
    bullets: [
      "9000+ Programs Implemented",
      "Over 30 Tech Partners.",
      "10+ Years of Experience Worldwide"
    ],
    btn1: "Explore Programs",
    btn1Link: "#our-programs",
    btn2: "Enroll Now",
    statsNum: "150+",
    statsText: "Courses",
    image: "/images/home/home-page-slide-1.png",
  },
  {
    id: 1,
    title: "Pursue Cybersecurity Today, Secure the \n Digital Tomorrow",
    bullets: [
      "Certification Assistance",
      "Real-life Experience",
      "Over 25,000 Professionals Trained"
    ],
    btn1: "Explore Cyber Security & Certificate",
    btn1Link: "#our-programs",
    btn2: "",
    statsNum: "",
    statsText: "",
    image: "/images/home/home-page-slide-2.png",
  },
  {
    id: 2,
    title: "Upskilling Teams with\nNew-Era Skill Sets",
    bullets: [
      "500+ Enterprise Clients",
      "100% Flexible Learning Model",
      "Customized Learning Paths"
    ],
    btn1: "Explore Programs",
    btn1Link: "#our-programs",
    btn2: "",
    statsNum: "",
    statsText: "",
    image: "/images/home/home-page-slide-3.png",
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    if (index === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-auto lg:h-[calc(100vh-76px)] lg:min-h-[480px] lg:max-h-[600px] mt-[64px] lg:mt-[76px] bg-background lg:bg-gradient-to-r lg:from-primary/10 lg:via-primary/5 lg:to-background overflow-hidden flex flex-col justify-center ">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent lg:hidden pointer-events-none"></div>

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center relative z-10 h-full">

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-center w-full transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

          <div className="relative flex justify-center items-center w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] order-1 lg:order-2 pt-4 lg:pt-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] z-10 flex justify-center">
              <img
                src={slides[current].image}
                alt="Student"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-start text-left w-full max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1 relative z-30 pb-10 lg:pb-0 -mt-10 sm:-mt-12 lg:mt-0 px-2 sm:px-0">

            <h1 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[54px] font-bold text-foreground leading-[1.25] tracking-tight mb-4 sm:mb-6">
              <span className="whitespace-pre-line">{slides[current].title}</span>
            </h1>

            <ul className="flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-8 w-full">
              {slides[current].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <circle cx="12" cy="12" r="11" fill="#0AA34F" />
                    <path d="M7 12L10.5 15.5L17 8.5" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[18px] sm:text-[20px] text-muted-foreground text-slate-800 font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-[18px] px-6 h-[44px] sm:h-[48px] rounded-radius shadow-sm transition-all cursor-pointer w-full sm:w-auto">
                <Link href={slides[current].btn1Link}>{slides[current].btn1}</Link>
              </Button>

              {slides[current].btn2 && (
                <Button asChild variant="outline" className="bg-primary/10 border-transparent lg:bg-transparent lg:border-[1.5px] lg:border-primary text-primary hover:bg-primary/20 lg:hover:bg-primary lg:hover:text-primary-foreground font-bold text-[14px] px-6 h-[44px] sm:h-[48px] rounded-radius transition-all cursor-pointer w-full sm:w-auto">
                  <Link href="/login">{slides[current].btn2}</Link>
                </Button>
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2 mt-6 w-full justify-center sm:justify-start">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'bg-primary w-2' : 'bg-primary/30 hover:bg-primary/60 w-2'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </main>

      <div className="hidden lg:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 items-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'bg-primary w-2' : 'bg-primary/30 hover:bg-primary/60 w-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}