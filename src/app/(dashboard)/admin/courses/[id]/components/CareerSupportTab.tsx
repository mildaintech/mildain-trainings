"use client";

import { Plus, X, Upload, FileText } from "lucide-react";

export default function CareerSupportTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const addItem = () => {
    setFormData({
      ...formData,
      careerSupportItems: [...(formData.careerSupportItems || []), { title: "", image: "", imageAlt: "", imageTitle: "" }]
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = [...(formData.careerSupportItems || [])];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, careerSupportItems: updatedItems });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...(formData.careerSupportItems || [])];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, careerSupportItems: updatedItems });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(index, "image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, careerSupportBrochurePdf: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      
      <div className="border-b border-gray-100 pb-6 space-y-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Main Content Box</h2>
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Box Title</label>
          <input
            type="text"
            value={formData.careerSupportTitle || ""}
            onChange={(e) => setFormData({ ...formData, careerSupportTitle: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Box Description</label>
          <textarea
            rows={4}
            value={formData.careerSupportDescription || ""}
            onChange={(e) => setFormData({ ...formData, careerSupportDescription: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Brochure PDF (Download)</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-sm cursor-pointer hover:bg-gray-50 text-[13px] font-medium transition-colors">
              <Upload size={16} className="mr-2" /> Upload PDF
              <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
            </label>
            {formData.careerSupportBrochurePdf && (
              <span className="flex items-center text-[13px] text-green-600 font-medium">
                <FileText size={16} className="mr-1" /> PDF Uploaded
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Support Items</h2>
          <button type="button" onClick={addItem} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add Item
          </button>
        </div>
        
        <div className="space-y-6">
          {(formData.careerSupportItems || []).map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 p-5 border border-gray-200 rounded-sm relative grid grid-cols-1 md:grid-cols-12 gap-6">
              <button type="button" onClick={() => removeItem(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 z-10">
                <X size={16} />
              </button>
              
              <div className="md:col-span-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Item Image</label>
                {item.image ? (
                  <div className="relative">
                    <img src={item.image} alt="Preview" className="w-full h-24 object-cover bg-white border border-gray-200 p-1 rounded-sm" />
                    <button type="button" onClick={() => updateItem(index, "image", "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="relative border border-dashed border-gray-300 h-24 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[11px] font-bold text-gray-500 rounded-sm">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload size={16} className="mr-2" /> Upload Image
                  </div>
                )}
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={item.imageAlt || ""}
                    onChange={(e) => updateItem(index, "imageAlt", e.target.value)}
                    placeholder="Image Alt Text"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                  />
                  <input
                    type="text"
                    value={item.imageTitle || ""}
                    onChange={(e) => updateItem(index, "imageTitle", e.target.value)}
                    placeholder="Image Title Text"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                  />
                </div>
              </div>
              
              <div className="md:col-span-8 flex flex-col justify-center">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Item Title</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}