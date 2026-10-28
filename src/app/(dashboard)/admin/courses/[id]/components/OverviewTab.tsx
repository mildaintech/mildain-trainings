"use client";

import React, { useState } from "react";
import { X, Upload, AlertCircle } from "lucide-react";

export default function OverviewTab({ formData, setFormData }: { formData: any, setFormData: any }) {
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
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-6">
      
      {/* Error Message Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="border-b border-gray-100 pb-6 mb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Course Overview Content
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Overview Heading</label>
            <input 
              type="text" 
              value={formData.overviewHeading || ""}
              onChange={(e) => setFormData({ ...formData, overviewHeading: e.target.value })}
              placeholder="e.g. About the PMP Course in Noida."
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description Paragraph</label>
            <textarea 
              rows={5}
              value={formData.overviewDescription || ""}
              onChange={(e) => setFormData({ ...formData, overviewDescription: e.target.value })}
              placeholder="Detailed description of the course..."
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px] resize-y"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-3">Key Points</label>
          <div className="space-y-3">
            {(formData.overviewKeyPoints || []).map((point: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...(formData.overviewKeyPoints || [])];
                    newPoints[index] = e.target.value;
                    setFormData({ ...formData, overviewKeyPoints: newPoints });
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPoints = [...(formData.overviewKeyPoints || [])];
                    newPoints.splice(index, 1);
                    setFormData({ ...formData, overviewKeyPoints: newPoints });
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
                overviewKeyPoints: [...(formData.overviewKeyPoints || []), ""] 
              })}
              className="text-[12px] font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-sm transition-colors"
            >
              + Add Key Point
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-3">Skills Covered</label>
          <div className="space-y-3">
            {(formData.overviewSkillsCovered || []).map((skill: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...(formData.overviewSkillsCovered || [])];
                    newSkills[index] = e.target.value;
                    setFormData({ ...formData, overviewSkillsCovered: newSkills });
                  }}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSkills = [...(formData.overviewSkillsCovered || [])];
                    newSkills.splice(index, 1);
                    setFormData({ ...formData, overviewSkillsCovered: newSkills });
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
                overviewSkillsCovered: [...(formData.overviewSkillsCovered || []), ""] 
              })}
              className="text-[12px] font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-sm transition-colors"
            >
              + Add Skill
            </button>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[13px] font-bold text-gray-700 mb-3">Overview Middle Image Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            {!formData.overviewImage ? (
              <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[120px]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'overviewImage')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload size={20} className="text-gray-400 mb-2" />
                <p className="text-[11px] font-bold text-gray-600">Upload Image (Max 1MB)</p>
              </div>
            ) : (
              <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                <img src={formData.overviewImage} alt="Overview" className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => removeImage('overviewImage')}
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
                 value={formData.overviewImageAlt || ""}
                 onChange={(e) => setFormData({ ...formData, overviewImageAlt: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
               />
             </div>
             <div>
               <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Image Title Text</label>
               <input 
                 type="text" 
                 value={formData.overviewImageTitle || ""}
                 onChange={(e) => setFormData({ ...formData, overviewImageTitle: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
               />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}