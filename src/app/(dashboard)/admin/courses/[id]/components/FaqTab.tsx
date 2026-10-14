"use client";

import { Plus, X, Link as LinkIcon } from "lucide-react";

export default function FaqTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...(formData.faqs || []), { question: "", description: "", bulletPoints: [] }]
    });
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = [...(formData.faqs || [])];
    updatedFaqs.splice(index, 1);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const updatedFaqs = [...(formData.faqs || [])];
    updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const addBullet = (faqIndex: number) => {
    const updatedFaqs = [...(formData.faqs || [])];
    if (!updatedFaqs[faqIndex].bulletPoints) {
      updatedFaqs[faqIndex].bulletPoints = [];
    }
    updatedFaqs[faqIndex].bulletPoints.push({ text: "", linkText: "", linkUrl: "" });
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const removeBullet = (faqIndex: number, bulletIndex: number) => {
    const updatedFaqs = [...(formData.faqs || [])];
    updatedFaqs[faqIndex].bulletPoints.splice(bulletIndex, 1);
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  const updateBullet = (faqIndex: number, bulletIndex: number, field: string, value: string) => {
    const updatedFaqs = [...(formData.faqs || [])];
    const updatedBullets = [...(updatedFaqs[faqIndex].bulletPoints || [])];
    updatedBullets[bulletIndex] = { ...updatedBullets[bulletIndex], [field]: value };
    updatedFaqs[faqIndex] = { ...updatedFaqs[faqIndex], bulletPoints: updatedBullets };
    setFormData({ ...formData, faqs: updatedFaqs });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">FAQ Header</h2>
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Main Heading</label>
          <input
            type="text"
            value={formData.faqHeading || ""}
            onChange={(e) => setFormData({ ...formData, faqHeading: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">FAQ List</h2>
          <button type="button" onClick={addFaq} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add FAQ
          </button>
        </div>
        
        <div className="space-y-6">
          {(formData.faqs || []).map((faq: any, faqIndex: number) => (
            <div key={`faq-${faqIndex}`} className="bg-gray-50 p-5 border border-gray-200 rounded-sm relative">
              <button type="button" onClick={() => removeFaq(faqIndex)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1">
                <X size={18} />
              </button>
              
              <div className="space-y-5 pr-8">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question || ""}
                    onChange={(e) => updateFaq(faqIndex, "question", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                  />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    rows={3}
                    value={faq.description || ""}
                    onChange={(e) => updateFaq(faqIndex, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                  />
                </div>

                <div className="bg-white p-4 border border-gray-200 rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-[12px] font-bold text-gray-700">Bullet Points</label>
                    <button type="button" onClick={() => addBullet(faqIndex)} className="text-blue-600 hover:text-blue-800 text-[11px] font-bold flex items-center gap-1">
                      <Plus size={12} /> Add Point
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {(faq.bulletPoints || []).map((bullet: any, bIndex: number) => (
                      <div key={`bullet-${bIndex}`} className="flex gap-3 items-start relative bg-gray-50 p-3 border border-gray-100 rounded-sm">
                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            placeholder="Bullet Point Text"
                            value={bullet.text || ""}
                            onChange={(e) => updateBullet(faqIndex, bIndex, "text", e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="URL Link (Optional)"
                              value={bullet.linkUrl || ""}
                              onChange={(e) => updateBullet(faqIndex, bIndex, "linkUrl", e.target.value)}
                              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                            />
                            <input
                              type="text"
                              placeholder="Word to link (Leave blank to link full text)"
                              value={bullet.linkText || ""}
                              onChange={(e) => updateBullet(faqIndex, bIndex, "linkText", e.target.value)}
                              className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
                            />
                          </div>
                        </div>
                        <button type="button" onClick={() => removeBullet(faqIndex, bIndex)} className="text-red-500 hover:text-red-700 mt-1">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
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