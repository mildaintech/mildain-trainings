"use client";

import { Upload, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";

export default function BasicInfoTab({ formData, setFormData, setError }: { formData: any, setFormData: any, setError: any }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : (data.data || [])))
      .catch(() => {});
      
    fetch('/api/admin/subcategories')
      .then(res => res.json())
      .then(data => setSubcategories(Array.isArray(data) ? data : (data.data || [])))
      .catch(() => {});
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    setFormData({ ...formData, title, slug });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'bannerImage' | 'logoImage') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: 'bannerImage' | 'logoImage') => {
    setFormData({ ...formData, [field]: "" });
  };

  const addRole = () => {
    setFormData({
      ...formData,
      roles: [...(formData.roles || []), { roleName: "", salaryInr: "₹", salaryUsd: "$" }]
    });
  };

  const removeRole = (index: number) => {
    const updatedRoles = [...(formData.roles || [])];
    updatedRoles.splice(index, 1);
    setFormData({ ...formData, roles: updatedRoles });
  };

  const updateRole = (index: number, field: string, value: string) => {
    const updatedRoles = [...(formData.roles || [])];
    updatedRoles[index] = { ...updatedRoles[index], [field]: value };
    setFormData({ ...formData, roles: updatedRoles });
  };

  const activeSubcategories = subcategories.filter(sub => {
    if (typeof sub.parentCategory === 'object' && sub.parentCategory !== null) {
      return sub.parentCategory.name === formData.category || sub.parentCategory._id === formData.category;
    }
    return sub.parentCategory === formData.category;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-5">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Basic Information
          </h2>
          
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Course Title *</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">URL Slug *</label>
              <input 
                type="text" 
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Category *</label>
              <select 
                required
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: "" })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              >
                <option value="">Select Category</option>
                {categories.map((c: any) => (
                  <option key={c._id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Subcategory *</label>
              <select 
                required
                value={formData.subcategory || ""}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              >
                <option value="">Select Subcategory</option>
                {activeSubcategories.map((sc: any) => (
                  <option key={sc._id} value={sc.name}>{sc.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Price (INR) *</label>
              <input 
                type="number" 
                required
                value={formData.inrPrice}
                onChange={(e) => setFormData({ ...formData, inrPrice: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Price (USD) *</label>
              <input 
                type="number" 
                required
                value={formData.usdPrice}
                onChange={(e) => setFormData({ ...formData, usdPrice: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-5">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Additional Details
          </h2>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Provider / Institution</label>
              <input 
                type="text" 
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Duration</label>
              <input 
                type="text" 
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Cohort Starts</label>
              <input 
                type="text" 
                value={formData.cohortStarts}
                onChange={(e) => setFormData({ ...formData, cohortStarts: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Badge</label>
              <input 
                type="text" 
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Course Banner Image
          </h2>
          
          {!formData.bannerImage ? (
            <div className="border border-dashed border-gray-300 rounded-sm p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[140px]">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'bannerImage')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center mb-2 text-gray-600">
                <Upload size={14} />
              </div>
              <p className="text-[13px] font-bold text-gray-700">Upload Banner</p>
              <p className="text-[11px] font-medium text-gray-500 mt-1">(max 2MB)</p>
            </div>
          ) : (
            <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
              <img src={formData.bannerImage} alt="Banner" className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  type="button" 
                  onClick={() => removeImage('bannerImage')} 
                  className="bg-white text-red-600 py-1.5 px-3 rounded-sm hover:bg-red-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <X size={14} /> Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Provider Logo
          </h2>
          
          {!formData.logoImage ? (
            <div className="border border-dashed border-gray-300 rounded-sm p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[140px]">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'logoImage')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-sm shadow-sm flex items-center justify-center mb-2 text-gray-600">
                <Upload size={14} />
              </div>
              <p className="text-[13px] font-bold text-gray-700">Upload Logo</p>
              <p className="text-[11px] font-medium text-gray-500 mt-1">(max 2MB)</p>
            </div>
          ) : (
            <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group flex items-center justify-center bg-gray-50 h-32">
              <img src={formData.logoImage} alt="Logo" className="max-h-20 max-w-[80%] object-contain" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  type="button" 
                  onClick={() => removeImage('logoImage')} 
                  className="bg-white text-red-600 py-1.5 px-3 rounded-sm hover:bg-red-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <X size={14} /> Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}