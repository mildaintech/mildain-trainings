'use client';

import React, { useState } from 'react';

export default function CourseBenefits({ course, isIndia }: { course?: any, isIndia?: boolean }) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  if (!course) return null;

  const heading = course.benefitsHeading || "Benefits";
  const desc = course.benefitsDescription || "The PMP® certification can help you land lucrative roles in IT, manufacturing, finance, healthcare, and other exciting industries. PMP® certified project managers drive better project performance and are often rewarded with substantial pay raises as shown below.";
  
  const tabs = Array.isArray(course.benefitsTabs) ? course.benefitsTabs : [];

  const renderTabs = tabs.length > 0 ? tabs : [
    {
      tabName: "Role Title",
      salaryMinINR: "0", salaryAvgINR: "0", salaryMaxINR: "0",
      salaryMinUSD: "0", salaryAvgUSD: "0", salaryMaxUSD: "0",
      demandValue: "0", demandText: "",
      companies: []
    }
  ];

  const safeTabIndex = activeTabIndex >= renderTabs.length ? 0 : activeTabIndex;
  const activeData = renderTabs[safeTabIndex] || {};

  const currentMin = isIndia ? activeData.salaryMinINR : activeData.salaryMinUSD;
  const currentAvg = isIndia ? activeData.salaryAvgINR : activeData.salaryAvgUSD;
  const currentMax = isIndia ? activeData.salaryMaxINR : activeData.salaryMaxUSD;

  const formatVal = (val: string) => {
    if (!val || val === "0") return "0";
    const cleanVal = val.trim();
    if (cleanVal.startsWith('₹') || cleanVal.startsWith('$')) {
      return cleanVal;
    }
    return isIndia ? `₹${cleanVal}` : `$${cleanVal}`;
  };

  return (
    <div className="w-full bg-primary/5 py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-6">
          <h2 className="mb-3">
            {heading}
          </h2>
          <p className=" text-[18px] sm:text-[20px] font-medium max-w-4xl">
            {desc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {renderTabs.map((tab: any, index: number) => (
            <button
              key={`tab-${index}`}
              onClick={() => setActiveTabIndex(index)}
              className={`px-4 py-2 rounded-full text-[13px] md:text-[14px] font-bold transition-all border ${
                safeTabIndex === index 
                  ? 'bg-primary/10 text-primary border-primary/20' 
                  : 'bg-background text-muted-foreground hover:text-foreground border-transparent'
              }`}
            >
              {tab.tabName || `Role ${index + 1}`}
            </button>
          ))}
        </div>

        <div className="w-full bg-card rounded-xl shadow-md border border-border p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border gap-8 md:gap-0">
            
            <div className="flex flex-col items-center md:px-6">
              <h3 className="text-[18px] font-bold text-[#1f2937] mb-8">Annual Salary</h3>
              
              <div className="flex items-end justify-center gap-1.5 h-[170px] w-full max-w-[260px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[12px] font-bold text-[#374151]">{formatVal(currentMin)}</span>
                  <div className="w-[35px] md:w-[40px] bg-[#faebd7] h-[25px] transition-all duration-500 ease-in-out"></div>
                  <span className="text-[11px] text-[#4b5563] font-medium mt-1">Min</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="w-[35px] md:w-[40px] bg-[#faebd7] mb-[22px] h-[45px] transition-all duration-500 ease-in-out"></div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[13px] font-extrabold text-[#1f2937]">{formatVal(currentAvg)}</span>
                  <div className="w-[40px] md:w-[45px] bg-[#ebb56a] h-[90px] transition-all duration-500 ease-in-out"></div>
                  <span className="text-[11px] text-[#1f2937] font-bold mt-1">Average</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-[35px] md:w-[40px] bg-[#faebd7] mb-[22px] h-[45px] transition-all duration-500 ease-in-out"></div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[12px] font-bold text-[#374151]">{formatVal(currentMax)}</span>
                  <div className="w-[35px] md:w-[40px] bg-[#faebd7] h-[15px] transition-all duration-500 ease-in-out"></div>
                  <span className="text-[11px] text-[#4b5563] font-medium mt-1">Max</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center md:px-6 pt-8 md:pt-0">
              <h3 className="text-[18px] font-bold text-[#1f2937] mb-8">Hiring Companies</h3>
              <div className="flex flex-col gap-6 w-full max-w-[200px]">
                {(activeData.companies || []).map((company: any, index: number) => (
                  <div key={`comp-${index}`} className="flex items-center justify-center h-[36px]">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={company.logoAlt || company.name} 
                        title={company.logoTitle || company.name} 
                        className="max-h-[40px] max-w-[180px] object-contain"
                      />
                    ) : (
                      <span className="text-[20px] font-bold text-gray-800 tracking-tight">{company.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 pt-8 md:pt-0">
              <h3 className="text-[18px] font-bold text-[#1f2937] mb-6">Demand</h3>
              
              <div className="relative mb-5 flex justify-center items-center">
                <svg width="70" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24C12 21.7909 13.7909 20 16 20H48C50.2091 20 52 21.7909 52 24V44C52 46.2091 50.2091 48 48 48H16C13.7909 48 12 46.2091 12 44V24Z" fill="#14b8a6"/>
                  <path d="M12 24C12 21.7909 13.7909 20 16 20H48C50.2091 20 52 21.7909 52 24V32C52 33.1046 51.1046 34 50 34H14C12.8954 34 12 33.1046 12 32V24Z" fill="#fde047"/>
                  <path d="M26 20V16C26 13.7909 27.7909 12 30 12H34C36.2091 12 38 13.7909 38 16V20" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M12 32C12 34 24 38 32 38C40 38 52 34 52 32" fill="#fef08a"/>
                  <circle cx="32" cy="35" r="4" fill="#ef4444" stroke="white" strokeWidth="2"/>
                </svg>
              </div>

              <div className="text-[18px] font-extrabold text-[#1f2937] mb-1.5">{activeData.demandValue || "0"}</div>
              <p className="text-[16px] text-[#4b5563] font-medium leading-relaxed max-w-[300px] mb-0">
                {activeData.demandText}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}