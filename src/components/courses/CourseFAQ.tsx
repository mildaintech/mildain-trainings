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
    
    const linkClasses = "text-[#fef08a] hover:text-white underline decoration-[#fef08a]/60 hover:decoration-white underline-offset-4 font-bold transition-all";

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
    <div id="faqs" className="w-full bg-white py-12 lg:py-16 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-8">
          <h2 className="text-[28px] md:text-[32px] font-bold text-slate-900 tracking-tight">
            {heading} <span className="text-[#10b981]">(FAQ)</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {visibleFaqs.map((item: any, index: number) => (
            <div 
              key={index}
              className={`rounded-md overflow-hidden transition-colors duration-300 ${
                openIndex === index 
                  ? 'bg-[#10b981] shadow-md' 
                  : 'bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-100'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-3 py-2 text-left"
              >
                <span className={`font-bold text-[18px] pr-6 ${
                  openIndex === index ? 'text-white' : 'text-slate-800'
                }`}>
                  {item.question}
                </span>
                <div className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border ${
                  openIndex === index 
                    ? 'bg-transparent border-white text-white' 
                    : 'bg-transparent border-[#10b981] text-[#10b981]'
                }`}>
                  {openIndex === index ? <X size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                </div>
              </button>

              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-0">
                    {item.description && (
                      <p className="text-[14px] text-white/95 leading-relaxed font-medium whitespace-pre-wrap">
                        {item.description}
                      </p>
                    )}
                    
                    {Array.isArray(item.bulletPoints) && item.bulletPoints.length > 0 && (
                      <ul className={`flex flex-col gap-2 list-disc ml-5 marker:text-white/80 text-white ${item.description ? 'mt-3' : ''}`}>
                        {item.bulletPoints.map((bullet: any, bIndex: number) => (
                          <li key={bIndex} className="text-[14px] font-medium pl-1 leading-relaxed">
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
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[14px] font-bold rounded-md transition-all shadow-sm transform hover:-translate-y-0.5"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </div>
  );
}