"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SubcategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logoImage?: string;
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Explore {categoryName} Programs
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Choose from our specialized certification tracks under {categoryName}
        </p>
      </div>

      {subcategories.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-sm p-10 text-center text-gray-500">
          No subcategories available under this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              href={`/${categorySlug}/${sub.slug}`}
              className="group bg-white border border-gray-200 rounded-sm p-6 shadow-sm hover:shadow-md hover:border-gray-900 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {sub.logoImage && (
                  <div className="h-12 flex items-center">
                    <img
                      src={sub.logoImage}
                      alt={sub.name}
                      className="max-h-12 max-w-[140px] object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {sub.name}
                </h3>
                {sub.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {sub.description}
                  </p>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-sm font-bold text-gray-900 group-hover:text-blue-700">
                View Details
                <ArrowRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}