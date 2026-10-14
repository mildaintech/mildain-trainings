"use client";

import { Bell, Search, LayoutDashboard, BookOpen, Users, Receipt, Tag, Settings, LogOut, ShieldCheck, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "SEO Management", href: "/admin/seo", icon: Search },
    { name: "Manage Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: Receipt },
    { name: "Inquiries", href: "/admin/inquiries", icon: Users },
    { name: "Coupons & Offers", href: "/admin/coupons", icon: Tag },
    { name: "Settings", href: "/admin/settings", icon: Settings }, 

  ];

  return (
    <div className="w-64 bg-[#0a0f1c] text-gray-300 flex flex-col h-full shrink-0 border-r border-gray-800">
      <div className="h-20 shrink-0 flex items-center px-6 border-b border-gray-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-[#0a0f1c] rounded-lg flex items-center justify-center shadow-sm">
            <ShieldCheck size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-white tracking-wide text-lg">ADMIN</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[14px] font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-gray-800/80 text-white shadow-sm" 
                  : "text-gray-400 hover:bg-gray-800/40 hover:text-gray-100"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-white" : "text-gray-500"} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 shrink-0 border-t border-gray-800/60">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-[14px] font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9fa]">
      
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center bg-gray-100/70 border border-gray-200/80 rounded-full px-4 py-2.5 w-[400px] focus-within:ring-2 focus-within:ring-gray-200 focus-within:bg-white transition-all">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users, transactions..." 
              className="bg-transparent border-none outline-none text-[14px] w-full ml-3 text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            
            <div 
              onClick={() => router.push("/")} 
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-gray-100 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-[#0a0f1c] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                ST
              </div>
              <div className="hidden md:block">
                <p className="text-[14px] font-semibold text-gray-700">Mildain</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}