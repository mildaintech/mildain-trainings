'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function CourseCareerSupport({ course }: { course?: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subcategoryData, setSubcategoryData] = useState<any>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('jwt')) : null;
    const cookieToken = typeof document !== 'undefined' ? document.cookie.includes('token') || document.cookie.includes('auth') : false;
    
    if (token || cookieToken) {
      setIsLoggedIn(true);
    }

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

  const supportItems = 
    subcategoryData?.careerSupportItems?.length > 0 
      ? subcategoryData.careerSupportItems 
      : (course.careerSupportItems || []);

  const title = subcategoryData?.careerSupportTitle || course.careerSupportTitle || "";
  const description = subcategoryData?.careerSupportDescription || course.careerSupportDescription || "";
  const pdfUrl = subcategoryData?.careerSupportBrochurePdf || course.careerSupportBrochurePdf || "";

  const bgImage =
    subcategoryData?.careerSupportBgImage ||
    course.careerSupportBgImage ||
    "https://plus.unsplash.com/premium_photo-1658506712625-62e671f7de91?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";
    if (!title && !description && supportItems.length === 0) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Career_Support_Brochure.pdf';
      
      if (!pdfUrl.startsWith('data:')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Brochure PDF is not available for download.");
    }
  };

  return (
    <div className="w-full bg-background py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="mb-8">
          Career Support
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          <div className="bg-btn-gradient rounded-xl p-8 md:p-12 text-primary-foreground relative overflow-hidden flex flex-col justify-between min-h-[400px] shadow-lg">
            {bgImage && (
              <div className="absolute inset-0 z-0">
                <Image 
                  src={bgImage} 
                  alt="Career Support Background" 
                  fill 
                  className="object-cover opacity-90 mix-blend-normal" 
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95 z-0" />

            <div className="relative z-10 space-y-6">
              <h3 className="text-primary-foreground font-bold leading-tight mb-0">
                {title}
              </h3>
              <p className="text-primary-foreground/90 text-[17px] md:text-[18px] leading-relaxed whitespace-pre-wrap mb-0">
                {description}
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-auto">
              <button 
                type="button"
                onClick={handleDownload}
                className="relative overflow-hidden group bg-background hover:bg-background/90 text-foreground font-bold px-6 py-3.5 rounded-md flex items-center justify-center gap-2 transition-all w-max shadow-md cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download size={18} strokeWidth={2.5} />
                  <span>Download Brochure</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
              </button>
            </div>
          </div>

          {supportItems.length > 0 && (
            <div className="flex flex-col justify-center gap-4 md:gap-6">
              {supportItems.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-5 md:gap-6">
                  <div className="relative w-[120px] md:w-[140px] h-[70px] md:h-[80px] rounded-lg overflow-hidden shrink-0 bg-muted shadow-sm flex items-center justify-center">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.imageAlt || item.title || "Career Support Item"} 
                        title={item.imageTitle || item.title || ""}
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <span className="text-muted-foreground text-xs">No Image</span>
                    )}
                  </div>
                  <span className="text-[17px] md:text-[19px] font-medium text-foreground">
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