"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Save, AlertCircle, Upload, FileText, ArrowLeft } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    careerSupportPdf: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      setError("Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    setFormData({ ...formData, name, slug });
  };

  const openForm = (category: any = null) => {
    setError("");
    if (category) {
      setEditingId(category._id);
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        careerSupportPdf: category.careerSupportPdf || ""
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", slug: "", careerSupportPdf: "" });
    }
    setView("form");
  };

  const closeForm = () => {
    setView("list");
    setEditingId(null);
    setFormData({ name: "", slug: "", careerSupportPdf: "" });
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, careerSupportPdf: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      const url = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      fetchCategories();
      closeForm();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");
      fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (view === "form") {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={closeForm}
              className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors border border-transparent hover:border-gray-200"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {editingId ? "Edit Category" : "Add New Category"}
              </h1>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitLoading}
            className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-sm font-bold transition-all shadow-sm flex items-center gap-2 text-[13px] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitLoading ? "Saving..." : <><Save size={16} /> Save Category</>}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
          <div className="pb-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Category Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">URL Slug <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-sm outline-none text-[13px] focus:bg-white focus:border-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Career Support PDF</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-sm cursor-pointer hover:bg-gray-50 text-[13px] font-medium transition-colors">
                  <Upload size={16} className="mr-2" /> Upload PDF
                  <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
                </label>
                {formData.careerSupportPdf && (
                  <span className="flex items-center text-[13px] text-green-600 font-medium">
                    <FileText size={16} className="mr-1" /> PDF Selected
                    <button type="button" onClick={() => setFormData({ ...formData, careerSupportPdf: "" })} className="ml-3 text-red-500 hover:text-red-700">
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-gray-500 text-[13px] font-medium">Create and organize course categories</p>
        </div>
        <button 
          onClick={() => openForm()}
          className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-sm font-bold transition-all shadow-sm flex items-center gap-2 text-[13px]"
        >
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
                <th className="p-4 font-bold">PDF</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-[13px] text-gray-900">{cat.name}</td>
                  <td className="p-4 font-medium text-[13px] text-gray-500">{cat.slug}</td>
                  <td className="p-4 font-medium text-[13px] text-gray-500">
                    {cat.careerSupportPdf ? <span className="text-green-600">Yes</span> : "No"}
                  </td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => openForm(cat)}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                    >
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