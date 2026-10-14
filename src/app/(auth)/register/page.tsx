"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Info } from "lucide-react";
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-bold text-gray-900">Create your account</h1>
          </div>
          
          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm mb-5 font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] text-gray-600 mb-1.5">First name<span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="First name"
                  value={formData.firstName}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                  onChange={(e) => handleNameChange(e, "firstName")}
                />
              </div>
              <div>
                <label className="block text-[13px] text-gray-600 mb-1.5">Last name<span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Last name"
                  value={formData.lastName}
                  className="w-full p-2.5 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                  onChange={(e) => handleNameChange(e, "lastName")}
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-gray-600 mb-1.5">Email<span className="text-red-500">*</span></label>
              <input 
                type="email" 
                placeholder="Email address"
                value={formData.email}
                className="w-full p-2.5 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  setError("");
                }}
              />
            </div>

            <div>
              <label className="block text-[13px] text-gray-600 mb-1.5">Country & Contact number<span className="text-red-500">*</span></label>
              <div className="w-full border border-gray-300 rounded p-2.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all bg-white flex items-center">
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full text-[14px] outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-gray-600 mb-1.5">Password<span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  className="w-full p-2.5 pr-20 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[14px]"
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    setError("");
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <div 
                    className="relative flex items-center"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Info size={16} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    
                    {showTooltip && (
                      <div className="absolute right-0 top-full mt-2 w-72 bg-[#2d2d2d] text-white p-4 rounded shadow-xl z-50 text-[13px]">
                        <h4 className="font-bold mb-2 text-[14px]">Password Criteria:</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-gray-200">
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
              className="w-full bg-primary text-white py-3 rounded font-medium hover:opacity-90 transition disabled:opacity-70 mt-2 text-[15px]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-200 pt-6">
            <Link href="/login" className="text-[14px] text-primary hover:underline font-medium">
               Already have an account? Sign in here!
            </Link>
            <p className="text-[13px] text-gray-500 mt-6">
              © 2026 - Mildain Trainings. All Rights Reserved. | <Link href="/privacy" className="hover:underline text-primary">Privacy Policy</Link>
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