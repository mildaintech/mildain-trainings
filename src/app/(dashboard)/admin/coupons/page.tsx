"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Ticket, Percent, Type, AlignLeft, LayoutTemplate } from "lucide-react";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    bannerTitle: "",
    bannerSubtext: "",
    themeType: "default"
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCoupons(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          discountPercent: Number(formData.discountPercent)
        }),
      });
      
      if (res.ok) {
        setFormData({
          code: "",
          discountPercent: "",
          bannerTitle: "",
          bannerSubtext: "",
          themeType: "default"
        });
        fetchCoupons();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus })
      });
      if (res.ok) fetchCoupons();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchCoupons();
    } catch (error) {
      console.error(error);
    }
  };

  const liveCount = coupons.filter(c => c.isActive !== false).length;

  return (
    <div className="p-6 bg-[#f5f5f4] min-h-screen text-slate-900 font-sans">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promo Banners</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage active promotional banners for the website.</p>
        </div>
      </div>

      {/* Stats/Counts (Matching Courses style) */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-gray-500">
          Total Banners : <span className="font-bold text-gray-900">{coupons.length}</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-emerald-600 font-semibold">{liveCount} live</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-gray-700 font-semibold">{coupons.length - liveCount} hidden</span>
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-300 bg-gray-50 flex items-center gap-2">
          <Plus size={16} className="text-blue-600" />
          <h2 className="text-[14px] font-bold text-gray-900">Create New Campaign</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  <Ticket size={14} className="text-gray-400" /> Coupon Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                  placeholder="e.g. DIWALI20"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  <Percent size={14} className="text-gray-400" /> Discount Percentage
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  <Type size={14} className="text-gray-400" /> Banner Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.bannerTitle}
                  onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                  placeholder="Diwali Special Offer"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  <AlignLeft size={14} className="text-gray-400" /> Banner Subtext
                </label>
                <input
                  type="text"
                  required
                  value={formData.bannerSubtext}
                  onChange={(e) => setFormData({ ...formData, bannerSubtext: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
                  placeholder="Light up your career!"
                />
              </div>

              <div className="md:col-span-2 md:max-w-[50%]">
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                  <LayoutTemplate size={14} className="text-gray-400" /> Select Banner Theme
                </label>
                <select
                  value={formData.themeType}
                  onChange={(e) => setFormData({ ...formData, themeType: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="default">Default Theme</option>
                  <option value="newyear">New Year Theme (Blue/Cyan)</option>
                  <option value="diwali">Diwali Theme (Purple/Gold)</option>
                  <option value="xmas">Christmas Theme</option>
                </select>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Campaign"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-700 uppercase tracking-wider w-12">#</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-700 uppercase tracking-wider">Coupon Code</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-700 uppercase tracking-wider">Theme</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-700 uppercase tracking-wider">Banner Content</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-700 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.length > 0 ? coupons.map((coupon, index) => (
                <tr key={coupon._id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-6 py-4 text-gray-700 text-xs font-medium">{index + 1}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <label className="relative inline-flex items-center cursor-pointer scale-90">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={coupon.isActive} 
                          onChange={() => handleToggleStatus(coupon._id, coupon.isActive)} 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                      <span className={`text-[11px] font-semibold ${coupon.isActive ? "text-emerald-600" : "text-gray-700"}`}>
                        {coupon.isActive ? "Live" : "Hidden"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="font-semibold text-gray-800">{coupon.code}</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md w-fit border border-blue-100">
                        {coupon.discountPercent}% OFF
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="capitalize text-[11px] font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                      {coupon.themeType || 'default'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold text-gray-800">{coupon.bannerTitle}</span>
                      <span className="text-[11px] text-gray-500 mt-0.5 truncate max-w-[200px]">{coupon.bannerSubtext}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center">
                      <button 
                        onClick={() => handleDelete(coupon._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-gray-400">
                    No promotional banners found. Create your first campaign above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}