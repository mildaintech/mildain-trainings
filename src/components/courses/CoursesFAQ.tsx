'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "How do I pick the right training course to begin my course journey?",
    answer: "Start by figuring out the skills you want to build, the tech that honestly matters in your current role, and the career moves you're aiming for. Then look at courses that match your experience level, what you want to learn, and what interests you professionally. You can also talk to a training advisor if you want help."
  },
  {
    id: 2,
    question: " Are the courses built for beginners, or only for people who already have experience?",
    answer: "Actually, it depends on the course you choose. Some courses cover the basics for beginners. Others dig into advanced skills for professionals already working in this field. Check the requirements for each course before you sign up."
  },
  {
    id: 3,
    question: "Do I need technical knowledge before enrolling?",
    answer: "Not always. Every course offers something unique. Foundational courses may be suitable for learners starting from scratch, whereas advanced technology and certification courses may require relevant experience or an understanding of basic concepts."
  },
    {
    id: 4,
    question: "Are sessions online or in a classroom?",
    answer: "Mildain Trainings runs instructor-led online and classroom sessions. We can also arrange on-site corporate training for organizations, subject to the usual terms and conditions. Available learning modes may vary depending on the course and location."
  },
  {
    id: 5,
    question: "Will I get hands-on experience during the training?",
    answer: "Practical learning is a big part of how Mildain trains people. Depending on the course, sessions may include hands-on exercises, lab assignments, demonstrations, and real-world business scenarios to help you understand how concepts are applied in professional environments."
  },
  {
    id: 6,
    question: " Do these courses get me prepared for industry-recognized certifications?",
    answer: "Many training programs are designed to support preparation for relevant industry certifications. The certification body, exam requirements, and how much prep you get depend on which course you pick. Check the course page for the certification details."
  },
    {
    id: 7,
    question: "How long does a training course take to finish?",
    answer: "Duration varies by subject, how deep the curriculum goes, what you're trying to learn, and the training level. You can find the expected duration on the respective course page or speak with a training advisor for further details."
  },
];

export default function CoursesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState(5);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-6 md:py-12 bg-background overflow-hidden border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        <h2 className="text-center mb-12 md:mb-16">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4 md:gap-5 w-full">
          {faqData.slice(0, visibleCount).map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={faq.id} 
                className={`flex flex-col w-full shadow-sm rounded-md overflow-hidden transition-all duration-300 border border-border ${
                  isOpen ? 'bg-btn-gradient text-primary-foreground' : 'bg-card'
                }`}
              >
                
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center px-6 md:px-8 py-3 md:py-4 text-left transition-colors duration-200 cursor-pointer ${
                    isOpen ? 'bg-transparent text-primary-foreground' : 'bg-card text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className={`text-[18px] md:text-[20px] lg:text-[22px] font-bold pr-4 leading-tight ${
                    isOpen ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-2 h-2 md:w-4 md:h-4 shrink-0 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                    isOpen ? 'border-primary-foreground text-primary-foreground bg-transparent' : 'border-primary text-primary bg-transparent'
                  }`}>
                    {isOpen ? (
                      <X className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
                    ) : (
                      <Plus className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 py-5 md:py-6 bg-transparent">
                    <p className="text-[16px] md:text-[18px] lg:text-[20px] text-primary-foreground/95 font-medium leading-relaxed mb-0">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {visibleCount < faqData.length && (
          <div className="w-full flex justify-center mt-10 md:mt-12">
            <button
              onClick={() => setVisibleCount(faqData.length)}
              className="border-2 border-primary bg-transparent text-primary hover:bg-primary/10 text-[16px] md:text-[18px] px-10 py-3 rounded-md transition-all font-bold cursor-pointer"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </section>
  );
}