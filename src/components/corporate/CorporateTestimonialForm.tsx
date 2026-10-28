'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
// @ts-ignore
import 'react-phone-number-input/style.css';

const testimonials = [
  {
    id: 1,
    logo: "/images/home/partner/microsoft.png",
    quoteHeading: "Our partnership with Mildain has been an amazing one.",
    quoteBody: "They have been able to understand and enable our vision for helping African organizations build capability and capacity for digital transformation. The hands-on, interactive training programs have led to excellent learner feedback and engagement.",
    authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    authorName: "Ramesh Pattnaik",
    authorTitle: "Program Manager",
    authorCompany: "Microsoft"
  },
  {
    id: 2,
    logo: "/images/home/partner/google.png",
    quoteHeading: "Exceptional quality and seamless execution across all tracks.",
    quoteBody: "Working with Mildain has significantly accelerated our internal tech readiness. Their expert instructors and structured programs ensure our engineers stay ahead of industry demands.",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    authorName: "Sarah Jenkins",
    authorTitle: "Director of Talent Development",
    authorCompany: "Google"
  },
  {
    id: 3,
    logo: "/images/home/partner/amazon.png",
    quoteHeading: "The best enterprise learning platform we have integrated.",
    quoteBody: "The custom learning paths and hands-on cloud labs provided robust upskilling for our engineering teams, resulting in much higher certification success rates.",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    authorName: "David Miller",
    authorTitle: "Cloud Solutions Architect",
    authorCompany: "Amazon"
  },
  {
    id: 4,
    logo: "/images/home/partner/comptia.png",
    quoteHeading: "Unmatched expertise in security and compliance training.",
    quoteBody: "Mildain's comprehensive curriculum on cybersecurity and risk management has empowered our workforce to maintain elite security standards globally.",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    authorName: "Ananya Sharma",
    authorTitle: "Head of Global Compliance",
    authorCompany: "CompTIA Partner Network"
  }
];

export default function CorporateTestimonialForm() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

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
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-7 flex flex-col w-full">
            <h2 className="mb-4">
              Hear It From Our Customers
            </h2>
            <p className="mb-10 max-w-[500px]">
              See how leading organizations upskill their workforce with Mildain.
            </p>

            <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm relative w-full mb-8">
              <div className="h-12 mb-8">
                <img 
                  src={testimonials[currentIndex].logo} 
                  alt="Company Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>

              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-foreground leading-tight mb-6">
                {testimonials[currentIndex].quoteHeading}
              </h3>

              <p className="text-[16px] md:text-[18px] lg:text-[20px] text-muted-foreground leading-relaxed mb-10">
                {testimonials[currentIndex].quoteBody}
              </p>

              <div className="w-full h-px bg-border mb-8"></div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-border">
                  <img 
                    src={testimonials[currentIndex].authorImage} 
                    alt={testimonials[currentIndex].authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[20px] md:text-[22px] font-bold text-foreground">
                    {testimonials[currentIndex].authorName}
                  </span>
                  <span className="text-[14px] md:text-[16px] text-muted-foreground leading-snug">
                    {testimonials[currentIndex].authorTitle}
                  </span>
                  <span className="text-[14px] md:text-[16px] font-bold text-foreground leading-snug">
                    {testimonials[currentIndex].authorCompany}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pl-4">
              <button onClick={prevSlide} className="text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
              </button>
              <button onClick={nextSlide} className="text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[550px] bg-card rounded-md shadow-lg border border-border overflow-hidden">
              
              <div className="bg-btn-gradient py-6 px-8 text-center">
                <h3 className="text-[24px] md:text-[28px] font-bold text-primary-foreground tracking-wide mb-0">
                  Speak to Solution Expert
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-8 md:p-10 flex flex-col gap-5">
                
                {errors.global && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md font-medium">
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
                    className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.fullName ? "border-destructive" : "border-border"}`}
                  />
                  {errors.fullName && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.fullName}</p>}
                </div>

                <div>
                  <input 
                    type="text" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address*" 
                    className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.email ? "border-destructive" : "border-border"}`}
                  />
                  {errors.email && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.email}</p>}
                </div>

                <div>
                  <div className={`w-full border rounded-md px-4 py-4 bg-background transition-all focus-within:ring-2 focus-within:ring-primary ${errors.phone ? "border-destructive" : "border-border"}`}>
                    <PhoneInput
                      key={userCountryCode}
                      international
                      defaultCountry={userCountryCode}
                      value={phone}
                      onChange={handlePhoneChange}
                      className="corporate-phone-input"
                    />
                  </div>
                  {errors.phone && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.phone}</p>}
                </div>

                <div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message Details" 
                    rows={4}
                    className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.message ? "border-destructive" : "border-border"}`}
                  ></textarea>
                  {errors.message && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="relative overflow-hidden group w-full mt-2 bg-btn-gradient text-primary-foreground py-4 text-[18px] md:text-[20px] font-bold rounded-md transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Submitting..." : "Contact Us"}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                </button>

                <p className="text-[14px] md:text-[16px] text-muted-foreground mt-2 leading-relaxed">
                  By registering here, I agree to Mildain Trainings{' '}
                  <Link href="/terms-and-conditions" className="text-primary underline hover:text-primary/80 transition-colors">
                    Terms & Condition
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy-policy" className="text-primary underline hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </Link>
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .corporate-phone-input {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .corporate-phone-input input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          color: inherit;
        }
        @media (min-width: 768px) {
          .corporate-phone-input input {
            font-size: 18px;
          }
        }
        .corporate-phone-input input::placeholder {
          color: var(--muted-foreground);
          opacity: 0.9;
        }
        .PhoneInputCountry {
          padding-right: 12px;
          border-right: 1px solid var(--border);
        }
      ` }} />
    </section>
  );
}