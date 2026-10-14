"use client";

import { X, Plus, Upload, FileSpreadsheet } from "lucide-react";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
// @ts-ignore
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

export default function CurriculumTab({ formData, setFormData }: { formData: any, setFormData: any }) {

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBulkExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15360) {
      alert("File size 15 KB se choti honi chahiye.");
      e.target.value = "";
      return;
    }

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
          alert("Invalid format. Make sure module rows start with the word 'Module'.");
        }
      } catch (error) {
        alert("Error reading Excel file.");
      }
    };
    reader.readAsBinaryString(file);
    
    e.target.value = "";
  };

  const removePdf = () => {
    setFormData({ ...formData, curriculumPdf: "" });
  };

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

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Curriculum Header Setup
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Title</label>
            <input 
              type="text" 
              value={formData.curriculumTitle || ""}
              onChange={(e) => setFormData({ ...formData, curriculumTitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Subtitle / Description</label>
            <input 
              type="text" 
              value={formData.curriculumDescription || ""}
              onChange={(e) => setFormData({ ...formData, curriculumDescription: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">
            Curriculum Modules
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="file" 
                accept=".xlsx, .xls, .csv"
                onChange={handleBulkExcelUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Upload Excel to auto-generate modules"
              />
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-[12px] font-bold rounded-sm hover:bg-green-700 transition-colors pointer-events-none"
              >
                <FileSpreadsheet size={14} /> Bulk Upload Excel (Max 15 KB)
              </button>
            </div>
            <button
              type="button"
              onClick={addModule}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm hover:bg-black transition-colors"
            >
              <Plus size={14} /> Add Module Manually
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {(formData.curriculumModules || []).map((module: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-sm p-5 bg-gray-50 relative">
              <button
                type="button"
                onClick={() => removeModule(index)}
                className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors"
              >
                <X size={16} />
              </button>
              
              <div className="space-y-4 pr-8">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Module Title</label>
                  <input
                    type="text"
                    value={module.title || ""}
                    onChange={(e) => updateModule(index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-all text-[13px]"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Content Details (Rich Text)</label>
                  <div className="bg-white">
                    <ReactQuill 
                      theme="snow" 
                      value={module.contentHtml || ""} 
                      onChange={(val: string) => updateModule(index, "contentHtml", val)} 
                      className="h-40 mb-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!formData.curriculumModules || formData.curriculumModules.length === 0) && (
            <div className="text-center p-8 border border-dashed border-gray-300 rounded-sm text-gray-500 text-[13px]">
              No modules added yet. Click "Add Module Manually" or use "Bulk Upload Excel" to start building your curriculum.
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">
          Download PDF Upload
        </h2>
        <div className="w-full md:w-1/2">
          {!formData.curriculumPdf ? (
            <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative min-h-[120px]">
              <input 
                type="file" 
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'curriculumPdf')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload size={20} className="text-gray-400 mb-2" />
              <p className="text-[11px] font-bold text-gray-600">Upload PDF File</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-sm bg-green-50 text-green-700">
              <span className="text-[13px] font-bold flex items-center gap-2">
                PDF Uploaded Successfully
              </span>
              <button 
                type="button"
                onClick={removePdf}
                className="bg-white text-red-600 py-1.5 px-3 rounded-sm hover:bg-red-50 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-red-100"
              >
                <X size={12} /> Remove
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}