'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ramesh Pattnaik",
    role: "Program Manager, Microsoft",
    logo: "/images/home/partner/google.png",
    image: "/images/home/ramesh.webp",
    quote: '"Mentors guide so well, and the post-training revision and mock interview preparation are bonuses."',
    text: "The professionally structured curriculum was amazing, and instructors guided so well with the intricate concepts and provided post-training revisions alongside mock interview preparations."
  },
  {
    id: 2,
    name: "Tina",
    role: "Cybersecurity Analyst Level -2, Amazon",
    logo: "/images/home/partner/amazon.png",
    image: "/images/home/tina.webp",
    quote: '"Learning with AI-blend modules offered me a personalized path that filled my skill gaps."',
    text: "The AI-driven learning path has completely transformed the way I work now. It has boosted my efficiency of work and built my true efficiency."
  },
  {
    id: 3,
    name: "Priya Bhardwaj",
    role: "Senior IT Risk Analyst (Deloitte)",
    logo: "/images/home/partner/key-benefit-deloitte.png",
    image: "/images/studetnt-reviews/success-story-priya-bhardwaj.png",
    quote: '"Before passing CISA certification, its core domains felt really overwhelming and out of reach."',
    text: "Fortunately, I got hands-on guidance from the trainer at the Mildain classrooms, which gave me clarity on what I was missing, and I was so amazed by my result. Thanks to Mildain for providing an amazing trainer; they have completely transformed my career. I finally feel like a trusted professional in my domain."
  },
  {
    id: 4,
    name: "Isha Oberoi",
    role: "Senior Security Analyst, Capgemini",
    logo: "/images/home/partner/capgemini.png",
    image: "/images/studetnt-reviews/Isha-Oberoi.png",
    quote: '" Trainer support, revision prep, and study material gave brief insight into exam questions."',
    text: "The certification and revision preparation, through the ISACA QAE kit, give me absolute clarity over the examination questions. I was entirely prepared for the examination because of the dedicated training and guidance provided by the expert mentor."
  },
  {
    id: 5,
    name: "Nirvair Singh",
    role: "Enterprise Security Architect, SpaceX",
    logo: "/images/home/partner/key-benefit-spacex.png",
    image: "/images/studetnt-reviews/Nirvair-Singh.png",
    quote: '"Managed my current job along with training successfully with online classes and bootcamps."',
    text: "The virtual classes made it easy for me to get upskilled while balancing my then-full-time workload. The continuous career support and post-training guidance were crucial as I transitioned into a senior security governance role."
  }
];

export default function AlumniVideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // Nayi state video track karne ke liye

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
    <section className="py-16 md:py-24 bg-background overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        
        <h2 className="text-center mb-10 lg:mb-14">
          Real Stories of <span className="text-primary">Mildain Learners</span> at Top Corporations
        </h2>

        <div 
          className="relative w-full aspect-video lg:aspect-[2.5/1] rounded-2xl overflow-hidden cursor-pointer group shadow-xl bg-muted border border-border/50"
          onClick={() => setIsVideoPlaying(true)} // Click karne par video play hoga
        >
          {isVideoPlaying ? (
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/lzjsnbXhTII?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full z-30"
            ></iframe>
          ) : (
            <>
              <Image
                src="/images/home/success-story.webp"
                alt="Mildain Alumni Success Story"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>

              <div className="absolute top-6 left-0 bg-btn-gradient text-primary-foreground px-6 py-2.5 rounded-r-md font-bold tracking-wide shadow-md z-10 uppercase text-sm md:text-base">
                Success story
              </div>

              <div className="absolute top-6 right-8 z-10 flex items-center">
                <Image
                  src="/images/logo/logo.webp"
                  alt="Mildain Logo"
                  width={140}
                  height={40}
                  className="h-7 md:h-9 w-auto object-contain drop-shadow-md"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(46,97,87,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:bg-primary border border-primary-foreground/20">
                  <Play className="text-primary-foreground w-8 h-8 md:w-10 md:h-10 ml-1.5" fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative mt-16 md:mt-24 w-full group/slider">
          <div className="overflow-hidden md:px-4 lg:px-8">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
            >
              {testimonials.map((test) => (
                <div key={test.id} className="w-full lg:w-1/2 flex-shrink-0 px-3 md:px-4 flex py-4">
                  <div className="bg-card border border-border/80 bg-secondary/5  rounded-2xl px-8 py-2 md:px-10 md:py-4 flex flex-col w-full h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(46,97,87,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card">
                    
                    <Quote className="absolute top-6 right-6 w-20 h-20 text-primary/5 -rotate-12 group-hover/card:text-primary/10 group-hover/card:rotate-0 transition-all duration-500" strokeWidth={1} />
                    
                    <div className="flex items-start gap-5 md:gap-6 relative z-10">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-[3px] border-primary/10 shadow-sm bg-background group-hover/card:border-primary/30 transition-colors duration-300">
                        <Image
                          src={test.image}
                          alt={test.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col pt-1">
                        <h4 className="mb-0">
                          {test.name}
                        </h4>
                        <p className=" text-[1.2rem] text-stone-900  mt-1 mb-0 opacity-90">
                          {test.role}
                        </p>
                        <div className="h-10 md:h-12 w-auto mt-2  inline-flex items-center justify-start max-w-fit">
                          <img 
                            src={test.logo} 
                            alt="Company Logo" 
                            className="h-full w-auto object-contain" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-8">
                      <p className="italic font-semibold text-foreground/90 mb-0">
                        {test.quote}
                      </p>

                      <div className="w-12 h-1 bg-primary/20 my-5 rounded-full group-hover/card:bg-primary/60 group-hover/card:w-20 transition-all duration-500"></div>

                      <p className=" text-[1.3rem] mb-0 opacity-80 leading-relaxed text-justify">
                        {test.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handlePrev}
            className="absolute left-0 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:border-primary hover:bg-primary transition-all bg-background shadow-lg z-20 opacity-0 md:opacity-100 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={28} strokeWidth={2} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:border-primary hover:bg-primary transition-all bg-background shadow-lg z-20 opacity-0 md:opacity-100 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight size={28} strokeWidth={2} />
          </button>

          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all bg-background shadow-sm"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all bg-background shadow-sm"
              disabled={currentIndex >= maxIndex}
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}