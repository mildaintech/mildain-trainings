"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex flex-col lg:flex-row  bg-secondary/5">
      <div className="w-full lg:w-[45%] flex flex-col p-6 sm:p-12 overflow-y-auto relative">
        
        <Link 
          href="/" 
          className="absolute top-6 left-6 sm:top-10 sm:left-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to Home"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </Link>

        <div className="w-full max-w-md mx-auto my-auto pt-16 lg:pt-0">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo/mildain training logo.png"
              alt="Mildain Logo"
              width={180}
              height={45}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[24px] sm:text-[28px] font-bold text-foreground leading-tight mb-2">Welcome back!</h1>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground m-0">Log in with your email</p>
          </div>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md text-sm mb-5 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="email" 
                required 
                placeholder="Email address*"
                className="w-full p-3.5 bg-background  border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-all"
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
                className="w-full p-3.5 bg-background  border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-all"
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  setError("");
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground/70 hover:text-foreground focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end mt-2 mb-4">
              <Link href="/forgot-password" className="text-[13px] text-primary hover:underline font-semibold">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="relative overflow-hidden group w-full bg-btn-gradient text-primary-foreground py-3.5 rounded-md font-bold transition-all disabled:opacity-70 mt-2 text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative z-10">{loading ? "Logging in..." : "Login"}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[14px] text-muted-foreground mb-6">
              Don't have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Sign Up</Link>
            </p>
            <p className="text-[12px] text-muted-foreground/70 pt-4 border-t border-border">
              ©2026 - Mildain Trainings. All Rights Reserved. | <Link href="/privacy-policy" className="hover:underline text-primary">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-[55%] bg-muted relative items-center justify-center overflow-hidden border-l border-border">
        <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply"></div>
        <Image 
          src="/images/workteam.png"
          alt="Login"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>
    </div>
  );
}