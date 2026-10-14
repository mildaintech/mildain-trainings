import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#030b14] pt-16 pb-8">
      <div className="w-full max-w-[1300px] mx-auto px-6 lg:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-10">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/logo/logo.webp"
                alt="Mildain Logo"
                width={160}
                height={45}
                className="h-9 w-auto object-contain"
              />
            </Link>
            
            <p className="text-[#8896AB] text-[14px] leading-relaxed mb-8 max-w-[90%]">
              Trusted cybersecurity certification training for professionals and enterprise teams across Texas and the United States.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#0f9d58] w-5 h-5 shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-[#8896AB] text-[14px] leading-relaxed">
                  Noida Branch : Plot. No - 1, Film City, Sector-16A<br />
                  Noida. Uttar Pradesh Pin-201301
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail className="text-[#0f9d58] w-5 h-5 shrink-0" strokeWidth={2} />
                <a href="mailto:info@mildaintrainings.com" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">
                  info@mildaintrainings.com
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="text-[#0f9d58] w-5 h-5 shrink-0" strokeWidth={2} />
                <a href="tel:+918929199704" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">
                  +91-8929199704
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <a href="https://www.facebook.com/officialmildaintrainings" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-[#E4FFF1] text-[#0f9d58] flex items-center justify-center hover:bg-[#0f9d58] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCqSbGsCCeB7RhDy0-CUrI9Q" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-[#E4FFF1] text-[#0f9d58] flex items-center justify-center hover:bg-[#0f9d58] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mildain_trainings/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-[#E4FFF1] text-[#0f9d58] flex items-center justify-center hover:bg-[#0f9d58] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://x.com/mildain_sol" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-[#E4FFF1] text-[#0f9d58] flex items-center justify-center hover:bg-[#0f9d58] hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://web.whatsapp.com/send?phone=918929199704" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-[#E4FFF1] text-[#0f9d58] flex items-center justify-center hover:bg-[#0f9d58] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.888-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.15-.173.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/mildain-solutions/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-[4px] bg-[#E4FFF1] text-[#0f9d58] flex items-center justify-center hover:bg-[#0f9d58] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-white font-bold text-[15px] mb-6">Popular Trainings</h3>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CISSP Training</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CISA Training</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CISM Training</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CRISC Training</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CISO Training</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CCISO Training</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">CEH Training</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-white font-bold text-[15px] mb-6">Industries</h3>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Healthcare Cybersecurity</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Financial Services Security</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Manufacturing & OT Security</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors leading-snug block pr-4">Government & Federal Security Compliance</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Retail & PCI Security</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Critical Infrastructure Security</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-white font-bold text-[15px] mb-6">Company</h3>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Corporate</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Newsletters</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Career</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-[#8896AB] text-[14px] hover:text-[#0f9d58] transition-colors">Return Policy</Link></li>
            </ul>
          </div>
          
        </div>

        <div className="w-full pt-8 border-t border-[#1C2534] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8896AB] text-[14px]">
            © 2026 Mildain Solutions LLP. All rights Reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
}