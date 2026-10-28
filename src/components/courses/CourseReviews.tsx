'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight, Quote, X } from 'lucide-react';

export default function CourseReviews({ course }: { course?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [subcategoryData, setSubcategoryData] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const reviews = subcategoryData?.reviews?.length > 0 
    ? subcategoryData.reviews 
    : (Array.isArray(course.reviews) && course.reviews.length > 0 ? course.reviews : []);
    
  const videoImage = subcategoryData?.successVideoImage || course.successVideoImage || "https://plus.unsplash.com/premium_photo-1661963085061-5068e4e73cc6?q=80&w=1470&auto=format&fit=crop";
  const videoImageAlt = subcategoryData?.successVideoImageAlt || course.successVideoImageAlt || "Mildain Alumni Success Story";
  const videoImageTitle = subcategoryData?.successVideoImageTitle || course.successVideoImageTitle || "";
  const videoUrl = subcategoryData?.successVideoUrl || course.successVideoUrl || "";

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
    } else if (url.includes('youtube-nocookie.com/embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1` : '';
  };

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <>
      <section id="reviews" className="py-16 md:py-24 bg-background overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          
          <h2 className="text-center mb-10 lg:mb-14">
            Real Stories of <span className="text-primary">Mildain Learners</span> at Top Corporations
          </h2>

          <div 
            onClick={() => {
              if (embedUrl) setIsVideoOpen(true);
            }}
            className={`relative w-full aspect-video lg:aspect-[2.5/1] rounded-2xl overflow-hidden shadow-xl bg-muted border border-border/50 ${embedUrl ? 'cursor-pointer group' : ''}`}
          >
            <Image
              src={videoImage}
              alt={videoImageAlt}
              title={videoImageTitle}
              fill
              className={`object-cover transition-transform duration-700 ${embedUrl ? 'group-hover:scale-105' : ''}`}
            />

            {embedUrl && (
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
            )}

            <div className="absolute top-6 left-0 bg-btn-gradient text-primary-foreground px-6 py-2.5 rounded-r-md font-bold tracking-wide shadow-md z-10 uppercase text-sm md:text-base">
              Success story
            </div>

            <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" className="text-primary-foreground"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" className="text-primary-foreground" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" className="text-primary-foreground" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-primary-foreground font-extrabold text-xl md:text-2xl tracking-widest drop-shadow-md">MILDAIN</span>
            </div>

            {embedUrl && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(46,97,87,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:bg-primary border border-primary-foreground/20">
                  <Play className="text-primary-foreground w-8 h-8 md:w-10 md:h-10 ml-1.5" fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="relative mt-16 md:mt-24 w-full group/slider">
              <div className="overflow-hidden md:px-4 lg:px-8">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
                >
                  {reviews.map((test: any, index: number) => (
                    <div key={test.id || index} className="w-full lg:w-1/2 flex-shrink-0 px-3 md:px-4 flex py-4">
                      <div className="bg-card border border-border/80 bg-secondary/5 rounded-2xl px-8 py-6 md:px-10 md:py-8 flex flex-col w-full h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(46,97,87,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card">
                        
                        <Quote className="absolute top-6 right-6 w-20 h-20 text-primary/5 -rotate-12 group-hover/card:text-primary/10 group-hover/card:rotate-0 transition-all duration-500" strokeWidth={1} />
                        
                        <div className="flex items-start gap-5 md:gap-6 relative z-10">
                          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-[3px] border-primary/10 shadow-sm bg-background group-hover/card:border-primary/30 transition-colors duration-300 flex items-center justify-center">
                            {test.image ? (
                              <Image
                                src={test.image}
                                alt={test.imageAlt || test.name || "Reviewer"}
                                title={test.imageTitle || test.name || ""}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-muted-foreground font-bold text-2xl">{test.name?.charAt(0) || "U"}</span>
                            )}
                          </div>
                          <div className="flex flex-col pt-1">
                            <h4 className="mb-0">
                              {test.name}
                            </h4>
                            <p className="text-[1.2rem] text-foreground/80 mt-1 mb-0 opacity-90">
                              {test.role}
                            </p>
                            {test.logo && (
                              <div className="h-10 md:h-12 w-auto mt-2 inline-flex items-center justify-start max-w-fit">
                                <img 
                                  src={test.logo} 
                                  alt={test.logoAlt || "Company Logo"} 
                                  title={test.logoTitle || ""}
                                  className="h-full w-auto object-contain" 
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="relative z-10 mt-8">
                          {test.quote && (
                            <p className="italic font-semibold text-foreground/90 mb-0">
                              {test.quote}
                            </p>
                          )}

                          {(test.quote && test.text) && (
                            <div className="w-12 h-1 bg-primary/20 my-5 rounded-full group-hover/card:bg-primary/60 group-hover/card:w-20 transition-all duration-500"></div>
                          )}

                          {test.text && (
                            <p className="text-[1.3rem] mb-0 opacity-80 leading-relaxed text-justify">
                              {test.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {reviews.length > cardsToShow && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-0 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:border-primary hover:bg-primary transition-all bg-background shadow-lg z-20 opacity-0 md:opacity-100 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft size={28} strokeWidth={2} />
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    className="absolute right-0 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:border-primary hover:bg-primary transition-all bg-background shadow-lg z-20 opacity-0 md:opacity-100 group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
                    disabled={currentIndex >= maxIndex}
                  >
                    <ChevronRight size={28} strokeWidth={2} />
                  </button>

                  <div className="flex md:hidden items-center justify-center gap-4 mt-6">
                    <button 
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all bg-background shadow-sm cursor-pointer"
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft size={24} strokeWidth={2} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all bg-background shadow-sm cursor-pointer"
                      disabled={currentIndex >= maxIndex}
                    >
                      <ChevronRight size={24} strokeWidth={2} />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </section>

      {isVideoOpen && embedUrl && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-6 md:p-8"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
            }}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-muted/50 hover:bg-destructive rounded-full flex items-center justify-center text-foreground hover:text-destructive-foreground transition-all shadow-lg border border-border cursor-pointer"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          <div 
            className="relative w-full max-w-[900px] aspect-video rounded-lg md:rounded-2xl overflow-hidden shadow-2xl bg-card border border-border"
            onClick={(e) => e.stopPropagation()}
          >
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