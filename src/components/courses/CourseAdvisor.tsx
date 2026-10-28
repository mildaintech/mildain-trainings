'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseAdvisor({ course }: { course?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subcategoryData, setSubcategoryData] = useState<any>(null);

  useEffect(() => {
    if (course?.subcategory) {
      const cached = sessionStorage.getItem(`subcat_${course.subcategory}`);
      if (cached) {
        try {
          setSubcategoryData(JSON.parse(cached));
        } catch (e) {}
      }

      fetch('/api/admin/subcategories')
        .then(res => res.json())
        .then(data => {
          const subcategories = Array.isArray(data) ? data : (data.data || []);
          const target = course.subcategory.trim().toLowerCase();
          const selectedSub = subcategories.find(
            (s: any) =>
              s.name?.trim().toLowerCase() === target ||
              s.slug?.trim().toLowerCase() === target ||
              s._id === course.subcategory
          );
          if (selectedSub) {
            setSubcategoryData(selectedSub);
            sessionStorage.setItem(`subcat_${course.subcategory}`, JSON.stringify(selectedSub));
          }
        })
        .catch(() => {});
    }
  }, [course?.subcategory]);

  const advisors = subcategoryData?.advisors?.length > 0 
    ? subcategoryData.advisors 
    : (course?.advisors || []);
    
  const headingPrefix = subcategoryData?.advisorHeading || course?.advisorHeading || "PMP®";

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

  if (!course) return null;
  if (advisors.length === 0) return null;

  return (
    <section id="advisor" className="pt-8 pb-2 md:pt-10 md:pb-2 bg-background overflow-hidden border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left pt-0 lg:pt-8 pr-0 lg:pr-4">
            <h3 className="mb-3 md:mb-4">
              <span className="text-primary">{headingPrefix}</span>
            </h3>
          </div>

          <div className="lg:col-span-9 flex flex-col w-full relative">
            
            <div className="w-full bg-[#FFEEBA] rounded-xl overflow-hidden relative shadow-sm min-h-[420px] sm:min-h-[260px] flex border border-border/50">
              
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                 <div className="absolute -left-8 -bottom-8 w-[180px] h-[180px] rounded-full border-[10px] border-[#f6e5b5] opacity-80"></div>

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
                    {advisors[currentIndex]?.image && (
                      <Image
                        src={advisors[currentIndex].image}
                        alt={advisors[currentIndex].imageAlt || advisors[currentIndex].name || "Advisor"}
                        title={advisors[currentIndex].imageTitle || advisors[currentIndex].name || ""}
                        width={320}
                        height={260}
                        priority
                        className="relative z-10 object-contain object-bottom h-full sm:h-[95%] w-auto max-w-[85%] sm:max-w-[90%] scale-105"
                      />
                    )}
                  </div>

                  <div className="p-6 pb-2 sm:p-8 sm:pl-4 flex-1 order-1 sm:order-2 text-center sm:text-left flex flex-col justify-center">
                    <h4 className="mb-1 sm:mb-2 text-foreground">
                      {advisors[currentIndex]?.name}
                    </h4>
                    {advisors[currentIndex]?.role && (
                      <p className="text-[13px] sm:text-[15px] font-semibold italic text-foreground/70 mb-3 sm:mb-4 font-normal">
                        {advisors[currentIndex].role}
                      </p>
                    )}
                      <p className=" text-[15px] sm:text-[18px] italic font-semibold text-foreground mb-0">
                        “{advisors[currentIndex]?.description}”
                      </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {advisors.length > 1 && (
              <div className="flex justify-center sm:justify-end items-center gap-3 mt-6">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all bg-background shadow-sm cursor-pointer"
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all bg-background shadow-sm cursor-pointer"
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}