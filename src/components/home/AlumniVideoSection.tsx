'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ramesh Pattnaik",
    role: "Program Manager, Microsoft",
    logo: "/images/home/partner/google.png ",
    image: "/images/home/hero1.png",
    quote: '"Mentors guide so well, and the post-training revision and mock interview preparation are bonuses."',
    text: "The professionally structured curriculum was amazing, and instructors guided so well with the intricate concepts and provided post-training revisions alongside mock interview preparations."
  },
  {
    id: 2,
    name: "Tina",
    role: "Cybersecurity Analyst Level -2, amazon",
    logo: "/images/home/partner/amazon.png",
    image: "/images/home/hero2.png",
    quote: '"Learning with AI-blend modules offered me a personalized path that filled my skill gaps."',
    text: "The AI-driven learning path has completely transformed the way I work now. It has boosted my efficiency of work and built my true efficiency."
  },
  {
    id: 3,
    name: "David Chen",
    role: "Data Scientist, Google",
    logo: "/images/home/partner/microsoft.png",
    image: "/images/home/hero.png",
    quote: '"The hands-on labs and expert mentorship were game-changers for my career trajectory."',
    text: "Learning from top industry professionals gave me the exact skills needed to transition into data science. The curriculum is up-to-date with current market demands and the dedicated career support helped me secure my dream role quickly."
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Cloud Architect, AWS",
    logo: "/images/home/partner/amazon.png",
    image: "/images/home/hero1.png",
    quote: '"An incredible learning experience that directly translated to a major career leap."',
    text: "The depth of the cloud computing modules is unmatched. I appreciated the rigorous assessments and the real-world cloud deployment scenarios. It thoroughly prepared me for the actual challenges I face daily as a Cloud Architect."
  },
  {
    id: 5,
    name: "Arjun Mehta",
    role: "Product Manager, Meta",
    logo: "/images/home/partner/ec-council.png",
    image: "/images/home/hero2.png",
    quote: '"Transformed my understanding of product strategy and agile execution frameworks."',
    text: "This platform bridges the gap between theoretical knowledge and practical application. The peer-to-peer learning and networking opportunities were invaluable. I highly recommend this to anyone looking to scale their career."
  },
  {
    id: 6,
    name: "Emily Watson",
    role: "Security Consultant, ISACA",
    logo: "/images/home/partner/isaca.png",
    image: "/images/home/hero.png",
    quote: '"The most comprehensive cybersecurity training I have ever attended online."',
    text: "I was looking for a program that could offer both breadth and depth in cybersecurity. The interactive simulations and constant support from mentors made complex topics easy to grasp. It's a must for aspiring security professionals."
  }
];

export default function AlumniVideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsToShow = isMobile ? 1 : 2;
  const maxIndex = testimonials.length - cardsToShow;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-16">
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-foreground mb-8 lg:mb-10  leading-tight">
          Real Stories of<span className="text-primary"> Mildain Learners</span> at Top Corporations
        </h2>

        <div className="relative w-full aspect-video lg:aspect-[2.2/1] rounded-2xl overflow-hidden cursor-pointer group shadow-md bg-muted">
          <Image
             src= "https://plus.unsplash.com/premium_photo-1661963085061-5068e4e73cc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mildain Alumni Success Story"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>

          <div className="absolute top-6 left-0 bg-[#83bb9a]  text-white px-6 py-2.5 rounded-r-md text-base md:text-lg font-bold tracking-wide shadow-sm z-10">
            Success story
          </div>

          <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-white font-extrabold text-xl md:text-2xl tracking-wide">MILDAIN</span>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1.5" fill="currentColor" strokeWidth={0} />
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-20 w-full">
          <div className="overflow-hidden -mx-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {testimonials.map((test) => (
                <div key={test.id} className="w-full lg:w-1/2 flex-shrink-0 px-4 flex">
                  <div className="bg-primary/5 border border-border/60 rounded-2xl p-8 md:p-10 flex flex-col w-full h-full shadow-sm hover:shadow-md transition-shadow">
                    
                    <div className="flex items-start gap-5 md:gap-6">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-2 border-background shadow-[0_6px_10px_-2px_rgba(0,0,0,0.25)] bg-background">
                        <Image
                            src={test.image}
                            alt={test.name}
                            fill
                            className="object-cover"
                        />
                        </div>
                      <div className="flex flex-col pt-1">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                          {test.name}
                        </h3>
                        <p className="text-base text-muted-foreground mt-1.5 font-medium">
                          {test.role}
                        </p>
                        <img 
                          src={test.logo} 
                          alt="Company Logo" 
                          className="h-12 md:h-14 w-auto mt-3 object-contain !object-left" 
                        />
                      </div>
                    </div>

                    <h4 className="text-lg md:text-xl font-bold text-foreground mt-8 leading-snug text-justify">
                    {test.quote}
                    </h4>

                    <p className="text-base md:text-lg text-muted-foreground mt-5 leading-relaxed font-medium text-justify">
                    {test.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 mt-10 md:mt-12">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all bg-background shadow-sm"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all bg-background shadow-sm"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}