"use client";

import { useEffect, useState } from "react";
import StudentSidebar from "@/components/student/StudentSidebar";
import { Bell, Search } from "lucide-react";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "S";
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      <StudentSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search your courses..." 
              className="bg-transparent border-none outline-none text-sm w-full ml-2 text-gray-700"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#0052cc] flex items-center justify-center text-white font-bold text-sm">
                {getInitial(user?.name || "Student")}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{user?.name || "Student"}</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}