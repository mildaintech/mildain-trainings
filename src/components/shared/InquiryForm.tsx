'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PhoneCall, Phone, MessageCircle } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [phone, setPhone] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [userCountryCode, setUserCountryCode] = useState<any>("IN");
  const [userCountryName, setUserCountryName] = useState<string>("India");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    global: ""
  });

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const regionCookie = cookies.find((row) => row.startsWith("userRegion="));
    const regionValue = regionCookie ? regionCookie.split("=")[1] : null;

    if (regionValue === "US") {
      setUserCountryCode("US");
      setUserCountryName("United States");
    } else {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data.country_code) {
            setUserCountryCode(data.country_code);
            setUserCountryName(data.country_name || "India");
          }
        })
        .catch(() => {
          setUserCountryCode("IN");
          setUserCountryName("India");
        });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCallOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", global: "" });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setErrors({ ...errors, phone: "", global: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { fullName: "", email: "", phone: "", message: "", global: "" };

    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Please enter a valid name (letters only, min 3 characters)";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!isValidPhoneNumber(phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (formData.message.trim().length > 0 && formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await fetch("/api/zoho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone, country: userCountryName }),
      });

      const dbResponse = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone, country: userCountryName }),
      });

      if (dbResponse.ok) {
        setFormData({ fullName: "", email: "", message: "" });
        setPhone("");
        alert("Thank you! Your inquiry has been submitted.");
      } else {
        setErrors({ ...errors, global: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setErrors({ ...errors, global: "Error submitting form. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-md overflow-hidden flex flex-col relative z-20">
      <div ref={dropdownRef} className="relative">
        <div 
          onClick={() => setShowCallOptions(!showCallOptions)}
          className="bg-btn-gradient text-primary-foreground p-5 flex items-center justify-between cursor-pointer select-none"
        >
          <div>
            <p className="text-[13px] font-medium text-primary-foreground/90 mb-1">Get Free Career Guidance</p>
            <p className="text-2xl lg:text-3xl font-bold text-primary-foreground tracking-tight">+91 <span className="ml-2">892-919-9704</span></p>
          </div>
          <PhoneCall className="w-8 h-8 text-primary-foreground opacity-90 vibrate-phone-icon" strokeWidth={2} />
        </div>

        {showCallOptions && (
          <div className="absolute right-4 top-[88%] mt-1 w-52 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden py-1.5">
            <a
              href="tel:+918929199704"
              onClick={() => setShowCallOptions(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span> Call</span>
            </a>
            <a
              href="https://wa.me/918929199704"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowCallOptions(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span>Chat Us</span>
            </a>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
        {errors.global && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-md font-medium">
            {errors.global}
          </div>
        )}

        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name*"
            className={`w-full border bg-background text-foreground placeholder:text-muted-foreground p-3.5 rounded-md text-[14px] outline-none transition-all ${errors.fullName ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"}`}
          />
          {errors.fullName && <p className="text-destructive text-[11px] mt-1 font-medium px-1">{errors.fullName}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address*"
            className={`w-full border bg-background text-foreground placeholder:text-muted-foreground p-3.5 rounded-md text-[14px] outline-none transition-all ${errors.email ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"}`}
          />
          {errors.email && <p className="text-destructive text-[11px] mt-1 font-medium px-1">{errors.email}</p>}
        </div>

        <div>
          <div className={`w-full border bg-background p-3 rounded-md transition-all ${errors.phone ? "border-destructive focus-within:ring-destructive/20" : "border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20"}`}>
            <PhoneInput
              key={userCountryCode}
              international
              defaultCountry={userCountryCode}
              value={phone}
              onChange={handlePhoneChange}
              className="custom-phone-input"
            />
          </div>
          {errors.phone && <p className="text-destructive text-[11px] mt-1 font-medium px-1">{errors.phone}</p>}
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message Details"
            className={`w-full border bg-background text-foreground placeholder:text-muted-foreground p-3.5 rounded-md text-[14px] outline-none transition-all h-[100px] resize-none ${errors.message ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-1 focus:ring-primary/20"}`}
          ></textarea>
          {errors.message && <p className="text-destructive text-[11px] mt-1 font-medium px-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold text-[14px] py-3.5 rounded-md transition-all tracking-wide disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>

        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed text-center mb-0">
          By registering here, I agree to Mildain Trainings
          <Link href="/terms-and-conditions" className="text-primary hover:underline ml-1">Terms & Condition</Link> and
          <Link href="/privacy-policy" className="text-primary hover:underline ml-1">Privacy Policy</Link>
        </p>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-phone-input { display: flex; align-items: center; gap: 8px; }
        .custom-phone-input input { width: 100%; border: none; outline: none; background: transparent; color: inherit; font-size: 14px; }
        .PhoneInputCountry { padding-left: 4px; }
        @keyframes phoneVibrateCycle {
          0% { transform: rotate(0deg) scale(1); }
          2.5% { transform: rotate(-15deg) scale(1.1); }
          5% { transform: rotate(15deg) scale(1.1); }
          7.5% { transform: rotate(-15deg) scale(1.1); }
          10% { transform: rotate(15deg) scale(1.1); }
          12.5% { transform: rotate(-15deg) scale(1.1); }
          15% { transform: rotate(15deg) scale(1.1); }
          17.5% { transform: rotate(-15deg) scale(1.1); }
          20% { transform: rotate(15deg) scale(1.1); }
          22.5% { transform: rotate(-15deg) scale(1.1); }
          25% { transform: rotate(15deg) scale(1.1); }
          27.5% { transform: rotate(-15deg) scale(1.1); }
          30% { transform: rotate(15deg) scale(1.1); }
          32.5% { transform: rotate(-15deg) scale(1.1); }
          35% { transform: rotate(15deg) scale(1.1); }
          37.5% { transform: rotate(-15deg) scale(1.1); }
          40% { transform: rotate(15deg) scale(1.1); }
          42.5% { transform: rotate(-15deg) scale(1.1); }
          45% { transform: rotate(15deg) scale(1.1); }
          47.5% { transform: rotate(-15deg) scale(1.1); }
          50% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .vibrate-phone-icon {
          animation: phoneVibrateCycle 4s infinite ease-in-out;
          transform-origin: center;
        }
      ` }} />
    </div>
  );
}