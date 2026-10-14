"use client";

import React, { useState, useEffect } from "react";

export default function PathSalariesTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const [globalRoles, setGlobalRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllRoles() {
      try {
        const res = await fetch("/api/admin/courses");
        if (res.ok) {
          const courses = await res.json();
          let allRoles: any[] = [];
          courses.forEach((c: any) => {
            if (c.roles && Array.isArray(c.roles)) {
              allRoles = [...allRoles, ...c.roles];
            }
          });

          const uniqueRoles = allRoles.filter((role, index, self) =>
            index === self.findIndex((r) => r.roleName === role.roleName)
          );
          setGlobalRoles(uniqueRoles);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchAllRoles();
  }, []);

  const handleRoleSelection = (role: any, isChecked: boolean) => {
    const currentSelected = formData.selectedPathRoles || [];
    if (isChecked) {
      setFormData({ ...formData, selectedPathRoles: [...currentSelected, role] });
    } else {
      setFormData({
        ...formData,
        selectedPathRoles: currentSelected.filter((r: any) => r.roleName !== role.roleName)
      });
    }
  };

  const isRoleSelected = (roleName: string) => {
    const currentSelected = formData.selectedPathRoles || [];
    return currentSelected.some((r: any) => r.roleName === roleName);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <div className="border-b border-gray-100 pb-6 space-y-6">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description Subtitle</label>
          <textarea
            rows={3}
            value={formData.pathSalariesDescription || ""}
            onChange={(e) => setFormData({ ...formData, pathSalariesDescription: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-3">Select Roles to Display on this Course</label>
          {loading ? (
            <div className="text-[13px] text-gray-500">Loading master roles list...</div>
          ) : globalRoles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {globalRoles.map((role: any, index: number) => (
                <label key={index} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-sm cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={isRoleSelected(role.roleName)}
                    onChange={(e) => handleRoleSelection(role, e.target.checked)}
                    className="mt-1 w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-gray-900">{role.roleName}</span>
                    <span className="text-[12px] font-medium text-gray-500">
                      {role.salaryInr} | {role.salaryUsd}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="text-[13px] text-gray-500 bg-gray-50 p-4 border border-gray-200 rounded-sm">
              No roles found. Add roles in Basic Information first.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}