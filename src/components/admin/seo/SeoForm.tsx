"use client";

import React, { useState } from "react";
import { X, Save, AlertCircle, Upload, Globe, Search } from "lucide-react";

interface SeoFormProps {
  initialData: any;
  editingId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SeoForm({ initialData, editingId, onClose, onSuccess }: SeoFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, ogImage: reader.result as string });
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, ogImage: "", ogImageAlt: "", ogImageTitle: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      const url = editingId ? `/api/admin/seo/${editingId}` : "/api/admin/seo";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };
  const displayImage = formData.ogImage || formData.defaultImage;
  const isDefaultImage = !formData.ogImage && formData.defaultImage;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-sm">
            <X size={18} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {editingId ? "Edit Page SEO" : "Configure Page SEO"}
          </h1>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={submitLoading}
          className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-sm font-bold flex items-center gap-2 text-[13px] disabled:opacity-70"
        >
          {submitLoading ? "Saving..." : <><Save size={16} /> Save SEO</>}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Page URL Path</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400"><Globe size={16} /></span>
                <input 
                  type="text" 
                  disabled
                  value={formData.pageUrl}
                  className="w-full pl-9 pr-3 py-2 bg-gray-100 border border-gray-300 rounded-sm outline-none text-[13px] text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                maxLength={60}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Focus Keyword</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400"><Search size={16} /></span>
                <input 
                  type="text" 
                  value={formData.focusKeyword}
                  onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Description <span className="text-red-500">*</span></label>
              <textarea 
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                maxLength={160}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-[13px] font-bold text-gray-700 mb-1">OG Image Setup (Social Sharing)</h3>
          <p className="text-[11px] text-gray-500 mb-4">By default, the course overview image is used. Upload a custom image here to override it.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-1">
              {!displayImage ? (
                <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[140px]">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <p className="text-[11px] font-bold text-gray-600">Upload Custom Image</p>
                </div>
              ) : (
                <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                  <img src={displayImage} alt="OG" className="w-full h-36 object-cover" />
                  
                  {isDefaultImage && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">
                      Default Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <button type="button" className="bg-white text-gray-900 py-1.5 px-3 rounded-sm hover:bg-gray-100 text-[11px] font-bold shadow-sm relative z-0">
                        Replace Image
                      </button>
                    </div>
                    
                    {!isDefaultImage && (
                      <button 
                        type="button"
                        onClick={removeImage}
                        className="bg-red-600 text-white py-1.5 px-3 rounded-sm hover:bg-red-700 text-[11px] font-bold shadow-sm"
                      >
                        Remove Custom Image
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">OG Image Alt Text (SEO)</label>
                <input 
                  type="text" 
                  disabled={isDefaultImage && !formData.ogImageAlt}
                  value={formData.ogImageAlt || ""}
                  onChange={(e) => setFormData({ ...formData, ogImageAlt: e.target.value })}
                  placeholder={isDefaultImage ? "Using Default Alt Text..." : "e.g. Students learning Data Science"}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px] disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">OG Image Title Text</label>
                <input 
                  type="text" 
                  disabled={isDefaultImage && !formData.ogImageTitle}
                  value={formData.ogImageTitle || ""}
                  onChange={(e) => setFormData({ ...formData, ogImageTitle: e.target.value })}
                  placeholder={isDefaultImage ? "Using Default Title..." : "e.g. Data Science Course Banner"}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px] disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Schema Markup (JSON-LD)</label>
          <textarea 
            rows={5}
            value={formData.schemaData}
            onChange={(e) => setFormData({ ...formData, schemaData: e.target.value })}
            placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Course",\n  "name": "..."\n}'}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm outline-none text-[12px] font-mono focus:border-gray-900 bg-gray-50 resize-none"
          />
        </div>

      </div>
    </div>
  );
}