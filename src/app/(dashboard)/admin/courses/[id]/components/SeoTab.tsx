import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';

interface SeoTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function SeoTab({ formData, setFormData }: SeoTabProps) {
  const [imageError, setImageError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageError("Image must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, ogImage: reader.result as string });
        setImageError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, ogImage: "", ogImageAlt: "", ogImageTitle: "" });
  };

  const defaultImage = formData.bannerImage || formData.overviewImage;
  const displayImage = formData.ogImage || defaultImage;
  const isDefaultImage = !formData.ogImage && defaultImage;

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-lg font-bold text-gray-900">SEO Details</h2>
        <p className="text-[13px] text-gray-500">Manage how this course appears on search engines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Title</label>
            <input 
              type="text" 
              value={formData.metaTitle || ""}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              maxLength={60}
              placeholder="e.g. Best CISA Certification Course Online"
              className="w-full px-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Focus Keyword</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400"><Search size={16} /></span>
              <input 
                type="text" 
                value={formData.focusKeyword || ""}
                onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                placeholder="e.g. CISA Certification"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Meta Description</label>
            <textarea 
              rows={4}
              value={formData.metaDescription || ""}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              maxLength={160}
              placeholder="Write a compelling description for search engines..."
              className="w-full px-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[13px] font-bold text-gray-700 mb-1">OG Image Setup (Social Sharing)</h3>
        <p className="text-[11px] text-gray-500 mb-4">By default, the course banner image is used. Upload a custom image here to override it.</p>
        
        {imageError && (
          <p className="text-[12px] text-red-600 mb-3 font-medium">{imageError}</p>
        )}

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
                disabled={!!isDefaultImage && !formData.ogImageAlt}
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
                disabled={!!isDefaultImage && !formData.ogImageTitle}
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
          value={formData.schemaData || ""}
          onChange={(e) => setFormData({ ...formData, schemaData: e.target.value })}
          placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Course",\n  "name": "..."\n}'}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm outline-none text-[12px] font-mono focus:border-gray-900 bg-gray-50 resize-none"
        />
      </div>
    </div>
  );
}