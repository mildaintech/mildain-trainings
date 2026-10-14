"use client";

import React, { useState, useEffect } from "react";
import { Search, Mail, Phone, Calendar, MapPin, Inbox, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [copiedData, setCopiedData] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const res = await fetch("/api/inquiries");
        if (res.ok) {
          const data = await res.json();
          setInquiries(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter((item) =>
    item.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: "numeric", month: "short", day: "numeric", 
      hour: "2-digit", minute: "2-digit" 
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedData(text);
    setTimeout(() => setCopiedData(null), 2000);
  };

  return (
    <div className="p-6 w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Inquiries</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track all career guidance requests</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email or country..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col flex-grow">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                <th className="px-6 py-4 whitespace-nowrap">Student Details</th>
                <th className="px-6 py-4 whitespace-nowrap">Contact Info</th>
                <th className="px-6 py-4 whitespace-nowrap">Country</th>
                <th className="px-6 py-4 whitespace-nowrap w-[200px]">Message</th>
                <th className="px-6 py-4 whitespace-nowrap">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-slate-200 rounded-full"></div><div className="h-4 bg-slate-200 rounded w-24"></div></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32 mb-2"></div><div className="h-3 bg-slate-100 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-5 bg-slate-200 rounded-full w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-full"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                  </tr>
                ))
              ) : currentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Inbox className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">No inquiries found</h3>
                      <p className="text-sm text-slate-500">We couldn't find anything matching your search.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentInquiries.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold text-xs shadow-sm shrink-0">
                          {getInitials(item.fullName)}
                        </div>
                        <div className="font-medium text-slate-900 capitalize truncate max-w-[150px]">
                          {item.fullName}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 group/copy">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-sm text-slate-700 truncate max-w-[180px]">{item.email}</span>
                          <button onClick={() => handleCopy(item.email)} className="opacity-0 group-hover/copy:opacity-100 transition-opacity">
                            {copiedData === item.email ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 cursor-pointer" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 group/copy">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-sm text-slate-700">{item.phone}</span>
                          <button onClick={() => handleCopy(item.phone)} className="opacity-0 group-hover/copy:opacity-100 transition-opacity">
                            {copiedData === item.phone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 cursor-pointer" />}
                          </button>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {item.country ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          <MapPin className="w-3 h-3" />
                          {item.country}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700 max-w-[200px] truncate cursor-pointer" title={item.message || "No message provided"}>
                        {item.message || <span className="text-slate-400 italic">No message provided</span>}
                      </p>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        {formatDate(item.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredInquiries.length > 0 && (
          <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-slate-300 rounded-md text-sm text-slate-700 py-1 pl-2 pr-6 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600 font-medium">
                Showing <span className="font-semibold text-slate-900">{filteredInquiries.length === 0 ? 0 : startIndex + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(startIndex + itemsPerPage, filteredInquiries.length)}</span> of <span className="font-semibold text-slate-900">{filteredInquiries.length}</span>
              </p>
              
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}