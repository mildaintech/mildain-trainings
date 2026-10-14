"use client";

import { Upload, X } from "lucide-react";

export default function ExamDetailsTab({ formData, setFormData }: { formData: any, setFormData: any }) {

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: string) => {
    setFormData({ ...formData, [field]: "" });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      
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

      <div className="border-b border-gray-100 pb-6">
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
                <p className="text-[11px] font-bold text-gray-600">Upload Image</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-[13px] font-bold text-gray-700 bg-gray-50 p-2 rounded-sm border border-gray-100">Score Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Passing Score (e.g. 450)</label>
              <input 
                type="text" 
                value={formData.examPassingScore || ""}
                onChange={(e) => setFormData({ ...formData, examPassingScore: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Total Score (e.g. 800)</label>
              <input 
                type="text" 
                value={formData.examTotalScore || ""}
                onChange={(e) => setFormData({ ...formData, examTotalScore: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Score Description</label>
            <textarea 
              rows={3}
              value={formData.examScoreDescription || ""}
              onChange={(e) => setFormData({ ...formData, examScoreDescription: e.target.value })}
              placeholder="To pass, you need at least..."
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px] resize-y"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[13px] font-bold text-gray-700 bg-gray-50 p-2 rounded-sm border border-gray-100">Guarantee Box</h3>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Title (e.g. 100% exam-pass)</label>
            <input 
              type="text" 
              value={formData.examGuaranteeTitle || ""}
              onChange={(e) => setFormData({ ...formData, examGuaranteeTitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Subtitle (e.g. guarantee)</label>
            <input 
              type="text" 
              value={formData.examGuaranteeSubtitle || ""}
              onChange={(e) => setFormData({ ...formData, examGuaranteeSubtitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Footer Text (e.g. with every enrollment.)</label>
            <input 
              type="text" 
              value={formData.examGuaranteeFooter || ""}
              onChange={(e) => setFormData({ ...formData, examGuaranteeFooter: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-[13px]"
            />
          </div>
        </div>
      </div>

    </div>
  );
}