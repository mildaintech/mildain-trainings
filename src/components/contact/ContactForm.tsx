'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { CheckCircle2, ShieldCheck, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [phone, setPhone] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [userCountryCode, setUserCountryCode] = useState<any>("IN");
  const [userCountryName, setUserCountryName] = useState<string>("India");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", global: "" });
    if (isSuccess) setIsSuccess(false);
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setErrors({ ...errors, phone: "", global: "" });
    if (isSuccess) setIsSuccess(false);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { fullName: "", email: "", phone: "", subject: "", message: "", global: "" };

    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Please enter a valid name";
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }

    if (formData.message.trim().length < 10) {
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

    const payload = {
      ...formData,
      phone,
      country: userCountryName,
      inquiryType: formData.subject,
      source: "Contact Us Page"
    };

    try {
      await fetch("/api/zoho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const dbResponse = await fetch("/api/contact-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (dbResponse.ok) {
        setFormData({ fullName: "", email: "", subject: "", message: "" });
        setPhone("");
        setIsSuccess(true);
      } else {
        setErrors({ ...errors, global: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setErrors({ ...errors, global: "Error submitting form. Please check your connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full bg-[#f7faf8] border rounded-xl px-5 py-4 text-[15px] md:text-[16px] text-[#0b1220] placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#0AA34F]/10 focus:border-[#0AA34F] focus:bg-white transition-all duration-200";
  const labelBase = "block text-[13px] font-semibold text-[#344054] mb-2 px-1";

  return (
    <div className="relative w-full bg-white rounded-3xl shadow-[0_24px_60px_-15px_rgba(10,40,25,0.22)] border border-gray-100 overflow-hidden sticky top-[100px]">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0AA34F] via-[#16c96b] to-[#0AA34F]" />

      <div className="p-6 md:p-10">
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h3 className="text-[26px] md:text-[32px] font-extrabold text-[#0b1220] tracking-tight leading-tight">
            Let's Connect
          </h3>
          <p className="text-[14px] md:text-[15px] text-gray-500 mt-2">
            Fill in the details below and our team will get back to you.
          </p>
        </div>

        {isSuccess && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 bg-[#effcf4] border border-[#b7ecd0] text-[#066b34] text-[14px] p-4 rounded-xl font-medium"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[#0AA34F]" />
            <span>Thank you! Your message has been sent successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

          {errors.global && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[14px] p-4 rounded-xl font-medium text-center">
              {errors.global}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className={labelBase}>Full Name <span className="text-[#0AA34F]">*</span></label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`${inputBase} ${errors.fullName ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.fullName && <p className="text-red-500 text-[12px] mt-1.5 font-medium px-2">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className={labelBase}>Email Address <span className="text-[#0AA34F]">*</span></label>
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={`${inputBase} ${errors.email ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.email && <p className="text-red-500 text-[12px] mt-1.5 font-medium px-2">{errors.email}</p>}
            </div>

            <div>
              <label className={labelBase}>Phone Number <span className="text-[#0AA34F]">*</span></label>
              <div className={`w-full bg-[#f7faf8] border ${errors.phone ? "border-red-400 focus-within:ring-red-400/10" : "border-gray-200 focus-within:border-[#0AA34F] focus-within:ring-[#0AA34F]/10"} rounded-xl px-5 py-4 transition-all duration-200 focus-within:ring-4 focus-within:bg-white`}>
                <PhoneInput
                  key={userCountryCode}
                  international
                  defaultCountry={userCountryCode}
                  value={phone}
                  onChange={handlePhoneChange}
                  className="contact-phone-input"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[12px] mt-1.5 font-medium px-2">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={labelBase}>Subject Area <span className="text-[#0AA34F]">*</span></label>
            <div className="relative">
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${inputBase} pr-12 appearance-none cursor-pointer ${errors.subject ? "border-red-400" : "border-gray-200"} ${formData.subject ? "text-[#0b1220]" : "text-gray-400"}`}
              >
                <option value="" disabled>Select Subject Area</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Corporate Training">Corporate Training</option>
                <option value="Partnership">Partnership</option>
                <option value="Support">Support</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.subject && <p className="text-red-500 text-[12px] mt-1.5 font-medium px-2">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className={labelBase}>How can we help you? <span className="text-[#0AA34F]">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a bit about your requirement..."
              rows={5}
              className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-gray-200"}`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-[12px] mt-1.5 font-medium px-2">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full mt-2 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0AA34F] to-[#088a42] hover:from-[#0bb558] hover:to-[#0AA34F] text-white py-4 text-[16px] md:text-[17px] font-bold rounded-xl transition-all duration-300 cursor-pointer shadow-[0_10px_24px_-8px_rgba(10,163,79,0.55)] hover:shadow-[0_14px_28px_-8px_rgba(10,163,79,0.65)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Sending..." : (
              <>
                Submit Inquiry
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="flex flex-col items-center gap-2 mt-1">
            <p className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0AA34F]" />
              Your information is kept private and secure
            </p>
            <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed text-center font-medium">
              By submitting, you agree to our{' '}
              <Link href="/terms-and-conditions" className="text-[#0AA34F] hover:underline">
                Terms
              </Link>
              {' '}and{' '}
              <Link href="/privacy-policy" className="text-[#0AA34F] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-phone-input {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .contact-phone-input input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          color: #0b1220;
        }
        @media (min-width: 768px) {
          .contact-phone-input input {
            font-size: 16px;
          }
        }
        .contact-phone-input input::placeholder {
          color: #9ca3af;
        }
        .PhoneInputCountry {
          padding-right: 12px;
          border-right: 1px solid #e5e7eb;
        }
      ` }} />
    </div>
  );
}