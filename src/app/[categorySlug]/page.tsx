import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import CategoryPageClient from "@/components/category/CategoryPageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;

  await connectToDatabase();
  const category = (await Category.findOne({ slug: categorySlug }).lean()) as any;

  if (!category) {
    return {};
  }

  const title = category.metaTitle || category.headerTitle || category.name;
  const description = category.metaDescription || category.description || "";
  const isBase64Og = category.ogImage && category.ogImage.startsWith("data:image");
  const isBase64Banner = category.bannerImage && category.bannerImage.startsWith("data:image");
  const ogImageUrl = !isBase64Og && category.ogImage
    ? category.ogImage
    : !isBase64Banner && category.bannerImage
      ? category.bannerImage
      : "";

  return {
    title,
    description,
    keywords: category.focusKeyword ? [category.focusKeyword] : [],
    alternates: {
      canonical: `/${categorySlug}`,
    },
    openGraph: {
      title: category.ogImageTitle || title,
      description,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              alt: category.ogImageAlt || title,
            },
          ]
        : [],
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

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

  return (
    <>
      {category.schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: category.schemaData }}
        />
      )}
      <CategoryPageClient category={category} subcategories={subcategories} />
    </>
  );
}