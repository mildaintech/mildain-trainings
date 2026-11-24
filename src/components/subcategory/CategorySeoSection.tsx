"use client";

import React from "react";
import { Globe, X } from "lucide-react";

interface CategorySeoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function CategorySeoSection({ formData, setFormData }: CategorySeoProps) {
  const handleOgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;

    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.url) {
        setFormData((prev: any) => ({ ...prev, ogImage: data.url }));
      }
    } catch {}
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Globe size={18} className="text-gray-800" />
        <h2 className="text-[15px] font-bold text-gray-900">SEO &amp; Social Sharing</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Title</label>
          <input
            type="text"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            placeholder="Enter SEO meta title"
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Focus Keyword</label>
          <input
            type="text"
            value={formData.focusKeyword}
            onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
            placeholder="e.g. Cybersecurity Certification Courses"
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Description</label>
        <textarea
          rows={3}
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          placeholder="Enter SEO meta description"
          className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">OG Image Alt Text</label>
          <input
            type="text"
            value={formData.ogImageAlt}
            onChange={(e) => setFormData({ ...formData, ogImageAlt: e.target.value })}
            placeholder="Enter OG image alt text"
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">OG Image Title</label>
          <input
            type="text"
            value={formData.ogImageTitle}
            onChange={(e) => setFormData({ ...formData, ogImageTitle: e.target.value })}
            placeholder="Enter OG image title"
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">OG Image (Max 2MB)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleOgImageUpload}
          className="block w-full text-[13px] text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[12px] file:font-bold file:bg-gray-900 file:text-white hover:file:bg-black"
        />
        {formData.ogImage && (
          <div className="mt-3 relative inline-block">
            <img src={formData.ogImage} alt={formData.ogImageAlt || "OG Preview"} className="h-24 rounded-sm border object-cover" />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, ogImage: "" })}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Page Schema (JSON-LD)</label>
        <textarea
          rows={5}
          value={formData.schemaData}
          onChange={(e) => setFormData({ ...formData, schemaData: e.target.value })}
          placeholder='{"@context": "https://schema.org", "@type": "CollectionPage", ...}'
          className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] font-mono focus:ring-1 focus:ring-gray-900"
        />
      </div>
    </div>
  );
}