'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BrainCircuit,
  ShieldCheck,
  CloudCog,
  ShieldPlus,
  Users,
  Database,
  ServerCog,
  Cpu,
  RadioTower,
  ArrowUpRight,
} from 'lucide-react';

const categories = [
  { id: 1, name: "Artificial Intelligence", slug: "ai", icon: BrainCircuit },
  { id: 2, name: "Cyber Security", slug: "cyber-security", icon: ShieldCheck },
  { id: 3, name: "Cloud Computing", slug: "cloud-computing", icon: CloudCog },
  { id: 4, name: "Guidewire", slug: "guidewire", icon: ShieldPlus },
  { id: 5, name: "Salesforce", slug: "salesforce", icon: Users },
  { id: 6, name: "Oracle", slug: "oracle", icon: Database },
  { id: 7, name: "IBM", slug: "ibm", icon: ServerCog },
  { id: 8, name: "Technology", slug: "technology", icon: Cpu },
  { id: 9, name: "Telecom", slug: "telecom", icon: RadioTower },
];

export default function CorporateCategories() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="explore-skillup" className="py-8 md:py-16 bg-background overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-0">
            Explore Your <span className="text-primary">Career Path</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-10 gap-4 md:gap-5 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = category.id === activeId;
            const isLonelyLast = categories.length % 2 === 1 && index === categories.length - 1;

            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border p-5 md:p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-2 ${
                  isLonelyLast ? 'col-span-2 sm:col-span-1' : ''
                } ${index === 5 ? 'lg:col-start-2' : ''} ${
                  isActive
                    ? 'bg-btn-gradient border-primary text-primary-foreground shadow-md'
                    : 'bg-card border-border text-foreground hover:border-primary/50'
                }`}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"></span>

                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                  className={`absolute right-3 top-3 z-10 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 ${
                    isActive ? 'text-primary-foreground' : 'text-primary'
                  }`}
                />

                <span
                  className={`relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${
                    isActive ? 'bg-white/15 text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Icon size={28} strokeWidth={1.7} />
                </span>

                <span
                  className={`relative z-10 text-[14px] md:text-[15px] font-bold leading-snug ${
                    isActive ? 'text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}