"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard,
  Tag,
  Settings, 
  LogOut,
  Currency,
  ShieldCheck
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Users & Students", href: "/admin/users", icon: Users },
    { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
    { name: "Coupons & Offers", href: "/admin/coupons", icon: Tag },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Currency", href: "/admin/currency", icon: Currency  },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1c] border-r border-gray-800 h-screen sticky top-0 flex flex-col hidden lg:flex">
      <div className="h-20 flex items-center px-8 border-b border-gray-800 bg-[#070b14]">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white">
          <span className="text-[#0f9d58]"><ShieldCheck size={28} /></span>
          ADMIN
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">
          Main Menu
        </div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? "bg-[#1e293b] text-white shadow-sm border border-gray-700" 
                  : "text-gray-400 hover:bg-[#131c31] hover:text-white"
              }`}
            >
              <Icon size={18} className={isActive ? "text-[#0f9d58]" : "text-gray-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 bg-[#070b14]">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}