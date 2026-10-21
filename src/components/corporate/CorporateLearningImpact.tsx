'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, FileBadge, IndianRupee } from 'lucide-react';

const statsData = [
  {
    id: 1,
    icon: Users,
    percentage: "88%",
    label: "Average Completion Rate"
  },
  {
    id: 2,
    icon: FileBadge,
    percentage: "99%",
    label: "Certification Pass Rate"
  },
  {
    id: 3,
    icon: IndianRupee,
    percentage: "60%",
    label: "Savings on Training Costs"
  }
];

export default function CorporateLearningImpact() {
  return (
    <section className="py-16 md:py-24 bg-[#f8fcf9] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
        
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1f2937] leading-[1.3] mb-4 tracking-tight">
          What Learning Delivers for<br />Your Organization
        </h2>
        
        <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#6b7280] font-medium mb-16 md:mb-20">
          Proven outcomes across global teams, roles, and industries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-24 lg:gap-32 max-w-[1100px] mx-auto mb-16 md:mb-20">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex flex-col items-center justify-center">
                <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] bg-[#dcfce7] rounded-xl flex items-center justify-center mb-5 md:mb-6">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#0AA34F]" strokeWidth={2.5} />
                </div>
                <h3 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold text-[#1f2937] mb-2 leading-none">
                  {stat.percentage}
                </h3>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#6b7280] font-medium text-center">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <Button asChild className="bg-[#0AA34F] hover:bg-[#088a42] text-white text-[18px] md:text-[20px] px-12 h-[54px] md:h-[60px] rounded-md transition-all cursor-pointer font-bold">
          <Link href="#contact-us">Contact Us</Link>
        </Button>

      </div>
    </section>
  );
}