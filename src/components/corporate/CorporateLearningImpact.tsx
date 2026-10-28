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
    <section className="py-8 md:py-16 bg-background overflow-hidden border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
        
        <h2 className="mb-4">
          What Learning Delivers for<br />Your Organization
        </h2>
        
        <p className="mb-16 md:mb-20 max-w-2xl mx-auto">
          Proven outcomes across global teams, roles, and industries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-24 lg:gap-32 max-w-[1100px] mx-auto mb-16 md:mb-20">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex flex-col items-center justify-center">
                <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] bg-primary/10 rounded-xl flex items-center justify-center mb-5 md:mb-6 border border-primary/20">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-[32px] md:text-[40px] lg:text-[44px] font-bold text-foreground mb-2 leading-none">
                  {stat.percentage}
                </h3>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] text-muted-foreground font-medium text-center mb-0">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <Button asChild className="relative overflow-hidden group bg-btn-gradient text-primary-foreground text-[18px] md:text-[20px] px-12 h-[54px] md:h-[60px] rounded-md transition-all cursor-pointer font-bold shadow-md">
          <Link href="#contact-us" className="relative z-10">
            Contact Us
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
          </Link>
        </Button>

      </div>
    </section>
  );
}