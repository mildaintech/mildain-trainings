'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Tag, CheckCircle2 } from 'lucide-react';

export default function RelatedPrograms({ 
  category, 
  currentSlug, 
  isIndia 
}: { 
  category?: string; 
  currentSlug?: string; 
  isIndia?: boolean;
}) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedCourses() {
      if (!category) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch('/api/admin/courses');
        
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        
        const rawData = await res.json();
        
        const dataArray = Array.isArray(rawData) ? rawData : (rawData?.data || []);
        
        if (Array.isArray(dataArray)) {
          const filtered = dataArray.filter(
            (course: any) => 
              course.category && 
              course.category.toLowerCase() === category.toLowerCase() && 
              course.slug !== currentSlug
          );
          
          setPrograms(filtered.slice(0, 3)); 
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRelatedCourses();
  }, [category, currentSlug]);

  const formatPrice = (inrPrice: number, usdPrice: number) => {
    if (isIndia) {
      return inrPrice ? `₹${inrPrice.toLocaleString('en-IN')}` : "Contact for Price";
    }
    return usdPrice ? `$${usdPrice.toLocaleString('en-US')}` : "Contact for Price";
  };

  if (loading) return null;

  return (
    <div className="w-full bg-[#f4faf7] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-center text-[28px] md:text-[32px] font-bold text-[#1f2937] mb-12">
          Related Programs
        </h2>
        
        {programs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
              {programs.map((program) => (
                <Link 
                  href={`/courses/${program.category}/${program.slug}`} 
                  key={program._id} 
                  className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden relative flex flex-col transition-transform hover:-translate-y-1 block"
                >
                  <div className="h-[80px] bg-[#16a34a] w-full shrink-0"></div>
                  
                  <div className="absolute top-[40px] left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50 overflow-hidden p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={program.logoImage || program.heroProviderLogoUrl || "/images/home/hero1.png"}
                        alt={program.title || "Program Logo"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-10 p-6 flex flex-col flex-grow">
                    <h3 className="text-[20px] font-bold text-[#1f2937] mb-4 line-clamp-2 min-h-[56px]">
                      {program.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-[14px] text-slate-500 mb-6 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={16} className="text-slate-400" />
                        <span>{program.duration || "N/A"}</span>
                      </div>
                      <div className="w-[1px] h-4 bg-slate-300"></div>
                      <div className="flex items-center gap-1.5">
                        <Tag size={16} className="text-slate-400" />
                        <span className="text-[#16a34a] font-bold">
                          {formatPrice(program.inrPrice, program.usdPrice)}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="flex flex-col gap-3">
                      {(program.heroSubtitleLines || []).slice(0, 4).map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#16a34a] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 size={14} className="text-white" strokeWidth={3} />
                          </div>
                          <span className="text-[14px] text-slate-600 line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-2">
              <Link href={`/courses/${category}`} className="text-[#16a34a] font-bold text-[16px] hover:underline transition-all">
                View all {category} Programs
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-slate-500 font-medium py-10 bg-white rounded-lg border border-slate-100 shadow-sm">
            No related programs found in the {category} category.
          </div>
        )}
        
      </div>
    </div>
  );
}