'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Trash2, Download, RefreshCw, Mail, Phone, Globe } from 'lucide-react';

interface ContactInquiryItem {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  subject?: string;
  message?: string;
  source?: string;
  createdAt?: string;
}

export default function AdminContactInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact-inquiries', { cache: 'no-store' });
      const data = res.ok ? await res.json() : [];
      setInquiries(Array.isArray(data) ? data : data.data || []);
    } catch {
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const subjects = useMemo(() => {
    const set = new Set<string>();
    inquiries.forEach((item) => {
      if (item.subject) set.add(item.subject);
    });
    return Array.from(set);
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return inquiries.filter((item) => {
      const matchesSubject =
        subjectFilter === 'ALL' || (item.subject || '') === subjectFilter;
      if (!matchesSubject) return false;
      if (!q) return true;

      return (
        (item.fullName || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q) ||
        (item.phone || '').toLowerCase().includes(q) ||
        (item.country || '').toLowerCase().includes(q) ||
        (item.subject || '').toLowerCase().includes(q) ||
        (item.message || '').toLowerCase().includes(q)
      );
    });
  }, [inquiries, searchQuery, subjectFilter]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this inquiry?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/contact-inquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCsv = () => {
    const headers = ['Date', 'Full Name', 'Email', 'Phone', 'Country', 'Subject', 'Message', 'Source'];
    const rows = filteredInquiries.map((item) => [
      item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN') : '',
      item.fullName || '',
      item.email || '',
      item.phone || '',
      item.country || '',
      item.subject || '',
      (item.message || '').replace(/\r?\n|\r/g, ' '),
      item.source || 'Contact Us Page',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contact-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Us Inquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Total {filteredInquiries.length} {filteredInquiries.length === 1 ? 'submission' : 'submissions'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchInquiries}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={filteredInquiries.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, country, subject, or message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="ALL">All Subjects</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase text-muted-foreground">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Country</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    Loading contact inquiries...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No contact inquiries found.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-muted/20 transition-colors align-top">
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-muted-foreground">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-foreground whitespace-nowrap">
                      {item.fullName}
                    </td>
                    <td className="py-3.5 px-4 space-y-1">
                      <a
                        href={`mailto:${item.email}`}
                        className="flex items-center gap-1.5 text-primary hover:underline text-xs"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        {item.email}
                      </a>
                      <a
                        href={`tel:${item.phone}`}
                        className="flex items-center gap-1.5 text-foreground/80 hover:underline text-xs"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        {item.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs text-foreground/80">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                        {item.country || 'N/A'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {item.subject || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[320px]">
                      <p className="text-xs text-foreground/80 whitespace-pre-wrap break-words mb-0">
                        {item.message || '-'}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-muted-foreground">
                      {item.source || 'Contact Us Page'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        aria-label="Delete inquiry"
                        className="inline-flex items-center justify-center p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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