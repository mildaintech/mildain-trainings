'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  "AI & Machine Learning",
  "Big Data Analytics",
  "Cyber Security",
  "DevOps",
  "Data Science & Business Analytics",
  "Quality Management",
  "Project Management"
];

const roles = [
  {
    id: 1,
    title: "Joana Sampson",
    subtitle: "10+ Years in Cybersecurity GRC | CISM | CISSP | CRISC Certified",
    description: "“Technological skills will open doors for growth, but constant learning can create better career pathways.”",
    image: "/images/home/hero.png"
  },
  {
    id: 2,
    title: "Joana Sampson",
    subtitle: "10+ Years in Cybersecurity GRC | CISM | CISSP | CRISC Certified",
    description: "“Technological skills will open doors for growth, but constant learning can create better career pathways.”",
    image: "/images/home/hero1.png"
  },
  {
    id: 3,
    title: "Joana Sampson",
    subtitle: "10+ Years in Cybersecurity GRC | CISM | CISSP | CRISC Certified",
    description: "“Technological skills will open doors for growth, but constant learning can create better career pathways.”",
    image: "/images/home/hero2.png"
  }
];

export default function ExploreSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? roles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-10 md:py-15 bg-secondary/5 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        <div className="mb-10 md:mb-14">
          <h2 className="mb-6 md:mb-8 text-center md:text-left">
            Explore by <span className="text-primary">Categories</span>
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-5 pb-4 md:pb-0">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/categories/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="px-5 py-2.5 md:px-6 md:py-2 bg-secondary/10 hover:bg-primary hover:text-primary-foreground text-foreground text-[14px] md:text-[16px] rounded-full transition-colors whitespace-nowrap font-medium border border-transparent hover:border-primary/20"
              >
                {cat}
              </Link>
            ))}
            <Link
              href="/Courses"
              className="text-primary/90 hover:text-primary font-bold text-[15px] md:text-[16px] whitespace-nowrap flex items-center transition-colors"
            >
              View All Categories <ChevronRight size={18} strokeWidth={2.5} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left pt-0 lg:pt-8 pr-0 lg:pr-4">
            <h3 className="mb-3 md:mb-4">
              Skilled Instructor
            </h3>
            <p className=" text-xl max-w-md md:max-w-none mx-auto md:mx-0">
              Get inclusive training with seasoned professionals with years of dedicated industry experience.
            </p>
          </div>

          <div className="lg:col-span-9 flex flex-col w-full relative">
            
            <div className="w-full bg-[#FFEEBA] rounded-xl overflow-hidden relative shadow-sm min-h-[420px] sm:min-h-[260px] flex border border-border/50">
              
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-[280px] h-[280px] rounded-full border-[20px] border-[#f6e5b5] opacity-60"></div>
                <div className="absolute -left-20 -bottom-20 w-[380px] h-[380px] rounded-full border-[30px] border-[#f6e5b5] opacity-40"></div>
                <div className="absolute -left-32 -bottom-32 w-[480px] h-[480px] rounded-full border-[40px] border-[#f6e5b5] opacity-20"></div>
                
                <div className="absolute right-0 top-0 w-full md:w-[50%] h-full opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(246,229,181,0.5)_25%,rgba(246,229,181,0.5)_50%,transparent_50%,transparent_75%,rgba(246,229,181,0.5)_75%,rgba(246,229,181,0.5)_100%)] bg-[length:100px_100px]"></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full flex flex-col sm:flex-row items-center absolute inset-0 z-10"
                >
                  <div className="relative w-full sm:w-[270px] h-[220px] sm:h-full shrink-0 flex items-end justify-center order-2 sm:order-1 mt-auto sm:mt-0 pt-4 sm:pt-0">
                    <Image
                      src={roles[currentIndex].image}
                      alt={roles[currentIndex].title}
                      width={320}
                      height={260}
                      className="relative z-10 object-contain object-bottom h-full sm:h-[95%] w-auto max-w-[85%] sm:max-w-[90%]"
                    />
                  </div>

                  <div className="p-6 pb-2 sm:p-8 sm:pl-4 flex-1 order-1 sm:order-2 text-center sm:text-left">
                    <h3 className="mb-1 sm:mb-2">
                      {roles[currentIndex].title}
                    </h3>
                    <p className="text-[13px] sm:text-[15px] italic text-foreground/70 mb-3 sm:mb-4 font-normal">
                      {roles[currentIndex].subtitle}
                    </p>
                    <p className="font-semibold text-foreground">
                      {roles[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center items-center gap-3 mt-6">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all bg-background shadow-sm"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all bg-background shadow-sm"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}