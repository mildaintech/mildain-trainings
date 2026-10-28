'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Cyber Security Interview Questions and Answers",
    description: "A decade ago, if someone had told you that your online shopping history or the way you scroll through Instagram was worth millions, you'd probably laugh it off. Yet here we are where data is as valuable as gold.",
    bgOverlay: "from-[#005A9C] via-[#005A9C]/90 to-transparent",
    image: "/images/home/hero.png"
  },
  {
    id: 2,
    title: "Workday Interview Questions and Answers",
    description: "A decade ago, if someone had told you that your online shopping history or the way you scroll through Instagram was worth millions, you'd probably laugh it off. Yet here we are where data is as valuable as gold.",
    bgOverlay: "from-[#7A1F3D] via-[#7A1F3D]/90 to-transparent",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Guidewire Interview Questions and Answers",
    description: "A decade ago, if someone had told you that your online shopping history or the way you scroll through Instagram was worth millions, you'd probably laugh it off. Yet here we are where data is as valuable as gold.",
    bgOverlay: "from-[#8B6508] via-[#8B6508]/90 to-transparent",
    image: "/images/home/hero2.png"
  },
  {
    id: 4,
    title: "Mastering Cloud Architecture: AWS vs Azure vs Google Cloud.",
    description: "Navigate the cloud computing ecosystem. Understand the core differences, pricing models, and specific enterprise use cases for the big three cloud providers in today's market.",
    bgOverlay: "from-[#005A9C] via-[#005A9C]/90 to-transparent",
    image: "/images/home/hero1.png"
  },
  {
    id: 5,
    title: "The Future of AI in Enterprise Software Development.",
    description: "Explore how generative AI and machine learning models are fundamentally changing the software development life cycle, from automated testing to intelligent code generation.",
    bgOverlay: "from-[#7A1F3D] via-[#7A1F3D]/90 to-transparent",
    image: "/images/home/hero2.png"
  },
  {
    id: 6,
    title: "Building Resilient Data Pipelines with Modern Big Data Tools.",
    description: "Learn the best practices for structuring, transforming, and managing large-scale data systems to ensure high availability and actionable insights for your business intelligence teams.",
    bgOverlay: "from-[#8B6508] via-[#8B6508]/90 to-transparent",
    image: "/images/home/hero1.png"
  },
  {
    id: 7,
    title: "Agile Leadership: Navigating Remote and Hybrid Teams.",
    description: "Discover proven strategies and agile methodologies that empower engineering managers to maintain high productivity and team morale in distributed work environments.",
    bgOverlay: "from-[#005A9C] via-[#005A9C]/90 to-transparent",
    image: "/images/home/hero.png"
  },
  {
    id: 8,
    title: "Zero Trust Security Model: Implementation Strategies for 2026.",
    description: "Break down the core pillars of the Zero Trust framework. Learn how to secure your enterprise networks against sophisticated modern cyber threats and internal vulnerabilities.",
    bgOverlay: "from-[#7A1F3D] via-[#7A1F3D]/90 to-transparent",
    image: "https://images.unsplash.com/photo-1581091871343-9a6c099886ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHRlY2glMjBnaXJsJTIwbm90ZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 9,
    title: "Data Privacy Regulations and Compliance for Global Tech.",
    description: "Stay ahead of legal requirements. A comprehensive overview of how modern data science and business analytics teams must adapt to stringent global privacy laws like GDPR and CCPA.",
    bgOverlay: "from-[#8B6508] via-[#8B6508]/90 to-transparent",
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
    <section className="w-full flex flex-col py-10 md:py-15 bg-secondary/5">
      
      <div className="w-full pb-10 md:pb-12 text-center px-6">
        <h2 className="mb-0">
          Upskill for <span className="text-primary">Career Growth</span>
        </h2>
      </div>

      <div className="w-full relative group/carousel">
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="w-full sm:w-1/2 lg:w-1/3 flex-none relative h-[26rem] md:h-[30rem] overflow-hidden group border-r border-border/20 last:border-r-0 text-white"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-r ${article.bgOverlay} transition-opacity duration-500 group-hover:opacity-0`} />
                
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col z-10 w-full md:w-11/12">
                  <h3 className="mb-4 line-clamp-3 text-white">
                    {article.title}
                  </h3>
                  
                  <div className="w-16 h-1 bg-[#199d5a] mb-5" />
                  
                  <p className="line-clamp-4 mb-6 text-white/90">
                    {article.description}
                  </p>
                  
                  <div className="mt-auto">
                    <button className="bg-btn-gradient text-primary-foreground hover:opacity-95 transition-all px-6 py-3.5 rounded-sm flex items-center justify-center gap-2 shadow-sm w-[220px]">
                      Read More <ArrowRight size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-lg z-20 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 border border-border"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-lg z-20 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 border border-border"
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}