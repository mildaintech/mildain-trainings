"use client";

import { useState, useEffect } from "react";
import { FileText, Briefcase, Download } from "lucide-react";

export default function CareerSupportTab({ formData }: { formData: any }) {
  const [subcategoryData, setSubcategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData?.subcategory) {
      setLoading(true);
      fetch('/api/admin/subcategories')
        .then(res => res.json())
        .then(data => {
          const subcategories = Array.isArray(data) ? data : (data.data || []);
          const target = formData.subcategory.trim().toLowerCase();
          
          const selectedSub = subcategories.find(
            (s: any) =>
              s.name?.trim().toLowerCase() === target ||
              s.slug?.trim().toLowerCase() === target ||
              s._id === formData.subcategory
          );
          
          if (selectedSub) {
            setSubcategoryData(selectedSub);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [formData?.subcategory]);

  if (!formData?.subcategory) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-red-600 font-medium">
        Please select a subcategory in the Basic Info tab first.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full bg-white border border-gray-200 rounded-sm p-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10b981]"></div>
      </div>
    );
  }

  const items = subcategoryData?.careerSupportItems?.length > 0 ? subcategoryData.careerSupportItems : formData.careerSupportItems || [];
  const title = subcategoryData?.careerSupportTitle || formData.careerSupportTitle || "";
  const description = subcategoryData?.careerSupportDescription || formData.careerSupportDescription || "";
  const pdfUrl = subcategoryData?.careerSupportBrochurePdf || formData.careerSupportBrochurePdf || "";

  if (!title && items.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-gray-500 text-[13px]">
        No Career Support data found in the linked subcategory ({formData.subcategory}). Make sure you have saved it inside Categories &rarr; Edit Subcategory &rarr; Career Support.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8 relative">
      <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 px-4 py-1.5 text-[11px] font-bold rounded-bl-sm border-b border-l border-blue-100 uppercase tracking-wide">
        Auto-Synced (Read Only)
      </div>

      <div className="border-b border-gray-100 pb-6 pt-4 space-y-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Main Content Box</h2>
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Box Title</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700">
            {title || "N/A"}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Box Description</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700 whitespace-pre-wrap min-h-[100px]">
            {description || "N/A"}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Brochure PDF</label>
          {pdfUrl ? (
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="flex items-center text-[13px] text-gray-700 font-medium">
                <FileText size={16} className="mr-2 text-green-600" /> Brochure Available
              </span>
              <a href={pdfUrl} download="career_brochure.pdf" className="bg-white text-gray-600 py-1.5 px-3 rounded-sm hover:bg-gray-100 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-gray-200">
                <Download size={14} /> Download File
              </a>
            </div>
          ) : (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-500">
              No PDF uploaded.
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Support Items</h2>
        <div className="space-y-4">
          {items.map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-3 flex justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.imageAlt || "Preview"} title={item.imageTitle || ""} className="w-full h-20 object-contain bg-white border border-gray-200 p-1 rounded-sm" />
                ) : (
                  <div className="w-full h-20 bg-white border border-gray-200 flex items-center justify-center rounded-sm">
                    <Briefcase size={24} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="md:col-span-9 flex flex-col justify-center">
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Item Title</label>
                <div className="w-full px-3 py-2 bg-white border border-gray-200 rounded-sm text-[14px] font-bold text-gray-900">
                  {item.title || "Untitled Item"}
                </div>
                {item.imageAlt && <span className="text-[11px] text-gray-500 mt-2 font-medium">Alt: {item.imageAlt}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}