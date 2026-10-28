"use client";

import React from "react";
import { X, Image as ImageIcon } from "lucide-react";

export default function SubcategoryBasicInfoTab({ formData, setFormData, handleImageUpload }: { formData: any, setFormData: any, handleImageUpload: (e: any) => void }) {
  
  const handleNameSlug = (name: string) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
  });

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-6">
      <h2 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Subcategory Name *</label>
          <input 
            type="text" 
            required 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, ...handleNameSlug(e.target.value) })} 
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900" 
          />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">URL Slug *</label>
          <input 
            type="text" 
            required 
            value={formData.slug} 
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
            className="w-full px-3 py-2 border bg-gray-50 rounded-sm outline-none text-[13px]" 
          />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description</label>
        <textarea 
          rows={3} 
          value={formData.description} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] resize-none focus:ring-1 focus:ring-gray-900"
        ></textarea>
      </div>
      <div>
        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Logo Image (Max 1MB)</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center justify-center px-4 py-2 border cursor-pointer hover:bg-gray-50 text-[13px] font-medium">
            <ImageIcon size={16} className="mr-2" /> Upload Logo
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          {formData.logoImage && (
            <span className="flex items-center text-[13px] text-green-600 font-medium">
              <ImageIcon size={16} className="mr-1" /> Selected
              <button type="button" onClick={() => setFormData({ ...formData, logoImage: "" })} className="ml-3 text-red-500 hover:text-red-700">
                <X size={14} />
              </button>
            </span>
          )}
        </div>
        {formData.logoImage && (
          <div className="mt-3 w-16 h-16 border rounded-sm p-1">
            <img src={formData.logoImage} className="w-full h-full object-contain" alt="Logo preview" />
          </div>
        )}
      </div>
    </div>
  );
}