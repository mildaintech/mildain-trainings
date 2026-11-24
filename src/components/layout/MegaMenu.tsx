// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { ChevronRight } from 'lucide-react';

// interface Course {
//   _id: string;
//   title: string;
//   slug: string;
//   category: string;
//   provider?: string;
//   duration?: string;
//   badge?: string;
//   image?: string;
//   logoImage?: string;
//   bannerImage?: string;
// }

// interface MegaMenuProps {
//   isMegaMenuOpen: boolean;
//   setIsMegaMenuOpen: (isOpen: boolean) => void;
//   categories: string[];
//   activeCategory: string;
//   setActiveCategory: (cat: string) => void;
//   activeCourses: Course[];
//   getBadgeColor: (badgeText: string) => string;
// }

// export default function MegaMenu({
//   isMegaMenuOpen,
//   setIsMegaMenuOpen,
//   categories,
//   activeCategory,
//   setActiveCategory,
//   activeCourses,
//   getBadgeColor
// }: MegaMenuProps) {

//   if (!isMegaMenuOpen) return null;

//   return (
//     <div 
//       className="absolute top-[64px] lg:top-[76px] left-0 w-full px-0 sm:px-6 lg:px-16 flex justify-center shadow-sm z-40 bg-black/40 lg:bg-transparent h-[calc(100vh-64px)] lg:h-auto"
//       onMouseEnter={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(true); }}
//       onMouseLeave={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(false); }}
//     >
//       <div className="w-full max-w-[1300px] bg-background lg:rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] border-t lg:border-x lg:border-b border-border flex flex-col lg:flex-row overflow-hidden h-full lg:h-auto lg:min-h-[500px] lg:max-h-[85vh]">
        
//         {/* Categories Sidebar */}
//         <div className="w-full lg:w-[320px] bg-background border-b lg:border-b-0 lg:border-r border-border flex flex-col py-4 shrink-0 shadow-none lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 max-h-[35vh] lg:max-h-none overflow-y-auto">
//           <h3 className="px-6 py-3 lg:py-2 text-[18px] lg:text-[22px] font-bold text-foreground tracking-wider uppercase">
//             CATEGORIES
//           </h3>
//           <ul className="flex-1">
//             {categories.map((cat) => (
//               <li 
//                 key={cat}
//                 onMouseEnter={() => { if (window.innerWidth >= 1024) setActiveCategory(cat); }}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-6 py-3 lg:py-2.5 cursor-pointer flex justify-between items-center text-[14px] lg:text-[13.5px] transition-all ${
//                   activeCategory === cat 
//                     ? 'bg-primary/10 text-primary font-bold border-l-[3px] border-primary' 
//                     : 'text-muted-foreground hover:text-primary hover:bg-primary/5 border-l-[3px] border-transparent font-medium'
//                 }`}
//               >
//                 <span className="capitalize">{cat}</span>
//                 {activeCategory === cat && <ChevronRight size={16} className="text-primary" />}
//               </li>
//             ))}
//             {categories.length === 0 && (
//               <li className="px-6 py-4 text-sm text-muted-foreground">No categories found</li>
//             )}
//           </ul>
//         </div>

//         {/* Courses Grid */}
//         <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-secondary/30 h-full">
//           <div className="mb-2 lg:mb-3">
//             <h3 className="text-[18px] lg:text-[20px] font-bold text-foreground">Career Aligned Learning Paths</h3>
//             <p className="text-[13px] text-muted-foreground mt-0.5">Master essential skills for your dream career</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 pb-8 lg:pb-0">
//             {activeCourses.map(course => (
//               <Link 
//                 href={`/courses/${course.slug}`} 
//                 key={course._id} 
//                 onClick={() => setIsMegaMenuOpen(false)}
//                 className="group block border border-border rounded-xl p-4 bg-background hover:shadow-lg transition-all relative min-h-[140px] flex flex-col hover:border-primary/30"
//               >
//                 <div className="h-[30px] min-h-[30px] mb-[12px] max-w-full flex items-center justify-start">
//                   {(course.logoImage || course.image) ? (
//                     <img 
//                       src={course.logoImage || course.image} 
//                       alt={course.provider || "Provider"} 
//                       className="h-full w-auto object-contain max-w-full"
//                     />
//                   ) : (
//                     <span className="text-[15px] font-bold text-muted-foreground uppercase tracking-wider">
//                       {course.provider || "MILDAIN ED-TECH"}
//                     </span>
//                   )}
//                 </div>
                
//                 <h4 className="font-semibold text-foreground text-[16px] leading-[1.4] line-clamp-2 group-hover:text-primary transition-colors">
//                   {course.title}
//                 </h4>
                
//                 <div className="mt-auto pt-3 flex justify-between items-center">
//                   <p className="text-[12px] font-medium text-muted-foreground">
//                     {course.duration || "Self-Paced"}
//                   </p>
//                 </div>

//                 {course.badge && (
//                   <div className={`absolute bottom-0 right-0 ${getBadgeColor(course.badge)} text-white text-[11px] font-bold px-3 py-1.5 rounded-tl-xl rounded-br-xl shadow-sm`}>
//                     {course.badge}
//                   </div>
//                 )}
//               </Link>
//             ))}
            
//             {activeCourses.length === 0 && (
//               <div className="col-span-full py-10 text-muted-foreground text-center text-sm">
//                 No courses available in this category.
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
  isMostPopular?: boolean;
  popularOrder?: number;
  displayOrder?: number;
}

interface CategoryItem {
  _id: string;
  name: string;
  displayOrder?: number;
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

const ORDER_CACHE_KEY = 'mega-menu-category-order';

const scrollbarClass =
  '[&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#a5b8cd]';

let categoryOrderRequest: Promise<CategoryItem[] | null> | null = null;

const requestCategoryOrder = () => {
  if (!categoryOrderRequest) {
    categoryOrderRequest = fetch('/api/admin/categories')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!Array.isArray(data)) {
          categoryOrderRequest = null;
          return null;
        }
        try {
          sessionStorage.setItem(ORDER_CACHE_KEY, JSON.stringify(data));
        } catch {}
        return data as CategoryItem[];
      })
      .catch(() => {
        categoryOrderRequest = null;
        return null;
      });
  }
  return categoryOrderRequest;
};

const badgeGradient = (text: string): string | null => {
  const value = text.trim().toLowerCase();
  if (value.includes('popular')) return 'linear-gradient(90deg, #f7a531 0%, #ec6d20 100%)';
  if (value.includes('trending')) return 'linear-gradient(90deg, #7cc43a 0%, #1f9a35 100%)';
  return null;
};

interface CourseCardProps {
  course: Course;
  badgeClass: string;
  onNavigate: () => void;
}

const CourseCard = memo(function CourseCard({ course, badgeClass, onNavigate }: CourseCardProps) {
  const logo = course.logoImage || course.image;
  const gradient = course.badge ? badgeGradient(course.badge) : null;

  return (
    <Link
      href={`/courses/${course.slug}`}
      onClick={onNavigate}
      className="group relative flex min-h-[130px] flex-col overflow-hidden rounded-lg border border-[#eeeeee] bg-white p-2 shadow-[0_1px_6px_rgba(0,0,0,0.09)] transition-[box-shadow,border-color] duration-200 hover:border-[#1179ef]/40 hover:shadow-[0_4px_14px_rgba(0,0,0,0.14)]"
    >
      <div className="mb-3 flex h-[30px] min-h-[30px] max-w-full items-center justify-start">
        {logo ? (
          <img
            src={logo}
            alt={course.provider || 'Provider'}
            loading="eager"
            decoding="async"
            draggable={false}
            className="h-full w-auto max-w-full object-contain"
          />
        ) : (
          <span className="text-[15px] font-bold uppercase tracking-wider text-[#6e6e6e]">
            {course.provider || 'MILDAIN ED-TECH'}
          </span>
        )}
      </div>

      <h4 className="m-0 line-clamp-2 text-[14px] font-medium leading-4 text-[#202020] transition-colors group-hover:text-[#1179ef]">
        {course.title}
      </h4>

      <p className="m-0 mt-auto pt-3 text-[12px] font-normal leading-[18px] text-[#6e6e6e]">
        {course.duration || 'Self-Paced'}
      </p>

      {course.badge && (
        <span className="absolute bottom-0 right-0 flex h-6 items-center pl-[18px] pr-3 text-[12px] font-bold leading-none text-white">
          <span
            aria-hidden
            className={`absolute inset-y-0 left-0 -right-3 origin-bottom-left -skew-x-[24deg] rounded-tl-[10px] ${gradient ? '' : badgeClass}`}
            style={gradient ? { background: gradient } : undefined}
          />
          <span className="relative">{course.badge}</span>
        </span>
      )}
    </Link>
  );
});

export default function MegaMenu({
  isMegaMenuOpen,
  setIsMegaMenuOpen,
  categories,
  activeCategory,
  setActiveCategory,
  activeCourses,
  getBadgeColor
}: MegaMenuProps) {
  const [rawCategories, setRawCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let active = true;

    try {
      const stored = sessionStorage.getItem(ORDER_CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setRawCategories(parsed);
      }
    } catch {}

    requestCategoryOrder().then((data) => {
      if (active && data) setRawCategories(data);
    });

    return () => {
      active = false;
    };
  }, []);

  const orderedCategories = useMemo(() => {
    const orderMap = new Map<string, number>();
    for (const cat of rawCategories) {
      if (cat.name) {
        orderMap.set(cat.name.trim().toLowerCase(), cat.displayOrder ?? 999);
      }
    }

    return [...categories].sort((a, b) => {
      const aLower = a.trim().toLowerCase();
      const bLower = b.trim().toLowerCase();

      if (aLower === 'most popular') return -1;
      if (bLower === 'most popular') return 1;

      const aOrder = orderMap.get(aLower) ?? 999;
      const bOrder = orderMap.get(bLower) ?? 999;
      return aOrder - bOrder;
    });
  }, [categories, rawCategories]);

  const sortedActiveCourses = useMemo(() => {
    if (activeCategory.trim().toLowerCase() === 'most popular') {
      return [...activeCourses].sort((a, b) => {
        const orderDiff = (a.popularOrder ?? 999) - (b.popularOrder ?? 999);
        if (orderDiff !== 0) return orderDiff;
        return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
      });
    }

    return [...activeCourses].sort(
      (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
    );
  }, [activeCourses, activeCategory]);

  const closeMenu = useCallback(() => setIsMegaMenuOpen(false), [setIsMegaMenuOpen]);

  return (
    <div
      aria-hidden={!isMegaMenuOpen}
      className={`absolute top-[54px] lg:top-[66px] left-0 z-40 flex h-[calc(100vh-64px)] w-full justify-center bg-black/40 px-0 shadow-sm transition-opacity duration-150 sm:px-6 lg:h-auto lg:bg-transparent lg:px-16 ${
        isMegaMenuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
      }`}
      onMouseEnter={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(true); }}
      onMouseLeave={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(false); }}
    >
      <div className="flex h-full w-full max-w-[1300px] flex-col overflow-hidden bg-[#ebf1f8] shadow-[0_24px_48px_rgba(0,0,0,0.08)] lg:h-[543px] lg:max-h-[85vh] lg:flex-row lg:rounded-b-2xl">

        <aside className={`flex max-h-[35vh] w-full shrink-0 flex-col overflow-y-auto lg:max-h-none lg:w-[274px] ${scrollbarClass}`}>
          <h3 className="m-0 px-4 pb-[7px] pt-[14px] text-[14px] font-bold  uppercase leading-6 tracking-normal text-[#272c37] lg:text-[16px]">
            Categories
          </h3>

          <ul className="m-0 flex-1 list-none p-0">
            {orderedCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <li
                  key={cat}
                  onMouseEnter={() => { if (window.innerWidth >= 1024) setActiveCategory(cat); }}
                  onClick={() => setActiveCategory(cat)}
                  className={`mb-0.5 flex h-10 cursor-pointer items-center justify-between border-l-4 pl-4 pr-px text-[13.5px] leading-5 transition-colors lg:h-9 ${
                    isActive
                      ? 'border-[#1179ef] bg-white font-medium text-[#1179ef]'
                      : 'border-transparent font-normal text-[#2a2f3a] hover:bg-white/60 hover:text-[#1179ef]'
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && <ChevronRight size={16} className="shrink-0 text-[#1179ef]" />}
                </li>
              );
            })}
            {orderedCategories.length === 0 && (
              <li className="px-4 py-4 text-sm text-[#6e6e6e]">No categories found</li>
            )}
          </ul>

          <div
            aria-hidden
            className="pointer-events-none sticky bottom-0 -mt-12 h-12 shrink-0 bg-gradient-to-t from-[#ebf1f8] to-[#ebf1f8]/0"
          />
        </aside>

        <div className={`min-h-0 flex-1 overflow-y-auto bg-white lg:my-[3px] lg:mr-[5px] lg:rounded-[10px] ${scrollbarClass}`}>
          <div className="sticky top-0 z-10 bg-white pb-2 pt-2">
            <div className="relative ml-2">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[30px] rounded-t-[10px]"
                style={{
                  background:
                    'radial-gradient(90px 36px at 0 0, rgba(255,228,190,0.32), rgba(255,228,190,0) 100%), linear-gradient(to bottom, #fff9ef, #ffffff)'
                }}
              />
              <h3 className="relative m-0 flex h-[30px] items-center pl-2 text-[14px] font-medium leading-5 text-[#272c37]">
                Career Aligned Learning Paths
              </h3>
              <p className="relative m-0 mt-2 pl-2 text-[12px] font-normal leading-4 text-[#82888e]">
                Master essential skills for your dream career
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-2 px-4 pt-2.5 md:grid-cols-2 lg:grid-cols-3 lg:pr-[18px]">
            {sortedActiveCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                badgeClass={course.badge ? getBadgeColor(course.badge) : ''}
                onNavigate={closeMenu}
              />
            ))}

            {sortedActiveCourses.length === 0 && (
              <div className="col-span-full py-10 text-center text-sm text-[#6e6e6e]">
                No courses available in this category.
              </div>
            )}
          </div>

          {/* <div className="flex justify-end px-3 pb-3 pt-9">
            <Link
              href="/courses"
              onClick={closeMenu}
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#2f80ed] bg-white px-10 text-[14px] font-medium text-[#2f80ed] transition-colors hover:bg-[#2f80ed] hover:text-white"
            >
              Explore All Programs
            </Link>
          </div> */}
        </div>

      </div>
    </div>
  );
}