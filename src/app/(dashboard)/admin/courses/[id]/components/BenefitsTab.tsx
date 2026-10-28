"use client";

import React, { useState } from "react";
import { Plus, X, Upload, AlertCircle } from "lucide-react";

export default function BenefitsTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const [error, setError] = useState("");

  const addTab = () => {
    setFormData({
      ...formData,
      benefitsTabs: [
        ...(formData.benefitsTabs || []),
        { 
          tabName: "", salaryMinINR: "", salaryAvgINR: "", salaryMaxINR: "",
          salaryMinUSD: "", salaryAvgUSD: "", salaryMaxUSD: "", 
          demandValue: "", demandText: "", companies: [] 
        }
      ]
    });
  };

  const removeTab = (index: number) => {
    const updatedTabs = [...(formData.benefitsTabs || [])];
    updatedTabs.splice(index, 1);
    setFormData({ ...formData, benefitsTabs: updatedTabs });
  };

  const updateTab = (index: number, field: string, value: any) => {
    const updatedTabs = [...(formData.benefitsTabs || [])];
    updatedTabs[index] = { ...updatedTabs[index], [field]: value };
    setFormData({ ...formData, benefitsTabs: updatedTabs });
  };

  const updateCompany = (tabIndex: number, compIndex: number, field: string, value: string) => {
    const updatedTabs = [...(formData.benefitsTabs || [])];
    const updatedCompanies = [...(updatedTabs[tabIndex].companies || [])];
    updatedCompanies[compIndex] = { ...updatedCompanies[compIndex], [field]: value };
    updatedTabs[tabIndex] = { ...updatedTabs[tabIndex], companies: updatedCompanies };
    setFormData({ ...formData, benefitsTabs: updatedTabs });
  };

  const addCompany = (tabIndex: number) => {
    const updatedTabs = [...(formData.benefitsTabs || [])];
    if (!updatedTabs[tabIndex].companies) updatedTabs[tabIndex].companies = [];
    updatedTabs[tabIndex].companies.push({ name: "", logo: "", logoAlt: "", logoTitle: "" });
    setFormData({ ...formData, benefitsTabs: updatedTabs });
  };

  const removeCompany = (tabIndex: number, compIndex: number) => {
    const updatedTabs = [...(formData.benefitsTabs || [])];
    updatedTabs[tabIndex].companies.splice(compIndex, 1);
    setFormData({ ...formData, benefitsTabs: updatedTabs });
    setError(""); // Clear error on removal
  };

  const handleCompanyLogo = (e: React.ChangeEvent<HTMLInputElement>, tIndex: number, cIndex: number) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit file size to 1MB to prevent Vercel Payload Too Large error
      if (file.size > 1 * 1024 * 1024) {
        setError(`Logo for Company ${cIndex + 1} must be less than 1MB`);
        return;
      }
      
      setError(""); // Clear error if size is valid
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCompany(tIndex, cIndex, "logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      
      {/* Global Error Display for Image Uploads */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
          <button onClick={() => setError("")} className="ml-auto"><X size={14}/></button>
        </div>
      )}

      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Header Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Main Heading</label>
            <input 
              type="text" value={formData.benefitsHeading || ""}
              onChange={(e) => setFormData({ ...formData, benefitsHeading: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description Paragraph</label>
            <textarea 
              rows={3} value={formData.benefitsDescription || ""}
              onChange={(e) => setFormData({ ...formData, benefitsDescription: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Role / Profile Tabs</h2>
          <button type="button" onClick={addTab} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add Role Tab
          </button>
        </div>

        <div className="space-y-6">
          {(formData.benefitsTabs || []).map((tab: any, tIndex: number) => (
            <div key={`tab-${tIndex}`} className="p-4 bg-gray-50 border border-gray-200 rounded-sm relative">
              <button type="button" onClick={() => removeTab(tIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><X size={16}/></button>
              
              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Tab Name (Role Title)</label>
                <input type="text" value={tab.tabName || ""} onChange={(e) => updateTab(tIndex, "tabName", e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-sm text-[13px] outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <div className="bg-white p-3 border border-gray-200 rounded-sm">
                    <h4 className="text-[11px] font-bold text-indigo-600 uppercase mb-3">Salary Stats (INR - India)</h4>
                    <div className="space-y-2">
                      <input type="text" value={tab.salaryMinINR || ""} onChange={(e) => updateTab(tIndex, "salaryMinINR", e.target.value)} placeholder="Min (e.g. ₹10L)" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                      <input type="text" value={tab.salaryAvgINR || ""} onChange={(e) => updateTab(tIndex, "salaryAvgINR", e.target.value)} placeholder="Average (e.g. ₹17L)" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                      <input type="text" value={tab.salaryMaxINR || ""} onChange={(e) => updateTab(tIndex, "salaryMaxINR", e.target.value)} placeholder="Max (e.g. ₹25L)" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 border border-gray-200 rounded-sm">
                    <h4 className="text-[11px] font-bold text-green-600 uppercase mb-3">Salary Stats (USD - Global)</h4>
                    <div className="space-y-2">
                      <input type="text" value={tab.salaryMinUSD || ""} onChange={(e) => updateTab(tIndex, "salaryMinUSD", e.target.value)} placeholder="Min (e.g. $40K)" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                      <input type="text" value={tab.salaryAvgUSD || ""} onChange={(e) => updateTab(tIndex, "salaryAvgUSD", e.target.value)} placeholder="Average (e.g. $80K)" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                      <input type="text" value={tab.salaryMaxUSD || ""} onChange={(e) => updateTab(tIndex, "salaryMaxUSD", e.target.value)} placeholder="Max (e.g. $120K)" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 border border-gray-200 rounded-sm">
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase mb-3">Demand Growth</h4>
                    <div className="space-y-2">
                      <input type="text" value={tab.demandValue || ""} onChange={(e) => updateTab(tIndex, "demandValue", e.target.value)} placeholder="e.g. 33% Increase" className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                      <textarea rows={2} value={tab.demandText || ""} onChange={(e) => updateTab(tIndex, "demandText", e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-sm text-[12px] outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 border border-gray-200 rounded-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase">Hiring Companies Logos</h4>
                    <button type="button" onClick={() => addCompany(tIndex)} className="text-blue-600 hover:text-blue-800 text-[11px] font-bold flex items-center gap-1"><Plus size={12}/> Add Company</button>
                  </div>
                  
                  <div className="space-y-4">
                    {(tab.companies || []).map((comp: any, cIndex: number) => (
                      <div key={`comp-${cIndex}`} className="bg-gray-50 p-3 rounded-sm border border-gray-200 relative">
                        <button type="button" onClick={() => removeCompany(tIndex, cIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"><X size={14}/></button>
                        
                        <div className="grid grid-cols-1 gap-2 mb-2 pr-6">
                          <input type="text" value={comp.name || ""} onChange={(e) => updateCompany(tIndex, cIndex, "name", e.target.value)} placeholder="Company Name" className="w-full p-2 border border-gray-300 rounded-sm text-[12px] outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <input type="text" value={comp.logoAlt || ""} onChange={(e) => updateCompany(tIndex, cIndex, "logoAlt", e.target.value)} placeholder="Logo Alt Text" className="w-full p-2 border border-gray-300 rounded-sm text-[12px] outline-none" />
                          <input type="text" value={comp.logoTitle || ""} onChange={(e) => updateCompany(tIndex, cIndex, "logoTitle", e.target.value)} placeholder="Logo Title" className="w-full p-2 border border-gray-300 rounded-sm text-[12px] outline-none" />
                        </div>
                        
                        <div className="flex items-center gap-3">
                           {comp.logo ? (
                              <div className="relative">
                                 <img src={comp.logo} alt="Preview" className="h-10 object-contain bg-white border border-gray-200 p-1" />
                                 <button type="button" onClick={() => updateCompany(tIndex, cIndex, "logo", "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={10}/></button>
                              </div>
                           ) : (
                              <div className="relative border border-dashed border-gray-300 px-3 py-2 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[11px] font-bold text-gray-500">
                                <input type="file" accept="image/*" onChange={(e) => handleCompanyLogo(e, tIndex, cIndex)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <Upload size={14} className="mr-1.5" /> Upload Logo (Max 1MB)
                              </div>
                           )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      <h1 className="bg-background/5 text-stone-700 text-3xl sm-text-4xl font-bold py-16 mt-6 width-[1400] text-justify ">
       CISA
      </h1>
    </div>
  );
}