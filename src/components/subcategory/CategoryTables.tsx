"use client";
import React from "react";
import { Edit, Trash2, FolderTree, Image as ImageIcon, Plus, ArrowLeft } from "lucide-react";

export function CategoryTable({ categories, loading, onAdd, onEdit, onDelete, onManageSub }: any) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-gray-500 text-[13px] font-medium">Create and organize course categories</p>
        </div>
        <button onClick={onAdd} className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-sm font-bold transition-all shadow-sm flex items-center gap-2 text-[13px]">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-[13px] font-medium">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-[13px] font-medium">No categories found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[12px] uppercase text-gray-600 tracking-wider">
                <th className="p-4 font-bold">Category Name</th>
                <th className="p-4 font-bold">URL Slug</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: any) => (
                <tr key={cat._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[13px] text-gray-900">{cat.name}</td>
                  <td className="p-4 font-medium text-[13px] text-gray-500">{cat.slug}</td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    <button onClick={() => onManageSub(cat)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-sm transition-colors flex items-center gap-2 text-[12px] font-bold border border-gray-200">
                      <FolderTree size={14} /> Subcategories
                    </button>
                    <button onClick={() => onEdit(cat)} className="text-blue-600 hover:text-blue-800 transition-colors p-1">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(cat._id, false)} className="text-red-600 hover:text-red-800 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export function SubcategoryTable({ parentCategory, subcategories, loading, onAdd, onEdit, onDelete, onBack }: any) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors border border-transparent hover:border-gray-200">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Manage Subcategories</h1>
            <p className="text-gray-500 text-[13px] font-medium">For category: <span className="font-bold text-gray-700">{parentCategory?.name}</span></p>
          </div>
        </div>
        <button onClick={onAdd} className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-sm font-bold transition-all shadow-sm flex items-center gap-2 text-[13px]">
          <Plus size={16} /> Add Subcategory
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-[13px] font-medium">Loading subcategories...</div>
        ) : subcategories.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-[13px] font-medium">No subcategories found for {parentCategory?.name}.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[12px] uppercase text-gray-600 tracking-wider">
                <th className="p-4 font-bold">Logo</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Slug</th>
                <th className="p-4 font-bold">Assets</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((sub: any) => (
                <tr key={sub._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    {sub.logoImage ? (
                      <div className="w-10 h-10 border border-gray-200 rounded-sm p-1 bg-white">
                        <img src={sub.logoImage} alt={sub.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 border border-dashed border-gray-300 rounded-sm flex items-center justify-center bg-gray-50 text-gray-400">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-bold text-[13px] text-gray-900">{sub.name}</td>
                  <td className="p-4 font-medium text-[13px] text-gray-500">{sub.slug}</td>
                  <td className="p-4 font-medium text-[12px] text-gray-500">
                    {sub.pdfBrochure ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm">PDF Attached</span> : "No PDF"}
                  </td>
                  <td className="p-4 flex items-center justify-end gap-3 h-full pt-6">
                    <button onClick={() => onEdit(sub)} className="text-blue-600 hover:text-blue-800 transition-colors p-1">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(sub._id, true)} className="text-red-600 hover:text-red-800 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}