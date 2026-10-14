"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  category: string;
  provider?: string;
  duration?: string;
  isActive?: boolean;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/admin/courses");
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setCourses(data);
          }
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses(courses.filter(course => course._id !== id));
      }
    } catch (err) {}
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    setCourses(courses.map(course => 
      course._id === id ? { ...course, isActive: !currentStatus } : course
    ));
    
    try {
      await fetch(`/api/admin/courses/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const totalCourses = courses.length;
  const liveCourses = courses.filter(c => c.isActive !== false).length;
  const hiddenCourses = courses.filter(c => c.isActive === false).length;
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-5">
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-sm">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Courses</p>
          <h3 className="text-xl font-bold text-gray-900">{totalCourses}</h3>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-sm">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Live Courses</p>
          <h3 className="text-xl font-bold text-green-600">{liveCourses}</h3>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-sm">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Hidden Courses</p>
          <h3 className="text-xl font-bold text-gray-400">{hiddenCourses}</h3>
        </div>
      </div>

      <div className="bg-white p-3 border border-gray-200 rounded-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center bg-white border border-gray-300 px-3 py-1.5 w-full max-w-sm">
          <Search size={14} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[13px] w-full ml-2 text-gray-800 placeholder-gray-400"
          />
        </div>
        
        <Link 
          href="/admin/courses/new" 
          className="bg-gray-900 hover:bg-black text-white px-4 py-2 text-[13px] font-medium flex items-center gap-2 rounded-sm"
        >
          <Plus size={16} /> Add New Course
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-[11px] uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="px-4 py-3 w-16">Sr No.</th>
                <th className="px-4 py-3 w-24">Status</th>
                <th className="px-4 py-3">Course Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-[13px] text-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">Loading courses...</td>
                </tr>
              ) : paginatedCourses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">No courses found.</td>
                </tr>
              ) : (
                paginatedCourses.map((course, index) => {
                  const srNo = (currentPage - 1) * itemsPerPage + index + 1;
                  const isLive = course.isActive !== false;

                  return (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-medium text-gray-500">{srNo}</td>
                      <td className="px-4 py-2.5">
                        <button 
                          onClick={() => handleToggleStatus(course._id, isLive)}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-bold uppercase border ${
                            isLive 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-gray-100 text-gray-500 border-gray-300"
                          }`}
                        >
                          {isLive ? <Eye size={12} /> : <EyeOff size={12} />}
                          {isLive ? "Live" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-4 py-2.5 font-semibold line-clamp-1">{course.title}</td>
                      <td className="px-4 py-2.5 text-gray-600">{course.category}</td>
                      <td className="px-4 py-2.5 text-gray-600">{course.provider || "-"}</td>
                      <td className="px-4 py-2.5 text-gray-600">{course.duration || "-"}</td>
                      <td className="px-4 py-2.5 text-right space-x-4">
                        <Link href={`/admin/courses/${course._id}`} className="inline-flex text-gray-500 hover:text-black">
                          <Edit2 size={15} />
                        </Link>
                        <button onClick={() => handleDelete(course._id)} className="inline-flex text-gray-400 hover:text-red-600">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <span className="text-[12px] text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length} entries
            </span>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 bg-white rounded-sm disabled:opacity-50 hover:bg-gray-100"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-[13px] border rounded-sm ${
                    currentPage === page 
                      ? "bg-gray-800 text-white border-gray-800 font-medium" 
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 border border-gray-300 bg-white rounded-sm disabled:opacity-50 hover:bg-gray-100"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}