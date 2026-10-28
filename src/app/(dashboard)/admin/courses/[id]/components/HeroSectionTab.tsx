"use client";

import React, { useState } from "react";
import { X, Upload, AlertCircle } from "lucide-react";

export default function HeroSectionTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setError("Image size must be less than 1MB");
        return;
      }
      
      setError(""); // Clear error if size is valid
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: string) => {
    setFormData({ ...formData, [field]: "" });
    setError(""); // Clear error when removing
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-6">
      
      {/* Global Error Display for Image Uploads */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
          <button onClick={() => setError("")} className="ml-auto"><X size={14}/></button>
        </div>
      )}

      <div className="border-b border-gray-100 pb-6 mb-6">

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Title</label>
            <input 
              type="text" 
              value={formData.metaTitle || ""}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Description</label>
            <textarea 
              rows={3}
              value={formData.metaDescription || ""}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px] resize-none"
            />
          </div>
        </div> */}
      </div>

      <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
        Hero Section Settings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Main Hero Title (H1)</label>
          <input 
            type="text" 
            value={formData.heroTitle || ""}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Hero Subtitle</label>
          <input 
            type="text" 
            value={formData.heroSubtitle || ""}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Bullet Points</label>
          <div className="space-y-3">
            {(formData.heroSubtitleLines || []).map((bullet: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => {
                    const newBullets = [...(formData.heroSubtitleLines || [])];
                    newBullets[index] = e.target.value;
                    setFormData({ ...formData, heroSubtitleLines: newBullets });
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newBullets = [...(formData.heroSubtitleLines || [])];
                    newBullets.splice(index, 1);
                    setFormData({ ...formData, heroSubtitleLines: newBullets });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({ 
                ...formData, 
                heroSubtitleLines: [...(formData.heroSubtitleLines || []), ""] 
              })}
              className="text-[12px] font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-sm transition-colors"
            >
              + Add Bullet Point
            </button>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-5 mt-2">
          <label className="block text-[13px] font-bold text-gray-700 mb-3">Action Buttons</label>
          <div className="space-y-4">
            {(formData.heroButtons || []).map((btn: any, index: number) => (
              <div key={index} className="flex flex-wrap md:flex-nowrap items-center gap-3 bg-gray-50 p-3 rounded-sm border border-gray-200">
                <input
                  type="text"
                  placeholder="Button Label"
                  value={btn.label || ""}
                  onChange={(e) => {
                    const newBtns = [...(formData.heroButtons || [])];
                    newBtns[index].label = e.target.value;
                    setFormData({ ...formData, heroButtons: newBtns });
                  }}
                  className="w-full md:w-1/3 px-3 py-2 text-[13px] border border-gray-300 rounded-sm"
                />
                <input
                  type="text"
                  placeholder="Button URL"
                  value={btn.url || ""}
                  onChange={(e) => {
                    const newBtns = [...(formData.heroButtons || [])];
                    newBtns[index].url = e.target.value;
                    setFormData({ ...formData, heroButtons: newBtns });
                  }}
                  className="w-full md:w-1/3 px-3 py-2 text-[13px] border border-gray-300 rounded-sm"
                />
                <select
                  value={btn.style || "primary"}
                  onChange={(e) => {
                    const newBtns = [...(formData.heroButtons || [])];
                    newBtns[index].style = e.target.value;
                    setFormData({ ...formData, heroButtons: newBtns });
                  }}
                  className="w-full md:w-1/4 px-3 py-2 text-[13px] border border-gray-300 rounded-sm bg-white"
                >
                  <option value="primary">Primary</option>
                  <option value="outline">Outline</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const newBtns = [...(formData.heroButtons || [])];
                    newBtns.splice(index, 1);
                    setFormData({ ...formData, heroButtons: newBtns });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-sm"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                heroButtons: [...(formData.heroButtons || []), { label: "", url: "", style: "primary" }]
              })}
              className="text-[12px] font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-sm transition-colors"
            >
              + Add Button
            </button>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-5 mt-2">
          <h3 className="text-[13px] font-bold text-gray-700 mb-3">Quote Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Quote Text</label>
              <input
                type="text"
                value={formData.quoteText || ""}
                onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Link Text</label>
              <input
                type="text"
                value={formData.quoteLinkText || ""}
                onChange={(e) => setFormData({ ...formData, quoteLinkText: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Link URL</label>
              <input
                type="text"
                value={formData.quoteLinkUrl || ""}
                onChange={(e) => setFormData({ ...formData, quoteLinkUrl: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-5 mt-2">
          <h3 className="text-[13px] font-bold text-gray-700 mb-3">Main Hero Image Upload</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              {!formData.heroBannerImage ? (
                <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[120px]">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'heroBannerImage')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <p className="text-[11px] font-bold text-gray-600">Upload Image (Max 1MB)</p>
                </div>
              ) : (
                <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                  <img src={formData.heroBannerImage} alt="Hero Banner" className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => removeImage('heroBannerImage')}
                      className="bg-white text-red-600 py-1 px-2 rounded-sm hover:bg-red-50 text-[11px] font-bold flex items-center gap-1 shadow-sm"
                    >
                      <X size={12} /> Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2 space-y-3">
               <div>
                 <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Image Alt Text</label>
                 <input 
                   type="text" 
                   value={formData.heroBannerAlt || ""}
                   onChange={(e) => setFormData({ ...formData, heroBannerAlt: e.target.value })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                 />
               </div>
               <div>
                 <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Image Title Text</label>
                 <input 
                   type="text" 
                   value={formData.heroBannerTitle || ""}
                   onChange={(e) => setFormData({ ...formData, heroBannerTitle: e.target.value })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                 />
               </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-5 mt-2">
          <h3 className="text-[13px] font-bold text-gray-700 mb-3">Provider Logo Setup</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              {!formData.heroProviderLogo ? (
                <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[120px]">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'heroProviderLogo')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <p className="text-[11px] font-bold text-gray-600">Upload Logo (Max 1MB)</p>
                </div>
              ) : (
                <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                  <img src={formData.heroProviderLogo} alt="Provider Logo" className="w-full h-24 object-contain p-2" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => removeImage('heroProviderLogo')}
                      className="bg-white text-red-600 py-1 px-2 rounded-sm hover:bg-red-50 text-[11px] font-bold flex items-center gap-1 shadow-sm"
                    >
                      <X size={12} /> Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2 space-y-3">
               <div>
                 <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Logo Alt Text</label>
                 <input 
                   type="text" 
                   value={formData.heroProviderLogoAlt || ""}
                   onChange={(e) => setFormData({ ...formData, heroProviderLogoAlt: e.target.value })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                 />
               </div>
               <div>
                 <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Logo Title Text</label>
                 <input 
                   type="text" 
                   value={formData.heroProviderLogoTitle || ""}
                   onChange={(e) => setFormData({ ...formData, heroProviderLogoTitle: e.target.value })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                 />
               </div>
               <div>
                 <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Logo Link URL</label>
                 <input 
                   type="text" 
                   value={formData.heroProviderLogoUrl || ""}
                   onChange={(e) => setFormData({ ...formData, heroProviderLogoUrl: e.target.value })}
                   className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                 />
               </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-5 mt-2">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             <div>
               <label className="block text-[13px] font-bold text-gray-700 mb-1.5">CPE Course Credits</label>
               <input 
                 type="number" 
                 value={formData.cpeCredits || ""}
                 onChange={(e) => setFormData({ ...formData, cpeCredits: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
               />
             </div>
             <div>
               <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Trustpilot Rating</label>
               <input 
                 type="number" 
                 step="0.1"
                 value={formData.trustpilotRating || ""}
                 onChange={(e) => setFormData({ ...formData, trustpilotRating: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
               />
             </div>
             <div>
               <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Total Learners Count</label>
               <input 
                 type="number" 
                 value={formData.learnerCount || ""}
                 onChange={(e) => setFormData({ ...formData, learnerCount: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
               />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}