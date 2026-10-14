'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, Upload, X } from "lucide-react";

export default function AddCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    inrPrice: "",
    usdPrice: "",
    provider: "",
    durationValue: "1",
    durationUnit: "Months",
    cohortStarts: "",
    badge: "",
    bannerImage: "",
    bannerImageAlt: "",
    bannerImageTitle: "",
    logoImage: "",
    logoImageAlt: "",
    logoImageTitle: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/admin/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {}
    }
    fetchCategories();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          duration: `${formData.durationValue} ${formData.durationUnit}`,
          inrPrice: Number(formData.inrPrice),
          usdPrice: Number(formData.usdPrice)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create course");
      }

      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderDurationValues = () => {
    let max = 15;
    if (formData.durationUnit === "Weeks") max = 4;
    if (formData.durationUnit === "Years") max = 5;
    
    const options = [];
    for (let i = 1; i <= max; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div className="w-full max-w-full space-y-5">
      
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/courses"
          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors border border-transparent hover:border-gray-200"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add New Course</h1>
          <p className="text-gray-500 mt-0.5 text-[13px] font-medium">Create a new course listing for your platform.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div className="p-6 space-y-8">
          
          <div className="space-y-5">
            <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Course Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Advanced Full Stack Development"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">URL Slug <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. advanced-full-stack-development"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-sm focus:bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: any, index: number) => (
                    <option key={index} value={cat.name || cat.title}>{cat.name || cat.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Price (INR) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  required
                  value={formData.inrPrice}
                  onChange={(e) => setFormData({ ...formData, inrPrice: e.target.value })}
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Price (USD) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  required
                  value={formData.usdPrice}
                  onChange={(e) => setFormData({ ...formData, usdPrice: e.target.value })}
                  placeholder="e.g. 60"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Additional Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Provider</label>
                <input 
                  type="text" 
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  placeholder="e.g. MILDAN ED-TECH"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Duration</label>
                <div className="flex gap-3">
                  <select 
                    value={formData.durationValue}
                    onChange={(e) => setFormData({ ...formData, durationValue: e.target.value })}
                    className="w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                  >
                    {renderDurationValues()}
                  </select>
                  <select 
                    value={formData.durationUnit}
                    onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value, durationValue: "1" })}
                    className="w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                  >
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                    <option value="Years">Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Cohort Starts</label>
                <input 
                  type="date" 
                  value={formData.cohortStarts}
                  onChange={(e) => setFormData({ ...formData, cohortStarts: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Badge</label>
                <select
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                >
                  <option value="">None</option>
                  <option value="New Course">New Course</option>
                  <option value="Training">Training</option>
                  <option value="Latest">Latest</option>
                  <option value="Popular">Popular</option>
                  <option value="Trending">Trending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                Course Banner Image
              </h2>
              
              {!formData.bannerImage ? (
                <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[140px]">
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
                <div className="space-y-4">
                  <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group">
                    <img 
                      src={formData.bannerImage} 
                      alt="Course preview" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => removeImage('bannerImage')}
                        className="bg-white text-red-600 py-1.5 px-3 rounded-sm hover:bg-red-50 transition-colors shadow-sm flex items-center gap-1.5 font-bold text-[12px]"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      value={formData.bannerImageAlt}
                      onChange={(e) => setFormData({ ...formData, bannerImageAlt: e.target.value })}
                      placeholder="Image Alt Text"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 outline-none text-[13px]"
                    />
                    <input 
                      type="text" 
                      value={formData.bannerImageTitle}
                      onChange={(e) => setFormData({ ...formData, bannerImageTitle: e.target.value })}
                      placeholder="Image Title Text"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 outline-none text-[13px]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
                Provider Logo
              </h2>
              
              {!formData.logoImage ? (
                <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[140px]">
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
                <div className="space-y-4">
                  <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm group flex items-center justify-center bg-gray-50 h-32">
                    <img 
                      src={formData.logoImage} 
                      alt="Logo preview" 
                      className="max-h-20 max-w-[80%] object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => removeImage('logoImage')}
                        className="bg-white text-red-600 py-1.5 px-3 rounded-sm hover:bg-red-50 transition-colors shadow-sm flex items-center gap-1.5 font-bold text-[12px]"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      value={formData.logoImageAlt}
                      onChange={(e) => setFormData({ ...formData, logoImageAlt: e.target.value })}
                      placeholder="Logo Alt Text"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 outline-none text-[13px]"
                    />
                    <input 
                      type="text" 
                      value={formData.logoImageTitle}
                      onChange={(e) => setFormData({ ...formData, logoImageTitle: e.target.value })}
                      placeholder="Logo Title Text"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 outline-none text-[13px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end gap-3">
          <Link 
            href="/admin/courses"
            className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors rounded-sm text-[13px]"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={loading}
            className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-sm font-bold transition-all shadow-sm flex items-center gap-2 text-[13px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save size={16} />
                Publish Course
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}