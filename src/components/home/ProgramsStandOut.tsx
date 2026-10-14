'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  {
    id: 1,
    title: "Industry-specific Curriculum",
    description: "Built with top corporations and tech giants",
    image: "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Specialized Trained Professionals",
    description: "Hands-on Training with Experts with 15+ Years of Experience",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    title: "Trainings Across Sectors",
    description: "Specialized training across government, defense, and corporate sectors",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2h8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    title: "Carrer Guidance",
    description: "Mock interview preparations with 100% engagement support",
    image: "https://plus.unsplash.com/premium_photo-1683120972279-87efe2ba252f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRlY2h8ZW58MHx8MHx8fDA%3D",
  },
];

export default function ProgramsStandOut() {
  return (
    <section className="py-12 md:py-16 bg-slate-50/50">
      <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-16">
        
        <div className="mb-4 md:mb-8">
          <h2 className="text-4xl md:text-5xl  text-foreground tracking-tight leading-tight">
            Why<span className="text-primary"> Mildain Trainings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-16">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-row md:flex-col items-start pb-8 md:pb-0 border-b border-border md:border-0 last:border-0"
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-full md:h-64 lg:h-80 shrink-0 md:shrink overflow-hidden bg-muted rounded-xl md:mb-8 mt-1 md:mt-0 shadow-sm">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex flex-col flex-1 pl-5 md:pl-0 md:pr-6">
                <h3 className="text-2xl md:text-2.5xl font-bold text-foreground mb-2 md:mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}