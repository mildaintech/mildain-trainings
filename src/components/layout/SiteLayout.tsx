
'use client';

import { usePathname } from 'next/navigation';
import PromoBanner from '@/components/layout/PromoBanner';
import SnowEffect from '@/components/SnowEffect';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const excludedRoutes = ['/admin', '/student', '/login', '/register','/checkout'];
  const isExcluded = excludedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

  if (isExcluded) return <>{children}</>;

  return (
    <>
      <SnowEffect />
      <div data-promo-banner className="sticky top-0 z-[200] w-full">
        <PromoBanner />
      </div>
      <Navbar />
      <main className="relative z-10 w-full bg-white m-0 p-0">{children}</main>
      <Footer />
    </>
  );
}
