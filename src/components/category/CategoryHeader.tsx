"use client";

import React from "react";

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
  return (
    <section className="relative bg-[#0f172a] text-white py-16 md:py-24 overflow-hidden">
      {bannerImage && (
        <img
          src={bannerImage}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {headerSubtitle && (
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-sm">
              {headerSubtitle}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {headerTitle || name}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}