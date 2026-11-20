"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface CategoryFaqSectionProps {
  faqs: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
}

export default function CategoryFaqSection({ faqs, onChange }: CategoryFaqSectionProps) {
  const addFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    const updated = [...faqs];
    updated.splice(index, 1);
    onChange(updated);
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider">
          Category FAQs
        </h2>
        <button
          type="button"
          onClick={addFaq}
          className="bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-sm text-[12px] font-bold flex items-center gap-1.5"
        >
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      {faqs.length === 0 ? (
        <p className="text-[13px] text-gray-500">No FAQs added yet.</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-sm p-4 bg-gray-50 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-gray-700">FAQ #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="text-red-600 hover:text-red-800 p-1 rounded-sm"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Answer</label>
                <textarea
                  rows={3}
                  required
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}