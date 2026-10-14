'use client';

import React from 'react';
import { MonitorPlay, Clock, ListChecks, FileQuestion, Globe2, ShieldCheck } from 'lucide-react';

export default function CourseExamDetails({ course }: { course?: any }) {
  
  const heading = course?.examHeading;
  const subHeading = course?.examSubHeading;
  
  const certImage = course?.examCertificateImage;
  const certAlt = course?.examCertificateImageAlt;
  const certTitle = course?.examCertificateImageTitle;
  
  const passingScore = course?.examPassingScore;
  const totalScore = course?.examTotalScore;
  const scoreDesc = course?.examScoreDescription;
  
  const guaranteeTitle = course?.examGuaranteeTitle;
  const guaranteeSubtitle = course?.examGuaranteeSubtitle;
  const guaranteeFooter = course?.examGuaranteeFooter;

  if (!heading && !certImage && !passingScore) return null;

  const passNum = parseInt(passingScore) || 0;
  const totalNum = parseInt(totalScore) || 100;
  const percentage = Math.min((passNum / totalNum) * 100, 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <div id="exam" className="w-full bg-white py-12 lg:py-20 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-10">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-slate-900 mb-2">
            {heading && <span className="text-[#10b981]">{heading} </span>}
            Exam Details & Certifications
          </h2>
          {subHeading && (
            <p className="text-slate-500 text-[15px] md:text-[16px] max-w-2xl">
              {subHeading}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          <div className="flex-1 flex flex-col gap-3">
            {[
              { icon: MonitorPlay, title: "EXAM FORMAT", desc: course?.examFormat },
              { icon: Clock, title: "EXAM DURATION", desc: course?.examDuration },
              { icon: ListChecks, title: "NUMBER OF QUESTIONS", desc: course?.examQuestions },
              { icon: FileQuestion, title: "QUESTION TYPES", desc: course?.examQuestionTypes },
              { icon: Globe2, title: "AVAILABLE LANGUAGES", desc: course?.examLanguages }
            ].map((item, idx) => {
              if (!item.desc) return null;
              return (
                <div key={idx} className="bg-[#10b981] rounded-lg p-4 flex items-center gap-4 text-white hover:bg-[#0ea5e9] transition-colors duration-300">
                  <div className="w-12 h-12 border border-white/30 rounded-md flex items-center justify-center shrink-0">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-wider opacity-90 mb-0.5">{item.title}</div>
                    <div className="text-[16px] font-bold">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            
            {certImage && (
              <div className="w-full h-[180px] rounded-xl overflow-hidden shadow-sm border border-slate-100 relative bg-[#f8fafc] flex items-center justify-center p-4">
                <div 
                  className="absolute inset-0 z-0 opacity-40 scale-150 blur-xl"
                  style={{
                    backgroundImage: `url('${certImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <img 
                  src={certImage} 
                  alt={certAlt || "Certificate Image"} 
                  title={certTitle}
                  className="w-full max-h-[160px] object-contain relative z-10"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {(passingScore || totalScore || scoreDesc) && (
                <div className="bg-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="relative w-32 h-32 mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="8" 
                        strokeDasharray="283" 
                        strokeDashoffset={strokeDashoffset} 
                        strokeLinecap="round" 
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">{passingScore}</span>
                      <span className="text-[11px] text-slate-400">/{totalScore}</span>
                      <span className="text-[10px] text-slate-400 mt-1">Passing Score</span>
                    </div>
                  </div>
                  {scoreDesc && (
                    <p className="text-[12px] text-slate-400 leading-relaxed">
                      {scoreDesc}
                    </p>
                  )}
                </div>
              )}

              {(guaranteeTitle || guaranteeSubtitle || guaranteeFooter) && (
                <div className="bg-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center text-center border border-slate-800">
                  <ShieldCheck size={80} className="text-[#10b981] mb-4 opacity-90" strokeWidth={1} />
                  <h3 className="text-2xl font-extrabold text-[#10b981] mb-1">{guaranteeTitle}</h3>
                  <p className="text-[18px] font-bold text-white mb-2">{guaranteeSubtitle}</p>
                  <p className="text-[12px] text-slate-400">{guaranteeFooter}</p>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}