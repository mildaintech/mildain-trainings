// 'use client';

// import { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

// interface Course {
//   _id: string;
//   title: string;
//   slug: string;
//   category: string;
//   provider?: string;
//   duration?: string;
//   cohortStarts?: string;
//   badge?: string;
//   image?: string;
//   bannerImage?: string;
//   logoImage?: string;
//   isMostPopular?: boolean;
//   popularOrder?: number;
//   displayOrder?: number;
// }

// interface CategoryItem {
//   _id: string;
//   name: string;
//   displayOrder?: number;
// }

// const formatTitleCase = (value: string) =>
//   (value || "").replace(/\b\w/g, (char) => char.toUpperCase());

// export default function ExplorePrograms() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [rawCategories, setRawCategories] = useState<CategoryItem[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string>("Most Popular");
//   const [visibleCount, setVisibleCount] = useState<number>(6);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     let active = true;
//     const controller = new AbortController();

//     async function fetchData() {
//       try {
//         const [coursesRes, categoriesRes] = await Promise.all([
//           fetch("/api/admin/courses", { signal: controller.signal }),
//           fetch("/api/admin/categories", { signal: controller.signal }),
//         ]);

//         if (!active) return;

//         const [coursesData, categoriesData] = await Promise.all([
//           coursesRes.ok ? coursesRes.json() : [],
//           categoriesRes.ok ? categoriesRes.json() : [],
//         ]);

//         if (!active) return;

//         const formattedCourses: Course[] = Array.isArray(coursesData)
//           ? coursesData.map((c: Course) => ({
//               ...c,
//               category: formatTitleCase(c.category || ""),
//             }))
//           : [];

//         setCourses(formattedCourses);
//         setRawCategories(Array.isArray(categoriesData) ? categoriesData : []);
//       } catch (err: any) {
//         if (err?.name !== "AbortError") {
//           console.error("Failed to fetch programs:", err);
//         }
//       } finally {
//         if (active) {
//           setIsLoading(false);
//         }
//       }
//     }

//     fetchData();

//     return () => {
//       active = false;
//       controller.abort();
//     };
//   }, []);

//   useEffect(() => {
//     setVisibleCount(6);
//   }, [activeCategory]);

//   const categories = useMemo(() => {
//     const courseCountsByCategory = new Map<string, number>();

//     for (const course of courses) {
//       const key = (course.category || "").trim().toLowerCase();
//       if (!key) continue;
//       courseCountsByCategory.set(key, (courseCountsByCategory.get(key) || 0) + 1);
//     }

//     let orderedNames: string[] = [];

//     if (rawCategories.length > 0) {
//       orderedNames = [...rawCategories]
//         .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
//         .map((cat) => formatTitleCase(cat.name || ""))
//         .filter((name) => {
//           if (!name) return false;
//           return (courseCountsByCategory.get(name.toLowerCase()) || 0) > 0;
//         });
//     } else {
//       orderedNames = Array.from(new Set(courses.map((c) => c.category).filter(Boolean))).filter(
//         (name) => (courseCountsByCategory.get(name.toLowerCase()) || 0) > 0
//       );
//     }

//     const uniqueNonEmptyCategories = Array.from(new Set(orderedNames));
//     return courses.length > 0 ? ["Most Popular", ...uniqueNonEmptyCategories] : [];
//   }, [courses, rawCategories]);

//   const activeCourses = useMemo(() => {
//     if (activeCategory === "Most Popular") {
//       return courses
//         .filter((c) => Boolean(c.isMostPopular))
//         .sort((a, b) => {
//           const orderDiff = (a.popularOrder ?? 999) - (b.popularOrder ?? 999);
//           if (orderDiff !== 0) return orderDiff;
//           return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
//         });
//     }

//     return [...courses]
//       .filter((c) => c.category.toLowerCase() === activeCategory.toLowerCase())
//       .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
//   }, [courses, activeCategory]);

//   const displayedCourses = useMemo(
//     () => activeCourses.slice(0, visibleCount),
//     [activeCourses, visibleCount]
//   );

//   const handleViewAll = () => {
//     setVisibleCount((prev) => prev + 6);
//   };

//   const renderSkeletonCard = (isMobileCarousel = false, index: number) => (
//     <div
//       key={`skeleton-${index}`}
//       className={`bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible animate-pulse ${
//         isMobileCarousel ? "w-80 shrink-0 snap-start" : "w-full"
//       }`}
//     >
//       <div className="relative w-full h-40 sm:h-44 rounded-sm bg-muted">
//         <div className="absolute -bottom-6 left-6 w-[120px] h-[52px] bg-card rounded-sm shadow-md border border-border"></div>
//       </div>
//       <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-card rounded-b-lg">
//         <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
//         <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>
//         <div className="mt-auto space-y-2 mb-6">
//           <div className="h-4 bg-muted rounded w-full"></div>
//           <div className="h-4 bg-muted rounded w-5/6"></div>
//         </div>
//         <div className="w-full py-5 bg-muted rounded-[4px]"></div>
//       </div>
//     </div>
//   );

//   const renderCourseCard = (course: Course, isMobileCarousel = false) => {
//     return (
//       <div
//         key={course._id}
//         className={`bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30 ${
//           isMobileCarousel ? "w-80 shrink-0 snap-start" : "w-full"
//         }`}
//       >
//         <div className="relative w-full h-40 p-1 sm:h-44 rounded-sm bg-muted/30">
//           {course.bannerImage ? (
//             <img
//               src={course.bannerImage}
//               alt={course.title}
//               loading="lazy"
//               decoding="async"
//               className="w-full h-40 sm:h-44 object-cover rounded-sm"
//             />
//           ) : (
//             <div className="w-full h-40 sm:h-44 bg-muted rounded-sm"></div>
//           )}

//           <div className="absolute -bottom-6 left-6 h-[52px] min-w-[76px] max-w-[85%] w-fit bg-card rounded-sm shadow-md border border-border flex items-center justify-center px-1 py-1 z-10">
//             {course.logoImage || course.image ? (
//               <img
//                 src={course.logoImage || course.image}
//                 alt={course.title}
//                 loading="lazy"
//                 decoding="async"
//                 className="h-full w-auto object-contain"
//               />
//             ) : (
//               <span className="text-[11px] font-bold text-foreground text-center uppercase px-2">
//                 {course.provider || "LOGO"}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-card rounded-b-lg">
//           <h4 className="text-[18px] sm:text-[20px] font-bold leading-snug line-clamp-2 min-h-[52px] mb-4">
//             {course.title}
//           </h4>

//           <div className="mt-auto mb-2">
//             <p className="text-[13px] sm:text-[14px] flex gap-1.5 items-center">
//               Duration: <span className="font-bold text-foreground">{course.duration}</span>
//             </p>
//             <p className="text-[13px] sm:text-[14px] flex gap-1.5 items-center">
//               Cohort Starts: <span className="font-bold text-foreground">{course.cohortStarts}</span>
//             </p>
//           </div>

//           <Link
//             href={`/courses/${course.slug}`}
//             className="block w-full py-2.5 bg-btn-gradient text-primary-foreground text-center rounded-[4px] font-semibold text-[15px] hover:opacity-95 shadow-sm shadow-primary/20 transition-all"
//           >
//             View Program
//           </Link>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section id="our-programs" className="w-full bg-secondary/5 py-16 lg:py-20 px-4 sm:px-6 lg:px-16">
//       <div className="max-w-[1440px] mx-auto w-full">
//         <div className="w-full text-center mb-12 lg:mb-16">
//           <h2>
//             Discover <span className="text-primary">Our Leading Programs</span>
//           </h2>
//         </div>

//         <div className="lg:hidden flex flex-col gap-4">
//           {isLoading ? (
//             <div className="flex flex-col gap-4">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="w-full h-[54px] bg-muted animate-pulse rounded-sm"></div>
//               ))}
//               <div className="flex overflow-x-auto gap-6 pb-8 pt-2">
//                 {[...Array(2)].map((_, i) => renderSkeletonCard(true, i))}
//               </div>
//             </div>
//           ) : (
//             categories.map((cat) => (
//               <div key={cat} className="flex flex-col gap-4">
//                 <button
//                   onClick={() => setActiveCategory(cat === activeCategory ? "" : cat)}
//                   className={`flex items-center justify-between w-full px-5 py-4 rounded-sm font-medium text-[15px] transition-all ${
//                     activeCategory === cat
//                       ? "bg-btn-gradient text-primary-foreground shadow-md"
//                       : "bg-card text-foreground shadow-sm border border-border"
//                   }`}
//                 >
//                   {cat}
//                   {activeCategory === cat ? (
//                     <ChevronUp size={20} className="shrink-0" />
//                   ) : (
//                     <ChevronDown size={20} className="text-muted-foreground shrink-0" />
//                   )}
//                 </button>

//                 {activeCategory === cat && (
//                   <div className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                     {displayedCourses.map((course) => renderCourseCard(course, true))}

//                     {activeCourses.length === 0 && (
//                       <div className="w-full py-16 text-center text-muted-foreground text-lg bg-card rounded-sm border border-border shadow-sm">
//                         No courses found in this category.
//                       </div>
//                     )}

//                     {activeCourses.length > visibleCount && (
//                       <div className="flex items-center justify-center pl-2 pr-6 shrink-0 snap-center">
//                         <button
//                           onClick={handleViewAll}
//                           className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-sm bg-card border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold text-base shadow-sm"
//                         >
//                           View All
//                           <ChevronRight size={24} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         <div className="hidden lg:flex flex-row gap-6">
//           <div className="w-[280px] shrink-0 flex flex-col gap-3">
//             {isLoading ? (
//               [...Array(6)].map((_, i) => (
//                 <div key={i} className="w-full h-[50px] bg-muted animate-pulse rounded-sm"></div>
//               ))
//             ) : (
//               categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`text-left px-5 py-3.5 rounded-sm font-medium text-[15px] transition-all duration-200 ${
//                     activeCategory === cat
//                       ? "bg-btn-gradient text-primary-foreground shadow-md"
//                       : "bg-card text-foreground shadow-sm border border-border hover:text-primary"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))
//             )}
//           </div>

//           <div className="flex-1 flex flex-col">
//             <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3">
//               {isLoading ? (
//                 [...Array(6)].map((_, i) => renderSkeletonCard(false, i))
//               ) : (
//                 <>
//                   {displayedCourses.map((course) => renderCourseCard(course, false))}
//                   {activeCourses.length === 0 && (
//                     <div className="col-span-full py-24 flex flex-col justify-center items-center text-muted-foreground bg-card rounded-sm border border-border shadow-sm">
//                       <p className="font-medium text-lg">No courses found in this category yet.</p>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             {!isLoading && activeCourses.length > visibleCount && (
//               <div className="mt-12 flex justify-center">
//                 <button
//                   onClick={handleViewAll}
//                   className="font-semibold text-[20px] text-primary transition-all hover:underline"
//                 >
//                   View All Courses
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';

import { memo, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { usePrograms, formatTitleCase } from "@/lib/usePrograms";
import type { ProgramCourse as Course, ProgramsData } from "@/lib/usePrograms";

const shineBase =
  "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full";
const shineLight = `${shineBase} via-white/20`;
const shineSoft = `${shineBase} via-primary/10`;

const SkeletonCard = ({ isMobileCarousel = false }: { isMobileCarousel?: boolean }) => (
  <div
    className={`bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible animate-pulse ${
      isMobileCarousel ? "w-80 shrink-0 snap-start" : "w-full"
    }`}
  >
    <div className="relative w-full h-40 sm:h-44 rounded-sm bg-muted">
      <div className="absolute -bottom-6 left-6 w-[120px] h-[52px] bg-card rounded-sm shadow-md border border-border"></div>
    </div>
    <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-card rounded-b-lg">
      <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
      <div className="h-6 bg-muted rounded w-1/2 mb-6"></div>
      <div className="mt-auto space-y-2 mb-6">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
      <div className="w-full py-5 bg-muted rounded-[4px]"></div>
    </div>
  </div>
);

const CourseCard = memo(function CourseCard({
  course,
  isMobileCarousel = false,
}: {
  course: Course;
  isMobileCarousel?: boolean;
}) {
  return (
    <div
      className={`bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30 ${
        isMobileCarousel ? "w-80 shrink-0 snap-start" : "w-full"
      }`}
    >
      <div className="relative w-full h-40 p-1 sm:h-44 rounded-sm bg-muted/30">
        {course.bannerImage ? (
          <img
            src={course.bannerImage}
            alt={course.title}
            loading="lazy"
            decoding="async"
            className="w-full h-40 sm:h-44 object-cover rounded-sm"
          />
        ) : (
          <div className="w-full h-40 sm:h-44 bg-muted rounded-sm"></div>
        )}

        <div className="absolute -bottom-6 left-6 h-[52px] min-w-[76px] max-w-[85%] w-fit bg-card rounded-sm shadow-md border border-border flex items-center justify-center px-1 py-1 z-10">
          {course.logoImage || course.image ? (
            <img
              src={course.logoImage || course.image}
              alt={course.title}
              loading="lazy"
              decoding="async"
              className="h-full w-auto object-contain"
            />
          ) : (
            <span className="text-[11px] font-bold text-foreground text-center uppercase px-2">
              {course.provider || "LOGO"}
            </span>
          )}
        </div>
      </div>

      <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-card rounded-b-lg">
        <h4 className="text-[18px] sm:text-[20px] font-bold leading-snug line-clamp-2 min-h-[52px] mb-4">
          {course.title}
        </h4>

        <div className="mt-auto mb-2">
          <p className="text-[13px] sm:text-[14px] flex gap-1.5 items-center">
            Duration: <span className="font-bold text-foreground">{course.duration}</span>
          </p>
          <p className="text-[13px] sm:text-[14px] flex gap-1.5 items-center">
            Cohort Starts: <span className="font-bold text-foreground">{course.cohortStarts}</span>
          </p>
        </div>

        <Link
          href={`/courses/${course.slug}`}
          className="group relative block w-full overflow-hidden py-2.5 bg-btn-gradient text-primary-foreground text-center rounded-[4px] font-semibold text-[15px] hover:opacity-95 shadow-sm shadow-primary/20 transition-all"
        >
          <span className="relative z-10">View Program</span>
          <span aria-hidden className={shineLight}></span>
        </Link>
      </div>
    </div>
  );
});

export default function ExplorePrograms({ initialData }: { initialData?: ProgramsData }) {
  const { courses, categories: rawCategories, isLoading } = usePrograms(initialData);
  const [activeCategory, setActiveCategory] = useState<string>("Most Popular");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  const categories = useMemo(() => {
    const courseCountsByCategory = new Map<string, number>();

    for (const course of courses) {
      const key = (course.category || "").trim().toLowerCase();
      if (!key) continue;
      courseCountsByCategory.set(key, (courseCountsByCategory.get(key) || 0) + 1);
    }

    let orderedNames: string[] = [];

    if (rawCategories.length > 0) {
      orderedNames = [...rawCategories]
        .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
        .map((cat) => formatTitleCase(cat.name || ""))
        .filter((name) => {
          if (!name) return false;
          return (courseCountsByCategory.get(name.toLowerCase()) || 0) > 0;
        });
    } else {
      orderedNames = Array.from(new Set(courses.map((c) => c.category).filter(Boolean))).filter(
        (name) => (courseCountsByCategory.get(name.toLowerCase()) || 0) > 0
      );
    }

    const uniqueNonEmptyCategories = Array.from(new Set(orderedNames));
    return courses.length > 0 ? ["Most Popular", ...uniqueNonEmptyCategories] : [];
  }, [courses, rawCategories]);

  const activeCourses = useMemo(() => {
    if (activeCategory === "Most Popular") {
      return courses
        .filter((c) => Boolean(c.isMostPopular))
        .sort((a, b) => {
          const orderDiff = (a.popularOrder ?? 999) - (b.popularOrder ?? 999);
          if (orderDiff !== 0) return orderDiff;
          return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
        });
    }

    return [...courses]
      .filter((c) => c.category.toLowerCase() === activeCategory.toLowerCase())
      .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
  }, [courses, activeCategory]);

  const displayedCourses = useMemo(
    () => activeCourses.slice(0, visibleCount),
    [activeCourses, visibleCount]
  );

  const handleViewAll = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section id="our-programs" className="w-full bg-secondary/5 py-16 lg:py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="w-full text-center mb-12 lg:mb-16">
          <h2>
            Discover <span className="text-primary">Our Leading Programs</span>
          </h2>
        </div>

        <div className="lg:hidden flex flex-col gap-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-[54px] bg-muted animate-pulse rounded-sm"></div>
              ))}
              <div className="flex overflow-x-auto gap-6 pb-8 pt-2">
                {[...Array(2)].map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} isMobileCarousel />
                ))}
              </div>
            </div>
          ) : (
            categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <div key={cat} className="flex flex-col gap-4">
                  <button
                    onClick={() => setActiveCategory(isActive ? "" : cat)}
                    className={`group relative flex items-center justify-between w-full overflow-hidden px-5 py-4 rounded-sm font-medium text-[15px] transition-all ${
                      isActive
                        ? "bg-btn-gradient text-primary-foreground shadow-md"
                        : "bg-card text-foreground shadow-sm border border-border"
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {isActive ? (
                      <ChevronUp size={20} className="relative z-10 shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="relative z-10 text-muted-foreground shrink-0" />
                    )}
                    <span aria-hidden className={isActive ? shineLight : shineSoft}></span>
                  </button>

                  {isActive && (
                    <div className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {displayedCourses.map((course) => (
                        <CourseCard key={course._id} course={course} isMobileCarousel />
                      ))}

                      {activeCourses.length === 0 && (
                        <div className="w-full py-16 text-center text-muted-foreground text-lg bg-card rounded-sm border border-border shadow-sm">
                          No courses found in this category.
                        </div>
                      )}

                      {activeCourses.length > visibleCount && (
                        <div className="flex items-center justify-center pl-2 pr-6 shrink-0 snap-center">
                          <button
                            onClick={handleViewAll}
                            className="group relative flex flex-col items-center justify-center gap-2 w-32 h-32 overflow-hidden rounded-sm bg-card border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold text-base shadow-sm"
                          >
                            <span className="relative z-10">View All</span>
                            <ChevronRight size={24} className="relative z-10" />
                            <span aria-hidden className={shineLight}></span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="hidden lg:flex flex-row gap-6">
          <div className="w-[280px] shrink-0 flex flex-col gap-3">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-[50px] bg-muted animate-pulse rounded-sm"></div>
              ))
            ) : (
              categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative overflow-hidden text-left px-5 py-3.5 rounded-sm font-medium text-[15px] transition-all duration-200 ${
                      isActive
                        ? "bg-btn-gradient text-primary-foreground shadow-md"
                        : "bg-card text-foreground shadow-sm border border-border hover:text-primary"
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    <span aria-hidden className={isActive ? shineLight : shineSoft}></span>
                  </button>
                );
              })
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3">
              {isLoading ? (
                [...Array(6)].map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)
              ) : (
                <>
                  {displayedCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                  {activeCourses.length === 0 && (
                    <div className="col-span-full py-24 flex flex-col justify-center items-center text-muted-foreground bg-card rounded-sm border border-border shadow-sm">
                      <p className="font-medium text-lg">No courses found in this category yet.</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {!isLoading && activeCourses.length > visibleCount && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleViewAll}
                  className="font-semibold text-[20px] text-primary transition-all hover:underline"
                >
                  View All Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}