"use client";

import { Play } from "lucide-react";

export default function MyCoursesPage() {
  const purchasedCourses = [
    {
      id: 1,
      title: "Advanced Executive Program In Applied Generative AI",
      provider: "IITM PRAVARTAK",
      progress: 65,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80"
    },
    {
      id: 2,
      title: "Professional Certificate Program in Agentic AI",
      provider: "Microsoft",
      progress: 12,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80"
    },
    {
      id: 3,
      title: "AI Strategy Leadership & Transformation",
      provider: "SJMSOM",
      progress: 100,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
        <p className="text-gray-500 mt-1">Access all your enrolled courses and track progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="h-40 w-full relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center">
                  <Play size={24} className="text-[#0052cc] ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{course.provider}</span>
              <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-4 line-clamp-2">
                {course.title}
              </h3>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-500">{course.progress === 100 ? "Completed" : "In Progress"}</span>
                  <span className="text-xs font-bold text-gray-700">{course.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-[#0052cc]'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}