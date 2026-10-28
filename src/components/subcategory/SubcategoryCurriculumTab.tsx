"use client";

import React from "react";
import { X, Upload, Plus, FileSpreadsheet, Download } from "lucide-react";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
// @ts-ignore
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

export default function SubcategoryCurriculumTab({ formData, setFormData, handlePdfUpload, handleBulkExcelUpload }: { formData: any, setFormData: any, handlePdfUpload: (e: any) => void, handleBulkExcelUpload: (e: any) => void }) {
  
  const addModule = () => {
    setFormData({
      ...formData,
      curriculumModules: [...(formData.curriculumModules || []), { title: "", contentHtml: "" }]
    });
  };

  const updateModule = (index: number, field: string, value: string) => {
    const updatedModules = [...(formData.curriculumModules || [])];
    updatedModules[index][field] = value;
    setFormData({ ...formData, curriculumModules: updatedModules });
  };

  const removeModule = (index: number) => {
    const updatedModules = [...(formData.curriculumModules || [])];
    updatedModules.splice(index, 1);
    setFormData({ ...formData, curriculumModules: updatedModules });
  };

  const downloadExcelBackup = () => {
    const modules = formData.curriculumModules || [];
    if (modules.length === 0) {
      alert("No modules available to download.");
      return;
    }

    const dataToExport = modules.map((mod: any) => ({
      "Module Title": mod.title,
      "Content HTML": mod.contentHtml
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CurriculumBackup");
    XLSX.writeFile(wb, "curriculum_backup.xlsx");
  };

  const handleSafePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit. Please upload a smaller file to prevent server errors.");
        e.target.value = "";
        return;
      }
      handlePdfUpload(e);
    }
  };

  const handleSafeExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024) {
        alert("File size exceeds 50KB limit. Please upload a smaller file to prevent server errors.");
        e.target.value = "";
        return;
      }
      handleBulkExcelUpload(e);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <h2 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2">Curriculum Setup (Syllabus)</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Curriculum Section Title</label>
          <input type="text" value={formData.curriculumTitle} onChange={(e) => setFormData({ ...formData, curriculumTitle: e.target.value })} className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900" placeholder="e.g. CISA Curriculum" />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Curriculum Description</label>
          <input type="text" value={formData.curriculumDescription} onChange={(e) => setFormData({ ...formData, curriculumDescription: e.target.value })} className="w-full px-3 py-2 border rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900" placeholder="Overview of the syllabus..." />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <h3 className="text-[13px] font-bold text-gray-800">Curriculum Modules</h3>
          <div className="flex items-center gap-3">
            {(formData.curriculumModules && formData.curriculumModules.length > 0) && (
              <button type="button" onClick={downloadExcelBackup} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-[12px] font-bold rounded-sm hover:bg-blue-700 transition-colors">
                <Download size={14} /> Download Backup
              </button>
            )}
            <div className="relative">
              <input type="file" accept=".xlsx, .xls, .csv" onChange={handleSafeExcelUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload Excel" />
              <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-[12px] font-bold rounded-sm hover:bg-green-700 pointer-events-none">
                <FileSpreadsheet size={14} /> Bulk Upload Excel (Max 50 KB)
              </button>
            </div>
            <button type="button" onClick={addModule} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm hover:bg-black transition-colors">
              <Plus size={14} /> Add Module Manually
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {(formData.curriculumModules || []).map((module: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-sm p-5 bg-gray-50 relative">
              <button type="button" onClick={() => removeModule(index)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors">
                <X size={16} />
              </button>
              <div className="space-y-4 pr-8">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Module Title</label>
                  <input type="text" value={module.title || ""} onChange={(e) => updateModule(index, "title", e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] focus:ring-1 focus:ring-gray-900" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Content Details (Rich Text)</label>
                  <div className="bg-white">
                    <ReactQuill theme="snow" value={module.contentHtml || ""} onChange={(val: string) => updateModule(index, "contentHtml", val)} className="h-40 mb-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!formData.curriculumModules || formData.curriculumModules.length === 0) && (
            <div className="text-center p-8 border border-dashed border-gray-300 rounded-sm text-gray-500 text-[13px]">
              No modules added yet. Add manually or upload Excel.
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[13px] font-bold text-gray-800 mb-4">Curriculum PDF Download</h3>
        <div className="w-full md:w-1/2">
          {!formData.curriculumPdf ? (
            <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer relative min-h-[100px]">
              <input type="file" accept=".pdf" onChange={handleSafePdfUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload size={20} className="text-gray-400 mb-2" />
              <p className="text-[11px] font-bold text-gray-600">Upload PDF File (Max 2MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-green-200 rounded-sm bg-green-50 text-green-700">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold">PDF Uploaded Successfully</span>
                <a href={formData.curriculumPdf} download="curriculum.pdf" className="bg-white text-green-700 py-1 px-3 rounded-sm hover:bg-green-100 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-green-200">
                  <Download size={12} /> Download
                </a>
              </div>
              <button type="button" onClick={() => setFormData({ ...formData, curriculumPdf: "" })} className="bg-white text-red-600 py-1 px-2 rounded-sm hover:bg-red-50 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-red-100">
                <X size={12} /> Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}