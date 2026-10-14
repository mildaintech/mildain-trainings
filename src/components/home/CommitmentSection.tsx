import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BookOpen, ScrollText } from 'lucide-react';

export default function CommitmentSection() {
  return (
    <section className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-6 lg:mb-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block border-2 border-primary text-primary px-5 py-2 rounded-sm text-base md:text-xl font-bold">
              Our Core Purpose
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
              Inclusive Environment<br />
              Supporting Diverse<br />
              Talent
            </h2>
          </div>
          
          <div className="lg:col-span-7 lg:pt-16">
            <p className="text-muted-foreground text-xl text-slate-800 md:text-xl leading-relaxed w-11/12">
              The concept of 'diversity breeds innovation' is central to our standards. Our training initiatives lift the obstacles and create equal opportunities for professionals and leaders globally.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 relative w-full h-64 sm:h-84 lg:h-[28rem]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Students learning together"
              fill
              className="object-cover rounded-lg shadow-md"
              priority
            />
          </div>

          <div className="lg:col-span-7 flex flex-col w-full">
            
            <div className="grid grid-cols-2 border-y border-border py-2 lg:py-4">
              <div className="flex flex-col pr-4 lg:pr-6">
                <span className="text-5xl lg:text-6xl font-bold text-primary leading-none mb-3">
                  100%
                </span>
                <span className="text-foreground font-bold text-xl md:text-xl leading-snug">
                  Flexible Lesson <br />Plans
                </span>
              </div>
              
              <div className="flex flex-col pl-6 lg:pl-10 border-l border-border">
                <span className="text-5xl lg:text-6xl font-bold text-primary leading-none mb-3">
                  25K+
                </span>
                <span className="text-foreground font-bold text-xl md:text-xl leading-snug">
                  Trainings <br />Delivered
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-xl   text-slate-800 md:text-xl leading-relaxed mt-4 mb-6">
              Make the most out of our training options, which include online, offline, and fly-me-a-trainer. Enjoy full assistance in the preparation for certification and post-training revisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-8">
              <div className="flex items-start gap-5">
                <BookOpen className="text-primary w-10 h-10 shrink-0 mt-1" strokeWidth={2} />
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-foreground font-bold text-xl">Post Graduate</h4>
                  <p className="text-muted-foreground text-base">Onsite Service</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <ScrollText className="text-primary w-10 h-10 shrink-0 mt-1" strokeWidth={2} />
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-foreground font-bold text-xl">Undergraduate</h4>
                  <p className="text-muted-foreground text-base">Onsite Service</p>
                </div>
              </div>
            </div>

            <div>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 rounded-sm text-xl font-bold transition-all shadow-sm">
                <Link href="/get-started">Begin Your Journey</Link>
              </Button>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}