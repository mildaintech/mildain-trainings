'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { name: "Artificial Intelligence", slug: "ai" },
  { name: "Cyber Security", slug: "cyber-security" },
  { name: "Cloud Computing", slug: "cloud-computing" },
  { name: "Guidewire", slug: "guidewire" },
  { name: "Salesforce", slug: "salesforce" },
  { name: "Oracle", slug: "oracle" },
  { name: "IBM", slug: "ibm" },
  { name: "Technology", slug: "technology" },
  { name: "Telecom", slug: "telecom" }
];

const roles = [
  {
    id: 1,
    title: "Joana Sampson",
    subtitle: "10+ Years in Cybersecurity GRC | CISM | CISSP | CRISC Certified",
    description: "“Technological skills will open doors for growth, but constant learning can create better career pathways.”",
    image: "/images/studetnt-reviews/Joana-Sampson.webp"
  },
  {
    id: 2,
    title: "Lavina Mathews",
    subtitle: "Professional Trainer",
    description: "“FDE certification transforms you into a calm, capable professional bridging the gap between complex human problems and reliable technical solutions.”",
    image: "/images/studetnt-reviews/Lavina-Mathews.webp"
  },
  {
    id: 3,
    title: "Vibha Chudhary",
    subtitle: "20 Years in Enterprise Information Systems and Risk Auditing",
    description: "“Technical skills open doors, but a risk-focused mindset drives security. Go beyond memorizing CISA—become a trusted enterprise advisor.”",
    image: "/images/studetnt-reviews/Vibha-Chudhary.webp"
  }
];

const onDark = { color: '#ffffff' };
const onDarkSoft = { color: 'rgba(255,255,255,0.9)' };
const onDarkAccent = { color: '#8fd4c8' };

const gridPattern: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: 'radial-gradient(ellipse at 30% 40%, black 15%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse at 30% 40%, black 15%, transparent 75%)',
};

export default function ExploreSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? roles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
  };

  const current = roles[currentIndex];

  const controls = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous instructor"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next instructor"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {roles.map((role, index) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show instructor ${index + 1}`}
            aria-current={index === currentIndex}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-foreground/20 hover:bg-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-16 bg-secondary/5 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        <div>
          <div className="mb-8 flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="mb-0 text-center md:text-left">
              Explore by <span className="text-primary">Categories</span>
            </h2>

            <Link
              href="/courses"
              className="group flex items-center whitespace-nowrap text-[15px] font-bold text-primary transition-colors hover:text-primary/80 md:text-[16px]"
            >
              View All Categories
              <ChevronRight
                size={18}
                strokeWidth={2.5}
                className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group relative inline-flex items-center overflow-hidden whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-[14px] font-medium text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md md:px-6 md:text-[15px]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-btn-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-12 h-px w-full bg-border md:my-14" />

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">

          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-span-4">
            <span className="mb-5 block h-1 w-12 rounded-full bg-btn-gradient" />
            <h3 className="mb-3 md:mb-4">Skilled Instructor</h3>
            <p className="mx-auto mb-0 max-w-md text-lg md:mx-0 lg:text-xl">
              Build real-world skills with Mildain’s top industry mentors, bringing decades-long expertise.
            </p>

            <div className="mt-8 hidden items-center gap-4 lg:flex">
              {controls}
              <span className="text-sm font-semibold tracking-wider text-foreground/50">
                {String(currentIndex + 1).padStart(2, '0')} / {String(roles.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="relative flex w-full flex-col lg:col-span-8">
            <div className="relative min-h-[470px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f2623] shadow-xl sm:min-h-[340px]">
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#0f2623] via-[#183631] to-[#2e6157]" />
              <div aria-hidden className="absolute inset-0 opacity-[0.1]" style={gridPattern} />
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2e7373]/30 blur-[90px]" />
              <div aria-hidden className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-[#8fd4c8]/10 blur-[100px]" />
              <Quote
                aria-hidden
                size={150}
                strokeWidth={1.2}
                className="absolute right-6 top-6 text-white/5"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 z-10 flex flex-col items-center sm:flex-row"
                >
                  <div className="relative order-2 mt-auto flex h-[220px] w-full shrink-0 items-end justify-center pt-4 sm:order-1 sm:mt-0 sm:h-full sm:w-[300px] sm:pt-0">
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-1/2 h-[230px] w-[230px] -translate-x-1/2 rounded-full bg-gradient-to-t from-white/15 to-transparent sm:h-[280px] sm:w-[280px]"
                    />
                    <Image
                      src={current.image}
                      alt={current.title}
                      width={320}
                      height={260}
                      className="relative z-10 h-full w-auto max-w-[85%] object-contain object-bottom sm:h-[95%] sm:max-w-[90%]"
                    />
                  </div>

                  <div className="order-1 flex-1 p-6 pb-2 text-center sm:order-2 sm:p-8 sm:pb-8 sm:pl-4 sm:text-left lg:p-10 lg:pl-6">
                    <h3 className="mb-1 text-[22px] font-bold leading-tight md:text-[26px]" style={onDark}>
                      {current.title}
                    </h3>
                    <p className="mb-4 text-[13px] leading-snug sm:text-[14px]" style={onDarkAccent}>
                      {current.subtitle}
                    </p>
                    <span className="mx-auto mb-4 block h-px w-12 bg-white/25 sm:mx-0" />
                    <p className="mb-0 text-[16px] font-medium leading-relaxed md:text-[18px]" style={onDarkSoft}>
                      {current.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">{controls}</div>
          </div>
        </div>

      </div>
    </section>
  );
}