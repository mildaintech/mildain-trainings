'use client';

import React from 'react';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface PriceDetails {
  symbol: string;
  amount: number;
  formatted: string;
}

export default function CourseTrainingOptions({ course, priceDetails }: { course?: any, priceDetails?: PriceDetails }) {
  const originalAmount = priceDetails ? Math.ceil(priceDetails.amount * 1.2) : 0;
  const originalPriceFormatted = priceDetails ? `${priceDetails.symbol}${originalAmount}` : '';
  const heading = course?.trainingOptionsHeading;
  const subHeading = course?.trainingOptionsSubHeading;
  const card1Image = course?.trainingCard1Image;
  const card1ImageAlt = course?.trainingCard1ImageAlt;
  const card1ImageTitle = course?.trainingCard1ImageTitle;
  const card1Title = course?.trainingCard1Title;
  const card1Description = course?.trainingCard1Description;
  const badgeText = course?.badge;

  return (
    <div id="options" className="w-full bg-background py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-10 text-center lg:text-left">
          <h2 className="mb-4 ">
            <span className="text-primary">{heading}</span>
          </h2>
          <p className=" text-[18px] sm:text-[20px] font-medium text-muted-foreground font-medium mb-0">
            {subHeading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          <div className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col shadow-sm">
            <div className="relative h-[240px] w-full overflow-hidden bg-muted/50 border-b border-border">
              {card1Image && (
                <img 
                  src={card1Image} 
                  alt={card1ImageAlt} 
                  title={card1ImageTitle}
                  className="w-full h-full object-cover"
                />
              )}
              {badgeText && (
                <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground text-[12px] font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow-sm">
                  {badgeText}
                </div>
              )}
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h4 className="mb-2">{card1Title}</h4>
              <p className="text-[18px] sm:text-[20px] font-medium text-muted-foreground mb-6">
                {card1Description}
              </p>
              
              <div className="bg-background rounded-xl p-5 border border-border mb-6 shadow-sm">
                {priceDetails && (
                  <div className="text-[13px] text-muted-foreground font-medium mb-1">
                    WAS <span className="line-through">{originalPriceFormatted}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[32px] font-extrabold text-foreground">{priceDetails?.formatted || '$0'}</span>
                  </div>
                  <span className="text-[12px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-sm flex items-center gap-1 border border-primary/20">
                    <CheckCircle size={14} /> All Inclusive
                  </span>
                </div>
              </div>
              
              <div className="mt-auto">
                <Link 
                  href={`/checkout/${course?.slug}`}
                  target="_blank"
                  className="w-full bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold py-3.5 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2 shadow-sm"
                >
                  Enroll Instantly
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground">
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Secure checkout process</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col shadow-sm">
            <div className="relative h-[240px] w-full overflow-hidden border-b border-border">
              <img 
                src="/images/home/hero2.png" 
                alt="Enterprise B2B Training" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h4 className="mb-2">Enterprise B2B Training</h4>
              <p className=" text-[18px] sm:text-[20px] font-medium text-muted-foreground mb-6">
                Scalable upskilling frameworks structured around enterprise production schedules.
              </p>
              
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/20 mb-6 flex-grow shadow-sm">
                <h4 className=" text-2xl sm:text-2xl font-medium text-primary mb-2">
                  Custom Enterprise Volume Pricing
                </h4>
                <p className=" text-[14px] sm:text-[16px] font-medium text-muted-foreground mb-0">
                  Tiered packages built precisely around workforce headcounts.
                </p>
              </div>
              
              <div className="mt-auto">
                <button className="w-full bg-background hover:bg-muted/50 border-2 border-primary text-primary font-bold py-3.5 rounded-lg transition-colors mb-3 shadow-sm">
                  Request Corporate Proposal
                </button>
                <div className="flex items-center justify-center text-[12px] text-muted-foreground">
                  <span>Dedicated corporate response within 2 hours</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}