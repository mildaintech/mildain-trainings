
import HeroSection from '@/components/home/HeroSection';
import PartnerLogos from '@/components/home/PartnerLogos';
import CommitmentSection from '@/components/home/CommitmentSection';
import ProgramsStandOut from '@/components/home/ProgramsStandOut';
import ExploreSection from '@/components/home/ExploreSection';
import SkillupSection from '@/components/home/SkillupSection';
import AlumniVideoSection from '@/components/home/AlumniVideoSection';
import InsightsCarousel from '@/components/home/InsightsCarousel';
import StickyBottomBar from '@/components/shared/StickyBottomBar';
import TrustSection from '@/components/shared/TrustSection';
import ExplorePrograms from '@/components/courses/ExplorePrograms';
import EnterpriseLogos from '@/components/shared/EnterpriseLogos';
import { ScrollButton } from '@/components/layout/ScrollButton';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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
      <InsightsCarousel />
      <StickyBottomBar />
      <ScrollButton />
    </div>
  );
}
