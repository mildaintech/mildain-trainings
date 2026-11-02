'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, ChevronDown, Check } from 'lucide-react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { getCountries } from 'react-phone-number-input';
import Flags from 'react-phone-number-input/flags';
import en from 'react-phone-number-input/locale/en.json';

export default function Footer() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cookies = document.cookie.split('; ');
    const regionCookie = cookies.find((row) => row.startsWith('userRegion='));
    if (regionCookie) {
      setSelectedRegion(regionCookie.split('=')[1]);
    }
  }, []);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setCookie('userRegion', region, { maxAge: 2592000, path: '/' });
    setIsDropdownOpen(false);
    router.refresh();
  };

  const countriesList = getCountries();
  const SelectedFlag = Flags[selectedRegion as keyof typeof Flags] || Flags['US'];

  return (
    <footer className="w-full bg-primary pt-16 pb-28">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-10">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/logo/logo.webp"
                alt="Mildain Logo"
                width={160}
                height={45}
                className="h-12 w-auto object-contain"
              />
            </Link>
            
            <p className="text-primary-foreground/70 text-[14px] leading-relaxed mb-8 max-w-[90%]">
              Trusted cybersecurity certification training for professionals and enterprise teams across Texas and the United States.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary-foreground/90 w-5 h-5 shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-primary-foreground/70 text-[14px] leading-relaxed mb-0">
                  Noida Branch : Plot. No - 1, Film City, Sector-16A<br />
                  Noida. Uttar Pradesh Pin-201301
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="text-primary-foreground/90 w-5 h-5 shrink-0" strokeWidth={2} />
                <a href="mailto:info@mildaintrainings.com" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">
                  info@mildaintrainings.com
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="text-primary-foreground/90 w-5 h-5 shrink-0" strokeWidth={2} />
                <a href="tel:+918929199704" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">
                  +91-8929199704
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <a href="https://www.facebook.com/officialmildaintrainings" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCqSbGsCCeB7RhDy0-CUrI9Q" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </a>
              <a href="https://www.instagram.com/mildain_trainings/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/mildain-solutions/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h5 className="text-primary-foreground font-bold mb-6">Popular Trainings</h5>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CISSP Training</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CISA Training</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CISM Training</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CRISC Training</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CISO Training</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CCISO Training</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">CEH Training</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h5 className="text-primary-foreground font-bold mb-6">Industries</h5>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Healthcare Cybersecurity</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Financial Services Security</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Manufacturing & OT Security</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors leading-snug block pr-4">Government & Federal Security Compliance</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Retail & PCI Security</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Critical Infrastructure Security</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h5 className="text-primary-foreground font-bold mb-6">Company</h5>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="corporate-training" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Corporate</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Newsletters</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Career</Link></li>
              <li><Link href="about-us" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link href="contact-us" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="terms-and-conditions" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link href="privacy-policy" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="refund-privacy-policy" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="w-full pt-8 border-t border-primary-foreground/10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 order-1">
            <Link href="/terms-and-conditions" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Terms and Conditions</Link>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/30 hidden md:block"></span>
            <Link href="/privacy-policy" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/30 hidden md:block"></span>
            <Link href="/refund-privacy-policy" className="text-primary-foreground/70 text-[14px] hover:text-primary-foreground transition-colors">Refund Policy</Link>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/30 hidden md:block"></span>
            
            <div className="flex items-center gap-2 relative mt-2 md:mt-0">
              <span className="text-primary-foreground/70 text-[14px]">Country</span>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/20 rounded px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                {mounted && SelectedFlag && (
                  <span className="w-6 flex items-center justify-center overflow-hidden rounded-[2px]">
                    <SelectedFlag title={selectedRegion} />
                  </span>
                )}
                <ChevronDown className="w-4 h-4 text-primary-foreground/70" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute bottom-full right-0 lg:left-0 mb-2 w-64 bg-card rounded-md shadow-xl border border-border overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                  {countriesList.map((countryCode) => {
                    const CountryFlag = Flags[countryCode as keyof typeof Flags];
                    const countryName = en[countryCode as keyof typeof en] || countryCode;
                    const isSelected = selectedRegion === countryCode;
                    
                    return (
                      <button 
                        key={countryCode}
                        onClick={() => handleRegionChange(countryCode)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted/50 text-foreground text-[14px] transition-colors text-left cursor-pointer ${isSelected ? 'bg-primary/10' : ''}`}
                      >
                        <span className="flex items-center gap-3">
                          {CountryFlag ? (
                            <span className="w-6 flex items-center justify-center overflow-hidden rounded-[2px] shadow-sm">
                              <CountryFlag title={countryName} />
                            </span>
                          ) : (
                            <span className="w-6" />
                          )}
                          <span className="truncate max-w-[150px] font-medium">{countryName}</span>
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <p className="text-primary-foreground/70 text-[14px] mb-0 order-2">
            © 2026 Mildain Solutions LLP. All rights Reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}