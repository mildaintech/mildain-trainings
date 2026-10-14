"use client";

import { Plus, X, Upload } from "lucide-react";

export default function ReviewsTab({ formData, setFormData }: { formData: any, setFormData: any }) {
  const addReview = () => {
    setFormData({
      ...formData,
      reviews: [...(formData.reviews || []), { name: "", role: "", quote: "", text: "", image: "", imageAlt: "", imageTitle: "", logo: "", logoAlt: "", logoTitle: "" }]
    });
  };

  const removeReview = (index: number) => {
    const updatedReviews = [...(formData.reviews || [])];
    updatedReviews.splice(index, 1);
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const updateReview = (index: number, field: string, value: string) => {
    const updatedReviews = [...(formData.reviews || [])];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: "image" | "logo") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateReview(index, type, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, successVideoImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8">
      
      <div className="border-b border-gray-100 pb-6 space-y-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Video Section Settings</h2>
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">YouTube Video URL</label>
          <input
            type="text"
            value={formData.successVideoUrl || ""}
            onChange={(e) => setFormData({ ...formData, successVideoUrl: e.target.value })}
            placeholder="e.g. https://www.youtube.com/embed/XXXXXXX"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
          />
        </div>

        <div>
          <label className="block text-[12px] font-bold text-gray-700 mb-1">Video Thumbnail Image</label>
          {formData.successVideoImage ? (
            <div className="relative w-full max-w-sm">
              <img src={formData.successVideoImage} alt="Preview" className="w-full h-40 object-cover bg-white border border-gray-200 p-1 rounded-sm" />
              <button type="button" onClick={() => setFormData({ ...formData, successVideoImage: "" })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="relative w-full max-w-sm border border-dashed border-gray-300 h-40 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[11px] font-bold text-gray-500 rounded-sm">
              <input type="file" accept="image/*" onChange={handleVideoImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload size={16} className="mr-2" /> Upload Thumbnail
            </div>
          )}
          <div className="mt-3 grid grid-cols-2 gap-4 max-w-sm">
            <input
              type="text"
              value={formData.successVideoImageAlt || ""}
              onChange={(e) => setFormData({ ...formData, successVideoImageAlt: e.target.value })}
              placeholder="Thumbnail Alt Text"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
            />
            <input
              type="text"
              value={formData.successVideoImageTitle || ""}
              onChange={(e) => setFormData({ ...formData, successVideoImageTitle: e.target.value })}
              placeholder="Thumbnail Title Text"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[12px]"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Testimonials List</h2>
          <button type="button" onClick={addReview} className="px-3 py-1.5 bg-gray-900 text-white text-[12px] font-bold rounded-sm flex items-center gap-1.5">
            <Plus size={14} /> Add Review
          </button>
        </div>
        
        <div className="space-y-6">
          {(formData.reviews || []).map((review: any, index: number) => (
            <div key={index} className="bg-gray-50 p-5 border border-gray-200 rounded-sm relative grid grid-cols-1 md:grid-cols-12 gap-6">
              <button type="button" onClick={() => removeReview(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 z-10">
                <X size={16} />
              </button>
              
              <div className="md:col-span-4 space-y-6">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Profile Image</label>
                  {review.image ? (
                    <div className="relative">
                      <img src={review.image} alt="Preview" className="w-16 h-16 object-cover bg-white border border-gray-200 rounded-full" />
                      <button type="button" onClick={() => updateReview(index, "image", "")} className="absolute -top-2 left-12 bg-red-500 text-white rounded-full p-1">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative border border-dashed border-gray-300 w-16 h-16 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[10px] font-bold text-gray-500 rounded-full">
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index, "image")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Upload size={14} />
                    </div>
                  )}
                  <div className="mt-2 space-y-2">
                    <input type="text" value={review.imageAlt || ""} onChange={(e) => updateReview(index, "imageAlt", e.target.value)} placeholder="Alt Text" className="w-full px-2 py-1 bg-white border border-gray-300 rounded-sm outline-none text-[11px]" />
                    <input type="text" value={review.imageTitle || ""} onChange={(e) => updateReview(index, "imageTitle", e.target.value)} placeholder="Title Text" className="w-full px-2 py-1 bg-white border border-gray-300 rounded-sm outline-none text-[11px]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Company Logo</label>
                  {review.logo ? (
                    <div className="relative">
                      <img src={review.logo} alt="Preview" className="h-10 object-contain bg-white border border-gray-200 p-1 rounded-sm" />
                      <button type="button" onClick={() => updateReview(index, "logo", "")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="relative border border-dashed border-gray-300 h-10 w-24 bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 text-[10px] font-bold text-gray-500 rounded-sm">
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index, "logo")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Upload size={14} />
                    </div>
                  )}
                  <div className="mt-2 space-y-2">
                    <input type="text" value={review.logoAlt || ""} onChange={(e) => updateReview(index, "logoAlt", e.target.value)} placeholder="Logo Alt Text" className="w-full px-2 py-1 bg-white border border-gray-300 rounded-sm outline-none text-[11px]" />
                    <input type="text" value={review.logoTitle || ""} onChange={(e) => updateReview(index, "logoTitle", e.target.value)} placeholder="Logo Title Text" className="w-full px-2 py-1 bg-white border border-gray-300 rounded-sm outline-none text-[11px]" />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-8 space-y-3 flex flex-col justify-center">
                <input
                  type="text"
                  value={review.name || ""}
                  onChange={(e) => updateReview(index, "name", e.target.value)}
                  placeholder="Student Name"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] font-bold"
                />
                <input
                  type="text"
                  value={review.role || ""}
                  onChange={(e) => updateReview(index, "role", e.target.value)}
                  placeholder="Job Role & Company (e.g. Program Manager, Microsoft)"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px]"
                />
                <input
                  type="text"
                  value={review.quote || ""}
                  onChange={(e) => updateReview(index, "quote", e.target.value)}
                  placeholder="Highlight Quote (e.g. 'Capstone projects boosted my skills')"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm outline-none text-[13px] font-medium"
                />
                <textarea
                  rows={4}
                  value={review.text || ""}
                  onChange={(e) => updateReview(index, "text", e.target.value)}
                  placeholder="Full Review Text"
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