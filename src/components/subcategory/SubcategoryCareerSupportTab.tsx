"use client";

import React from "react";
import { Plus, X, Upload, FileText, Download } from "lucide-react";

export default function SubcategoryCareerSupportTab({ formData, setFormData, handleBrochurePdfUpload }: { formData: any, setFormData: any, handleBrochurePdfUpload: (e: any) => void }) {

  const addItem = () => {
    setFormData({
      ...formData,
      careerSupportItems: [...(formData.careerSupportItems || []), { title: "", image: "", imageAlt: "", imageTitle: "" }]
    });
  };

  const removeItem = (index: number) => {
    const updated = [...(formData.careerSupportItems || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, careerSupportItems: updated });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...(formData.careerSupportItems || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, careerSupportItems: updated });
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/webp", 0.8);
            resolve(compressedDataUrl);
          } else {
            resolve(event.target?.result as string);
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleItemImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2MB.");
      e.target.value = "";
      return;
    }

    try {
      if (file.type === "image/svg+xml") {
        if (file.size > 100 * 1024) {
          alert("SVG file size must be under 100KB.");
          e.target.value = "";
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          updateItem(index, "image", reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const compressedImage = await compressImage(file);
        updateItem(index, "image", compressedImage);
      }
    } catch (error) {
      alert("Failed to process image. Please try another file.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <div className="border-b border-gray-100 pb-6 space-y-4">
        <h2 className="text-[14px] font-bold text-gray-900 border-b border-gray-100 pb-2">Career Support Setup</h2>
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Title</label>
          <input
            type="text"
            value={formData.careerSupportTitle || ""}
            onChange={(e) => setFormData({ ...formData, careerSupportTitle: e.target.value })}
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px]"
            placeholder="e.g. Comprehensive Career Support"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Description</label>
          <textarea
            value={formData.careerSupportDescription || ""}
            onChange={(e) => setFormData({ ...formData, careerSupportDescription: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border rounded-sm outline-none text-[13px]"
            placeholder="Describe the career support features..."
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Career Brochure PDF (Max 2MB)</label>
          {!formData.careerSupportBrochurePdf ? (
            <div className="border border-dashed border-gray-300 rounded-sm p-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer relative min-h-[80px]">
              <input type="file" accept=".pdf" onChange={handleBrochurePdfUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload size={18} className="text-gray-400 mb-1" />
              <p className="text-[11px] font-bold text-gray-600">Upload Brochure PDF</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border border-green-200 rounded-sm bg-green-50 text-green-700">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold flex items-center gap-2"><FileText size={16} /> Brochure Uploaded</span>
                <a href={formData.careerSupportBrochurePdf} download="career_brochure.pdf" className="bg-white text-green-700 py-1 px-3 rounded-sm hover:bg-green-100 text-[11px] font-bold flex items-center gap-1 shadow-sm border border-green-200">
                  <Download size={12} /> Download PDF
                </a>
              </div>
              <button type="button" onClick={() => setFormData({ ...formData, careerSupportBrochurePdf: "" })} className="bg-white text-red-600 py-1 px-2 rounded-sm hover:bg-red-50 text-[11px] font-bold border border-red-100">
                <X size={12} /> Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-bold text-gray-800">Support Feature Items</h3>
          <button type="button" onClick={addItem} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5 hover:bg-black">
            <Plus size={14} /> Add Item
          </button>
        </div>

        <div className="space-y-4">
          {(formData.careerSupportItems || []).map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-sm relative space-y-4">
              <button type="button" onClick={() => removeItem(index)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1">
                <X size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Feature Icon / Image (Auto-Optimized)</label>
                  {item.image ? (
                    <div className="relative w-full h-20 bg-white border border-gray-200 rounded-sm p-1">
                      <img src={item.image} alt="Preview" className="w-full h-full object-contain" />
                      <button type="button" onClick={() => updateItem(index, "image", "")} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5">
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative border border-dashed border-gray-300 h-20 bg-white flex items-center justify-center cursor-pointer text-[11px] font-bold text-gray-500 rounded-sm">
                      <input type="file" accept="image/*" onChange={(e) => handleItemImageUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Upload size={14} className="mr-1" /> Upload Image
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 space-y-3">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1">Item Title</label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => updateItem(index, "title", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                      placeholder="e.g. 1on1 Mock Interviews"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}