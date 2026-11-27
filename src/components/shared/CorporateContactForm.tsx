// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
// // import 'react-phone-number-input/style.css';

// export default function CorporateContactForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     message: ""
//   });
//   const [phone, setPhone] = useState<string | undefined>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const [userCountryCode, setUserCountryCode] = useState<any>("IN");
//   const [userCountryName, setUserCountryName] = useState<string>("India");

//   const [errors, setErrors] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     message: "",
//     global: ""
//   });

//   useEffect(() => {
//     const cookies = document.cookie.split("; ");
//     const regionCookie = cookies.find((row) => row.startsWith("userRegion="));
//     const regionValue = regionCookie ? regionCookie.split("=")[1] : null;

//     if (regionValue === "US") {
//       setUserCountryCode("US");
//       setUserCountryName("United States");
//     } else {
//       fetch("https://ipapi.co/json/")
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.country_code) {
//             setUserCountryCode(data.country_code);
//             setUserCountryName(data.country_name || "India");
//           }
//         })
//         .catch(() => {
//           setUserCountryCode("IN");
//           setUserCountryName("India");
//         });
//     }
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "", global: "" });
//   };

//   const handlePhoneChange = (value: string | undefined) => {
//     setPhone(value);
//     setErrors({ ...errors, phone: "", global: "" });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     let newErrors = { fullName: "", email: "", phone: "", message: "", global: "" };

//     const nameRegex = /^[A-Za-z\s]{3,50}$/;
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full Name is required";
//       isValid = false;
//     } else if (!nameRegex.test(formData.fullName)) {
//       newErrors.fullName = "Please enter a valid name";
//       isValid = false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = "Email Address is required";
//       isValid = false;
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     if (!phone) {
//       newErrors.phone = "Phone number is required";
//       isValid = false;
//     } else if (!isValidPhoneNumber(phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//       isValid = false;
//     }

//     if (formData.message.trim().length > 0 && formData.message.trim().length < 10) {
//       newErrors.message = "Message must be at least 10 characters long";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const payload = {
//       ...formData,
//       phone,
//       country: userCountryName,
//       inquiryType: "Corporate",
//       source: "Corporate Page"
//     };

//     try {
//       await fetch("/api/zoho", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const dbResponse = await fetch("/api/corporate-inquiries", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (dbResponse.ok) {
//         setFormData({ fullName: "", email: "", message: "" });
//         setPhone("");
//         alert("Thank you! Your corporate inquiry has been submitted.");
//       } else {
//         setErrors({ ...errors, global: "Something went wrong. Please try again." });
//       }
//     } catch (err) {
//       setErrors({ ...errors, global: "Error submitting form. Please check your connection." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-[550px] bg-card rounded-md shadow-lg border border-border overflow-hidden">
//       <div className="bg-btn-gradient py-6 px-8 text-center">
//         <h3 className="text-[24px] md:text-[28px] font-bold text-primary-foreground tracking-wide mb-0">
//           Speak to Solution Expert
//         </h3>
//       </div>

//       <form onSubmit={handleSubmit} className="p-8 md:p-10 flex flex-col gap-5">
        
//         {errors.global && (
//           <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-md font-medium">
//             {errors.global}
//           </div>
//         )}

//         <div>
//           <input 
//             type="text" 
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Full Name*" 
//             className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.fullName ? "border-destructive" : "border-border"}`}
//           />
//           {errors.fullName && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.fullName}</p>}
//         </div>

//         <div>
//           <input 
//             type="text" 
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email Address*" 
//             className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.email ? "border-destructive" : "border-border"}`}
//           />
//           {errors.email && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.email}</p>}
//         </div>

//         <div>
//           <div className={`w-full border rounded-md px-4 py-4 bg-background transition-all focus-within:ring-2 focus-within:ring-primary ${errors.phone ? "border-destructive" : "border-border"}`}>
//             <PhoneInput
//               key={userCountryCode}
//               international
//               defaultCountry={userCountryCode}
//               value={phone}
//               onChange={handlePhoneChange}
//               className="corporate-phone-input"
//             />
//           </div>
//           {errors.phone && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.phone}</p>}
//         </div>

//         <div>
//           <textarea 
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Message Details" 
//             rows={4}
//             className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.message ? "border-destructive" : "border-border"}`}
//           ></textarea>
//           {errors.message && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.message}</p>}
//         </div>

//         <button 
//           type="submit" 
//           disabled={isSubmitting}
//           className="relative overflow-hidden group w-full mt-2 bg-btn-gradient text-primary-foreground py-4 text-[18px] md:text-[20px] font-bold rounded-md transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
//         >
//           <span className="relative z-10">
//             {isSubmitting ? "Submitting..." : "Contact Us"}
//           </span>
//           <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
//         </button>

//         <p className="text-[14px] md:text-[16px] text-muted-foreground mt-2 leading-relaxed">
//           By registering here, I agree to Mildain Trainings{' '}
//           <Link href="/terms-and-conditions" className="text-primary underline hover:text-primary/80 transition-colors">
//             Terms & Condition
//           </Link>
//           {' '}and{' '}
//           <Link href="/privacy-policy" className="text-primary underline hover:text-primary/80 transition-colors">
//             Privacy Policy
//           </Link>
//         </p>
//       </form>
//       <style dangerouslySetInnerHTML={{ __html: `
//         .corporate-phone-input {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }
//         .corporate-phone-input input {
//           width: 100%;
//           border: none;
//           outline: none;
//           background: transparent;
//           font-size: 16px;
//           color: inherit;
//         }
//         @media (min-width: 768px) {
//           .corporate-phone-input input {
//             font-size: 18px;
//           }
//         }
//         .corporate-phone-input input::placeholder {
//           color: var(--muted-foreground);
//           opacity: 0.9;
//         }
//         .PhoneInputCountry {
//           padding-right: 12px;
//           border-right: 1px solid var(--border);
//         }
//       ` }} />
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useLeadSecurity } from '@/hooks/useLeadSecurity';

export default function CorporateContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [phone, setPhone] = useState<string | undefined>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userCountryCode, setUserCountryCode] = useState<any>('IN');
  const [userCountryName, setUserCountryName] = useState<string>('India');

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    global: '',
  });

  const { executeSecurity, resetSecurity, SecurityElements } = useLeadSecurity();

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const regionCookie = cookies.find((row) => row.startsWith('userRegion='));
    const regionValue = regionCookie ? regionCookie.split('=')[1] : null;

    if (regionValue === 'US') {
      setUserCountryCode('US');
      setUserCountryName('United States');
    } else {
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((data) => {
          if (data.country_code) {
            setUserCountryCode(data.country_code);
            setUserCountryName(data.country_name || 'India');
          }
        })
        .catch(() => {
          setUserCountryCode('IN');
          setUserCountryName('India');
        });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '', global: '' });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setErrors({ ...errors, phone: '', global: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { fullName: '', email: '', phone: '', message: '', global: '' };

    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = 'Please enter a valid name';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!isValidPhoneNumber(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (formData.message.trim().length > 0 && formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      const securityPayload = await executeSecurity();

      const payload = {
        ...formData,
        phone,
        country: userCountryName,
        inquiryType: 'Corporate',
        source: 'Corporate Page',
        ...securityPayload,
      };

      const dbResponse = await fetch('/api/corporate-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await dbResponse.json().catch(() => ({}));

      if (dbResponse.ok && result.success !== false) {
        setFormData({ fullName: '', email: '', message: '' });
        setPhone('');
        resetSecurity();
        alert('Thank you! Your corporate inquiry has been submitted.');
      } else {
        setErrors({
          ...errors,
          global: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setErrors({ ...errors, global: 'Security verification failed or network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[550px] bg-card rounded-md shadow-lg border border-border overflow-hidden">
      <div className="bg-btn-gradient py-6 px-8 text-center">
        <h3 className="text-[24px] md:text-[28px] font-bold text-primary-foreground tracking-wide mb-0">
          Speak to Solution Expert
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-10 flex flex-col gap-5">
        {SecurityElements}

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
            className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.fullName ? 'border-destructive' : 'border-border'}`}
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
            className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${errors.email ? 'border-destructive' : 'border-border'}`}
          />
          {errors.email && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.email}</p>}
        </div>

        <div>
          <div className={`w-full border rounded-md px-4 py-4 bg-background transition-all focus-within:ring-2 focus-within:ring-primary ${errors.phone ? 'border-destructive' : 'border-border'}`}>
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
            className={`w-full border rounded-md px-4 py-4 text-[16px] md:text-[18px] text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none ${errors.message ? 'border-destructive' : 'border-border'}`}
          ></textarea>
          {errors.message && <p className="text-destructive text-[12px] mt-1.5 font-medium px-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="relative overflow-hidden group w-full mt-2 bg-btn-gradient text-primary-foreground py-4 text-[18px] md:text-[20px] font-bold rounded-md transition-all duration-300 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          <span className="relative z-10">
            {isSubmitting ? 'Submitting...' : 'Contact Us'}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
        </button>

        <p className="text-[14px] md:text-[16px] text-muted-foreground mt-2 leading-relaxed">
          By registering here, I agree to Mildain Trainings{' '}
          <Link href="/terms-and-conditions" className="text-primary underline hover:text-primary/80 transition-colors">
            Terms &amp; Condition
          </Link>
          {' '}and{' '}
          <Link href="/privacy-policy" className="text-primary underline hover:text-primary/80 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </form>
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
    </div>
  );
}