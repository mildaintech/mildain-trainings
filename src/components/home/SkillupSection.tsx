import React from 'react';
import Image from 'next/image';

export default function SkillupSection() {
  return (
    <section className="relative w-full py-14 md:py-16 lg:py-20 bg-gradient-to-r from-[#2cbd74] to-[#199d5a] overflow-hidden">
      
      <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-30 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" fill="white" />
          </pattern>
          <rect width="100" height="100" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-2 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="flex flex-col items-start text-left">
            <p className="text-white text-lg md:text-xl font-semibold mb-4">
              For Businesses
            </p>
            
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
              Leadership <br />
              Skill Up+
            </h2>
            
            <p className="text-white text-lg md:text-xl leading-relaxed mb-10 w-full lg:w-11/12">
              Building strong teams with interactive workshops, real-world business scenarios, and sandbox techniques rather than traditional lectures.
            </p>
            
            <button className="bg-white text-[#199d5a] hover:bg-slate-100 px-10 py-2 rounded-sm font-bold text-lg transition-colors shadow-md">
              Get Started
            </button>
          </div>

          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl h-[400] aspect-video bg-slate-900 overflow-hidden shadow-2xl ">
              <Image
                src="https://images.unsplash.com/photo-1622676017526-4a8e99f5fdf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mildain Skillup Business Team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}