"use client";

import React, { useState, useEffect } from "react";

export default function CoursePathSalaries({ course, isIndia }: { course?: any, isIndia?: boolean }) {
  const [subcategoryData, setSubcategoryData] = useState<any>(null);

  useEffect(() => {
    if (course?.subcategory) {
      const subId = typeof course.subcategory === 'string' ? course.subcategory : course.subcategory?._id;
      const cached = sessionStorage.getItem(`subcat_${subId}`);
      
      if (cached) {
        try {
          setSubcategoryData(JSON.parse(cached));
        } catch (e) {}
      }

      fetch('/api/admin/subcategories')
        .then(res => res.json())
        .then(data => {
          const subcategories = Array.isArray(data) ? data : (data.data || []);
          const target = typeof course.subcategory === 'string' ? course.subcategory.trim().toLowerCase() : "";
          
          const selectedSub = subcategories.find(
            (s: any) =>
              s.name?.trim().toLowerCase() === target ||
              s.slug?.trim().toLowerCase() === target ||
              s._id === subId
          );
          
          if (selectedSub) {
            setSubcategoryData(selectedSub);
            sessionStorage.setItem(`subcat_${subId}`, JSON.stringify(selectedSub));
          }
        })
        .catch(() => {});
    }
  }, [course?.subcategory]);

  if (!course) return null;

  const heading = subcategoryData?.pathSalariesHeading || course?.pathSalariesHeading || "Path & Salaries";
  const description = subcategoryData?.pathSalariesDescription || course?.pathSalariesDescription || "";
  
  const roles = subcategoryData?.pathRoles?.length > 0 
    ? subcategoryData.pathRoles 
    : (Array.isArray(course?.selectedPathRoles) && course.selectedPathRoles.length > 0 ? course.selectedPathRoles : []);

  if (!roles || roles.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-btn-gradient py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <span className="text-[18vw] font-black text-primary-foreground tracking-widest uppercase select-none">
          Career
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="mb-14 text-center">
          <h2 className="text-primary-foreground mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-primary-foreground/90 text-[15px] md:text-[16px] max-w-4xl mx-auto leading-relaxed whitespace-pre-wrap mb-0">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role: any, index: number) => {
            const number = String(index + 1).padStart(2, '0');
            
            const salaryValue = isIndia ? role.salaryInr : role.salaryUsd;
            let displaySalary = salaryValue ? String(salaryValue) : "N/A";

            if (displaySalary !== "N/A") {
              const symbol = isIndia ? '₹' : '$';
              if (!displaySalary.includes(symbol)) {
                displaySalary = `${symbol} ${displaySalary}`;
              }
            }

            return (
              <div 
                key={index} 
                className="relative overflow-hidden group bg-card border border-border rounded-md p-4 flex items-start gap-4 shadow-sm transition-transform hover:-translate-y-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>

                <div className="bg-btn-gradient text-primary-foreground font-bold text-[14px] rounded w-10 h-10 flex items-center justify-center shrink-0 relative z-10">
                  {number}
                </div>
                <div className="flex flex-col pt-0.5 relative z-10">
                  <span className="text-muted-foreground text-[15px] mb-1 font-bold">
                    {role.roleName} :
                  </span>
                  <span className="text-foreground font-extrabold text-[16px]">
                    {displaySalary}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}