"use client";

import { useState, useEffect } from "react";
import { Save, AlertCircle, X, ArrowLeft, FileText, BookOpen, Wrench, Briefcase, Users, Star, TrendingUp } from "lucide-react";
import * as XLSX from "xlsx";
import SubcategoryBasicInfoTab from "./SubcategoryBasicInfoTab";
import SubcategoryCurriculumTab from "./SubcategoryCurriculumTab";
import SubcategoryToolsTab from "./SubcategoryToolsTab";
import SubcategoryCareerSupportTab from "./SubcategoryCareerSupportTab";
import SubcategoryAdvisorTab from "./SubcategoryAdvisorTab";
import SubcategoryReviewsTab from "./SubcategoryReviewsTab";
import SubcategoryPathSalariesTab from "./SubcategoryPathSalariesTab";

const handleNameSlug = (name: string) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
});

export function CategoryForm({ initialData, onSave, onCancel, loading, error }: any) {
  const [formData, setFormData] = useState({ name: "", slug: "" });

  useEffect(() => {
    if (initialData) setFormData({ name: initialData.name || "", slug: initialData.slug || "" });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onCancel} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors border border-transparent hover:border-gray-200">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">{initialData?._id ? "Edit Category" : "Add New Category"}</h1>
        </div>
        <button type="submit" disabled={loading} className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-sm font-bold flex items-center gap-2 text-[13px] disabled:opacity-70">
          {loading ? "Saving..." : <><Save size={16} /> Save Category</>}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium"><AlertCircle size={16} />{error}</div>}

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Category Name *</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, ...handleNameSlug(e.target.value) })} className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">URL Slug *</label>
            <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 border bg-gray-50 rounded-sm outline-none text-[13px] focus:bg-white focus:ring-1 focus:ring-gray-900" />
          </div>
        </div>
      </div>
    </form>
  );
}

export function SubcategoryForm({ parentCategory, initialData, onSave, onCancel, loading, error }: any) {
  const [activeTab, setActiveTab] = useState("basic");
  const [localError, setLocalError] = useState("");
  
  const [formData, setFormData] = useState({ 
    name: "", slug: "", description: "", logoImage: "",
    curriculumTitle: "", curriculumDescription: "", curriculumModules: [] as any[], curriculumPdf: "",
    toolsHeading: "", toolsList: [] as any[],
    careerSupportTitle: "", careerSupportDescription: "", careerSupportBrochurePdf: "", careerSupportBgImage: "", careerSupportItems: [] as any[],
    advisorHeading: "", advisors: [] as any[],
    successVideoUrl: "", successVideoImage: "", successVideoImageAlt: "", successVideoImageTitle: "", reviews: [] as any[],
    pathSalariesHeading: "", pathSalariesDescription: "", pathRoles: [] as any[]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        logoImage: initialData.logoImage || "",
        curriculumTitle: initialData.curriculumTitle || "",
        curriculumDescription: initialData.curriculumDescription || "",
        curriculumModules: initialData.curriculumModules || [],
        curriculumPdf: initialData.curriculumPdf || "",
        toolsHeading: initialData.toolsHeading || "",
        toolsList: initialData.toolsList || [],
        careerSupportTitle: initialData.careerSupportTitle || "",
        careerSupportDescription: initialData.careerSupportDescription || "",
        careerSupportBrochurePdf: initialData.careerSupportBrochurePdf || "",
        careerSupportBgImage: initialData.careerSupportBgImage || "",
        careerSupportItems: initialData.careerSupportItems || [],
        advisorHeading: initialData.advisorHeading || "",
        advisors: initialData.advisors || [],
        successVideoUrl: initialData.successVideoUrl || "",
        successVideoImage: initialData.successVideoImage || "",
        successVideoImageAlt: initialData.successVideoImageAlt || "",
        successVideoImageTitle: initialData.successVideoImageTitle || "",
        reviews: initialData.reviews || [],
        pathSalariesHeading: initialData.pathSalariesHeading || "",
        pathSalariesDescription: initialData.pathSalariesDescription || "",
        pathRoles: initialData.pathRoles || []
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, parentCategory: parentCategory._id });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setLocalError("Logo image size must be less than 1MB");
        return;
      }
      setLocalError("");
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, logoImage: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setLocalError("Only PDF files are allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setLocalError("PDF file size must be less than 2MB to prevent server errors.");
        return;
      }
      setLocalError("");
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, curriculumPdf: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleBrochurePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setLocalError("Only PDF files are allowed");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setLocalError("PDF file size must be less than 2MB to prevent server errors.");
        return;
      }
      setLocalError("");
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, careerSupportBrochurePdf: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleBulkExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15360) {
      setLocalError("Excel File size should be smaller than 15 KB.");
      e.target.value = "";
      return;
    }

    setLocalError("");
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const newModules: any[] = [];
        let currentModule: any = null;
        let currentContent = "";

        data.forEach((row: any) => {
          const cellValue = row[0]; 
          if (cellValue && typeof cellValue === "string") {
            const text = cellValue.trim();
            if (/^Module/i.test(text)) {
              if (currentModule) {
                currentModule.contentHtml = `<ul>${currentContent}</ul>`;
                newModules.push(currentModule);
              }
              currentModule = { title: text, contentHtml: "" };
              currentContent = "";
            } else {
              if (currentModule) {
                currentContent += `<li>${text}</li>`;
              }
            }
          }
        });

        if (currentModule) {
          currentModule.contentHtml = `<ul>${currentContent}</ul>`;
          newModules.push(currentModule);
        }

        if (newModules.length > 0) {
          setFormData({ ...formData, curriculumModules: newModules });
        } else {
          setLocalError("Invalid Excel format. Module rows must start with the word 'Module'.");
        }
      } catch (err) {
        setLocalError("Error reading Excel file.");
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = "";
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: FileText },
    { id: "curriculum", label: "Curriculum Syllabus", icon: BookOpen },
    { id: "advisors", label: "Course Advisors", icon: Users },
    { id: "reviews", label: "Student Reviews", icon: Star },
    { id: "tools", label: "Tools Covered", icon: Wrench },
    { id: "pathSalaries", label: "Path & Salaries", icon: TrendingUp },
    { id: "careerSupport", label: "Career Support", icon: Briefcase },

  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onCancel} className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors border border-transparent hover:border-gray-200">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{initialData?._id ? "Edit Subcategory" : "Add Subcategory"}</h1>
            <p className="text-gray-500 text-[12px] font-medium">Under {parentCategory?.name}</p>
          </div>
        </div>
        <button type="button" onClick={handleSubmit} disabled={loading} className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-sm font-bold flex items-center gap-2 text-[13px] disabled:opacity-70">
          {loading ? "Saving..." : <><Save size={16} /> Save Subcategory</>}
        </button>
      </div>

      {(error || localError) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error || localError}
          <button type="button" onClick={() => setLocalError("")} className="ml-auto"><X size={14}/></button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        <div className="w-full md:w-64 flex flex-col gap-1.5 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold rounded-sm transition-all text-left border ${
                activeTab === tab.id 
                  ? "bg-[#0f172a] text-white shadow-md border-[#0f172a]" 
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? "text-white" : "text-gray-500"} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 w-full min-w-0">
          {activeTab === "basic" && (
            <SubcategoryBasicInfoTab 
              formData={formData} 
              setFormData={setFormData} 
              handleImageUpload={handleImageUpload} 
            />
          )}
          {activeTab === "curriculum" && (
            <SubcategoryCurriculumTab 
              formData={formData} 
              setFormData={setFormData} 
              handlePdfUpload={handlePdfUpload}
              handleBulkExcelUpload={handleBulkExcelUpload}
            />
          )}
          {activeTab === "tools" && (
            <SubcategoryToolsTab 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
          {activeTab === "careerSupport" && (
            <SubcategoryCareerSupportTab 
              formData={formData} 
              setFormData={setFormData} 
              handleBrochurePdfUpload={handleBrochurePdfUpload}
            />
          )}
          {activeTab === "advisors" && (
            <SubcategoryAdvisorTab 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
          {activeTab === "reviews" && (
            <SubcategoryReviewsTab 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
          {activeTab === "pathSalaries" && (
            <SubcategoryPathSalariesTab 
              formData={formData} 
              setFormData={setFormData} 
            />
          )}
        </div>
      </div>
    </div>
  );
}