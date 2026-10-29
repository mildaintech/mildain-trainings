'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Tag, CheckCircle2 } from 'lucide-react';

export default function RelatedPrograms({ 
  category, 
  subcategory,
  currentSlug, 
  isIndia 
}: { 
  category?: string;
  subcategory?: string;
  currentSlug?: string; 
  isIndia?: boolean;
}) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedData() {
      if (!subcategory && !category) {
        setLoading(false);
        return;
      }
      
      const cacheKey = `related_progs_${subcategory || category}_${currentSlug}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        try {
          setPrograms(JSON.parse(cachedData));
          setLoading(false);
          return;
        } catch (e) {}
      }

      try {
        const [coursesRes, subRes] = await Promise.all([
          fetch('/api/admin/courses'),
          fetch('/api/admin/subcategories')
        ]);
        
        let subcategoriesMap: { [key: string]: string } = {};
        if (subRes.ok) {
          const subData = await subRes.json();
          const subArray = Array.isArray(subData) ? subData : (subData?.data || []);
          subArray.forEach((sub: any) => {
            if (sub._id) {
              subcategoriesMap[sub._id.toString()] = sub.logoImage || '';
            }
            if (sub.name) {
              subcategoriesMap[sub.name.trim().toLowerCase()] = sub.logoImage || '';
            }
          });
        }

        if (!coursesRes.ok) {
          throw new Error('Network response was not ok');
        }
        
        const rawData = await coursesRes.json();
        const dataArray = Array.isArray(rawData) ? rawData : (rawData?.data || []);
        
        if (Array.isArray(dataArray)) {
          const targetSub = subcategory ? (typeof subcategory === 'string' ? subcategory.trim().toLowerCase() : (subcategory as any)._id?.toString().trim().toLowerCase() || '') : '';
          const targetCat = category ? (typeof category === 'string' ? category.trim().toLowerCase() : (category as any)._id?.toString().trim().toLowerCase() || '') : '';

          let filtered = dataArray.filter((course: any) => {
             if (course.slug === currentSlug) return false;

             if (targetSub) {
                 const courseSub = typeof course.subcategory === 'string' ? course.subcategory.trim().toLowerCase() : (course.subcategory?._id?.toString().trim().toLowerCase() || '');
                 if (courseSub === targetSub) {
                     return true;
                 }
             }
             return false;
          });

          if (filtered.length === 0 && targetCat) {
              filtered = dataArray.filter((course: any) => {
                  if (course.slug === currentSlug) return false;
                  const courseCat = typeof course.category === 'string' ? course.category.trim().toLowerCase() : (course.category?._id?.toString().trim().toLowerCase() || '');
                  return courseCat === targetCat;
              });
          }

          const enhancedPrograms = filtered.slice(0, 3).map((prog: any) => {
            let subLogo = '';
            if (prog.subcategory) {
              const subIdStr = typeof prog.subcategory === 'object' ? prog.subcategory?._id?.toString() : prog.subcategory?.toString();
              const subNameStr = typeof prog.subcategory === 'string' ? prog.subcategory.trim().toLowerCase() : '';
              
              if (subIdStr && subcategoriesMap[subIdStr]) {
                subLogo = subcategoriesMap[subIdStr];
              } else if (subNameStr && subcategoriesMap[subNameStr]) {
                subLogo = subcategoriesMap[subNameStr];
              }
            }
            return {
              ...prog,
              resolvedLogo: subLogo || prog.logoImage || prog.heroProviderLogoUrl
            };
          });
          
          setPrograms(enhancedPrograms);
          sessionStorage.setItem(cacheKey, JSON.stringify(enhancedPrograms));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    
    fetchRelatedData();
  }, [category, subcategory, currentSlug]);

  const formatPrice = (inrPrice: number, usdPrice: number) => {
    if (isIndia) {
      return inrPrice ? `₹${inrPrice.toLocaleString('en-IN')}` : "Contact for Price";
    }
    return usdPrice ? `$${usdPrice.toLocaleString('en-US')}` : "Contact for Price";
  };

  if (loading || programs.length === 0) return null;

  return (
    <div className="w-full bg-background py-12 lg:py-16 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <h2 className="text-center mb-12">
          Related Programs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {programs.map((program) => (
            <Link 
              href={`/courses/${program.category}/${program.slug}`} 
              key={program._id} 
              className="bg-card rounded-lg shadow-sm border border-border overflow-hidden relative flex flex-col transition-transform hover:-translate-y-1 block group"
            >
              <div className="h-[80px] bg-btn-gradient w-full shrink-0"></div>
              
              <div className="absolute top-[40px] left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50 overflow-hidden p-2">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={program.resolvedLogo || program.logoImage || "/images/home/hero1.png"}
                    alt={program.title || "Program Logo"}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
              
              <div className="pt-10 p-6 flex flex-col flex-grow">
                <h3 className="text-[20px] font-bold text-foreground mb-4 line-clamp-2 min-h-[56px]">
                  {program.title}
                </h3>
                
                <div className="flex items-center gap-4 text-[14px] text-muted-foreground mb-6 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-muted-foreground" />
                    <span>{program.duration || "N/A"}</span>
                  </div>
                  <div className="w-[1px] h-4 bg-border"></div>
                  <div className="flex items-center gap-1.5">
                    <Tag size={16} className="text-muted-foreground" />
                    <span className="text-primary font-bold">
                      {formatPrice(program.inrPrice, program.usdPrice)}
                    </span>
                  </div>
                </div>
                
                <ul className="flex flex-col gap-3">
                  {(program.heroSubtitleLines || []).slice(0, 4).map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-primary-foreground" strokeWidth={3} />
                      </div>
                      <span className="text-[14px] text-muted-foreground line-clamp-2">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-2">
          <Link href={`/courses/${category}`} className="text-primary font-bold text-[16px] hover:underline transition-all">
            View all {category} Programs
          </Link>
        </div>
        
      </div>
    </div>
  );
}