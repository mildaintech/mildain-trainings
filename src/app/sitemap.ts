import type { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

const toSlug = (value: string) =>
  (value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mildaintrainings.com").replace(/\/+$/, "");
  const now = new Date();
  const seenUrls = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const addEntry = (
    path: string,
    lastModified: Date | string | undefined,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const fullUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
    if (seenUrls.has(fullUrl)) return;
    seenUrls.add(fullUrl);

    entries.push({
      url: fullUrl,
      lastModified: lastModified ? new Date(lastModified) : now,
      changeFrequency,
      priority,
    });
  };

  addEntry("/", now, "daily", 1.0);
  addEntry("/courses", now, "daily", 0.9);
  addEntry("/corporate-training", now, "weekly", 0.8);
  addEntry("/about-us", now, "monthly", 0.7);
  addEntry("/contact-us", now, "monthly", 0.7);
  addEntry("/privacy-policy", now, "yearly", 0.3);
  addEntry("/refund-policy", now, "yearly", 0.3);
  addEntry("/terms-and-conditions", now, "yearly", 0.3);

  try {
    await connectToDatabase();

    const [categories, courses] = await Promise.all([
      Category.find({ isActive: { $ne: false } }).lean(),
      Course.find({ isActive: { $ne: false } }).lean(),
    ]);

    const categorySlugMap = new Map<string, string>();

    for (const cat of categories as any[]) {
      const catSlug = (cat.slug || toSlug(cat.name || "")).trim();
      if (!catSlug) continue;

      if (cat._id) {
        categorySlugMap.set(cat._id.toString(), catSlug);
      }
      if (cat.name) {
        categorySlugMap.set(cat.name.trim().toLowerCase(), catSlug);
      }
      categorySlugMap.set(catSlug.toLowerCase(), catSlug);

      addEntry(`/${catSlug}`, cat.updatedAt || cat.createdAt, "weekly", 0.85);
    }

    for (const course of courses as any[]) {
      const courseSlug = (course.slug || "").trim();
      if (!courseSlug) continue;

      const rawCat =
        typeof course.category === "string"
          ? course.category.trim().toLowerCase()
          : course.category?._id?.toString() || "";

      const resolvedCategorySlug =
        categorySlugMap.get(rawCat) ||
        (typeof course.category === "string" ? toSlug(course.category) : "");

      if (resolvedCategorySlug) {
        addEntry(
          `/${resolvedCategorySlug}/${courseSlug}`,
          course.updatedAt || course.createdAt,
          "weekly",
          0.9
        );
      } else {
        addEntry(
          `/courses/${courseSlug}`,
          course.updatedAt || course.createdAt,
          "weekly",
          0.8
        );
      }
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return entries;
}