
// import HeroSection from '@/components/home/HeroSection';
// import PartnerLogos from '@/components/home/PartnerLogos';
// import CommitmentSection from '@/components/home/CommitmentSection';
// import ProgramsStandOut from '@/components/home/ProgramsStandOut';
// import ExploreSection from '@/components/home/ExploreSection';
// import SkillupSection from '@/components/home/SkillupSection';
// import AlumniVideoSection from '@/components/home/AlumniVideoSection';
// // import InsightsCarousel from '@/components/home/InsightsCarousel';
// import StickyBottomBar from '@/components/shared/StickyBottomBar';
// import TrustSection from '@/components/shared/TrustSection';
// import ExplorePrograms from '@/components/courses/ExplorePrograms';
// import EnterpriseLogos from '@/components/shared/EnterpriseLogos';
// import { ScrollButton } from '@/components/layout/ScrollButton';

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <HeroSection />
//       <PartnerLogos />
//       <ExplorePrograms />
//       <TrustSection />
//       <CommitmentSection />
//       <ProgramsStandOut />
//       <ExploreSection />
//       <SkillupSection />
//       <EnterpriseLogos />
//       <AlumniVideoSection />
//       {/* <InsightsCarousel /> */}
//       <StickyBottomBar />
//       <ScrollButton />
//     </div>
//   );
// }


import { Metadata } from 'next';
import { getDynamicSeoMetadata, getPageSchemaData } from '@/lib/seo';
import HeroSection from '@/components/home/HeroSection';
import PartnerLogos from '@/components/home/PartnerLogos';
import CommitmentSection from '@/components/home/CommitmentSection';
import ProgramsStandOut from '@/components/home/ProgramsStandOut';
import ExploreSection from '@/components/home/ExploreSection';
import SkillupSection from '@/components/home/SkillupSection';
import AlumniVideoSection from '@/components/home/AlumniVideoSection';
import StickyBottomBar from '@/components/shared/StickyBottomBar';
import TrustSection from '@/components/shared/TrustSection';
import ExplorePrograms from '@/components/courses/ExplorePrograms';
import EnterpriseLogos from '@/components/shared/EnterpriseLogos';
import { ScrollButton } from '@/components/layout/ScrollButton';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeoMetadata('/', {
    title: 'Mildain Trainings: Career-Focused AI & IT Courses',
    description: 'Upgrade your skills with career-focused AI, IT and corporate courses. Access expert trainers, hands-on projects and flexible training programs.',
  });
}

export default async function Home() {
  const schemaData = await getPageSchemaData('/');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      )}
      <HeroSection />
      <PartnerLogos />
      <ExplorePrograms />
      <TrustSection />
      <CommitmentSection />
      <ProgramsStandOut />
      <ExploreSection />
      <SkillupSection />
      <EnterpriseLogos />
      <AlumniVideoSection />
      <StickyBottomBar />
      <ScrollButton />
    </div>
  );
}