"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.role === "admin") {
        router.push("/admin/courses");
      } else {
        router.push("/student");
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-[24px] font-bold text-gray-900">Welcome back!</h1>
            <p className="text-[14px] text-gray-600 mt-1">Log in with your email</p>
          </div>
          
          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm mb-5 font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="email" 
                required 
                placeholder="Email address*"
                className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  setError("");
                }}
              />
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required 
                placeholder="Password*"
                className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  setError("");
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 mb-4">
              <Link href="/forgot-password" className="text-[13px] text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:opacity-90 text-white py-3 rounded font-medium transition disabled:opacity-70 mt-2 text-[15px]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>


          <div className="mt-8 text-center">
            <p className="text-[13px] text-gray-600 mb-6">
              Don't have an account? <Link href="/register" className="text-primary hover:underline">Sign Up</Link>
            </p>
            <p className="text-[12px] text-gray-400 pt-4 border-t border-gray-100">
              ©2026 - Mildain Trainings. All Rights Reserved. | <Link href="/privacy-policy" className="hover:underline text-primary">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-[url('/bg-banner.jpg')] bg-cover bg-center bg-no-repeat opacity-50"></div>
      </div>
    </div>
  );
}