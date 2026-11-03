'use client';

import { useState } from 'react';
import { X, Tag, Copy, Check, Info } from 'lucide-react';

export default function DefaultBanner({ offer, showBanner, setIsVisible }: any) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`w-full overflow-hidden transition-all duration-1000 ease-in-out ${
        showBanner ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="relative isolate w-full min-h-[85px] lg:min-h-[68px] overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#334155] text-white shadow-md">
        
        {/* Subtle Background Effects for Default Banner */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-12 -top-16 h-36 w-44 rounded-full bg-blue-400/10 blur-[55px]" />
          <div className="absolute right-[12%] -bottom-20 h-36 w-52 rounded-full bg-emerald-400/10 blur-[55px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-300/10 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[85px] lg:min-h-[68px] max-w-[1400px] flex-col items-center justify-center gap-2 px-10 py-2 text-center lg:flex-row lg:gap-7">

          <div className="flex min-w-0 flex-col items-center gap-1 lg:items-start lg:text-left">
            <div className="flex items-center gap-1.5">
              <Tag size={12} className="text-blue-300" />
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-300">
                {offer.bannerTitle}
              </span>
              <span className="h-1 w-1 rounded-full bg-blue-300" />
              <span className="text-[9px] font-medium text-white/60">
                Special Offer
              </span>
            </div>
            <h2 className="max-w-[520px] text-[13px] font-semibold leading-snug tracking-tight text-white sm:text-[15px] lg:text-[17px]">
              {offer.bannerSubtext}
            </h2>
          </div>

          <div className="flex shrink-0 items-center justify-center gap-3 sm:gap-5">
            <div className="hidden h-8 w-px bg-white/10 lg:block" />

            <div className="flex flex-col items-center leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-extrabold tracking-tight text-white lg:text-[29px]">
                  {offer.discountPercent}%
                </span>
                <span className="text-[12px] font-bold text-white/80">OFF</span>
              </div>
              <span className="mt-1 text-[9px] font-medium text-emerald-400">
                Active Now
              </span>
            </div>

            <button
              type="button"
              onClick={copyCode}
              aria-label={`Copy coupon code ${offer.code}`}
              className="group flex h-[40px] items-center gap-2.5 rounded-lg border border-blue-400/40 bg-gradient-to-r from-blue-600 to-blue-500 px-3.5 text-white shadow-[0_3px_15px_rgba(37,99,235,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(37,99,235,0.35)] active:translate-y-0 cursor-pointer"
            >
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[9px] font-semibold uppercase tracking-wide text-white/80">
                  {copied ? 'Copied!' : 'Apply Code'}
                </span>
                <span className="text-[14px] font-extrabold tracking-[0.04em] lg:text-[15px]">
                  {offer.code}
                </span>
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
                {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
              </span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close promotional banner"
          className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:right-4 lg:top-1/2 lg:-translate-y-1/2 cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}