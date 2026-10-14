'use client';

import React from 'react';

export default function DiscountBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-[#F2F9F6] shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded-full px-4 py-1.5 border border-white">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="#0f9d58" 
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path d="M2 9.5C2 9.5 3.5 9.5 3.5 12C3.5 14.5 2 14.5 2 14.5V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V14.5C22 14.5 20.5 14.5 20.5 12C20.5 9.5 22 9.5 22 9.5V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V9.5Z" />
          <path d="M9.5 15L14.5 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="10.5" cy="9.5" r="1.5" fill="white"/>
          <circle cx="13.5" cy="14.5" r="1.5" fill="white"/>
        </svg>
        <span className="font-extrabold text-black text-[15px] tracking-wide">
          10% OFF
        </span>
      </div>
      <span className="text-[#0f9d58] italic font-extrabold text-[13px] tracking-wider uppercase">
        SPECIAL DISCOUNT
      </span>
    </div>
  );
}