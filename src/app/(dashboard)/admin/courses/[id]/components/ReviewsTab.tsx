"use client";

import { useState, useEffect } from "react";
import { Star, Video } from "lucide-react";

export default function ReviewsTab({ formData }: { formData: any }) {
  const [subcategoryData, setSubcategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData?.subcategory) {
      setLoading(true);
      fetch('/api/admin/subcategories')
        .then(res => res.json())
        .then(data => {
          const subcategories = Array.isArray(data) ? data : (data.data || []);
          const target = formData.subcategory.trim().toLowerCase();
          
          const selectedSub = subcategories.find(
            (s: any) =>
              s.name?.trim().toLowerCase() === target ||
              s.slug?.trim().toLowerCase() === target ||
              s._id === formData.subcategory
          );
          
          if (selectedSub) {
            setSubcategoryData(selectedSub);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [formData?.subcategory]);

  if (!formData?.subcategory) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-red-600 font-medium">
        Please select a subcategory in the Basic Info tab first.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full bg-white border border-gray-200 rounded-sm p-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10b981]"></div>
      </div>
    );
  }

  const reviews = subcategoryData?.reviews?.length > 0 ? subcategoryData.reviews : formData.reviews || [];
  const videoUrl = subcategoryData?.successVideoUrl || formData.successVideoUrl || "";
  const videoThumbnail = subcategoryData?.successVideoImage || formData.successVideoImage || "";

  if (reviews.length === 0 && !videoUrl) {
    return (
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-12 text-center text-gray-500 text-[13px]">
        No reviews or video found in the linked subcategory ({formData.subcategory}). 
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 space-y-8 relative">
      <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 px-4 py-1.5 text-[11px] font-bold rounded-bl-sm border-b border-l border-blue-100 uppercase tracking-wide">
        Auto-Synced (Read Only)
      </div>

      <div className="border-b border-gray-100 pb-6 pt-4 space-y-6">
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider">Video Section</h2>
        
        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">YouTube Video URL</label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm text-[13px] text-gray-700 truncate">
            {videoUrl || "No Video URL"}
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Video Thumbnail</label>
          {videoThumbnail ? (
            <img src={videoThumbnail} alt="Thumbnail" className="h-40 w-auto object-cover bg-white border border-gray-200 p-1 rounded-sm" />
          ) : (
            <div className="h-40 w-64 bg-gray-50 border border-gray-200 flex flex-col items-center justify-center rounded-sm text-gray-400">
              <Video size={32} className="mb-2" />
              <span className="text-[11px]">No Thumbnail</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider mb-4">Testimonials List</h2>
        
        <div className="space-y-6">
          {reviews.map((review: any, index: number) => (
            <div key={index} className="bg-gray-50 p-5 border border-gray-200 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-4 space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1">Profile Image</label>
                  {review.image ? (
                    <img src={review.image} alt={review.name} className="w-16 h-16 object-cover bg-white border border-gray-200 rounded-full" />
                  ) : (
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <Star size={20} className="text-gray-300" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1">Company Logo</label>
                  {review.logo ? (
                    <img src={review.logo} alt="Company Logo" className="h-10 object-contain bg-white border border-gray-200 p-1 rounded-sm" />
                  ) : (
                    <div className="h-10 w-24 bg-white border border-gray-200 rounded-sm flex items-center justify-center">
                      <span className="text-[10px] text-gray-400">No Logo</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-8 space-y-3 flex flex-col justify-center">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900">{review.name || "Anonymous"}</h3>
                  <p className="text-[12px] text-gray-600 font-medium">{review.role || "No Role Specified"}</p>
                </div>
                
                {review.quote && (
                  <div className="bg-white border-l-2 border-blue-500 p-3 text-[13px] font-semibold text-gray-800 italic rounded-r-sm shadow-sm">
                    "{review.quote}"
                  </div>
                )}
                
                <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {review.text || "No review text provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}