"use client";

import React, { useState, useEffect } from "react";
import SeoTable from "@/components/admin/seo/SeoTable";
import SeoForm from "@/components/admin/seo/SeoForm";
import GlobalSchemaForm from "@/components/admin/seo/GlobalSchemaForm";

export default function SeoManagementPage() {
  const [pageList, setPageList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showGlobalSchema, setShowGlobalSchema] = useState(false);

  useEffect(() => {
    fetchSeoList();
  }, []);

  const fetchSeoList = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const data = await res.json();
        const filteredData = data.filter((item: any) => 
          item.pageUrl !== "GLOBAL_SCHEMA" && !item.pageUrl.startsWith("/courses/")
        );
        setPageList(filteredData);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (item: any) => {
    const defaultData = { 
      pageUrl: item.pageUrl, 
      metaTitle: "", 
      metaDescription: "", 
      focusKeyword: "", 
      ogImage: "", 
      ogImageAlt: "",
      ogImageTitle: "",
      schemaData: "",
      defaultImage: item.defaultImage 
    };

    if (item.hasSeo && item.seoDetails) {
      setSelectedItem({
        editingId: item.seoDetails._id,
        formData: {
          pageUrl: item.seoDetails.pageUrl,
          metaTitle: item.seoDetails.metaTitle,
          metaDescription: item.seoDetails.metaDescription,
          focusKeyword: item.seoDetails.focusKeyword || "",
          ogImage: item.seoDetails.ogImage || "",
          ogImageAlt: item.seoDetails.ogImageAlt || "",
          ogImageTitle: item.seoDetails.ogImageTitle || "",
          schemaData: item.seoDetails.schemaData || "",
          defaultImage: item.defaultImage
        }
      });
    } else {
      setSelectedItem({ editingId: null, formData: defaultData });
    }
    setView("form");
  };

  const handleCloseForm = () => {
    setView("list");
    setSelectedItem(null);
  };

  const handleSuccess = () => {
    fetchSeoList();
    handleCloseForm();
  };

  return (
    <div className="w-full">
      {showGlobalSchema && (
        <GlobalSchemaForm onClose={() => setShowGlobalSchema(false)} />
      )}

      {view === "list" ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end pr-4 mt-2">
            <button 
              onClick={() => setShowGlobalSchema(true)}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2.5 px-5 rounded-md shadow-sm transition-all"
            >
              Manage Global Schema
            </button>
          </div>
          <SeoTable 
            pageList={pageList} 
            loading={loading} 
            onOpenForm={handleOpenForm} 
          />
        </div>
      ) : (
        <SeoForm 
          initialData={selectedItem.formData}
          editingId={selectedItem.editingId}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}