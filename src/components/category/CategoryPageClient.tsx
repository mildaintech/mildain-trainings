"use client";

import React from "react";
import CategoryHeader from "./CategoryHeader";
import CategorySubcategories, { SubcategoryItem } from "./CategorySubcategories";
import WhyChooseMildain from "@/components/shared/WhyChooseMildain";
import CategoryFaqs, { FaqItem } from "./CategoryFaqs";
import PartnerLogos from "../home/PartnerLogos";
import TrustSection from "../shared/TrustSection";
import EnterpriseLogos from "../shared/EnterpriseLogos";

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  headerTitle?: string;
  headerSubtitle?: string;
  description?: string;
  bannerImage?: string;
  faqs?: FaqItem[];
}

interface CategoryPageClientProps {
  category: CategoryData;
  subcategories: SubcategoryItem[];
}

export default function CategoryPageClient({
  category,
  subcategories,
}: CategoryPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader
        name={category.name}
        headerTitle={category.headerTitle}
        headerSubtitle={category.headerSubtitle}
        description={category.description}
        bannerImage={category.bannerImage}
      />
      <CategorySubcategories
        categoryName={category.name}
        categorySlug={category.slug}
        subcategories={subcategories}
      />
      <PartnerLogos />
      <TrustSection />
      <WhyChooseMildain />
      
      <EnterpriseLogos />
      <CategoryFaqs faqs={category.faqs} />
    </div>
  );
}