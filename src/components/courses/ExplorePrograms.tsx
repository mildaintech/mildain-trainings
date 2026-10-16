// 'use client';

// import { useState, useEffect } from "react";
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
// }

// export default function ExplorePrograms() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string>("Most Popular");
//   const [visibleCount, setVisibleCount] = useState<number>(6);

//   useEffect(() => {
//     async function fetchCourses() {
//       try {
//         const res = await fetch("/api/admin/courses");
//         const data = await res.json();
//         if (res.ok) {
//           const formattedData = data.map((c: Course) => ({
//             ...c,
//             category: (c.category || "").replace(/\b\w/g, char => char.toUpperCase())
//           }));

//           setCourses(formattedData);
          
//           const uniqueCategories = Array.from(new Set(formattedData.map((c: Course) => c.category))) as string[];
//           setCategories(["Most Popular", ...uniqueCategories]);
//         }
//       } catch (err) {}
//     }
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     setVisibleCount(6);
//   }, [activeCategory]);

//   const activeCourses = activeCategory === "Most Popular" 
//     ? courses 
//     : courses.filter(c => c.category === activeCategory);

//   const displayedCourses = activeCourses.slice(0, visibleCount);

//   const handleViewAll = () => {
//     setVisibleCount(prev => prev + 6);
//   };

//   const renderCourseCard = (course: Course, isMobileCarousel = false) => {
//     const categorySlug = (course.category || "")
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)+/g, "");

//     return (
//       <div 
//         key={course._id} 
//         className={`bg-white rounded-sm  shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-visible transition-all duration-300 hover:shadow-lg ${
//           isMobileCarousel ? 'w-80 shrink-0 snap-start' : 'w-full'
//         }`}
//       >
//         <div className="relative w-full h-40 sm:h-44 rounded-sm  bg-slate-100">
//           <img 
//             src={course.bannerImage} 
//             alt={course.title} 
//             className="w-full h-40 sm:h-44 object-cover rounded-sm "
//           />
          
//           <div className="absolute -bottom-6 left-6 w-[64px] h-[64px] bg-white rounded-sm  shadow-md border border-slate-100 flex items-center justify-center p-2 z-10">
//             {(course.logoImage || course.image) ? (
//               <img 
//                 src={course.logoImage || course.image} 
//                 alt="Provider Logo" 
//                 className="max-h-full max-w-full object-contain" 
//               />
//             ) : (
//               <span className="text-[10px] font-bold text-slate-800 text-center uppercase">
//                 {course.provider || "LOGO"}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-white rounded-b-lg">
//           <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 leading-[1.3] mb-5 line-clamp-2 min-h-[58px]">
//             {course.title}
//           </h3>
          
//           <div className="mt-auto space-y-1.5 mb-6">
//             <p className="text-[14px] text-slate-500 flex gap-1.5 items-center">
//               Duration: <span className="font-bold text-slate-700">{course.duration || "Self-Paced"}</span>
//             </p>
//             <p className="text-[14px] text-slate-500 flex gap-1.5 items-center">
//               Cohort Starts: <span className="font-bold text-slate-700">{course.cohortStarts || "Coming Soon"}</span>
//             </p>
//           </div>

//           <Link 
//             href={`/courses/${categorySlug}/${course.slug}`}
//             className="block w-full py-2.5 bg-white border border-primary text-primary text-center rounded-[4px] font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors"
//           >
//             View Program
//           </Link>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="w-full bg-[#F5FBF8] py-16 lg:py-20 px-4 sm:px-6 lg:px-16 min-h-screen">
//       <div className="max-w-[1300px] mx-auto w-full">
        
//         <div className="w-full text-center mb-12 lg:mb-16">
//           <h2 className="text-[32px] md:text-[40px] lg:text-[44px] text-slate-900 tracking-tight">
//             Discover <span className="text-primary"> Our Leading Programs</span>
//           </h2>
//         </div>

//         <div className="lg:hidden flex flex-col gap-4">
//           {categories.map((cat) => (
//             <div key={cat} className="flex flex-col gap-4">
//               <button
//                 onClick={() => setActiveCategory(cat === activeCategory ? "" : cat)}
//                 className={`flex items-center justify-between w-full px-5 py-4 rounded-sm  font-medium text-[15px] transition-all ${
//                   activeCategory === cat
//                     ? "bg-primary text-white shadow-md"
//                     : "bg-white text-slate-700 shadow-sm border border-slate-100"
//                 }`}
//               >
//                 {cat}
//                 {activeCategory === cat ? (
//                   <ChevronUp size={20} className="shrink-0" />
//                 ) : (
//                   <ChevronDown size={20} className="text-slate-400 shrink-0" />
//                 )}
//               </button>

//               {activeCategory === cat && (
//                 <div className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
//                   {displayedCourses.map(course => renderCourseCard(course, true))}
                  
//                   {activeCourses.length === 0 && (
//                     <div className="w-full py-16 text-center text-slate-500 text-lg bg-white rounded-sm  border border-slate-100 shadow-sm">
//                       No courses found in this category.
//                     </div>
//                   )}

//                   {activeCourses.length > visibleCount && (
//                     <div className="flex items-center justify-center pl-2 pr-6 shrink-0 snap-center">
//                       <button
//                         onClick={handleViewAll}
//                         className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-sm  bg-white border border-slate-200 text-primary hover:bg-primary hover:text-white transition-all font-bold text-base shadow-sm"
//                       >
//                         View All
//                         <ChevronRight size={24} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="hidden lg:flex flex-row gap-10">
//           <div className="w-[280px] shrink-0 flex flex-col gap-3">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`text-left px-5 py-3.5 rounded-sm  font-medium text-[15px] transition-all duration-200 ${
//                   activeCategory === cat
//                     ? "bg-primary text-white shadow-md"
//                     : "bg-white text-slate-700 shadow-sm border border-slate-100 hover:text-primary"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           <div className="flex-1 flex flex-col">
//             <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
//               {displayedCourses.map(course => renderCourseCard(course, false))}

//               {activeCourses.length === 0 && (
//                 <div className="col-span-full py-24 flex flex-col justify-center items-center text-slate-500 bg-white rounded-sm  border border-slate-100 shadow-sm">
//                   <p className="font-medium text-lg">No courses found in this category yet.</p>
//                 </div>
//               )}
//             </div>

//             {activeCourses.length > visibleCount && (
//               <div className="mt-12 flex justify-center">
//                 <button
//                   onClick={handleViewAll}
//                   className=" font-semibold text-[20px]  hover:border-primary text-primary transition-all hover:underline"
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

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

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
}

export default function ExplorePrograms() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Most Popular");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/admin/courses");
        const data = await res.json();
        if (res.ok) {
          const formattedData = data.map((c: Course) => ({
            ...c,
            category: (c.category || "").replace(/\b\w/g, char => char.toUpperCase())
          }));

          setCourses(formattedData);
          
          const uniqueCategories = Array.from(new Set(formattedData.map((c: Course) => c.category))) as string[];
          setCategories(["Most Popular", ...uniqueCategories]);
        }
      } catch (err) {}
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  const activeCourses = activeCategory === "Most Popular" 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  const displayedCourses = activeCourses.slice(0, visibleCount);

  const handleViewAll = () => {
    setVisibleCount(prev => prev + 6);
  };

  const renderCourseCard = (course: Course, isMobileCarousel = false) => {
    return (
      <div 
        key={course._id} 
        className={`bg-white rounded-sm  shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-visible transition-all duration-300 hover:shadow-lg ${
          isMobileCarousel ? 'w-80 shrink-0 snap-start' : 'w-full'
        }`}
      >
        <div className="relative w-full h-40 sm:h-44 rounded-sm  bg-slate-100">
          {course.bannerImage ? (
            <img 
              src={course.bannerImage} 
              alt={course.title} 
              className="w-full h-40 sm:h-44 object-cover rounded-sm "
            />
          ) : (
            <div className="w-full h-40 sm:h-44 bg-slate-200 rounded-sm"></div>
          )}
          
          <div className="absolute -bottom-6 left-6 w-[64px] h-[64px] bg-white rounded-sm  shadow-md border border-slate-100 flex items-center justify-center p-2 z-10">
            {course.logoImage || course.image ? (
              <img 
                src={course.logoImage || course.image} 
                alt={course.title} 
                className="max-h-full max-w-full object-contain" 
              />
            ) : (
              <span className="text-[10px] font-bold text-slate-800 text-center uppercase">
                {course.provider || "LOGO"}
              </span>
            )}
          </div>
        </div>

        <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-white rounded-b-lg">
          <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 leading-[1.3] mb-5 line-clamp-2 min-h-[58px]">
            {course.title}
          </h3>
          
          <div className="mt-auto space-y-1.5 mb-6">
            <p className="text-[14px] text-slate-500 flex gap-1.5 items-center">
              Duration: <span className="font-bold text-slate-700">{course.duration || "Self-Paced"}</span>
            </p>
            <p className="text-[14px] text-slate-500 flex gap-1.5 items-center">
              Cohort Starts: <span className="font-bold text-slate-700">{course.cohortStarts || "Coming Soon"}</span>
            </p>
          </div>

          <Link 
            href={`/courses/${course.slug}`}
            className="block w-full py-2.5 bg-white border border-primary text-primary text-center rounded-[4px] font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors"
          >
            View Program
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-[#F5FBF8] py-16 lg:py-20 px-4 sm:px-6 lg:px-16 min-h-screen">
      <div className="max-w-[1300px] mx-auto w-full">
        
        <div className="w-full text-center mb-12 lg:mb-16">
          <h2 className="text-[32px] md:text-[40px] lg:text-[44px] text-slate-900 tracking-tight">
            Discover <span className="text-primary"> Our Leading Programs</span>
          </h2>
        </div>

        <div className="lg:hidden flex flex-col gap-4">
          {categories.map((cat) => (
            <div key={cat} className="flex flex-col gap-4">
              <button
                onClick={() => setActiveCategory(cat === activeCategory ? "" : cat)}
                className={`flex items-center justify-between w-full px-5 py-4 rounded-sm  font-medium text-[15px] transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-700 shadow-sm border border-slate-100"
                }`}
              >
                {cat}
                {activeCategory === cat ? (
                  <ChevronUp size={20} className="shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-slate-400 shrink-0" />
                )}
              </button>

              {activeCategory === cat && (
                <div className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {displayedCourses.map(course => renderCourseCard(course, true))}
                  
                  {activeCourses.length === 0 && (
                    <div className="w-full py-16 text-center text-slate-500 text-lg bg-white rounded-sm  border border-slate-100 shadow-sm">
                      No courses found in this category.
                    </div>
                  )}

                  {activeCourses.length > visibleCount && (
                    <div className="flex items-center justify-center pl-2 pr-6 shrink-0 snap-center">
                      <button
                        onClick={handleViewAll}
                        className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-sm  bg-white border border-slate-200 text-primary hover:bg-primary hover:text-white transition-all font-bold text-base shadow-sm"
                      >
                        View All
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex flex-row gap-10">
          <div className="w-[280px] shrink-0 flex flex-col gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-5 py-3.5 rounded-sm  font-medium text-[15px] transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-700 shadow-sm border border-slate-100 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
              {displayedCourses.map(course => renderCourseCard(course, false))}

              {activeCourses.length === 0 && (
                <div className="col-span-full py-24 flex flex-col justify-center items-center text-slate-500 bg-white rounded-sm  border border-slate-100 shadow-sm">
                  <p className="font-medium text-lg">No courses found in this category yet.</p>
                </div>
              )}
            </div>

            {activeCourses.length > visibleCount && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleViewAll}
                  className=" font-semibold text-[20px]  hover:border-primary text-primary transition-all hover:underline"
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