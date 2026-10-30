"use client";

import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";

export default function ToolsTab({ formData, setFormData }: { formData: any; setFormData?: any }) {
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

  const toolsList =
    subcategoryData?.toolsList?.length > 0
      ? subcategoryData.toolsList
      : formData.toolsList || [];

  const toolsHeading =
    subcategoryData?.toolsHeading || formData.toolsHeading || "Tools Covered";

  if (toolsList.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-gray-500 text-[13px]">
        No tools found in the linked subcategory ({formData.subcategory}). Make sure you have added and saved tools inside Categories &rarr; Edit Subcategory &rarr; Tools Covered.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8 relative">
      <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 px-4 py-1.5 text-[11px] font-bold rounded-bl-sm border-b border-l border-blue-100 uppercase tracking-wide">
        Auto-Synced (Read Only)
      </div>

      <div className="border-b border-gray-100 pb-6 pt-4">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Heading Settings</h2>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Main Heading</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700">
            {toolsHeading}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Tools List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsList.map((tool: any, index: number) => (
            <div key={`tool-${index}`} className="bg-gray-50 p-4 border border-gray-200 rounded-sm text-center flex flex-col items-center justify-center">
              {tool.logo ? (
                <img src={tool.logo} alt={tool.logoAlt || "Tool Logo"} title={tool.logoTitle || ""} className="w-full h-24 object-contain bg-white border border-gray-200 p-2 rounded-sm mb-3" />
              ) : (
                <div className="w-full h-24 bg-white border border-gray-200 flex items-center justify-center mb-3 rounded-sm">
                  <Wrench size={24} className="text-gray-300" />
                </div>
              )}
              {tool.logoAlt && <p className="text-[12px] font-bold text-gray-700">{tool.logoAlt}</p>}
              {tool.logoTitle && <p className="text-[11px] text-gray-500">{tool.logoTitle}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}