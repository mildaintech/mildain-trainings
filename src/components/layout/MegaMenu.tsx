'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  provider?: string;
  duration?: string;
  badge?: string;
  image?: string;
  logoImage?: string;
  bannerImage?: string;
}

interface MegaMenuProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (isOpen: boolean) => void;
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeCourses: Course[];
  getBadgeColor: (badgeText: string) => string;
}

export default function MegaMenu({
  isMegaMenuOpen,
  setIsMegaMenuOpen,
  categories,
  activeCategory,
  setActiveCategory,
  activeCourses,
  getBadgeColor
}: MegaMenuProps) {

  if (!isMegaMenuOpen) return null;

  return (
    <div 
      className="absolute top-[64px] lg:top-[76px] left-0 w-full px-0 sm:px-6 lg:px-16 flex justify-center shadow-sm z-40 bg-black/40 lg:bg-transparent h-[calc(100vh-64px)] lg:h-auto"
      onMouseEnter={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(true); }}
      onMouseLeave={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(false); }}
    >
      <div className="w-full max-w-[1300px] bg-background lg:rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] border-t lg:border-x lg:border-b border-border flex flex-col lg:flex-row overflow-hidden h-full lg:h-auto lg:min-h-[500px] lg:max-h-[85vh]">
        
        {/* Categories Sidebar */}
        <div className="w-full lg:w-[320px] bg-background border-b lg:border-b-0 lg:border-r border-border flex flex-col py-4 shrink-0 shadow-none lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 max-h-[35vh] lg:max-h-none overflow-y-auto">
          <h3 className="px-6 py-3 lg:py-2 text-[18px] lg:text-[22px] font-bold text-foreground tracking-wider uppercase">
            CATEGORIES
          </h3>
          <ul className="flex-1">
            {categories.map((cat) => (
              <li 
                key={cat}
                onMouseEnter={() => { if (window.innerWidth >= 1024) setActiveCategory(cat); }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 lg:py-2.5 cursor-pointer flex justify-between items-center text-[14px] lg:text-[13.5px] transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary/10 text-primary font-bold border-l-[3px] border-primary' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/5 border-l-[3px] border-transparent font-medium'
                }`}
              >
                <span className="capitalize">{cat}</span>
                {activeCategory === cat && <ChevronRight size={16} className="text-primary" />}
              </li>
            ))}
            {categories.length === 0 && (
              <li className="px-6 py-4 text-sm text-muted-foreground">No categories found</li>
            )}
          </ul>
        </div>

        {/* Courses Grid */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-secondary/30 h-full">
          <div className="mb-2 lg:mb-3">
            <h3 className="text-[18px] lg:text-[20px] font-bold text-foreground">Career Aligned Learning Paths</h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">Master essential skills for your dream career</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 pb-8 lg:pb-0">
            {activeCourses.map(course => (
              <Link 
                href={`/courses/${course.slug}`} 
                key={course._id} 
                onClick={() => setIsMegaMenuOpen(false)}
                className="group block border border-border rounded-xl p-4 bg-background hover:shadow-lg transition-all relative min-h-[140px] flex flex-col hover:border-primary/30"
              >
                <div className="h-[30px] min-h-[30px] mb-[12px] max-w-full flex items-center justify-start">
                  {(course.logoImage || course.image) ? (
                    <img 
                      src={course.logoImage || course.image} 
                      alt={course.provider || "Provider"} 
                      className="h-full w-auto object-contain max-w-full"
                    />
                  ) : (
                    <span className="text-[15px] font-bold text-muted-foreground uppercase tracking-wider">
                      {course.provider || "MILDAIN ED-TECH"}
                    </span>
                  )}
                </div>
                
                <h4 className="font-semibold text-foreground text-[16px] leading-[1.4] line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h4>
                
                <div className="mt-auto pt-3 flex justify-between items-center">
                  <p className="text-[12px] font-medium text-muted-foreground">
                    {course.duration || "Self-Paced"}
                  </p>
                </div>

                {course.badge && (
                  <div className={`absolute bottom-0 right-0 ${getBadgeColor(course.badge)} text-white text-[11px] font-bold px-3 py-1.5 rounded-tl-xl rounded-br-xl shadow-sm`}>
                    {course.badge}
                  </div>
                )}
              </Link>
            ))}
            
            {activeCourses.length === 0 && (
              <div className="col-span-full py-10 text-muted-foreground text-center text-sm">
                No courses available in this category.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}