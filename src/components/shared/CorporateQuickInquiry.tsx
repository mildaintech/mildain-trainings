'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Check, AlertCircle, Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

interface CorporateQuickInquiryProps {
  onClose?: () => void;
}

/* ---------- content for the brand panel (edit freely) ---------- */

const highlights = [
  "Customized Training Programs",
  "Industry-Relevant Skill Building",
  "Expert Corporate Trainers",
  "Flexible Training Delivery"
];

const onDark = { color: "#ffffff" };
const onDarkSoft = { color: "rgba(255,255,255,0.8)" };

/* ---------- small UI helpers (outside component so inputs never lose focus) ---------- */

const inputBase =
  "block w-full h-11 rounded-lg border bg-background px-3.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors";

const fieldState = (hasError: boolean) =>
  hasError
    ? "border-destructive focus:ring-2 focus:ring-destructive/20"
    : "border-border hover:border-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/15";

function FieldError({ id, message }: { id: string; message: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive">
      <AlertCircle size={13} className="shrink-0" />
      {message}
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-foreground">
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
  );
}

/* ---------- component ---------- */

export default function CorporateQuickInquiry({ onClose }: CorporateQuickInquiryProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [phone, setPhone] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const payload = {
      ...formData,
      phone,
      country: userCountryName,
      inquiryType: "Corporate",
      source: "Corporate Page"
    };

    try {
      await fetch("/api/zoho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const dbResponse = await fetch("/api/corporate-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (dbResponse.ok) {
        setFormData({ fullName: "", email: "", message: "" });
        setPhone("");
        alert("Thank you! Your corporate inquiry has been submitted.");
        if (onClose) onClose();
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
    /* Width is set here on purpose: on md+ the card sizes itself (max 64rem) and
       centers on the wrapper, so a narrow wrapper like max-w-md can't squeeze it. */
    <div
      role="dialog"
      aria-labelledby="corporate-inquiry-title"
      className="relative z-20 mx-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:ml-[50%] md:w-[min(64rem,calc(100vw-2rem))] md:max-w-none md:-translate-x-1/2 md:flex-row"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 rounded-full p-1.5 text-foreground/50 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <X size={20} />
        </button>
      )}

      <aside className="relative hidden shrink-0 flex-col justify-between overflow-hidden bg-btn-gradient p-10 md:flex md:w-[42%]">
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5" />

        <div className="relative">
          <p className="text-sm font-medium" style={onDarkSoft}>Mildain Trainings</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight" style={onDark}>
            Transform Your Workforce with Smart Skills
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed" style={onDarkSoft}>
            Empower your teams with industry-relevant training programs designed to enhance workforce capabilities, improve productivity, and support organizational growth.
          </p>
        </div>

        <ul className="relative mt-10 space-y-3.5">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[15px]" style={onDark}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Check size={13} strokeWidth={3} color="#ffffff" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="h-1 bg-btn-gradient md:hidden" />

        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-10">
          <div className="pr-8">
            <h3 id="corporate-inquiry-title" className="text-2xl font-semibold text-foreground">
              Talk to Our Experts
            </h3>
            <p className="mt-1 text-sm text-foreground/60">
              Fill in the form and our team will get in touch.
            </p>
          </div>

          {errors.global && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs font-medium text-destructive"
            >
              <AlertCircle size={15} className="mt-px shrink-0" />
              <span>{errors.global}</span>
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <Label htmlFor="cqi-fullName" required>Full name</Label>
              <input
                id="cqi-fullName"
                type="text"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "cqi-fullName-error" : undefined}
                className={`${inputBase} ${fieldState(!!errors.fullName)}`}
              />
              <FieldError id="cqi-fullName-error" message={errors.fullName} />
            </div>

            <div>
              <Label htmlFor="cqi-email" required>Email address</Label>
              <input
                id="cqi-email"
                type="text"
                inputMode="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "cqi-email-error" : undefined}
                className={`${inputBase} ${fieldState(!!errors.email)}`}
              />
              <FieldError id="cqi-email-error" message={errors.email} />
            </div>
          </div>

          <div>
            <Label htmlFor="cqi-phone" required>Phone number</Label>
            <div
              className={`flex h-11 w-full items-center rounded-lg border bg-background px-3.5 transition-colors ${
                errors.phone
                  ? "border-destructive focus-within:ring-2 focus-within:ring-destructive/20"
                  : "border-border hover:border-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15"
              }`}
            >
              <PhoneInput
                key={userCountryCode}
                id="cqi-phone"
                international
                defaultCountry={userCountryCode}
                value={phone}
                onChange={handlePhoneChange}
                className="corporate-phone-input"
              />
            </div>
            <FieldError id="cqi-phone-error" message={errors.phone} />
          </div>

          <div>
            <Label htmlFor="cqi-message">
              Message <span className="font-normal text-foreground/50">(optional)</span>
            </Label>
            <textarea
              id="cqi-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you are looking for"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "cqi-message-error" : undefined}
              className={`${inputBase} h-auto min-h-[88px] resize-none py-3 ${fieldState(!!errors.message)}`}
            ></textarea>
            <FieldError id="cqi-message-error" message={errors.message} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-btn-gradient text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Your Query"
            )}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-foreground/55">
            By registering here, I agree to Mildain Trainings{" "}
            <Link href="/terms-and-conditions" className="font-medium text-primary hover:underline">
              Terms &amp; Condition
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .corporate-phone-input { display: flex; align-items: center; gap: 8px; width: 100%; }
        .corporate-phone-input input { width: 100%; border: none; outline: none; background: transparent; color: inherit; font-size: 14px; }
        .corporate-phone-input input::placeholder { opacity: 0.5; }
        .corporate-phone-input .PhoneInputCountry { padding-right: 10px; margin-right: 0; border-right: 1px solid rgba(128, 128, 128, 0.3); }
      ` }} />
    </div>
  );
}