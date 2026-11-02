"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Info, ArrowLeft } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [phone, setPhone] = useState<string | undefined>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const formatName = (value: string) => {
    const lettersOnly = value.replace(/[^a-zA-Z]/g, "");
    if (lettersOnly.length === 0) return "";
    return lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, field: "firstName" | "lastName") => {
    setFormData({ ...formData, [field]: formatName(e.target.value) });
    setError("");
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setError("");
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (password.length > 128) return "Password cannot be longer than 128 characters";
    if (!/[a-z]/.test(password)) return "It should contain at least one lowercase letter";
    if (!/[A-Z]/.test(password)) return "It should contain at least one uppercase letter";
    if (!/\d/.test(password)) return "It should contain at least one number";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.firstName.trim()) {
      setError("First name is required");
      setLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last name is required");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required");
      setLoading(false);
      return;
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setError("A valid contact number is required");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const payload = { 
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        contactNumber: phone 
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-secondary/5">
      <div className="w-full lg:w-[45%] flex flex-col p-4 sm:p-10 overflow-y-auto relative">
        
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
            <h1 className="text-[24px] sm:text-[28px] font-bold text-foreground leading-tight mb-2">Create your account</h1>
          </div>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md text-sm mb-5 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] text-muted-foreground/80 font-medium mb-1.5">First name<span className="text-destructive">*</span></label>
                <input 
                  type="text" 
                  placeholder="First name"
                  value={formData.firstName}
                  className="w-full p-3.5 bg-background  border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-primary transition-all"
                  onChange={(e) => handleNameChange(e, "firstName")}
                />
              </div>
              <div>
                <label className="block text-[13px] text-muted-foreground/80 font-medium mb-1.5">Last name<span className="text-destructive">*</span></label>
                <input 
                  type="text" 
                  placeholder="Last name"
                  value={formData.lastName}
                  className="w-full p-3.5 bg-background  border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-primary transition-all"
                  onChange={(e) => handleNameChange(e, "lastName")}
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-muted-foreground/80 font-medium mb-1.5">Email<span className="text-destructive">*</span></label>
              <input 
                type="email" 
                placeholder="Email address"
                value={formData.email}
                className="w-full p-3.5 bg-background  border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-primary transition-all"
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  setError("");
                }}
              />
            </div>

            <div>
              <label className="block text-[13px] text-muted-foreground/80 font-medium mb-1.5">
                Country & Contact number<span className="text-destructive">*</span>
              </label>
              <div className="w-full bg-background  border-border rounded-md p-3.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all flex items-center">
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full text-[15px] text-foreground bg-transparent [&_input]:border-none [&_input]:outline-none [&_input]:bg-transparent [&_input]:shadow-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-muted-foreground/80 font-medium mb-1.5">Password<span className="text-destructive">*</span></label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  className="w-full p-3.5 pr-20 bg-background  border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-primary transition-all"
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    setError("");
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground/70 hover:text-foreground focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <div 
                    className="relative flex items-center"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Info size={18} className="text-muted-foreground/70 hover:text-foreground cursor-help" />
                    
                    {showTooltip && (
                      <div className="absolute right-0 bottom-full mb-2 w-72 bg-card text-foreground border border-border p-4 rounded-md shadow-xl z-50 text-[13px]">
                        <h4 className="font-bold mb-2 text-[14px]">Password Criteria:</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                          <li>Password must be at least 8 characters long</li>
                          <li>Password cannot be longer than 128 characters</li>
                          <li>It should contain at least one lowercase letter</li>
                          <li>It should contain at least one uppercase letter</li>
                          <li>It should contain at least one number</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="relative overflow-hidden group w-full bg-btn-gradient text-primary-foreground py-3.5 rounded-md font-bold transition-all disabled:opacity-70 mt-4 text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="relative z-10">{loading ? "Creating Account..." : "Create Account"}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-border pt-6">
            <Link href="/login" className="text-[14px] text-primary hover:underline font-semibold">
               Already have an account? Sign in here!
            </Link>
            <p className="text-[12px] text-muted-foreground/70 mt-6">
              © 2026 - Mildain Trainings. All Rights Reserved. | <Link href="/privacy-policy" className="hover:underline text-primary">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-[55%] bg-muted relative items-center justify-center overflow-hidden border-l border-border">
        <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply"></div>
        <Image 
          src="/images/workteam.png"
          alt="Registration Background"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>
    </div>
  );
}