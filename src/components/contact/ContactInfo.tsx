'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, X, Map, ArrowUpRight } from 'lucide-react';

const officeLocations = [
  {
    id: 1,
    city: "Bengaluru, India",
    address: "Unit No - 2245, 22nd floor, World Trade Centre(WTC), Brigade Gateway Campus, Dr Rajkumar Road, Rajajinagar, Bengaluru, Karnataka 560055",
    mapQuery: "World Trade Centre, Brigade Gateway, Bengaluru"
  },
  {
    id: 2,
    city: "Noida, India",
    address: "Plot. No - 1, Film City, Sector-16A Noida. Uttar Pradesh 201301",
    mapQuery: "Film City, Sector-16A, Noida"
  },
  {
    id: 3,
    city: "Austin, USA",
    address: "5900 BALCONES DRIVE STE 100, AUSTIN, TEXAS, 78731, UNITED STATES, TRAVIS COUNTY, TEXAS",
    mapQuery: "5900 BALCONES DRIVE STE 100, AUSTIN, TEXAS"
  }
];

export default function ContactInfo() {
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedMap) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMap(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedMap]);

  return (
    <>
      <div className="flex flex-col w-full h-full pr-0 lg:pr-8">

        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[12px] md:text-[13px] font-semibold tracking-[0.2em] uppercase text-primary mb-4">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            Contact
          </span>
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-foreground leading-[1.1] tracking-tight mb-4">
            Let's Start a{' '}
            <span className="text-primary">
              Conversation
            </span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed mb-0">
            Whether you are looking to upskill your workforce, partner with us, or simply have a question, our
            global team is ready to assist you.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          <a
            href="tel:+918929199704"
            className="group w-full flex items-center p-5 lg:p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-[0_12px_30px_-8px_rgba(46,97,87,0.25)] hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary transition-all duration-300">
              <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={2} />
            </div>
            <div className="flex flex-col overflow-hidden flex-1">
              <span className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Call Us Directly</span>
              <span className="text-[17px] md:text-[19px] font-bold text-foreground group-hover:text-primary transition-colors truncate">
                +91-8929199704
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
          </a>

          <a
            href="mailto:info@mildaintrainings.com"
            className="group w-full flex items-center p-5 lg:p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-[0_12px_30px_-8px_rgba(46,97,87,0.25)] hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary transition-all duration-300">
              <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={2} />
            </div>
            <div className="flex flex-col overflow-hidden flex-1">
              <span className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Email Support</span>
              <span className="text-[15px] md:text-[17px] lg:text-[18px] font-bold text-foreground group-hover:text-primary transition-colors truncate">
                info@mildaintrainings.com
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-1">
            <span className="text-[22px] md:text-[26px] font-bold text-foreground tracking-tight whitespace-nowrap">
              Global Offices
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          {officeLocations.map((office) => (
            <div
              key={office.id}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border border-border hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <span className="absolute left-0 top-0 h-full w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col md:max-w-[75%]">
                <span className="text-[17px] md:text-[19px] font-bold text-foreground mb-2 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  </span>
                  {office.city}
                </span>
                <span className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                  {office.address}
                </span>
              </div>

              <button
                onClick={() => setSelectedMap(office.mapQuery)}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-card border border-primary/30 hover:bg-primary hover:border-primary text-primary hover:text-primary-foreground px-5 py-2.5 rounded-full transition-all duration-300 font-semibold text-[14px] cursor-pointer"
              >
                View Map
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedMap && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 md:p-6 backdrop-blur-md"
          onClick={() => setSelectedMap(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Location map"
        >
          <div
            className="relative w-full max-w-4xl h-[60vh] md:h-[75vh] bg-card rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-16 bg-card/95 backdrop-blur-md flex items-center justify-between px-6 border-b border-border z-10">
              <span className="text-[17px] font-bold text-foreground flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </span>
                Location Map
              </span>
              <button
                onClick={() => setSelectedMap(null)}
                aria-label="Close map"
                className="w-10 h-10 bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="w-full h-full pt-16">
              <iframe
                width="100%"
                height="100%"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMap)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                className="w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}