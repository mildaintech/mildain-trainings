"use client";

import { Plus, X, Upload } from "lucide-react";

export default function ToolsTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const addTool = () => {
    setFormData({
      ...formData,
      toolsList: [...(formData.toolsList || []), { logo: "", logoAlt: "", logoTitle: "" }]
    });
  };

  const removeTool = (index: number) => {
    const updatedList = [...(formData.toolsList || [])];
    updatedList.splice(index, 1);
    setFormData({ ...formData, toolsList: updatedList });
  };

  const updateTool = (index: number, field: string, value: string) => {
    const updatedList = [...(formData.toolsList || [])];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setFormData({ ...formData, toolsList: updatedList });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateTool(index, "logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Heading Settings</h2>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Main Heading</label>
          <input
            type="text"
            value={formData.toolsHeading || ""}
            onChange={(e) => setFormData({ ...formData, toolsHeading: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Tools List</h2>
          <button type="button" onClick={addTool} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add Tool
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(formData.toolsList || []).map((tool: any, index: number) => (
            <div key={`tool-${index}`} className="bg-gray-50 p-4 border border-gray-200 rounded-sm relative">
              <button type="button" onClick={() => removeTool(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1">
                <X size={16} />
              </button>
              <div className="mb-4">
                {tool.logo ? (
                  <div className="relative">
                    <img src={tool.logo} alt="Preview" className="w-full h-24 object-contain bg-white border border-gray-200 p-2 rounded-sm" />
                    <button type="button" onClick={() => updateTool(index, "logo", "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="relative border border-dashed border-gray-300 h-24 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[11px] font-bold text-gray-500 rounded-sm">
                    <input type="file" accept="image/*" onChange={(e) => handleLogoUpload(e, index)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <Upload size={16} className="mr-2" /> Upload Logo
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={tool.logoAlt || ""}
                  onChange={(e) => updateTool(index, "logoAlt", e.target.value)}
                  placeholder="Alt Text"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                />
                <input
                  type="text"
                  value={tool.logoTitle || ""}
                  onChange={(e) => updateTool(index, "logoTitle", e.target.value)}
                  placeholder="Title Text"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}