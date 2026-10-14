"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlayCircle, Clock, Trophy } from "lucide-react";

export default function StudentDashboard() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const stats = [
    { label: "Enrolled Courses", value: "4", icon: PlayCircle, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Hours Learned", value: "32h", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Certificates", value: "1", icon: Trophy, color: "text-green-600", bg: "bg-green-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || "Student"}! 👋</h1>
          <p className="text-gray-500 mt-1">Let's pick up where you left off.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
              <Link href="/student/courses" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg shrink-0 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80" alt="Course" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 w-full">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">In Progress</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Executive Program In Applied Generative AI</h3>
                <p className="text-sm text-gray-500 mb-4">Module 3: Neural Networks Architecture</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[65%] rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">65%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Notifications</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-sm font-semibold text-gray-900">New Module Unlocked!</p>
                <p className="text-xs text-gray-500 mt-1">Module 4 is now available in your Generative AI course.</p>
                <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
              </div>
              <div className="border-l-2 border-green-500 pl-4">
                <p className="text-sm font-semibold text-gray-900">Assignment Graded</p>
                <p className="text-xs text-gray-500 mt-1">You scored 95% in Python Basics.</p>
                <p className="text-xs text-gray-400 mt-2">Yesterday</p>
              </div>
            </div>
            <Link href="/student/notifications" className="block text-center mt-6 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              View all notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}