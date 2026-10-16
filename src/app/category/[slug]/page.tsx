import React from 'react';
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const categoryName = decodedSlug.replace(/-/g, ' '); 

  await connectToDatabase();
  
  const courses = await Course.find({ 
    category: { $regex: new RegExp(`^${categoryName}$`, 'i') } 
  }).lean() as any[];

  return (
    <div className="w-full bg-[#F5FBF8] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-[100px] px-6 max-w-[1300px] mx-auto w-full mb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 capitalize">
          {categoryName} <span className="text-primary">Courses</span>
        </h1>
        <p className="text-slate-500 mb-10">Explore our industry-leading programs in {categoryName}.</p>

        {courses.length === 0 ? (
          <div className="bg-white p-10 rounded-sm shadow-sm text-center border border-slate-100">
            <p className="text-slate-500 text-lg">No courses found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course._id.toString()} className="bg-white rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-hidden transition-all hover:shadow-lg">
                <div className="w-full h-44 bg-slate-100">
                  {course.bannerImage ? (
                    <img src={course.bannerImage} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-200"></div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[20px] font-bold text-slate-900 leading-[1.3] mb-4 line-clamp-2">
                    {course.title}
                  </h3>
                  <Link 
                    href={`/courses/${course.slug}`}
                    className="mt-auto block w-full py-2.5 bg-white border border-primary text-primary text-center rounded-[4px] font-semibold text-[15px] hover:bg-primary hover:text-white transition-colors"
                  >
                    View Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}