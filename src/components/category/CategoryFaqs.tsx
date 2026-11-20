"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface CategoryFaqsProps {
  faqs?: FaqItem[];
}

export default function CategoryFaqs({ faqs }: CategoryFaqsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="bg-white border-t border-gray-200 py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-600 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed bg-white border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}