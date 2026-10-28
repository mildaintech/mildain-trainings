
"use client";

import { FileText, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function CurriculumTab({ formData }: { formData: any }) {
  const [subcategoryData, setSubcategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.subcategory) {
      setLoading(true);
      fetch(`/api/admin/subcategories`)
        .then(res => res.json())
        .then(data => {
          const subcategories = Array.isArray(data) ? data : (data.data || []);
          const selectedSub = subcategories.find((s: any) => s.name === formData.subcategory);
          setSubcategoryData(selectedSub || null);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setSubcategoryData(null);
    }
  }, [formData.subcategory]);

  if (!formData.subcategory) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-[16px] font-bold text-gray-900 mb-2">No Subcategory Selected</h2>
        <p className="text-[13px] text-gray-500 max-w-md mx-auto">
          Please select a subcategory in the Basic Info tab first. The curriculum syllabus and PDF will automatically be loaded from the selected subcategory.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-[13px] text-gray-500 font-medium">Fetching curriculum data for {formData.subcategory}...</p>
      </div>
    );
  }

  if (!subcategoryData) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-red-600">
        <p className="text-[13px] font-bold">Could not load curriculum data for the selected subcategory.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8 relative">
      <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 px-4 py-1.5 text-[11px] font-bold rounded-bl-sm border-b border-l border-blue-100 uppercase tracking-wide">
        Auto-Synced (Read Only)
      </div>

      <div className="border-b border-gray-100 pb-6 pt-4">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Curriculum Header Setup
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Title</label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700">
              {subcategoryData.curriculumTitle || <span className="text-gray-400 italic">Not provided</span>}
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Subtitle / Description</label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700">
              {subcategoryData.curriculumDescription || <span className="text-gray-400 italic">Not provided</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Curriculum Modules
        </h2>

        <div className="space-y-4">
          {(!subcategoryData.curriculumModules || subcategoryData.curriculumModules.length === 0) ? (
            <div className="text-center p-8 border border-dashed border-gray-300 rounded-sm text-gray-500 text-[13px]">
              No modules exist in the {formData.subcategory} subcategory. Update the subcategory to add modules.
            </div>
          ) : (
            subcategoryData.curriculumModules.map((module: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-sm overflow-hidden bg-gray-50">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-[13px] font-bold text-gray-800">
                    {module.title || `Module ${index + 1}`}
                  </h3>
                </div>
                <div className="p-4 bg-white text-[13px] text-gray-600 prose prose-sm max-w-none"
                     dangerouslySetInnerHTML={{ __html: module.contentHtml || "No content provided." }} />
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Download PDF Upload
        </h2>
        <div className="w-full md:w-1/2">
          {!subcategoryData.curriculumPdf ? (
            <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 text-gray-500 min-h-[100px]">
              <p className="text-[12px] font-medium">No PDF attached to this subcategory.</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-blue-200 rounded-sm bg-blue-50 text-blue-700">
              <span className="text-[13px] font-bold flex items-center gap-2">
                <FileText size={16} /> Syllabus PDF Available
              </span>
              <a 
                href={subcategoryData.curriculumPdf} 
                download="syllabus.pdf"
                className="bg-white text-blue-600 py-1.5 px-3 rounded-sm hover:bg-blue-100 text-[11px] font-bold flex items-center gap-1.5 shadow-sm border border-blue-200"
              >
                <Download size={14} /> Preview
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}