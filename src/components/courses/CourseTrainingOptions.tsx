'use client';

import React, { useState } from 'react';
import { ShieldCheck, User, Mail, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import PayPalCheckout from "@/components/payment/PayPalCheckout";

interface PriceDetails {
  symbol: string;
  amount: number;
  formatted: string;
}

export default function CourseTrainingOptions({ course, priceDetails }: { course?: any, priceDetails?: PriceDetails }) {
  
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const originalAmount = priceDetails ? Math.ceil(priceDetails.amount * 1.2) : 0;
  const originalPriceFormatted = priceDetails ? `${priceDetails.symbol}${originalAmount}` : '';
  const heading = course?.trainingOptionsHeading;
  const subHeading = course?.trainingOptionsSubHeading;
  const card1Image = course?.trainingCard1Image;
  const card1ImageAlt = course?.trainingCard1ImageAlt;
  const card1ImageTitle = course?.trainingCard1ImageTitle;
  const card1Title = course?.trainingCard1Title;
  const card1Description = course?.trainingCard1Description;
  const badgeText = course?.badge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setCheckoutStep(3);
    }
  };

const handlePayPalSuccess = () => {
    window.location.href = `/payment-success?course=${course?.slug}`;
  };

  return (
    <div id="options" className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-slate-900 mb-2">
            Start Your <span className="text-[#10b981]">{heading}</span> Journey Today
          </h2>
          <p className="text-slate-600 text-[15px] md:text-[16px] font-medium">
            {subHeading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          <div className="bg-[#f0f6ff] rounded-2xl overflow-hidden border border-blue-100 flex flex-col">
            <div className="relative h-[240px] w-full overflow-hidden bg-slate-100">
              {card1Image && (
                <img 
                  src={card1Image} 
                  alt={card1ImageAlt} 
                  title={card1ImageTitle}
                  className="w-full h-full object-cover"
                />
              )}
              {badgeText && (
                <div className="absolute bottom-4 right-4 bg-[#10b981] text-white text-[12px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  {badgeText}
                </div>
              )}
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-[20px] font-bold text-slate-900 mb-2">{card1Title}</h3>
              <p className="text-slate-600 text-[14px] leading-relaxed mb-6">
                {card1Description}
              </p>
              
              <div className="bg-white rounded-xl p-5 border border-blue-50 mb-6">
                {priceDetails && (
                  <div className="text-[13px] text-slate-400 font-medium mb-1">
                    WAS <span className="line-through">{originalPriceFormatted}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[32px] font-extrabold text-slate-900">{priceDetails?.formatted || '$0'}</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-sm flex items-center gap-1">
                    <CheckCircle size={14} /> All Inclusive
                  </span>
                </div>
              </div>
              
              <div className="mt-auto">
                {checkoutStep === 1 && (
                  <button 
                    onClick={() => setCheckoutStep(2)}
                    className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-bold py-3.5 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2"
                  >
                    Enroll Instantly
                  </button>
                )}

                {checkoutStep === 2 && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
                      <button onClick={() => setCheckoutStep(1)} className="text-slate-400 hover:text-slate-700">
                        <ArrowLeft size={18} />
                      </button>
                      <h4 className="font-bold text-slate-800">Learner Details</h4>
                    </div>
                    
                    <form onSubmit={handleContinueToPayment} className="space-y-4">
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400"><User size={16} /></span>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name" 
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-[14px] outline-none focus:border-[#10b981]"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400"><Mail size={16} /></span>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address" 
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-[14px] outline-none focus:border-[#10b981]"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400"><Phone size={16} /></span>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number" 
                          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-[14px] outline-none focus:border-[#10b981]"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2.5 rounded-md transition-colors mt-2"
                      >
                        Proceed to Payment
                      </button>
                    </form>
                  </div>
                )}

                {checkoutStep === 3 && (
                  <div className="animate-in fade-in duration-300 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
                      <button onClick={() => setCheckoutStep(2)} className="text-slate-400 hover:text-slate-700">
                        <ArrowLeft size={18} />
                      </button>
                      <div>
                        <h4 className="font-bold text-slate-800">Complete Payment</h4>
                      </div>
                    </div>
                    <PayPalCheckout 
                      amount={priceDetails?.amount || 0} 
                      courseId={course?._id || ""} 
                      guestEmail={formData.email}
                      onSuccess={handlePayPalSuccess} 
                    />
                  </div>
                )}

                {checkoutStep === 1 && (
                  <div className="flex items-center justify-center gap-1.5 text-[12px] text-slate-500">
                    <ShieldCheck size={14} className="text-blue-500" />
                    <span>Secure checkout via PayPal</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#f0f6ff] rounded-2xl overflow-hidden border border-blue-100 flex flex-col">
            <div className="relative h-[240px] w-full overflow-hidden">
              <img 
                src="/images/home/hero2.png" 
                alt="Enterprise B2B Training" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-[20px] font-bold text-slate-900 mb-2">Enterprise B2B Training</h3>
              <p className="text-slate-600 text-[14px] leading-relaxed mb-6">
                Scalable upskilling frameworks structured around enterprise production schedules.
              </p>
              
              <div className="bg-[#dbeafe] rounded-xl p-5 border border-blue-200 mb-6 flex-grow">
                <h4 className="text-[20px] font-bold text-[#047857] mb-2">
                  Custom Enterprise Volume Pricing
                </h4>
                <p className="text-slate-600 text-[14px] leading-relaxed">
                  Tiered packages built precisely around workforce headcounts.
                </p>
              </div>
              
              <div className="mt-auto">
                <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 rounded-lg transition-colors mb-3">
                  Request Corporate Proposal
                </button>
                <div className="flex items-center justify-center text-[12px] text-slate-500">
                  <span>Dedicated corporate response within 2 hours</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}