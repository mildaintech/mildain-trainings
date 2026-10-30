'use client';

import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import InquiryForm from '../shared/InquiryForm';

export default function CourseOverview({ course }: { course?: any }) {
  const [showAllKeyPoints, setShowAllKeyPoints] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  if (!course) return null;

  const heading = course.overviewHeading || "About the Course";
  const description = course.overviewDescription || "";
  const keyPoints = course.overviewKeyPoints || [];
  const skillsCovered = course.overviewSkillsCovered || [];
  const image = course.overviewImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80";
  const imageAlt = course.overviewImageAlt || heading;
  const imageTitle = course.overviewImageTitle || heading;
  const displayTitle = imageTitle || imageAlt || heading;

  return (
    <div id="overview" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        <div className="w-full lg:w-[65%] xl:w-[70%] bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          
          <div className="bg-muted/30 p-5 md:p-6 border-b border-border">
            <h3 className="mb-0">
              {heading}
            </h3>
          </div>
          
          <div className="p-4 md:p-6 space-y-6">
            {description && (
              <p className=" text-[18px] sm:text-[20px] font-medium text-justify mb-0">
                {description}
              </p>
            )}

            {keyPoints.length > 0 && (
              <div>
                <h4 className="mb-4">
                  Key Points:
                </h4>
                <ul className="space-y-3">
                  {keyPoints.map((point: string, idx: number) => (
                    <li 
                      key={idx} 
                      className={`items-start gap-3 ${idx >= 2 && !showAllKeyPoints ? 'hidden md:flex' : 'flex'}`}
                    >
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-1" strokeWidth={2.5} />
                      <span className="text-foreground font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowAllKeyPoints(!showAllKeyPoints)}
                  className="md:hidden mt-5 flex items-center gap-1.5 text-primary font-semibold text-[15px] hover:underline transition-all"
                >
                  {showAllKeyPoints ? (
                    <>View Less <ChevronUp size={18} /></>
                  ) : (
                    <>View More <ChevronDown size={18} /></>
                  )}
                </button>
              </div>
            )}

            <div className="w-full rounded-xl overflow-hidden border border-border/50 shadow-sm relative">
              <img 
                src={image} 
                alt={imageAlt} 
                title={imageTitle}
                className="w-full h-auto max-h-[420px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-md border border-border max-w-[85%]">
                <span className="font-bold text-foreground text-sm sm:text-base line-clamp-1">
                  {displayTitle}
                </span>
              </div>
            </div>

            {skillsCovered.length > 0 && (
              <div>
                <h4 className="mb-4">
                  Skills Covered
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {skillsCovered.map((skill: string, idx: number) => (
                    <li 
                      key={idx} 
                      className={`items-start gap-3 list-none ${idx >= 3 && !showAllSkills ? 'hidden md:flex' : 'flex'}`}
                    >
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-1" strokeWidth={2.5} />
                      <span className="text-foreground font-medium">{skill}</span>
                    </li>
                  ))}
                </div>
                <button 
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="md:hidden mt-5 flex items-center gap-1.5 text-primary font-semibold text-[15px] hover:underline transition-all"
                >
                  {showAllSkills ? (
                    <>View Less <ChevronUp size={18} /></>
                  ) : (
                    <>View More <ChevronDown size={18} /></>
                  )}
                </button>
              </div>
            )}
            
          </div>
        </div>

        <div className="w-full lg:w-[35%] xl:w-[30%] lg:sticky lg:top-[120px] h-fit z-20">
          <InquiryForm />
        </div>

      </div>
    </div>
  );
}