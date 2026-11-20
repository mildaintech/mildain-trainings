'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is corporate IT training?",
    answer: "Corporate IT training offers organizations a means of teaching employees necessary technology skills, professional abilities, and competencies that are essential for their industries. The courses can include training in areas such as cloud computing, cybersecurity, artificial intelligence, data analysis, project management, and IT service management."
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