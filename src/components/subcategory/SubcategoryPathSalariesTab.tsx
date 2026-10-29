"use client";

import React from "react";
import { Plus, X } from "lucide-react";

export default function SubcategoryPathSalariesTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const addRole = () => {
    setFormData({
      ...formData,
      pathRoles: [...(formData.pathRoles || []), { roleName: "", salaryInr: "", salaryUsd: "" }]
    });
  };

  const removeRole = (index: number) => {
    const updatedRoles = [...(formData.pathRoles || [])];
    updatedRoles.splice(index, 1);
    setFormData({ ...formData, pathRoles: updatedRoles });
  };

  const updateRole = (index: number, field: string, value: string) => {
    const updatedRoles = [...(formData.pathRoles || [])];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setFormData({ ...formData, pathRoles: updatedRoles });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <div className="border-b border-gray-100 pb-6 space-y-5">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Heading</label>
          <input
            type="text"
            value={formData.pathSalariesHeading || ""}
            onChange={(e) => setFormData({ ...formData, pathSalariesHeading: e.target.value })}
            placeholder="e.g. Career Paths & Average Salaries"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Description / Subtitle</label>
          <textarea
            rows={3}
            value={formData.pathSalariesDescription || ""}
            onChange={(e) => setFormData({ ...formData, pathSalariesDescription: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Path Roles & Salaries</h2>
          <button type="button" onClick={addRole} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add Role
          </button>
        </div>

        <div className="space-y-4">
          {(formData.pathRoles || []).map((role: any, index: number) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-sm relative grid grid-cols-1 md:grid-cols-3 gap-4 pr-10">
              <button type="button" onClick={() => removeRole(index)} className="absolute top-4 right-3 text-red-500 hover:text-red-700 p-1">
                <X size={16} />
              </button>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={role.roleName || ""}
                  onChange={(e) => updateRole(index, "roleName", e.target.value)}
                  placeholder="e.g. Cyber Security Analyst"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Avg Salary (INR)</label>
                <input
                  type="text"
                  value={role.salaryInr || ""}
                  onChange={(e) => updateRole(index, "salaryInr", e.target.value)}
                  placeholder="e.g. ₹ 6,00,000 - ₹ 15,00,000"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Avg Salary (USD)</label>
                <input
                  type="text"
                  value={role.salaryUsd || ""}
                  onChange={(e) => updateRole(index, "salaryUsd", e.target.value)}
                  placeholder="e.g. $ 70,000 - $ 120,000"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}