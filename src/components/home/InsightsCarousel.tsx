'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "CISSP, CISM, or CEH? Choosing the Right Cybersecurity Certification Path.",
    description: "Guide your cybersecurity journey. Find out whether CEH (Hacking), CISM (Management), or CISSP (Architecture) is the best match for your skills and career goals.",
    bgOverlay: "bg-[#5D191F]/90",
    image: "/images/home/hero.png"
  },
  {
    id: 2,
    title: "How PMP®-Certified Project Managers Drive Better Business Results.",
    description: "Maximize your organizational growth. Discover how PMP®-certified professionals streamline project workflows, manage risks effectively, and deliver high-impact business results on time and within budget.",
    bgOverlay: "bg-[#2A5C91]/90",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Why U.S. Companies Are Prioritizing Workforce Upskilling in 2026.",
    description: "Stay competitive in a fast-evolving market. Discover why top U.S. enterprises are investing heavily in upskilling to close AI talent gaps, boost employee retention, and drive sustainable innovation.",
    bgOverlay: "bg-[#806112]/90",
    image: "/images/home/hero2.png"
  },
  {
    id: 4,
    title: "Mastering Cloud Architecture: AWS vs Azure vs Google Cloud.",
    description: "Navigate the cloud computing ecosystem. Understand the core differences, pricing models, and specific enterprise use cases for the big three cloud providers in today's market.",
    bgOverlay: "bg-[#5D191F]/90",
    image: "/images/home/hero1.png"
  },
  {
    id: 5,
    title: "The Future of AI in Enterprise Software Development.",
    description: "Explore how generative AI and machine learning models are fundamentally changing the software development life cycle, from automated testing to intelligent code generation.",
    bgOverlay: "bg-[#2A5C91]/90",
    image: "/images/home/hero2.png"
  },
  {
    id: 6,
    title: "Building Resilient Data Pipelines with Modern Big Data Tools.",
    description: "Learn the best practices for structuring, transforming, and managing large-scale data systems to ensure high availability and actionable insights for your business intelligence teams.",
    bgOverlay: "bg-[#806112]/90",
    image: "/images/home/hero1.png"
  },
  {
    id: 7,
    title: "Agile Leadership: Navigating Remote and Hybrid Teams.",
    description: "Discover proven strategies and agile methodologies that empower engineering managers to maintain high productivity and team morale in distributed work environments.",
    bgOverlay: "bg-[#5D191F]/90",
    image: "/images/home/hero.png"
  },
  {
    id: 8,
    title: "Zero Trust Security Model: Implementation Strategies for 2026.",
    description: "Break down the core pillars of the Zero Trust framework. Learn how to secure your enterprise networks against sophisticated modern cyber threats and internal vulnerabilities.",
    bgOverlay: "bg-[#2A5C91]/90",
    image: "https://images.unsplash.com/photo-1581091871343-9a6c099886ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHRlY2glMjBnaXJsJTIwbm90ZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 9,
    title: "Data Privacy Regulations and Compliance for Global Tech.",
    description: "Stay ahead of legal requirements. A comprehensive overview of how modern data science and business analytics teams must adapt to stringent global privacy laws like GDPR and CCPA.",
    bgOverlay: "bg-[#806112]/90",
    image: "/images/home/hero2.png"
  }
];

export default function InsightsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = articles.length - cardsToShow;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="w-full flex flex-col bg-background">
      
      <div className="w-full pb-10 md:pb-12 text-center px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          Upskill for <span className="text-primary">Career Growth</span>
        </h2>
      </div>

      <div className="w-full relative bg-black group/carousel">
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="w-full sm:w-1/2 lg:w-1/3 flex-none relative h-[24rem] md:h-[28rem] overflow-hidden group border-r border-white/10 last:border-r-0"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className={`absolute inset-0 transition-opacity duration-500 ${article.bgOverlay} group-hover:opacity-0`} />
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
                
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col z-10">
                  <h3 className="text-white text-xl md:text-2xl font-bold leading-snug mb-5 line-clamp-3">
                    {article.title}
                  </h3>
                  
                  <div className="w-10 h-1 bg-primary mb-5" />
                  
                  <p className="text-white/90 text-base md:text-lg leading-relaxed line-clamp-4 mb-6">
                    {article.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button className="bg-white text-primary hover:bg-slate-100 transition-colors font-bold text-base px-6 py-2.5 rounded-sm flex items-center gap-2 shadow-sm">
                      Read <ArrowRight size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-lg z-20 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-lg z-20 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}