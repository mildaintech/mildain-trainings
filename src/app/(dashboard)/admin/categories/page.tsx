"use client";

import React, { useState, useEffect } from "react";
import { CategoryTable, SubcategoryTable } from "@/components/subcategory/CategoryTables";
import { CategoryForm, SubcategoryForm } from "@/components/subcategory/CategoryForms";
import { fetchCategoriesApi, fetchSubcategoriesApi, saveCategoryApi, saveSubcategoryApi,
   deleteCategoryApi } from "@/lib/categoryApi";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form" | "sublist" | "subform">("list");
  
  const [editingData, setEditingData] = useState<any>(null);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategoriesApi();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSubcategories = async (parentId: string) => {
    setLoading(true);
    try {
      const data = await fetchSubcategoriesApi(parentId);
      setSubcategories(data);
    } catch (err) {
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (formData: any) => {
    setSubmitLoading(true);
    setError("");
    try {
      await saveCategoryApi(editingData?._id || null, formData);
      await loadCategories();
      setView("list");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSaveSubcategory = async (formData: any) => {
    setSubmitLoading(true);
    setError("");
    try {
      await saveSubcategoryApi(editingData?._id || null, formData);
      await loadSubcategories(selectedParent._id);
      setView("sublist");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string, isSub: boolean) => {
    if (!window.confirm(`Delete this ${isSub ? "subcategory" : "category"}?`)) return;
    try {
      await deleteCategoryApi(id, isSub);
      if (isSub) loadSubcategories(selectedParent._id);
      else loadCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (view === "form") {
    return <CategoryForm initialData={editingData} onSave={handleSaveCategory} onCancel={() => setView("list")} loading={submitLoading} error={error} />;
  }

  if (view === "sublist") {
    return <SubcategoryTable parentCategory={selectedParent} subcategories={subcategories} loading={loading} onAdd={() => { setEditingData(null); setError(""); setView("subform"); }} onEdit={(sub: any) => { setEditingData(sub); setError(""); setView("subform"); }} onDelete={handleDelete} onBack={() => setView("list")} />;
  }

  if (view === "subform") {
    return <SubcategoryForm parentCategory={selectedParent} initialData={editingData} onSave={handleSaveSubcategory} onCancel={() => setView("sublist")} loading={submitLoading} error={error} />;
  }

  return (
    <CategoryTable 
      categories={categories} 
      loading={loading} 
      onAdd={() => { setEditingData(null); setError(""); setView("form"); }} 
      onEdit={(cat: any) => { setEditingData(cat); setError(""); setView("form"); }} 
      onDelete={handleDelete} 
      onManageSub={(cat: any) => { setSelectedParent(cat); loadSubcategories(cat._id); setView("sublist"); }} 
    />
  );
}