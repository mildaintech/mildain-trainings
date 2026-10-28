'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function CommitmentSection() {
  return (
    <section className="py-10 md:py-15 bg-backgrond overflow-hidden">
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
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

            <div className="flex items-center gap-4 sm:gap-6 mb-6">
              <div className="bg-background rounded-lg w-[120px] sm:w-[150px] h-[55px] sm:h-[65px] flex items-center justify-center px-4 hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
                <img 
                  src="/images/home/partner/isacapartner.png" 
                  alt="ISACA Partner" 
                  className="max-h-8 sm:max-h-10 max-w-full object-contain"
                />
              </div>
              <div className="bg-background rounded-lg w-[120px] sm:w-[150px] h-[55px] sm:h-[65px] flex items-center justify-center px-4 hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
                <img 
                  src="/images/home/partner/comptiapartner.png" 
                  alt="Justdial" 
                  className="max-h-8 sm:max-h-10 max-w-full object-contain"
                />
              </div>
            </div>

            <div>
              <Button asChild className="px-8 h-[52px] sm:h-[56px] rounded-md transition-all cursor-pointer w-full sm:w-auto font-bold tracking-wide">
                <Link href="/get-started">Begin Your Journey</Link>
              </Button>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}