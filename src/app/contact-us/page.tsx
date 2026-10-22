import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import OurClients from '@/components/contact/OurClients';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-white">
      <Navbar />
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
      <Footer />
    </main>
  );
}