'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CourseCareerSupport({ course }: { course?: any }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const cookieToken = typeof document !== 'undefined' ? document.cookie.includes('token') : false;
    if (token || cookieToken) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!course) return null;

  const supportItems = Array.isArray(course.careerSupportItems) && course.careerSupportItems.length > 0 
    ? course.careerSupportItems 
    : [];

  const title = course.careerSupportTitle || "";
  const description = course.careerSupportDescription || "";
  const pdfUrl = course.careerSupportBrochurePdf || "";

  if (!title && !description && supportItems.length === 0) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Career_Support_Brochure.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-[28px] md:text-[32px] font-bold text-[#1f2937] mb-8">
          Career Support
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="bg-[#15803d] rounded-xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="relative z-10 space-y-6">
              <h3 className="text-[28px] md:text-[32px] font-bold leading-tight">
                {title}
              </h3>
              <p className="text-white/90 text-[15px] md:text-[16px] leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-auto">
              <button 
                onClick={handleDownload}
                className="bg-white hover:bg-slate-50 text-[#15803d] font-bold px-6 py-3.5 rounded flex items-center justify-center gap-2 transition-colors w-max"
              >
                <Download size={18} strokeWidth={2.5} />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>

          {supportItems.length > 0 && (
            <div className="flex flex-col justify-center gap-6 md:gap-8">
              {supportItems.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-5 md:gap-6">
                  <div className="relative w-[120px] md:w-[140px] h-[70px] md:h-[80px] rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-sm border border-slate-200 flex items-center justify-center">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.imageAlt || item.title || "Career Support Item"} 
                        title={item.imageTitle || item.title || ""}
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <span className="text-slate-400 text-xs">No Image</span>
                    )}
                  </div>
                  <span className="text-[15px] md:text-[17px] font-medium text-[#1f2937]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}