import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-[#F5FBF8] min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-grow pt-[100px] lg:pt-[120px] pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-in fade-in duration-500 slide-in-from-bottom-4">
          {children}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}