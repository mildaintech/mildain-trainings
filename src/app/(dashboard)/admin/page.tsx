"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardOverview() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.user.role !== "admin") {
            router.push("/student");
            return;
          }
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

  return (
    <div className="space-y-8 pt-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 font-medium">
            Welcome back, {user?.name || "Admin"}.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex items-center justify-center">
        <p className="text-gray-400 font-medium">Your admin content will appear here</p>
      </div>
    </div>
  );
}