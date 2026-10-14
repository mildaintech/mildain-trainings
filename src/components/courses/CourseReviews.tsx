'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CourseReviews({ course }: { course?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!course) return null;

  const reviews = Array.isArray(course.reviews) && course.reviews.length > 0 ? course.reviews : [];
  const videoImage = course.successVideoImage || "https://plus.unsplash.com/premium_photo-1661963085061-5068e4e73cc6?q=80&w=1470&auto=format&fit=crop";
  const videoImageAlt = course.successVideoImageAlt || "Mildain Alumni Success Story";
  const videoImageTitle = course.successVideoImageTitle || "";
  const videoUrl = course.successVideoUrl || "";

  if (reviews.length === 0 && !videoUrl) return null;

  const cardsToShow = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, reviews.length - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  };

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <>
      <section id="reviews" className="py-4 md:py-6 bg-background overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground mb-8 lg:mb-10 leading-tight">
            Real Stories of Mildain Learners at Top Corporations
          </h2>

          <div 
            onClick={() => {
              if(embedUrl) setIsVideoOpen(true);
            }}
            className={`relative w-full aspect-video lg:aspect-[2.2/1] rounded-2xl overflow-hidden shadow-md bg-muted ${embedUrl ? 'cursor-pointer group' : ''}`}
          >
            <Image
              src={videoImage}
              alt={videoImageAlt}
              title={videoImageTitle}
              fill
              className={`object-cover transition-transform duration-700 ${embedUrl ? 'group-hover:scale-105' : ''}`}
            />

            {embedUrl && (
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
            )}

            <div className="absolute top-6 left-0 bg-[#83bb9a] text-white px-6 py-2.5 rounded-r-md text-base md:text-lg font-bold tracking-wide shadow-sm z-10">
              Success story
            </div>

            <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white font-extrabold text-xl md:text-2xl tracking-wide">MILDAIN</span>
            </div>

            {embedUrl && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1.5" fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="mt-14 md:mt-20 w-full">
              <div className="overflow-hidden -mx-4">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
                >
                  {reviews.map((test: any, index: number) => (
                    <div key={index} className="w-full lg:w-1/2 flex-shrink-0 px-4 flex">
                      <div className="bg-primary/5 border border-border/60 rounded-2xl p-8 md:p-10 flex flex-col w-full h-full shadow-sm hover:shadow-md transition-shadow">
                        
                        <div className="flex items-start gap-5 md:gap-6">
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-2 border-background shadow-[0_6px_10px_-2px_rgba(0,0,0,0.25)] bg-background flex items-center justify-center">
                            {test.image ? (
                              <Image
                                src={test.image}
                                alt={test.imageAlt || test.name || "Reviewer"}
                                title={test.imageTitle || test.name || ""}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-slate-300 font-bold text-2xl">{test.name?.charAt(0) || "U"}</span>
                            )}
                          </div>
                          <div className="flex flex-col pt-1">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                              {test.name}
                            </h3>
                            <p className="text-base text-muted-foreground mt-1.5 font-medium">
                              {test.role}
                            </p>
                            {test.logo && (
                              <img 
                                src={test.logo} 
                                alt={test.logoAlt || "Company Logo"} 
                                title={test.logoTitle || ""}
                                className="h-12 md:h-14 w-auto mt-3 object-contain !object-left" 
                              />
                            )}
                          </div>
                        </div>

                        {test.quote && (
                          <h4 className="text-lg md:text-xl font-bold text-foreground mt-8 leading-snug text-justify">
                            {test.quote}
                          </h4>
                        )}

                        {test.text && (
                          <p className="text-base md:text-lg text-muted-foreground mt-5 leading-relaxed font-medium text-justify">
                            {test.text}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {reviews.length > cardsToShow && (
                <div className="flex items-center justify-center gap-5 mt-10 md:mt-12">
                  <button 
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all bg-background shadow-sm"
                  >
                    <ChevronLeft size={24} strokeWidth={2} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all bg-background shadow-sm"
                  >
                    <ChevronRight size={24} strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {isVideoOpen && embedUrl && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-8">
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-lg backdrop-blur-sm"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          <div className="relative w-full max-w-[900px] aspect-video rounded-lg md:rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe 
              src={embedUrl} 
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}