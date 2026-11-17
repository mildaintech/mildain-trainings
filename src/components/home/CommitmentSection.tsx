'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import QuickInquiry from '@/components/shared/QuickInquiry';

export default function CommitmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <section className="py-10 md:py-15 bg-background overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start mb-8 lg:mb-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block border-[1.5px] border-primary text-primary px-5 py-2.5 rounded-md font-bold tracking-wide">
                Our Core Purpose
              </div>
              <h2>
                Inclusive Environment<br />
                Supporting Diverse<br />
                Talent
              </h2>
            </div>
            
            <div className="lg:col-span-7 lg:pt-20">
              <p className="w-full lg:w-11/12">
                The concept of 'diversity breeds innovation' is central to our standards. Our training initiatives lift the obstacles and create equal opportunities for professionals and leaders globally.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
            
            <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[450px] lg:h-[500px]">
              <Image
                src="/images/home/our-core-purpose.webp"
                alt="Students learning together"
                fill
                className="object-cover rounded-xl shadow-lg"
                priority
              />
            </div>

            <div className="lg:col-span-7 flex flex-col w-full">
              
              <div className="grid grid-cols-2 border-y border-border py-6 lg:py-8">
                <div className="flex flex-col pr-4 lg:pr-6">
                  <span className="text-[48px] lg:text-[64px] font-extrabold text-primary leading-none mb-3">
                    100%
                  </span>
                  <h5>
                    Flexible Lesson <br />Plans
                  </h5>
                </div>
                
                <div className="flex flex-col pl-6 lg:pl-10 border-l border-border">
                  <span className="text-[48px] lg:text-[64px] font-extrabold text-primary leading-none mb-3">
                    25K+
                  </span>
                  <h5>
                    Trainings <br />Delivered
                  </h5>
                </div>
              </div>

              <p className="my-6">
                Make the most out of our training options, which include online, offline, and fly-me-a-trainer. Enjoy full assistance in the preparation for certification and post-training revisions.
              </p>
              <div className="flex items-center gap-4 sm:gap-6 mb-2">
                <div className="flex items-center justify-center">
                  <img
                    src="/images/home/partner/isaca.png"
                    alt="ISACA Partner"
                    className="block w-[120px] sm:w-[150px] h-[65px] sm:h-[75px] object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/home/partner/comptia.png"
                    alt="CompTIA Partner"
                    className="block w-[150px] sm:w-[170px] h-[65px] sm:h-[75px] object-contain mix-blend-multiply"
                  />
                </div>
              </div>
              <div>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 h-[52px] sm:h-[56px] rounded-md transition-all cursor-pointer w-full sm:w-auto font-bold tracking-wide"
                >
                  Begin Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
            <QuickInquiry onClose={() => setIsModalOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}