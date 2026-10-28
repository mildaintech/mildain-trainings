'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function CourseFAQ({ course }: { course?: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState<number>(4);

  if (!course) return null;

  const faqs = Array.isArray(course.faqs) ? course.faqs : [];

  if (faqs.length === 0) return null;

  const heading = course.faqHeading || "Frequently Asked Questions";
  const visibleFaqs = faqs.slice(0, visibleCount);
  const hasMore = visibleCount < faqs.length;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const renderBulletText = (text: string, linkText: string, linkUrl: string) => {
    if (!text) return null;
    if (!linkUrl) return <span className="block w-full">{text}</span>;
    
    const linkClasses = "text-background hover:text-background/80 underline decoration-background/60 hover:decoration-background underline-offset-4 font-bold transition-all";

    if (!linkText) {
      return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          {text}
        </a>
      );
    }

    const parts = text.split(linkText);
    if (parts.length === 1) {
      return <span className="block w-full">{text}</span>;
    }

    return (
      <span className="block w-full">
        {parts[0]}
        <a href={linkUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          {linkText}
        </a>
        {parts.slice(1).join(linkText)}
      </span>
    );
  };

  return (
    <div id="faqs" className="w-full bg-background py-12 lg:py-16 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-8">
          <h2 className="mb-0">
            {heading} <span className="text-primary">(FAQ)</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {visibleFaqs.map((item: any, index: number) => (
            <div 
              key={index}
              className={`rounded-md overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-btn-gradient shadow-md' 
                  : 'bg-card hover:bg-muted/30 border border-border'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-4 py-3.5 md:px-5 md:py-4 text-left"
              >
                <span className={`font-bold text-[15px] md:text-[16px] pr-6 ${
                  openIndex === index ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {item.question}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border ${
                  openIndex === index 
                    ? 'bg-transparent border-primary-foreground text-primary-foreground' 
                    : 'bg-transparent border-primary text-primary'
                }`}>
                  {openIndex === index ? <X size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                </div>
              </button>

              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0">
                    {item.description && (
                      <p className="text-primary-foreground/90 text-[14px] md:text-[15px] font-medium whitespace-pre-wrap mb-0">
                        {item.description}
                      </p>
                    )}
                    
                    {Array.isArray(item.bulletPoints) && item.bulletPoints.length > 0 && (
                      <ul className={`flex flex-col gap-2 list-disc ml-5 marker:text-primary-foreground/80 text-primary-foreground ${item.description ? 'mt-3' : ''}`}>
                        {item.bulletPoints.map((bullet: any, bIndex: number) => (
                          <li key={bIndex} className="text-[14px] md:text-[15px] font-medium pl-1 leading-relaxed">
                            {renderBulletText(bullet.text, bullet.linkText, bullet.linkUrl)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-3 bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold rounded-md transition-all shadow-sm transform hover:-translate-y-0.5"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </div>
  );
}