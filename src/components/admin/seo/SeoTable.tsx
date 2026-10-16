"use client";

import React, { useState, useEffect } from "react";
import { Search, CheckCircle, Clock, ChevronLeft, ChevronRight, Globe, BookOpen, Settings } from "lucide-react";

interface SeoTableProps {
  pageList: any[];
  loading: boolean;
  onOpenForm: (item: any) => void;
}

export default function SeoTable({ pageList, loading, onOpenForm }: SeoTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"main" | "courses">("main");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const searchFilteredPages = pageList.filter(page => 
    page.pageName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    page.pageUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabFilteredPages = searchFilteredPages.filter(page => {
    if (activeTab === "main") return !page.pageUrl.includes('/courses/');
    return page.pageUrl.includes('/courses/');
  });

  const totalPages = Math.ceil(tabFilteredPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = tabFilteredPages.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-5 border border-gray-200 rounded-sm shadow-sm gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">SEO Manager</h1>
          <p className="text-gray-500 text-[13px] font-medium mt-0.5">Control Meta tags and Schema for your entire website</p>
        </div>
        <div className="w-full md:w-80 relative">
          <span className="absolute left-3 top-2.5 text-gray-400"><Search size={16} /></span>
          <input 
            type="text" 
            placeholder="Search page name or URL..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-sm outline-none text-[13px] focus:border-gray-900 transition-all bg-gray-50 focus:bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-16 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-[13px] font-medium">Loading SEO data...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          
          <div className="flex items-center border-b border-gray-200 bg-gray-50/50 px-2 pt-2">
            <button
              onClick={() => setActiveTab("main")}
              className={`flex items-center gap-2 px-6 py-3 text-[13px] font-bold border-b-2 transition-all ${
                activeTab === "main" 
                ? "border-gray-900 text-gray-900 bg-white rounded-t-sm" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <Globe size={16} className={activeTab === "main" ? "text-blue-600" : ""} /> 
              Main Pages
              <span className="ml-1.5 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">
                {searchFilteredPages.filter(p => !p.pageUrl.includes('/courses/')).length}
              </span>
            </button>
          </div>

          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                  <th className="p-4 w-[35%]">Page Name</th>
                  <th className="p-4 w-[35%]">URL Path</th>
                  <th className="p-4 w-[15%]">SEO Status</th>
                  <th className="p-4 w-[15%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-500 text-[13px]">
                      No pages found for this category.
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-[13px] text-gray-900">{item.pageName}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[13px] text-gray-500 font-mono bg-gray-100/50 px-2 py-1 rounded-sm inline-block">
                          {item.pageUrl}
                        </div>
                      </td>
                      <td className="p-4">
                        {item.hasSeo ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm">
                            <CheckCircle size={12} /> CONFIGURED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">
                            <Clock size={12} /> PENDING
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => onOpenForm(item)} 
                          className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 rounded-sm transition-all shadow-sm group-hover:shadow-md"
                        >
                          <Settings size={14} /> {item.hasSeo ? "Manage" : "Setup"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 bg-gray-50/50">
            <div className="text-[12px] text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{tabFilteredPages.length > 0 ? startIndex + 1 : 0}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, tabFilteredPages.length)}</span> of <span className="font-bold text-gray-900">{tabFilteredPages.length}</span> entries
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-[12px] font-bold bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors shadow-sm"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              
              <div className="px-3 py-1.5 text-[12px] font-bold text-gray-700">
                Page {currentPage} of {totalPages || 1}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 border border-gray-300 rounded-sm text-[12px] font-bold bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors shadow-sm"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}