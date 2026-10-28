"use client";

import React, { useState } from "react";
import { Upload, X, AlertCircle } from "lucide-react";

export default function ExamDetailsTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const [error, setError] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit file size to 1MB to prevent Vercel Payload Too Large error
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
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      
      {/* Global Error Display for Image Uploads */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
          <button onClick={() => setError("")} className="ml-auto"><X size={14}/></button>
        </div>
      )}

      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Exam Header Settings
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Exam Main Heading</label>
              <input 
                type="text" 
                value={formData.examHeading || ""}
                onChange={(e) => setFormData({ ...formData, examHeading: e.target.value })}
                placeholder="e.g. PMP"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
              />
              <p className="text-[11px] text-gray-500 mt-1">This word will be green (e.g. <span className="text-green-500">PMP</span> Exam Details...)</p>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Exam Sub Heading</label>
              <input 
                type="text" 
                value={formData.examSubHeading || ""}
                onChange={(e) => setFormData({ ...formData, examSubHeading: e.target.value })}
                placeholder="e.g. The CISM from ISACA is one of..."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Exam Info Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Format Detail</label>
            <input 
              type="text" 
              value={formData.examFormat || ""}
              onChange={(e) => setFormData({ ...formData, examFormat: e.target.value })}
              placeholder="e.g. Computer-Based Test (CBT)"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Duration</label>
            <input 
              type="text" 
              value={formData.examDuration || ""}
              onChange={(e) => setFormData({ ...formData, examDuration: e.target.value })}
              placeholder="e.g. 4 Hours"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Number of Questions</label>
            <input 
              type="text" 
              value={formData.examQuestions || ""}
              onChange={(e) => setFormData({ ...formData, examQuestions: e.target.value })}
              placeholder="e.g. 150 Questions (MCQ-Scenario Based)"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Question Types</label>
            <input 
              type="text" 
              value={formData.examQuestionTypes || ""}
              onChange={(e) => setFormData({ ...formData, examQuestionTypes: e.target.value })}
              placeholder="e.g. Multiple-Choice + Advanced Formats"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Available Languages</label>
            <input 
              type="text" 
              value={formData.examLanguages || ""}
              onChange={(e) => setFormData({ ...formData, examLanguages: e.target.value })}
              placeholder="e.g. English, Spanish, Chinese, French, German"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[13px] font-bold text-gray-700 mb-3">Certificate Image Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            {!formData.examCertificateImage ? (
              <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[120px]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'examCertificateImage')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload size={20} className="text-gray-400 mb-2" />
                <p className="text-[11px] font-bold text-gray-600">Upload Image (Max 1MB)</p>
              </div>
            ) : (
              <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                <img src={formData.examCertificateImage} alt="Certificate" className="w-full h-32 object-contain bg-white" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => removeImage('examCertificateImage')}
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
                 value={formData.examCertificateImageAlt || ""}
                 onChange={(e) => setFormData({ ...formData, examCertificateImageAlt: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
               />
             </div>
             <div>
               <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Image Title Text</label>
               <input 
                 type="text" 
                 value={formData.examCertificateImageTitle || ""}
                 onChange={(e) => setFormData({ ...formData, examCertificateImageTitle: e.target.value })}
                 className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
               />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}