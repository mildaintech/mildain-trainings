'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Star, Shield, Users, ChevronRight } from 'lucide-react';

export default function PMPHeroSection({ course, formattedCategory }: { course?: any, formattedCategory?: string }) {
  
  if (!course) return null;

  const categoryName = course?.category || formattedCategory;
  const bullets = course?.heroSubtitleLines || [];
  const buttons = course?.heroButtons || [];

  return (
    <div className="relative w-full flex flex-col bg-background">
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center relative z-10 pt-4 lg:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 items-center w-full">

          <div className="flex flex-col justify-center items-start text-left w-full max-w-2xl mx-auto lg:mx-0 order-1 lg:order-1 relative z-30">
            
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4 sm:mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={16} />
              <Link href="/courses" className="hover:text-primary transition-colors">Courses</Link>
              <ChevronRight size={16} />
              <span className="text-primary">{categoryName}</span>
            </div>

            {course?.heroTitle && (
              <h1 
                className="mb-4 sm:mb-6"
                dangerouslySetInnerHTML={{ __html: course.heroTitle }}
              />
            )}

            {course?.heroSubtitle && (
              <p className="mb-6">
                {course.heroSubtitle}
              </p>
            )}

            {bullets.length > 0 && (
              <ul className="flex flex-col gap-2.5 sm:gap-3 mb-6 sm:mb-8 w-full">
                {bullets.map((bullet: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" strokeWidth={2.5} />
                    <span className="text-[14px] sm:text-[18px] text-foreground font-medium">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full mb-4 sm:mb-6">
                {buttons.map((btn: any, idx: number) => (
                  <Button 
                    key={idx}
                    asChild 
                    variant={btn.style === 'outline' ? 'outline' : 'default'}
                    className={`font-bold text-[14px] sm:text-[15px] px-8 h-[44px] sm:h-[48px] rounded-md transition-all cursor-pointer w-full sm:w-auto ${
                      btn.style === 'primary' || !btn.style
                        ? 'bg-btn-gradient hover:opacity-90 text-primary-foreground shadow-sm' 
                        : 'bg-transparent border-[2px] border-primary text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Link href={btn.url || "#"}>{btn.label}</Link>
                  </Button>
                ))}
              </div>
            )}

            {(course?.quoteText || course?.quoteLinkText) && (
              <div className="text-[12px] sm:text-[14px] text-muted-foreground font-medium text-center sm:text-left w-full sm:w-auto">
                {course?.quoteText} 
                {course?.quoteLinkUrl && course?.quoteLinkText && (
                  <Link href={course.quoteLinkUrl} className="text-primary hover:underline ml-1">
                    {course.quoteLinkText}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="relative flex justify-center items-end w-full min-h-[180px] sm:h-auto sm:min-h-[400px] lg:min-h-[500px] order-2 lg:order-2 pb-6 lg:pb-0">
            {course?.heroBannerImage && (
              <div className="relative w-full z-10 flex justify-center items-end h-full">
                <img
                  src={course.heroBannerImage}
                  alt={course.heroBannerAlt || "Hero"}
                  title={course.heroBannerTitle}
                  className="w-full max-w-[340px] sm:max-w-[450px] lg:max-w-[550px] h-auto object-contain drop-shadow-2xl"
                />
              </div>
            )}
          </div>

        </div>
      </main>

      {(course?.cpeCredits || course?.trustpilotRating || course?.learnerCount || course?.heroProviderLogo || course?.provider) && (
        <div className="w-full bg-background border-y border-border py-4 lg:py-5 shadow-sm relative z-20 mt-2 sm:mt-0">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex flex-wrap items-center justify-between gap-6">
            
            <div className="flex items-center hidden sm:flex">
              {course?.heroProviderLogo ? (
                course?.heroProviderLogoUrl ? (
                  <Link href={course.heroProviderLogoUrl}>
                    <img src={course.heroProviderLogo} alt={course.heroProviderLogoAlt || "Provider"} title={course.heroProviderLogoTitle} className="h-12 object-contain" />
                  </Link>
                ) : (
                  <img src={course.heroProviderLogo} alt={course.heroProviderLogoAlt || "Provider"} title={course.heroProviderLogoTitle} className="h-12 object-contain" />
                )
              ) : course?.provider ? (
                <span className="font-extrabold text-2xl tracking-tighter text-foreground">{course.provider}<span className="text-primary text-3xl leading-none">.</span></span>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 flex-1 sm:flex-none">
              
              {course?.cpeCredits && (
                <div className="flex items-center gap-2 border border-border rounded-full px-4 py-1.5 sm:py-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-[11px] sm:text-[13px] font-semibold text-foreground">Earn {course.cpeCredits} CPE Course Credits</span>
                </div>
              )}

              {course?.trustpilotRating && (
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-medium text-muted-foreground">
                  <span>Rated the best</span>
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] fill-current" />
                  <span className="font-bold text-foreground">Trustpilot {course.trustpilotRating}/5</span>
                  <Link href="/reviews" className="text-primary hover:underline hidden sm:inline-block">Read Reviews</Link>
                </div>
              )}

              {course?.learnerCount && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-muted border-2 border-background overflow-hidden flex items-center justify-center">
                        <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-[13px] font-bold text-foreground flex items-center gap-1">
                    <span className="text-[#FFB800]">🏆</span> {course.learnerCount}+ Learners
                  </span>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}