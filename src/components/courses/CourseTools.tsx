"use client";

import React, { useState, useEffect } from "react";

export default function CourseTools({ course }: { course?: any }) {
  const [subcategoryData, setSubcategoryData] = useState<any>(null);

  useEffect(() => {
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

  const toolsList =
    subcategoryData?.toolsList?.length > 0
      ? subcategoryData.toolsList
      : course.toolsList || [];

  const toolsHeading =
    subcategoryData?.toolsHeading || course.toolsHeading || "Tools Covered";

  if (toolsList.length === 0) return null;

  return (
    <section className="w-full py-12 lg:py-16 bg-background">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="mb-8">
          {toolsHeading}
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-2">
          {toolsList.map((tool: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center px-4 py-2"
            >
              {tool.logo && (
                <img
                  src={tool.logo}
                  alt={tool.logoAlt || "Tool"}
                  title={tool.logoTitle || ""}
                  className="h-14 w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}