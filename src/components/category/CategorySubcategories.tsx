// "use client";

// import React from "react";
// import Link from "next/link";

// export interface SubcategoryItem {
//   _id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   bannerImage?: string;
//   logoImage?: string;
//   image?: string;
// }

// interface CategorySubcategoriesProps {
//   categoryName: string;
//   categorySlug: string;
//   subcategories: SubcategoryItem[];
// }

// export default function CategorySubcategories({
//   categoryName,
//   categorySlug,
//   subcategories,
// }: CategorySubcategoriesProps) {
//   return (
//     <section className="w-full bg-secondary/5 py-14 md:py-20">
//       <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
//         <div className="mb-10 md:mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <h2 className="mb-3">
//               Explore <span className="text-primary">{categoryName}</span> Programs
//             </h2>
//             <p className="mb-0 max-w-[640px]">
//               Choose from our specialized certification tracks under {categoryName}
//             </p>
//           </div>

//           {subcategories.length > 0 && (
//             <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
//               {subcategories.length} {subcategories.length === 1 ? "Program" : "Programs"}
//             </span>
//           )}
//         </div>

//         {subcategories.length === 0 ? (
//           <div className="rounded-sm border border-border bg-card p-10 text-center text-muted-foreground shadow-sm">
//             No subcategories available under this category yet.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {subcategories.map((sub) => (
//               <div
//                 key={sub._id}
//                 className="bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30 w-full"
//               >
//                 <div className="relative w-full h-40 p-1 sm:h-44 rounded-sm bg-muted/30">
//                   {sub.bannerImage ? (
//                     <img
//                       src={sub.bannerImage}
//                       alt={sub.name}
//                       loading="lazy"
//                       decoding="async"
//                       className="w-full h-40 sm:h-44 object-cover rounded-sm"
//                     />
//                   ) : (
//                     <div className="w-full h-40 sm:h-44 bg-muted rounded-sm"></div>
//                   )}

//                   <div className="absolute -bottom-6 left-6 h-[52px] min-w-[76px] max-w-[85%] w-fit bg-card rounded-sm shadow-md border border-border flex items-center justify-center px-1 py-1 z-10">
//                     {sub.logoImage || sub.image ? (
//                       <img
//                         src={sub.logoImage || sub.image}
//                         alt={sub.name}
//                         loading="lazy"
//                         decoding="async"
//                         className="h-full w-auto object-contain"
//                       />
//                     ) : (
//                       <span className="text-[11px] font-bold text-foreground text-center uppercase px-2">
//                         {categoryName}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-card rounded-b-lg">
//                   <h4 className="text-[18px] sm:text-[20px] font-bold leading-snug line-clamp-2 min-h-[52px] mb-3">
//                     {sub.name}
//                   </h4>

//                   {sub.description && (
//                     <p className="text-[13px] sm:text-[14px] text-muted-foreground line-clamp-2 mb-4">
//                       {sub.description}
//                     </p>
//                   )}

//                   <div className="mt-auto">
//                     <Link
//                       href={`/${categorySlug}/${sub.slug}`}
//                       className="block w-full py-2.5 bg-btn-gradient text-primary-foreground text-center rounded-[4px] font-semibold text-[15px] hover:opacity-95 shadow-sm shadow-primary/20 transition-all"
//                     >
//                       View Program
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export interface SubcategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  bannerImage?: string;
  logoImage?: string;
  image?: string;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  provider?: string;
  duration?: string;
  cohortStarts?: string;
  badge?: string;
  image?: string;
  bannerImage?: string;
  logoImage?: string;
  displayOrder?: number;
}

interface CategorySubcategoriesProps {
  categoryName: string;
  categorySlug: string;
  subcategories?: SubcategoryItem[];
}

export default function CategorySubcategories({
  categoryName,
  categorySlug,
}: CategorySubcategoriesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function fetchCourses() {
      try {
        const res = await fetch("/api/admin/courses", { signal: controller.signal });
        if (!active) return;

        const data = res.ok ? await res.json() : [];
        if (!active) return;

        setCourses(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Failed to fetch category courses:", err);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    fetchCourses();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setVisibleCount(8);
  }, [categoryName]);

  const categoryCourses = useMemo(() => {
    const target = (categoryName || "").trim().toLowerCase();
    return [...courses]
      .filter((c) => (c.category || "").trim().toLowerCase() === target)
      .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
  }, [courses, categoryName]);

  const displayedCourses = useMemo(
    () => categoryCourses.slice(0, visibleCount),
    [categoryCourses, visibleCount]
  );

  const handleViewAll = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const renderSkeletonCard = (index: number) => (
    <div
      key={`skeleton-${index}`}
      className="bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible animate-pulse w-full"
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

  return (
    <section className="w-full bg-secondary/5 py-16 lg:py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="w-full text-center mb-12 lg:mb-16">
          <h2>
            Explore <span className="text-primary">{categoryName}</span> Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
          {isLoading ? (
            [...Array(8)].map((_, i) => renderSkeletonCard(i))
          ) : (
            <>
              {displayedCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30 w-full"
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

                    <div className="absolute -bottom-6 left-6 h-[52px] min-w-auto max-w-[85%] w-fit bg-card rounded-sm shadow-md border border-border flex items-center justify-center px-1 py-1 z-10">
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
                      href={`/${categorySlug}/${course.slug}`}
                      className="block w-full py-2.5 bg-btn-gradient text-primary-foreground text-center rounded-[4px] font-semibold text-[15px] shadow-md shadow-primary/30 hover:opacity-95 hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:-left-full before:w-1/2 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:skew-x-[-25deg] before:transition-all before:duration-700 hover:before:left-full"
                    >
                      View Program
                    </Link>
                  </div>
                </div>
              ))}

              {categoryCourses.length === 0 && (
                <div className="col-span-full py-24 flex flex-col justify-center items-center text-muted-foreground bg-card rounded-sm border border-border shadow-sm">
                  <p className="font-medium text-lg">No courses found in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>

        {!isLoading && categoryCourses.length > visibleCount && (
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
    </section>
  );
}