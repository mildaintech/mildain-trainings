'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

export default function CourseCurriculum({ course }: { course?: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [subcategoryData, setSubcategoryData] = useState<any>(null);

  useEffect(() => {
    if (course?.subcategory) {
      const cached = sessionStorage.getItem(`subcat_${course.subcategory}`);
      if (cached) {
        try {
          setSubcategoryData(JSON.parse(cached));
        } catch (e) {}
      }

      fetch('/api/admin/subcategories')
        .then(res => res.json())
        .then(data => {
          const subcategories = Array.isArray(data) ? data : (data.data || []);
          const target = course.subcategory.trim().toLowerCase();
          const selectedSub = subcategories.find(
            (s: any) =>
              s.name?.trim().toLowerCase() === target ||
              s.slug?.trim().toLowerCase() === target ||
              s._id === course.subcategory
          );
          if (selectedSub) {
            setSubcategoryData(selectedSub);
            sessionStorage.setItem(`subcat_${course.subcategory}`, JSON.stringify(selectedSub));
          }
        })
        .catch(() => {});
    }
  }, [course?.subcategory]);

  if (!course) return null;

  const modules = subcategoryData?.curriculumModules || course.curriculumModules || [];
  const title = subcategoryData?.curriculumTitle || course.curriculumTitle || "Course Curriculum";
  const subtitle = subcategoryData?.curriculumDescription || course.curriculumDescription || "Our training covers the latest curriculum:";
  const pdfLink = subcategoryData?.curriculumPdf || course.curriculumPdf;

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDownload = () => {
    if (pdfLink) {
      const link = document.createElement('a');
      link.href = pdfLink;
      link.download = `${course.slug || 'curriculum'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <div id="curriculum" className="w-full bg-background py-12 lg:py-16 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-8">
          <h2 className="mb-4" dangerouslySetInnerHTML={{ __html: title.replace('Curriculum', '<span class="text-primary">Curriculum</span>') }}>
          </h2>
          <p className="text-[18px] md:text-[20px] font-medium text-muted-foreground mb-0">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3.5 mb-10">
          {modules.map((item: any, index: number) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`w-full rounded-lg overflow-hidden transition-all duration-300 border ${
                  isOpen 
                    ? 'bg-btn-gradient border-primary shadow-md text-primary-foreground' 
                    : 'bg-card border-border text-foreground hover:border-primary/50'
                }`}
              >
                <button 
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-2 md:p-3 text-left transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 pr-4">
                    <span className={`font-bold text-[14px] md:text-[15px] ${
                      isOpen ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-4 transition-colors ${
                    isOpen ? 'bg-transparent border border-primary-foreground text-primary-foreground' : 'bg-primary text-primary-foreground'
                  }`}>
                    {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[1500px] border-t border-primary-foreground/20' : 'max-h-0'
                  }`}
                >
                  <div 
                    className="p-5 bg-card text-foreground text-[14px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-primary [&_li]:mb-1.5 [&_p]:mb-2"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {pdfLink && (
          <button 
            onClick={handleDownload}
            className="relative overflow-hidden group flex items-center gap-2 px-6 py-3.5 bg-btn-gradient text-primary-foreground font-bold text-[14px] rounded-md shadow-sm hover:opacity-90 transition-all cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Download Curriculum <ArrowRight size={18} strokeWidth={2.5} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
          </button>
        )}

      </div>
    </div>
  );
}