import React from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Metadata } from 'next';
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import { generateCourseProductSchema } from '@/lib/schema';
import PMPHeroSection from "@/components/courses/PMPHeroSection";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer";
import CourseStickyNav from '@/components/courses/CourseStickyNav';
import CourseOverview from '@/components/courses/CourseOverview';
import CourseCurriculum from '@/components/courses/CourseCurriculum';
import CourseTrainingOptions from '@/components/courses/CourseTrainingOptions';
import CourseExamDetails from '@/components/courses/CourseExamDetails';
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();
  const currentPath = `/courses/${decodedSlug}`;
  const absoluteCanonical = `${baseUrl}${currentPath}`;
  
  await connectToDatabase();
  
  const course = await Course.findOne({ 
    $or: [
      { slug: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } },
      { urlSlug: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } }
    ]
  }).lean() as any;

  if (!course) {
    return { title: 'Course Not Found' };
  }

  const keywordArray = course.focusKeyword 
    ? course.focusKeyword.split(',').map((k: string) => k.trim()) 
    : [];

  const finalOgImage = course.ogImage || course.bannerImage;

  return {
    title: course.metaTitle || course.title || 'Mildain Trainings',
    description: course.metaDescription || '',
    keywords: keywordArray,
    alternates: {
      canonical: absoluteCanonical
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: course.metaTitle || course.title,
      description: course.metaDescription || '',
      url: absoluteCanonical,
      images: finalOgImage ? [
        {
          url: finalOgImage,
          alt: course.ogImageAlt || course.title || 'Mildain Trainings Course',
        }
      ] : [],
    }
  };
}

export default async function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();
  const currentPath = `/courses/${decodedSlug}`;

  const cookieStore = await cookies();
  const regionCookie = cookieStore.get('userRegion');
  const userRegion = regionCookie?.value === 'IN' ? 'IN' : 'US';

  await connectToDatabase();
  
  const course = await Course.findOne({ 
    $or: [
      { slug: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } },
      { urlSlug: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } }
    ]
  }).lean() as any;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full border border-red-100">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Course Not Found</h1>
          <p className="text-gray-700">Database could not find any course matching the exact slug:</p>
          <p className="font-mono bg-gray-100 p-2 rounded mt-3 text-lg font-bold">"{decodedSlug}"</p>
        </div>
      </div>
    );
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

  let customSchema = plainCourse.schemaData || "";
  if (customSchema) {
    customSchema = customSchema.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
  }

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

      {customSchema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: customSchema }} 
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