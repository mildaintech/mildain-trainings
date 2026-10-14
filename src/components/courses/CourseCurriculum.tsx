'use client';

import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

export default function CourseCurriculum({ course }: { course?: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!course) return null;

  const modules = course.curriculumModules || [];
  const title = course.curriculumTitle || "Course Curriculum";
  const subtitle = course.curriculumDescription || "Our training covers the latest curriculum:";

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDownload = () => {
    if (course.curriculumPdf) {
      const link = document.createElement('a');
      link.href = course.curriculumPdf;
      link.download = `${course.slug || 'curriculum'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("PDF file not uploaded yet.");
    }
  };

  return (
    <div id="curriculum" className="w-full bg-[#f4faf7] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-8">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#1e293b] mb-2" dangerouslySetInnerHTML={{ __html: title.replace('Curriculum', '<span class="text-[#10b981]">Curriculum</span>') }}>
          </h2>
          <p className="text-[#475569] text-[15px] md:text-[16px] font-medium">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3.5 mb-10">
          {modules.map((item: any, index: number) => (
            <div 
              key={index} 
              className="w-full bg-transparent border border-[#a7f3d0] rounded-lg overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors hover:bg-white/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-bold text-[#1e293b] text-[14px] md:text-[15px]">
                    {item.title}
                  </span>
                </div>
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white ml-4">
                  {openIndex === index ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[1500px] border-t border-[#a7f3d0]' : 'max-h-0'
                }`}
              >
                <div 
                  className="p-5 bg-white text-[#475569] text-[14px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-[#10b981] [&_li]:mb-1.5 [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />
              </div>
            </div>
          ))}
        </div>

        {course.curriculumPdf && (
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#e8f7f4] border border-[#10b981] text-[#10b981] font-bold text-[14px] rounded-md hover:bg-[#d1f0e8] transition-all"
          >
            Download Curriculum <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        )}

      </div>
    </div>
  );
}