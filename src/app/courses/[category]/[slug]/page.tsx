import React from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import { getDynamicSeoMetadata, getPageSchemaData } from '@/lib/seo';
import { generateCourseProductSchema } from '@/lib/schema';
import PMPHeroSection from "@/components/courses/PMPHeroSection";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer";
import CourseStickyNav from '@/components/courses/CourseStickyNav';
import CourseOverview from '@/components/courses/CourseOverview';
import CourseCurriculum from '@/components/courses/CourseCurriculum';
import CourseTrainingOptions from '@/components/courses/CourseTrainingOptions';
import CourseExamDetails from '@/components/courses/CourseExamDetails';
// import CoursePathSalaries from '@/components/courses/CoursePathSalaries';
import CoursePathSalaries from '@/components/courses/CoursePathSalaries';
import CourseFAQ from '@/components/courses/CourseFAQ';
import InsightsCarousel from '@/components/home/InsightsCarousel';
import CourseBenefits from '@/components/courses/CourseBenefits';
import CourseAdvisor from '@/components/courses/CourseAdvisor';
import CourseReviews from '@/components/courses/CourseReviews';
import CourseTools from '@/components/courses/CourseTools';
import RelatedPrograms from '@/components/courses/RelatedPrograms';
import CourseCareerSupport from '@/components/courses/CourseCareerSupport';
import { ScrollButton } from '@/components/layout/ScrollButton';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}): Promise<Metadata> {
  const { category, slug } = await params;
  const decodedCategory = decodeURIComponent(category);
  const decodedSlug = decodeURIComponent(slug);
  const currentPath = `/courses/${decodedCategory}/${decodedSlug}`;
  
  await connectToDatabase();
  const course = await Course.findOne({ slug: decodedSlug }).lean() as any;

  const isBase64Banner = course?.bannerImage && course.bannerImage.startsWith('data:image');

  return getDynamicSeoMetadata(currentPath, {
    title: course?.metaTitle || course?.title || 'Mildain Trainings',
    description: course?.metaDescription || '',
    openGraph: {
      images: (!isBase64Banner && course?.bannerImage) ? [course.bannerImage] : [],
    }
  });
}

export default async function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}) {
  const { category, slug } = await params;
  const decodedCategory = decodeURIComponent(category);
  const decodedSlug = decodeURIComponent(slug);
  const currentPath = `/courses/${decodedCategory}/${decodedSlug}`;

  const cookieStore = await cookies();
  const regionCookie = cookieStore.get('userRegion');
  const userRegion = regionCookie?.value === 'IN' ? 'IN' : 'US';

  await connectToDatabase();
  
  const course = await Course.findOne({ slug: decodedSlug }).lean() as any;

  if (!course) {
    return notFound();
  }

  const plainCourse = JSON.parse(JSON.stringify(course));

  const isIndia = userRegion === 'IN';
  const amount = isIndia ? (plainCourse.inrPrice || 0) : (plainCourse.usdPrice || 0);
  const symbol = isIndia ? '₹' : '$';

  const priceDetails = {
    symbol,
    amount,
    formatted: `${symbol}${amount}`
  };

  const adminSchemaData = await getPageSchemaData(currentPath);
  const courseProductSchema = generateCourseProductSchema(plainCourse, currentPath, isIndia);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      
      {courseProductSchema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: courseProductSchema }} 
        />
      )}

      {adminSchemaData && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: adminSchemaData }} 
        />
      )}
      
      <div className="flex-grow bg-gradient-to-r from-[#ebf7f3] to-white pt-[64px] lg:pt-[76px]">
        <PMPHeroSection course={plainCourse} formattedCategory={plainCourse.category} />
        <CourseStickyNav />
        <CourseOverview course={plainCourse} /> 
        <CourseCurriculum course={plainCourse} />
        <CourseTrainingOptions course={plainCourse} priceDetails={priceDetails} />
        <CourseExamDetails course={plainCourse} />
        <CourseBenefits course={plainCourse} isIndia={isIndia} />
        <CourseAdvisor course={plainCourse} />
        <CourseReviews course={plainCourse} />
        <CourseTools course={plainCourse} />
        <CoursePathSalaries course={plainCourse} isIndia={isIndia} />
        <CourseCareerSupport course={plainCourse}  />
        <RelatedPrograms category={plainCourse.category} currentSlug={plainCourse.slug} isIndia={isIndia} />
        <CourseFAQ course={plainCourse} />
        <InsightsCarousel />
        <ScrollButton />
      </div>
      <Footer />
    </div>
  );
}