import CourseDetailPage, {
  generateMetadata as courseGenerateMetadata,
} from "@/app/courses/[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; slug: string }>;
}) {
  return courseGenerateMetadata({ params });
}

export default async function CategoryCoursePage({
  params,
}: {
  params: Promise<{ categorySlug: string; slug: string }>;
}) {
  return <CourseDetailPage params={params} />;
}