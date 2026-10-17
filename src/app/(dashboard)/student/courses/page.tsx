"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, BookOpen } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  slug: string;
  bannerImage?: string;
  overviewImage?: string;
  provider?: string;
  category?: string;
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/student/my-courses");
        const data = await res.json();
        if (res.ok) {
          setCourses(data.courses || []);
        } else {
          setError(data.error || "Failed to load courses");
        }
      } catch (err) {
        setError("Error loading courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">Loading your courses...</div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
        <p className="text-gray-500 mt-1">Access all your enrolled courses and track progress.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      {courses.length === 0 && !error ? (
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center shadow-sm">
          <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Courses Enrolled</h3>
          <p className="text-gray-500 text-sm mb-6">You haven't purchased any courses yet.</p>
          <Link 
            href="/courses"
            className="bg-[#0052cc] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors inline-block text-sm"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <Link href={`/student/courses/${course.slug}`} className="block h-40 w-full relative group">
                {course.bannerImage || course.overviewImage ? (
                  <img src={course.bannerImage || course.overviewImage} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <BookOpen size={24} className="text-slate-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center">
                    <Play size={24} className="text-[#0052cc] ml-1" />
                  </div>
                </div>
              </Link>
              
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {course.provider || course.category || "MILDAIN"}
                </span>
                <Link href={`/student/courses/${course.slug}`}>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-4 line-clamp-2 hover:text-[#0052cc] transition-colors">
                    {course.title}
                  </h3>
                </Link>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500">Not Started</span>
                    <span className="text-xs font-bold text-gray-700">0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#0052cc]" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}