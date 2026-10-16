"use client";

import React from "react";

export default function CoursePathSalaries({ course, isIndia }: { course?: any, isIndia?: boolean }) {
  if (!course || !course.selectedPathRoles || course.selectedPathRoles.length === 0) {
  }

  return (
    <div className="w-full bg-[#1b9a59] py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span className="text-[18vw] font-black text-black tracking-widest uppercase select-none">
          Career
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="mb-14 text-center">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-4">
            Path & Salaries
          </h2>
          {course.pathSalariesDescription && (
            <p className="text-white/90 text-[15px] md:text-[16px] max-w-4xl mx-auto leading-relaxed">
              {course.pathSalariesDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {course.selectedPathRoles.map((role: any, index: number) => {
            const number = String(index + 1).padStart(2, '0');
            const salary = isIndia ? role.salaryInr : role.salaryUsd;

            return (
              <div 
                key={index} 
                className="bg-[#dbece1] rounded-md p-4 flex items-start gap-4 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="bg-[#8b9e94] text-white font-bold text-[14px] rounded w-10 h-10 flex items-center justify-center shrink-0">
                  {number}
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-[#374151] text-[15px] mb-1">
                    {role.roleName} :
                  </span>
                  <span className="text-[#111827] font-extrabold text-[16px]">
                    {salary}
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