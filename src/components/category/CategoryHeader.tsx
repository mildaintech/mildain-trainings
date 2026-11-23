"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryHeaderProps {
  name: string;
  headerTitle?: string;
  headerSubtitle?: string;
  description?: string;
  bannerImage?: string;
}

export default function CategoryHeader({
  name,
  headerTitle,
  headerSubtitle,
  description,
  bannerImage,
}: CategoryHeaderProps) {
  const title = headerTitle || name;

  // Last two words get the gradient accent (only when the title has 3+ words)
  const words = title.trim().split(/\s+/);
  const hasAccent = words.length >= 3;
  const leadText = hasAccent ? words.slice(0, -2).join(" ") : title;
  const accentText = hasAccent ? words.slice(-2).join(" ") : "";

  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden flex items-center bg-[#0f2623]">
      {bannerImage && (
        <img
          src={bannerImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#0f2623] via-[#183631] to-[#2e6157] ${
          bannerImage ? "opacity-90" : "opacity-95"
        }`}
      />

      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)",
        }}
      />

      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#2e7373]/25 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[360px] h-[360px] rounded-full bg-[#2e6157]/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-20 py-16">
        <div className="w-full max-w-[820px] flex flex-col items-start text-left">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 mb-8">
            <Link href="/" className="text-[13px] md:text-[14px] text-white/80 font-medium hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link href="/courses" className="text-[13px] md:text-[14px] text-white/80 font-medium hover:text-white transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[13px] md:text-[14px] text-white font-semibold">{name}</span>
          </nav>

          {headerSubtitle && (
            <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#8fd4c8] mb-5">
              {headerSubtitle}
            </span>
          )}

          <h1 className="text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] font-extrabold leading-[1.12] tracking-tight mb-7 text-white">
            {leadText}
            {hasAccent && (
              <>
                {" "}
                <span className="bg-gradient-to-r from-[#a8e0d6] via-white to-[#a8e0d6] bg-clip-text text-transparent">
                  {accentText}
                </span>
              </>
            )}
          </h1>

          {description && (
            <p className="text-[16px] md:text-[18px] lg:text-[19px] text-white/80 leading-[1.75] max-w-[680px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}