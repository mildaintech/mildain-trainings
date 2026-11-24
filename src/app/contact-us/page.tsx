import React from 'react';
import { Metadata } from 'next';
import { getDynamicSeoMetadata, getPageSchemaData } from '@/lib/seo';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import OurClients from '@/components/contact/OurClients';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return await getDynamicSeoMetadata('/contact-us');
}

export default async function ContactPage() {
  const schemaData = await getPageSchemaData('/contact-us');

  return (
    <main className="w-full min-h-screen flex flex-col bg-white">
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      )}
      <ContactHero />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <div className="w-full">
        <OurClients />
      </div>
    </main>
  );
}