'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cloud, Landmark, ShieldAlert, Database, Fingerprint, Laptop, Settings, Terminal, Monitor, FileSearch, Network 
} from 'lucide-react';

const categories = [
  { id: 1, name: "Cyber Security", icon: ShieldCheck },
  { id: 2, name: "Cloud Security", icon: Cloud },
  { id: 3, name: "Governance, Risk &..", icon: Landmark },
  { id: 4, name: "Security Testing", icon: ShieldAlert },
  { id: 5, name: "Data Privacy", icon: Database },
  { id: 6, name: "Identity & Access..", icon: Fingerprint },
  { id: 7, name: "Product Trainings", icon: Laptop },
  { id: 8, name: "Security Operation..", icon: Settings },
  { id: 9, name: "Offensive Security", icon: Terminal },
  { id: 10, name: "Defensive Security", icon: Monitor },
  { id: 11, name: "Auditing", icon: FileSearch },
  { id: 12, name: "Network & Network..", icon: Network },
];

export default function CorporateCategories() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="py-8 md:py-16 bg-background overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-0">
            Explore Courses by <span className="text-primary">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeId;
            
            return (
              <div 
                key={category.id}
                onMouseEnter={() => setActiveId(category.id)}
                className={`relative overflow-hidden group flex flex-col items-center justify-center p-6 md:p-8 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                  isActive 
                    ? 'bg-btn-gradient border-primary text-primary-foreground shadow-md' 
                    : 'bg-card border-border text-foreground hover:border-primary/50'
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>

                <Icon 
                  className={`w-10 h-10 md:w-12 md:h-12 mb-4 transition-colors duration-300 relative z-10 ${
                    isActive ? 'text-primary-foreground' : 'text-primary'
                  }`} 
                  strokeWidth={1.5}
                />
                <span className={`text-[14px] md:text-[16px] font-bold text-center leading-tight relative z-10 ${
                  isActive ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}