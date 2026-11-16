'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is corporate IT training?",
    answer: "Corporate IT training offers organizations a means of teaching employees necessary technology skills, professional abilities, and competencies that are essential for their industries. The courses can include training in areas such as cloud computing, cybersecurity, artificial intelligence, data analysis, project management, and IT service management."
  },
  {
    id: 2,
    question: "What types of corporate training programs do you offer?",
    answer: "Corporate training programs include the following: training in technical skills, obtaining professional qualifications, learning leadership skills, project management training, cybersecurity, working with cloud technologies, working with data analysis and training in the implementation of new technologies. The program that would be most appropriate for your organization depends on its needs and goals."
  },
  {
    id: 3,
    question: "Is it possible to have training programs developed according to our needs?",
    answer: "The answer is YES. Corporate training can be customized according to the needs of your business and the competencies of your employees. Customization of training paths and schedules will ensure that the training can be easily accessible for all."
  },
  {
    id: 4,
    question: "What training formats are available for employee upskilling?",
    answer: "Corporate training can be delivered in different formats: in live sessions conducted by the instructor online, in a classroom environment, or using blended learning methods. The choice of format depends on the location of your corporation, scheduling, size of group, and preferred learning approach you opt for."
  },
  {
    id: 5,
    question: "In what way does corporate training help us create a workforce that is ready to face the challenges of the future?",
    answer: "Corporate training will upskill employees, ensure they are well trained in advanced technical skills, and have expertise in hand and industry-related knowledge. This helps organizations to cope with rapid technological changes, reduce skill shortfall, and prepare teams for the forthcoming challenges of the business world."
  },
  {
    id: 6,
    question: "In what ways can corporate learning help our organization?",
    answer: "Corporate learning assists organizations in skill gap management, workforce improvement, technological implementation support, and preparation for the primary functions of employees. Good corporate learning programs can also help in the development of personnel and the achievement of future goals of the organization."
  },
  {
    id: 7,
    question: "How to choose the best course/skill for corporate training?",
    answer: "Begin by identifying the specific business objectives of your organization, existing skill gaps, and the employees you want to train. After that, you can look for appropriate courses, training types, and assessment forms to establish a training plan that will meet the needs of your organization."
  },
  {
    id: 8,
    question: "Are you able to offer training in IT to different countries?",
    answer: "Of course. Global training programs in the field of corporate training allow managing multi-country teams thanks to virtual instructor-led classes and, if needed, face-to-face classes could also be possible via the fly-me-a-trainer feature. Training sessions are scheduled based on different times and regions so that employees can receive the same quality of training no matter where they are."
  },
  {
    id: 9,
    question: "Can you deliver training based on globally acknowledged IT certifications?",
    answer: "Yes. Corporate training can be created with attention to internationally recognized certification requirements and state-of-the-art practices that ensure employees receive all the skills needed for the job and can pass the exams and obtain certificates. Availability of certification programs, exam payment methods, and eligibility depend on specific orders."
  },
  {
    id: 10,
    question: "How do you guarantee that the training is adequate for our employees?",
    answer: "Effective corporate training takes into account the status of the employees and their responsibilities. The training process can involve different activities, practical tasks, and examples concerning the job in order to let the employees learn the material better."
  }
];

export default function CorporateFAQ() {
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