"use client";

import { Plus, X, Upload } from "lucide-react";

export default function AdvisorTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const addAdvisor = () => {
    setFormData({
      ...formData,
      advisors: [...(formData.advisors || []), { name: "", description: "", image: "", imageAlt: "", imageTitle: "" }]
    });
  };

  const removeAdvisor = (index: number) => {
    const updatedAdvisors = [...(formData.advisors || [])];
    updatedAdvisors.splice(index, 1);
    setFormData({ ...formData, advisors: updatedAdvisors });
  };

  const updateAdvisor = (index: number, field: string, value: string) => {
    const updatedAdvisors = [...(formData.advisors || [])];
    updatedAdvisors[index] = { ...updatedAdvisors[index], [field]: value };
    setFormData({ ...formData, advisors: updatedAdvisors });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateAdvisor(index, "image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Heading Settings</h2>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Highlight Text (e.g., PMP®)</label>
          <input
            type="text"
            value={formData.advisorHeading || ""}
            onChange={(e) => setFormData({ ...formData, advisorHeading: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Advisors List</h2>
          <button type="button" onClick={addAdvisor} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add Advisor
          </button>
        </div>
        
        <div className="space-y-6">
          {(formData.advisors || []).map((advisor: any, index: number) => (
            <div key={`advisor-${index}`} className="bg-gray-50 p-5 border border-gray-200 rounded-sm relative grid grid-cols-1 md:grid-cols-12 gap-6">
              <button type="button" onClick={() => removeAdvisor(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 z-10">
                <X size={16} />
              </button>
              
              <div className="md:col-span-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Advisor Image</label>
                {advisor.image ? (
                  <div className="relative">
                    <img src={advisor.image} alt="Preview" className="w-full h-32 object-contain bg-white border border-gray-200 p-2 rounded-sm" />
                    <button type="button" onClick={() => updateAdvisor(index, "image", "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="relative border border-dashed border-gray-300 h-32 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[11px] font-bold text-gray-500 rounded-sm">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload size={16} className="mr-2" /> Upload Image
                  </div>
                )}
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={advisor.imageAlt || ""}
                    onChange={(e) => updateAdvisor(index, "imageAlt", e.target.value)}
                    placeholder="Image Alt Text"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                  />
                  <input
                    type="text"
                    value={advisor.imageTitle || ""}
                    onChange={(e) => updateAdvisor(index, "imageTitle", e.target.value)}
                    placeholder="Image Title Text"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                  />
                </div>
              </div>
              
              <div className="md:col-span-8 space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Advisor Name</label>
                  <input
                    type="text"
                    value={advisor.name || ""}
                    onChange={(e) => updateAdvisor(index, "name", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={advisor.description || ""}
                    onChange={(e) => updateAdvisor(index, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}