'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function AdminCorporateInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/admin/corporate-inquiries');
        const data = await res.json();
        if (data.success) {
          setInquiries(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Corporate Inquiries</h1>
            <p className="text-gray-500 text-sm">Manage and track all corporate training requests</p>
          </div>
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0AA34F] transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 md:p-6">Client Details</th>
                <th className="p-4 md:p-6">Contact Info</th>
                <th className="p-4 md:p-6">Country</th>
                <th className="p-4 md:p-6 min-w-[200px]">Message</th>
                <th className="p-4 md:p-6">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Loading inquiries...</td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">No corporate inquiries found.</td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {inquiry.fullName?.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">{inquiry.fullName}</span>
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Mail className="w-3.5 h-3.5" />
                          {inquiry.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Phone className="w-3.5 h-3.5" />
                          {inquiry.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 w-fit px-3 py-1 rounded-full border border-gray-200">
                        <MapPin className="w-3.5 h-3.5" />
                        {inquiry.country || "-"}
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message || "-"}</p>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(inquiry.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}