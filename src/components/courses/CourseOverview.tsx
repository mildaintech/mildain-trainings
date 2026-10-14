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
  
  const image = course.overviewImage ;
  const imageAlt = course.overviewImageAlt || heading;
  const imageTitle = course.overviewImageTitle || heading;

  return (
    <div id="overview" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
        
        <div className="w-full lg:w-[65%] xl:w-[70%] bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          
          <div className="bg-[#f8fcfb] p-5 md:p-6 border-b border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              {heading}
            </h2>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            {description && (
              <p className="text-slate-600 leading-relaxed text-[15px] md:text-[16px]">
                {description}
              </p>
            )}

            {keyPoints.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
                  Key Points:
                </h3>
                <ul className="space-y-3">
                  {keyPoints.map((point: string, idx: number) => (
                    <li 
                      key={idx} 
                      className={`items-start gap-3 ${idx >= 2 && !showAllKeyPoints ? 'hidden md:flex' : 'flex'}`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-slate-600 text-[15px]">{point}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowAllKeyPoints(!showAllKeyPoints)}
                  className="md:hidden mt-4 flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
                >
                  {showAllKeyPoints ? (
                    <>View Less <ChevronUp size={16} /></>
                  ) : (
                    <>View More <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}

            <div className="w-full rounded-xl overflow-hidden">
              <img 
                src={image} 
                alt={imageAlt} 
                title={imageTitle}
                className="w-full h-auto max-h-[400px] object-cover"
              />
            </div>

            {skillsCovered.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
                  Skills Covered
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {skillsCovered.map((skill: string, idx: number) => (
                    <li 
                      key={idx} 
                      className={`items-start gap-3 list-none ${idx >= 3 && !showAllSkills ? 'hidden md:flex' : 'flex'}`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-slate-600 text-[15px]">{skill}</span>
                    </li>
                  ))}
                </div>
                <button 
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="md:hidden mt-4 flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
                >
                  {showAllSkills ? (
                    <>View Less <ChevronUp size={16} /></>
                  ) : (
                    <>View More <ChevronDown size={16} /></>
                  )}
                </button>
              </div>
            )}
            
          </div>
        </div>

        <div className="w-full lg:w-[35%] xl:w-[30%] h-full">
          <InquiryForm />
        </div>

      </div>
    </div>
  );
}