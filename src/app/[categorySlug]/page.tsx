import React from "react";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import CategoryPageClient from "@/components/category/CategoryPageClient";

export const dynamic = "force-dynamic";

export default async function DynamicCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  await connectToDatabase();

  const categoryDoc = await Category.findOne({ slug: categorySlug }).lean();
  if (!categoryDoc) {
    notFound();
  }

  const subcategoriesDocs = await SubCategory.find({
    parentCategory: categoryDoc._id,
  })
    .sort({ createdAt: -1 })
    .lean();

  const category = JSON.parse(JSON.stringify(categoryDoc));
  const subcategories = JSON.parse(JSON.stringify(subcategoriesDocs));

  return <CategoryPageClient category={category} subcategories={subcategories} />;
}