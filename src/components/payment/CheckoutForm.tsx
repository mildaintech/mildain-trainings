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
    <div className="min-h-screen bg-background font-sans">
      <header className="bg-card border-b border-border py-4 px-8 flex items-center shadow-sm">
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
          
          <div className="bg-card rounded-xl shadow-sm overflow-hidden border border-border">
            <div className={`px-6 py-4 flex justify-between items-center transition-colors ${step === 1 ? 'bg-btn-gradient text-primary-foreground' : 'bg-card text-foreground border-b border-border'}`}>
              <h2 className={`text-xl font-bold mb-0 ${step === 1 ? 'text-primary-foreground' : 'text-foreground'}`}>
                1. Basic Details
              </h2>
              {step === 2 && <CheckCircle2 className="text-primary" size={20} />}
            </div>
            
            {step === 1 ? (
              <div className="p-8">
                <form onSubmit={handleProceed} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-semibold text-foreground/80 mb-2">Full Name<span className="text-destructive">*</span></label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        className="w-full border border-border bg-background rounded-md px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-lg text-foreground" 
                        placeholder="Enter your full name" 
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-foreground/80 mb-2">Phone Number<span className="text-destructive">*</span></label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone} 
                        onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        className="w-full border border-border bg-background rounded-md px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-lg text-foreground" 
                        placeholder="+1 1234567890" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-foreground/80 mb-2">Email ID<span className="text-destructive">*</span></label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      className="w-full border border-border bg-background rounded-md px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-lg text-foreground" 
                      placeholder="example@email.com" 
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="relative overflow-hidden group bg-btn-gradient text-primary-foreground font-bold py-3.5 px-12 rounded-md text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                      <span className="relative z-10">Proceed to Payment</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>
                    </button>
                    <p className="text-sm text-muted-foreground mt-4 mb-0">
                      By proceeding, you agree to our Terms of Use and Privacy Policy.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-4 px-6 bg-card flex justify-between items-center cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setStep(1)}>
                <span className="text-lg font-medium text-muted-foreground">{formData.email}</span>
                <span className="text-sm text-primary font-bold tracking-wider">EDIT</span>
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl shadow-sm overflow-hidden border border-border">
            <div className={`px-6 py-4 transition-colors ${step === 2 ? 'bg-btn-gradient text-primary-foreground' : 'bg-card text-foreground border-b border-border'}`}>
              <h2 className={`text-xl font-bold mb-0 ${step === 2 ? 'text-primary-foreground' : 'text-foreground'}`}>
                2. Secure Payment
              </h2>
            </div>
            {step === 2 && (
              <div className="p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4 md:border-r border-border pr-4">
                  <p className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">Pay Now</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-lg font-bold text-foreground bg-primary/10 p-3.5 border-l-4 border-primary rounded-r cursor-pointer shadow-sm">
                      {isIndia ? 'PayU' : 'PayPal'}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <p className="text-lg text-foreground/90 mb-6 font-medium">You will be charged <strong className="text-xl">{symbol}{finalAmount}</strong> via {isIndia ? 'Secure Payment Gateway' : 'your PayPal account'}.</p>
                  
                  <div className="bg-card p-1 rounded-md">
                    {isIndia ? (
                      <button 
                        onClick={handlePayUPayment}
                        disabled={isProcessing}
                        className="relative overflow-hidden group w-full bg-btn-gradient disabled:opacity-70 text-primary-foreground font-bold py-3.5 px-6 rounded-md text-lg transition-all shadow-md flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 disabled:hover:translate-y-0 cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <CreditCard size={18} />
                          {isProcessing ? 'Connecting securely...' : `Pay ${symbol}${finalAmount} Now`}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>
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
                  
                  <div className="mt-8 pt-6 border-t border-border flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-lg font-bold text-muted-foreground">
                      <ShieldCheck size={18} className="text-primary"/> Safe and Secure Payment.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden sticky top-8">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
              <Lock size={16} className="text-muted-foreground" />
              <h3 className="font-bold text-foreground text-lg uppercase tracking-wide mb-0">Order Summary</h3>
            </div>
            
            <div className="p-6 space-y-5">
              <h4 className="font-bold text-foreground text-[18px] leading-snug mb-0">{course.title}</h4>
              
              <div className="pt-3 pb-5 border-b border-border space-y-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-muted-foreground">Program Fees</span>
                  <span className="font-bold text-foreground">{symbol}{baseAmount}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-muted-foreground">Default Discount</span>
                  <span className="font-bold text-primary">-{symbol}{originalAmount - baseAmount}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between items-center text-lg bg-primary/10 p-2 rounded text-primary font-medium">
                    <span>Coupon Discount</span>
                    <span>-{symbol}{discountAmount}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center text-2xl font-black text-foreground pt-2">
                <span>Grand Total</span>
                <span>{symbol}{finalAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
              <Tag size={16} className="text-muted-foreground" />
              <h3 className="font-bold text-foreground text-lg uppercase tracking-wide mb-0">Promo Code</h3>
            </div>
            <div className="p-6">
              {!isPromoApplied ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code here" 
                    className="flex-1 border border-border bg-background rounded-md px-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm uppercase font-medium tracking-wide text-foreground"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-muted hover:bg-muted/80 text-foreground font-bold px-4 py-2 rounded-md text-sm transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-primary/10 border border-primary/30 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="text-lg font-bold text-primary">{promoCode} APPLIED</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setIsPromoApplied(false); setPromoCode(""); }}
                    className="text-sm font-bold text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
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