"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, Lock, Tag, CreditCard } from "lucide-react";
import PayPalCheckout from "@/components/payment/PayPalCheckout";
import Image from "next/image";

export default function CheckoutForm({ course, isIndia }: { course: any, isIndia: boolean }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const baseAmount = isIndia ? (course.inrPrice || 0) : (course.usdPrice || 0);
  const symbol = isIndia ? '₹' : '$';
  const originalAmount = Math.ceil(baseAmount * 1.2);
  
  const discountAmount = isPromoApplied ? Math.floor(baseAmount * 0.1) : 0;
  const finalAmount = baseAmount - discountAmount;

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setStep(2);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().length > 3) {
      setIsPromoApplied(true);
    }
  };

  const handlePayUPayment = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/payu/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          courseId: course._id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }),
      });

      const html = await response.text();
      const newDoc = document.open("text/html", "replace");
      newDoc.write(html);
      newDoc.close();
    } catch (error) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex items-center shadow-sm">
        <div className="max-w-6xl mx-auto w-full">
          <Image 
            src="/images/logo/mildain training logo.png" 
            alt="Mildain Trainings Logo" 
            width={180} 
            height={45} 
            className="object-contain"
            priority
          />
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-200">
            <div className={`px-6 py-4 flex justify-between items-center transition-colors ${step === 1 ? 'bg-[#10b981] text-white' : 'bg-white text-gray-800'}`}>
              <h2 className="text-lg font-bold">1. Basic Details</h2>
              {step === 2 && <CheckCircle2 className="text-[#10b981]" size={20} />}
            </div>
            
            {step === 1 ? (
              <div className="p-8">
                <form onSubmit={handleProceed} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name<span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all text-sm" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number<span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all text-sm" 
                        placeholder="+1 1234567890" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email ID<span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all text-sm" 
                      placeholder="example@email.com" 
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="bg-[#10b981] hover:bg-[#0d9468] text-white font-bold py-3 px-12 rounded-md text-sm transition-colors shadow-sm">
                      Proceed to Payment
                    </button>
                    <p className="text-xs text-gray-500 mt-4">
                      By proceeding, you agree to our Terms of Use and Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-4 px-6 bg-white flex justify-between items-center cursor-pointer border-t border-gray-100 hover:bg-slate-50 transition-colors" onClick={() => setStep(1)}>
                <span className="text-sm font-medium text-gray-600">{formData.email}</span>
                <span className="text-xs text-[#10b981] font-bold tracking-wider">EDIT</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-200">
            <div className={`px-6 py-4 transition-colors ${step === 2 ? 'bg-[#10b981] text-white' : 'bg-white text-gray-800'}`}>
              <h2 className="text-lg font-bold">2. Secure Payment</h2>
            </div>
            {step === 2 && (
              <div className="p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4 md:border-r border-gray-100 pr-4">
                  <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Pay Now</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-800 bg-[#f0fdf4] p-3.5 border-l-4 border-[#10b981] rounded-r cursor-pointer shadow-sm">
                      {isIndia ? 'PayU' : 'PayPal'}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <p className="text-sm text-gray-700 mb-6 font-medium">You will be charged <strong className="text-lg">{symbol}{finalAmount}</strong> via {isIndia ? 'Secure Payment Gateway' : 'your PayPal account'}.</p>
                  
                  <div className="bg-white p-1 rounded-md">
                    {isIndia ? (
                      <button 
                        onClick={handlePayUPayment}
                        disabled={isProcessing}
                        className="w-full bg-[#10b981] hover:bg-[#0d9468] disabled:bg-[#10b981]/70 text-white font-bold py-3.5 px-6 rounded-md text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <CreditCard size={18} />
                        {isProcessing ? 'Connecting securely...' : `Pay ${symbol}${finalAmount} Now`}
                      </button>
                    ) : (
                      <PayPalCheckout 
                        amount={finalAmount} 
                        courseId={course._id} 
                        guestEmail={formData.email} 
                        guestName={formData.name}
                        onSuccess={() => window.location.href = `/payment-success?course=${course.slug}`} 
                      />
                    )}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                      <ShieldCheck size={18} className="text-[#10b981]"/> Safe and Secure Payment.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden sticky top-8">
            <div className="p-4 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
              <Lock size={16} className="text-gray-500" />
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Order Summary</h3>
            </div>
            
            <div className="p-6 space-y-5">
              <h4 className="font-bold text-slate-900 text-[18px] leading-snug">{course.title}</h4>
              
              <div className="pt-3 pb-5 border-b border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Program Fees</span>
                  <span className="font-bold text-gray-800">{symbol}{baseAmount}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Default Discount</span>
                  <span className="font-bold text-[#10b981]">-{symbol}{originalAmount - baseAmount}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between items-center text-sm bg-[#f0fdf4] p-2 rounded text-[#10b981] font-medium">
                    <span>Coupon Discount</span>
                    <span>-{symbol}{discountAmount}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center text-2xl font-black text-slate-900 pt-2">
                <span>Grand Total</span>
                <span>{symbol}{finalAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
              <Tag size={16} className="text-gray-500" />
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Promo Code</h3>
            </div>
            <div className="p-6">
              {!isPromoApplied ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code here" 
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#10b981] text-sm uppercase font-medium tracking-wide"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    APPLY
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-[#f0fdf4] border border-[#10b981]/30 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#10b981]" />
                    <span className="text-sm font-bold text-[#10b981]">{promoCode} APPLIED</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setIsPromoApplied(false); setPromoCode(""); }}
                    className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
                  >
                    REMOVE
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}