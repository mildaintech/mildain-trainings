// import ExplorePrograms from "@/components/courses/ExplorePrograms";
// import PartnerLogos from "@/components/home/PartnerLogos";
// import ExploreSection from '@/components/home/ExploreSection';
// import AlumniVideoSection from '@/components/home/AlumniVideoSection';
// import StickyBottomBar from '@/components/shared/StickyBottomBar';
// import EnterpriseLogos from '@/components/shared/EnterpriseLogos';
// import { ScrollButton } from '@/components/layout/ScrollButton';
// import CoursesHeader from "@/components/courses/CoursesHeader";
// import WhyChooseMildain from "@/components/shared/WhyChooseMildain";
// import CoursesFAQ from "@/components/courses/CoursesFAQ";

// export default function CoursesPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <CoursesHeader />
//       <ExplorePrograms />
//       <PartnerLogos />
//       <WhyChooseMildain />
//       <ExploreSection />
//       <EnterpriseLogos />
//       <AlumniVideoSection />
//       <CoursesFAQ />
//       <StickyBottomBar />
//       <ScrollButton />
//     </div>
//   );
// }


import { Metadata } from 'next';
import { getDynamicSeoMetadata, getPageSchemaData } from '@/lib/seo';
import ExplorePrograms from "@/components/courses/ExplorePrograms";
import PartnerLogos from "@/components/home/PartnerLogos";
import ExploreSection from '@/components/home/ExploreSection';
import AlumniVideoSection from '@/components/home/AlumniVideoSection';
import StickyBottomBar from '@/components/shared/StickyBottomBar';
import EnterpriseLogos from '@/components/shared/EnterpriseLogos';
import { ScrollButton } from '@/components/layout/ScrollButton';
import CoursesHeader from "@/components/courses/CoursesHeader";
import WhyChooseMildain from "@/components/shared/WhyChooseMildain";
import CoursesFAQ from "@/components/courses/CoursesFAQ";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeoMetadata('/courses');
}

export default async function CoursesPage() {
  const schemaData = await getPageSchemaData('/courses');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      )}
      <CoursesHeader />
      <ExplorePrograms />
      <PartnerLogos />
      <WhyChooseMildain />
      <ExploreSection />
      <EnterpriseLogos />
      <AlumniVideoSection />
      <CoursesFAQ />
      <StickyBottomBar />
      <ScrollButton />
    </div>
  );
}