"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

export default function PathSalariesTab({ formData }: { formData: any }) {
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

  const heading = subcategoryData?.pathSalariesHeading || formData.pathSalariesHeading || "";
  const description = subcategoryData?.pathSalariesDescription || formData.pathSalariesDescription || "";
  const roles = subcategoryData?.pathRoles?.length > 0 ? subcategoryData.pathRoles : formData.selectedPathRoles || [];

  if (!description && !heading && roles.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-gray-500 text-[13px]">
        No Path & Salaries data found in the linked subcategory ({formData.subcategory}). Make sure you have added it inside Categories &rarr; Edit Subcategory.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8 relative">
      <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 px-4 py-1.5 text-[11px] font-bold rounded-bl-sm border-b border-l border-blue-100 uppercase tracking-wide">
        Auto-Synced (Read Only)
      </div>

      <div className="border-b border-gray-100 pb-6 pt-4 space-y-5">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Heading</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700">
            {heading || "No heading provided."}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description Subtitle</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700 whitespace-pre-wrap min-h-[60px]">
            {description || "No description provided."}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Path Roles & Salaries</h2>
        {roles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role: any, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-sm">
                <div className="p-2 bg-white rounded-md border border-gray-200">
                  <TrendingUp size={20} className="text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-900 mb-1">{role.roleName || "N/A"}</span>
                  <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <span className="bg-white px-2 py-0.5 border border-gray-200 rounded-sm">{role.salaryInr || "INR N/A"}</span>
                    <span>|</span>
                    <span className="bg-white px-2 py-0.5 border border-gray-200 rounded-sm">{role.salaryUsd || "USD N/A"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[13px] text-gray-500 bg-gray-50 p-4 border border-gray-200 rounded-sm">
            No roles added.
          </div>
        )}
      </div>
    </div>
  );
}