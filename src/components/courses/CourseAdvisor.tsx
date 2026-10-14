'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseAdvisor({ course }: { course?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!course) return null;

  const advisors = Array.isArray(course.advisors) ? course.advisors : [];
  const headingPrefix = course.advisorHeading || "PMP®";

  useEffect(() => {
    if (advisors.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === advisors.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [advisors.length]);

  const handlePrev = () => {
    if (advisors.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? advisors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (advisors.length <= 1) return;
    setCurrentIndex((prev) => (prev === advisors.length - 1 ? 0 : prev + 1));
  };

  if (advisors.length === 0) return null;

  return (
    <section id="advisor" className="py-8 md:py-12 bg-white overflow-hidden border-t border-slate-100">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-3 flex flex-col items-start lg:pr-4 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              <span className="text-[#10b981]">{headingPrefix}</span> Training<br />Course Advisor
            </h2>
          </div>

          <div className="lg:col-span-9 flex flex-col w-full relative">
            
            <div className="w-full bg-[#fdf8ed] rounded-xl overflow-hidden relative shadow-sm h-[280px] md:h-[260px] border border-[#fceec4]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full h-full flex flex-row items-center absolute inset-0"
                >
                  <div className="relative w-[180px] md:w-[240px] h-full shrink-0 flex items-end justify-center bg-gradient-to-r from-[#fae7b1] to-[#fdf8ed] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                       <div className="w-32 h-32 border-[16px] border-[#fceec4] rounded-full transform -translate-x-8 -translate-y-8"></div>
                       <div className="w-48 h-48 border-[16px] border-[#fceec4] rounded-full absolute transform translate-x-16 translate-y-16"></div>
                    </div>
                    
                    {advisors[currentIndex]?.image && (
                      <Image
                        src={advisors[currentIndex].image}
                        alt={advisors[currentIndex].imageAlt || advisors[currentIndex].name || "Advisor"}
                        title={advisors[currentIndex].imageTitle || advisors[currentIndex].name || ""}
                        width={240}
                        height={260}
                        className="relative z-10 object-contain object-bottom h-[85%] w-auto"
                      />
                    )}
                  </div>

                  <div className="p-4 md:p-6 pl-4 md:pl-6 flex-1 h-full flex flex-col justify-center overflow-hidden">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 truncate">
                      {advisors[currentIndex]?.name}
                    </h3>
                    <div className="overflow-y-auto pr-2 max-h-[140px] md:max-h-[160px]">
                      <p className="text-[13px] md:text-[14px] text-slate-700 leading-relaxed font-medium break-words whitespace-pre-wrap">
                        {advisors[currentIndex]?.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {advisors.length > 1 && (
              <div className="flex justify-end items-center gap-4 mt-6">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-colors bg-white shadow-sm"
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-colors bg-white shadow-sm"
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}