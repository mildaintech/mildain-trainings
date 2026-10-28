"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";

export default function AdvisorTab({ formData }: { formData: any }) {
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

  const advisors = subcategoryData?.advisors?.length > 0 ? subcategoryData.advisors : formData.advisors || [];
  const advisorHeading = subcategoryData?.advisorHeading || formData.advisorHeading || "PMP®";

  if (advisors.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-gray-500 text-[13px]">
        No advisors found in the linked subcategory ({formData.subcategory}). Make sure you have added and saved advisors inside Categories &rarr; Edit Subcategory &rarr; Course Advisors.
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
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Highlight Text</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700">
            {advisorHeading}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Advisors List</h2>
        <div className="space-y-6">
          {advisors.map((advisor: any, index: number) => (
            <div key={`advisor-${index}`} className="bg-gray-50 p-5 border border-gray-200 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex flex-col items-center">
                {advisor.image ? (
                  <img src={advisor.image} alt={advisor.imageAlt || "Advisor Image"} title={advisor.imageTitle || ""} className="w-full h-32 object-contain bg-white border border-gray-200 p-2 rounded-sm" />
                ) : (
                  <div className="w-full h-32 bg-white border border-gray-200 flex items-center justify-center rounded-sm">
                    <Users size={32} className="text-gray-300" />
                  </div>
                )}
                <span className="text-[11px] text-gray-500 mt-2 font-medium">{advisor.imageAlt || "No Alt Text"}</span>
              </div>
              <div className="md:col-span-8 space-y-2">
                <h3 className="text-[14px] font-bold text-gray-900">{advisor.name || "Unnamed Advisor"}</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">{advisor.description || "No description provided."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}