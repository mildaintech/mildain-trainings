"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PaymentSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-[#F5FBF8] min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-24">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden text-center animate-in zoom-in-95 duration-500">
          
          <div className="bg-[#10b981]/10 py-10 flex justify-center border-b border-[#10b981]/20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle size={56} className="text-[#10b981]" />
            </div>
          </div>

          <div className="p-10 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Payment Successful!</h1>
              <p className="text-slate-600">
                Thank you for your purchase. Your transaction has been completed securely and a receipt with further instructions has been emailed to you.
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <Link 
                href="/"
                className="flex items-center justify-center gap-2 bg-[#047857] hover:bg-[#065f46] text-white font-bold py-3.5 px-8 rounded-lg transition-colors shadow-sm"
              >
                <Home size={18} /> Back to Home
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}