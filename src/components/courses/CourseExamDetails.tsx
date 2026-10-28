'use client';

import React, { useState } from 'react';
import { MonitorPlay, Clock, ListChecks, FileQuestion, Globe2, ZoomIn, X } from 'lucide-react';

export default function CourseExamDetails({ course }: { course?: any }) {
  const [isZoomed, setIsZoomed] = useState(false);
  
  const heading = course?.examHeading || "";
  const subHeading = course?.examSubHeading || "";
  
  const certImage = course?.examCertificateImage || "";
  const certAlt = course?.examCertificateImageAlt || "Certificate Image";
  const certTitle = course?.examCertificateImageTitle || "";

  if (!heading && !certImage) return null;

  return (
    <>
      <div id="exam" className="w-full bg-background py-12 lg:py-20 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          
          <div className="mb-10">
            <h2 className="mb-4">
              {heading && <span className="text-primary">{heading} </span>}
            </h2>
            {subHeading && (
              <p className="text-muted-foreground max-w-2xl mb-0">
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
                  <div key={idx} className="relative rounded-lg p-4 flex items-center gap-4 text-primary-foreground overflow-hidden group">
                    <div className="absolute inset-0 bg-btn-gradient transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative z-10 w-12 h-12 border border-primary-foreground/30 rounded-md flex items-center justify-center shrink-0 bg-background/5">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[11px] font-bold tracking-wider opacity-90 mb-0.5">{item.title}</div>
                      <div className="text-[16px] font-bold">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {certImage && (
              <div className="flex-1 flex flex-col">
                <div 
                  className="w-full h-full min-h-[300px] lg:min-h-[100%] rounded-xl overflow-hidden shadow-sm border border-border relative bg-muted/30 flex items-center justify-center p-4 group cursor-pointer"
                  onClick={() => setIsZoomed(true)}
                >
                  
                  <div 
                    className="absolute inset-0 z-0 opacity-30 scale-150 blur-2xl transition-opacity group-hover:opacity-50"
                    style={{
                      backgroundImage: `url('${certImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  <img 
                    src={certImage} 
                    alt={certAlt} 
                    title={certTitle}
                    className="w-full h-full object-contain relative z-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity bg-black/5">
                  </div>
                  
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {isZoomed && certImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-foreground/70 hover:text-foreground bg-muted/50 hover:bg-muted p-2.5 rounded-full transition-colors z-50 border border-border"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <X size={24} />
          </button>
          
          <img 
            src={certImage} 
            alt={certAlt} 
            className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg border border-border/50 bg-card/50"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}