"use client";

import React, { useState } from "react";
import { Upload, X, AlertCircle } from "lucide-react";

export default function TrainingOptionsTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setError("Image size must be less than 1MB");
        return;
      }
      
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: string) => {
    setFormData({ ...formData, [field]: "" });
    setError("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">     
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Section Header Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Main Heading (HTML supported)</label>
            <input 
              type="text" 
              value={formData.trainingOptionsHeading || ""}
              onChange={(e) => setFormData({ ...formData, trainingOptionsHeading: e.target.value })}
              placeholder='e.g. Start Your <span class="text-[#10b981]">PMP</span> Journey Today'
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
            />
            <p className="text-[11px] text-gray-500 mt-1">Use &lt;span class="text-[#10b981]"&gt;Word&lt;/span&gt; to highlight text in green.</p>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Sub Heading (Paragraph)</label>
            <textarea 
              rows={2}
              value={formData.trainingOptionsSubHeading || ""}
              onChange={(e) => setFormData({ ...formData, trainingOptionsSubHeading: e.target.value })}
              placeholder="Select the ideal training as per your requirement..."
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px] resize-y"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Left Card Settings (Live Online Training)
        </h2>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Card Title</label>
              <input 
                type="text" 
                value={formData.trainingCard1Title || ""}
                onChange={(e) => setFormData({ ...formData, trainingCard1Title: e.target.value })}
                placeholder="e.g. Online Live Bootcamp"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Card Description</label>
              <input 
                type="text" 
                value={formData.trainingCard1Description || ""}
                onChange={(e) => setFormData({ ...formData, trainingCard1Description: e.target.value })}
                placeholder="Immersive interactive bootcamps led by elite..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-[13px] font-bold text-gray-700 mb-3">Card Image Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-1">
                {!formData.trainingCard1Image ? (
                  <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[120px]">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'trainingCard1Image')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={20} className="text-gray-400 mb-2" />
                    <p className="text-[11px] font-bold text-gray-600">Upload Image (Max 1MB)</p>
                  </div>
                ) : (
                  <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                    <img src={formData.trainingCard1Image} alt="Card" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => removeImage('trainingCard1Image')}
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
                     value={formData.trainingCard1ImageAlt || ""}
                     onChange={(e) => setFormData({ ...formData, trainingCard1ImageAlt: e.target.value })}
                     className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                   />
                 </div>
                 <div>
                   <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Image Title Text</label>
                   <input 
                     type="text" 
                     value={formData.trainingCard1ImageTitle || ""}
                     onChange={(e) => setFormData({ ...formData, trainingCard1ImageTitle: e.target.value })}
                     className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                   />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}