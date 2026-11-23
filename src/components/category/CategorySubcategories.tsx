"use client";

import React from "react";
import Link from "next/link";

export interface SubcategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  bannerImage?: string;
  logoImage?: string;
  image?: string;
}

interface CategorySubcategoriesProps {
  categoryName: string;
  categorySlug: string;
  subcategories: SubcategoryItem[];
}

export default function CategorySubcategories({
  categoryName,
  categorySlug,
  subcategories,
}: CategorySubcategoriesProps) {
  return (
    <section className="w-full bg-secondary/5 py-14 md:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="mb-10 md:mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-3">
              Explore <span className="text-primary">{categoryName}</span> Programs
            </h2>
            <p className="mb-0 max-w-[640px]">
              Choose from our specialized certification tracks under {categoryName}
            </p>
          </div>

          {subcategories.length > 0 && (
            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {subcategories.length} {subcategories.length === 1 ? "Program" : "Programs"}
            </span>
          )}
        </div>

        {subcategories.length === 0 ? (
          <div className="rounded-sm border border-border bg-card p-10 text-center text-muted-foreground shadow-sm">
            No subcategories available under this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((sub) => (
              <div
                key={sub._id}
                className="bg-card rounded-sm shadow-sm border border-border flex flex-col overflow-visible transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30 w-full"
              >
                <div className="relative w-full h-40 p-1 sm:h-44 rounded-sm bg-muted/30">
                  {sub.bannerImage ? (
                    <img
                      src={sub.bannerImage}
                      alt={sub.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 sm:h-44 object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full h-40 sm:h-44 bg-muted rounded-sm"></div>
                  )}

                  <div className="absolute -bottom-6 left-6 h-[52px] min-w-[76px] max-w-[85%] w-fit bg-card rounded-sm shadow-md border border-border flex items-center justify-center px-1 py-1 z-10">
                    {sub.logoImage || sub.image ? (
                      <img
                        src={sub.logoImage || sub.image}
                        alt={sub.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[11px] font-bold text-foreground text-center uppercase px-2">
                        {categoryName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-10 px-6 pb-6 flex flex-col flex-1 bg-card rounded-b-lg">
                  <h4 className="text-[18px] sm:text-[20px] font-bold leading-snug line-clamp-2 min-h-[52px] mb-3">
                    {sub.name}
                  </h4>

                  {sub.description && (
                    <p className="text-[13px] sm:text-[14px] text-muted-foreground line-clamp-2 mb-4">
                      {sub.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      href={`/${categorySlug}/${sub.slug}`}
                      className="block w-full py-2.5 bg-btn-gradient text-primary-foreground text-center rounded-[4px] font-semibold text-[15px] hover:opacity-95 shadow-sm shadow-primary/20 transition-all"
                    >
                      View Program
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}