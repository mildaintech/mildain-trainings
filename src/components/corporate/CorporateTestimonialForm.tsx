'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CorporateContactForm from '@/components/shared/CorporateContactForm';

const testimonials = [
  {
    id: 1,
    quoteHeading: "First-Attempt Certification Clearance and Training Support ",
    quoteBody: "We chose Mildain Trainings and opted for CISA and CISM certification for our team of employees. During the training, the team gained access to an ISACA-aligned curriculum, learning kit, and expert supervision that guided them throughout until passing the exam. All our employees excelled in their particular training and got certified on their first attempt.",
    authorImage: "/images/corporate/corporate-review-2.webp",
    authorName: "~Ximpa Liung",
    authorTitle: "Technical Head ",
    authorCompany: "(Eminence Tech Solutions)"
  },
  {
    id: 2,
    quoteHeading: "A Truly Worthwhile Investment in the Development of our Employees.",
    quoteBody: "We found out about Mildain Trainings from a top Tech giant. The training equipped our team with job-ready AI and cybersecurity skills. The training services that they provided to us offered a unique combination of theory and practice. Through their in-depth industry expertise, our staff gained high-tech, job-ready skills valuable for their jobs.",
    authorImage: "/images/corporate/corporate-review-1.webp",
    authorName: "~Vijay Bhandari",
    authorTitle: " Chief Technology Officer",
    authorCompany: "(WeNexaWay Global)"
  }
];

export default function CorporateTestimonialForm() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 flex flex-col w-full">
            <h2 className="mb-4">
              Client Stories: Review & Impact
            </h2>
            <p className="mb-10 max-w-[500px]">
              See how leading organizations upskill their workforce with Mildain.
            </p>

            <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm relative w-full mb-8">

              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-foreground leading-tight mb-6">
                {testimonials[currentIndex].quoteHeading}
              </h3>

              <p className="text-[16px] md:text-[18px] lg:text-[20px] text-muted-foreground leading-relaxed mb-10">
                {testimonials[currentIndex].quoteBody}
              </p>

              <div className="w-full h-px bg-border mb-8"></div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-border">
                  <img 
                    src={testimonials[currentIndex].authorImage} 
                    alt={testimonials[currentIndex].authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[20px] md:text-[22px] font-bold text-foreground">
                    {testimonials[currentIndex].authorName}
                  </span>
                  <span className="text-[14px] md:text-[16px] text-muted-foreground leading-snug">
                    {testimonials[currentIndex].authorTitle}
                  </span>
                  <span className="text-[14px] md:text-[16px] font-bold text-foreground leading-snug">
                    {testimonials[currentIndex].authorCompany}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pl-4">
              <button onClick={prevSlide} className="text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
              </button>
              <button onClick={nextSlide} className="text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <CorporateContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}