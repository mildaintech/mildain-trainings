"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Bell, 
  Settings, 
  LogOut,
  GraduationCap
} from "lucide-react";

export default function StudentSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Notifications", href: "/student/notifications", icon: Bell },
    { name: "Settings", href: "/student/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col hidden lg:flex">
      <div className="h-20 flex items-center px-8 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900">
          <span className="text-[#0052cc]"><GraduationCap size={28} /></span>
          MILDAIN
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
          Student Panel
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? "bg-blue-50 text-[#0052cc]" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#0052cc]" : "text-gray-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}