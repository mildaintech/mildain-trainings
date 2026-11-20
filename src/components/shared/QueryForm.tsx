'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const inputBase =
  "block w-full h-10 rounded-lg border bg-background px-3.5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors";

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

export default function QueryForm() {
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
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">

      <form onSubmit={handleSubmit} className="space-y-3.5 p-6 sm:p-7">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Enquire Now</h3>
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

        {/* Full name */}
        <div>
          <Label htmlFor="chf-fullName" required>Full name</Label>
          <input
            id="chf-fullName"
            type="text"
            name="fullName"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "chf-fullName-error" : undefined}
            className={`${inputBase} ${fieldState(!!errors.fullName)}`}
          />
          <FieldError id="chf-fullName-error" message={errors.fullName} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="chf-email" required>Email address</Label>
          <input
            id="chf-email"
            type="text"
            inputMode="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "chf-email-error" : undefined}
            className={`${inputBase} ${fieldState(!!errors.email)}`}
          />
          <FieldError id="chf-email-error" message={errors.email} />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="chf-phone" required>Phone number</Label>
          <div
            className={`flex h-10 w-full items-center rounded-lg border bg-background px-3.5 transition-colors ${
              errors.phone
                ? "border-destructive focus-within:ring-2 focus-within:ring-destructive/20"
                : "border-border hover:border-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15"
            }`}
          >
            <PhoneInput
              key={userCountryCode}
              id="chf-phone"
              international
              defaultCountry={userCountryCode}
              value={phone}
              onChange={handlePhoneChange}
              className="courses-phone-input"
            />
          </div>
          <FieldError id="chf-phone-error" message={errors.phone} />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="chf-message">
            Message <span className="font-normal text-foreground/50">(optional)</span>
          </Label>
          <textarea
            id="chf-message"
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you are looking for"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "chf-message-error" : undefined}
            className={`${inputBase} h-auto min-h-[72px] resize-none py-2.5 ${fieldState(!!errors.message)}`}
          ></textarea>
          <FieldError id="chf-message-error" message={errors.message} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-btn-gradient text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
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

      <style dangerouslySetInnerHTML={{ __html: `
        .courses-phone-input { display: flex; align-items: center; gap: 8px; width: 100%; }
        .courses-phone-input input { width: 100%; border: none; outline: none; background: transparent; color: inherit; font-size: 14px; }
        .courses-phone-input input::placeholder { opacity: 0.5; }
        .courses-phone-input .PhoneInputCountry { padding-right: 10px; margin-right: 0; border-right: 1px solid rgba(128, 128, 128, 0.3); }
      ` }} />
    </div>
  );
}