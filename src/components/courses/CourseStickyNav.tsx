'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, X } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'curriculum', label: 'Course Curriculum' },
  { id: 'options', label: 'Training Options' },
  { id: 'exam', label: 'Exam & Certification' },
  { id: 'advisor', label: 'Course Advisor' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
];

export default function CourseStickyNav() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80; 
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  const activeItem = navItems.find(item => item.id === activeSection) || navItems[0];

  return (
    <>
      <div 
        className={`w-full z-[100] transition-all duration-300 border-b border-border bg-background ${
          isSticky ? 'fixed top-0 left-0 shadow-md shadow-primary/5' : 'relative'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative">
          
          <div className="hidden md:flex items-center justify-between h-[80px]">
            <nav className="flex flex-1 overflow-x-auto gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`whitespace-nowrap text-[14px] lg:text-[15px] font-bold h-full flex items-center border-b-[3px] transition-colors uppercase ${
                    activeSection === item.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="shrink-0 ml-6">
              <button 
                onClick={(e) => scrollToSection(e, 'options')}
                className="bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold px-8 py-3 rounded-md shadow-sm transition-all"
              >
                Enroll Now
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between h-[70px]">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 text-[16px] font-bold text-foreground"
            >
              {activeItem.label}
              {isMobileMenuOpen ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
            </button>
            <button
              onClick={(e) => scrollToSection(e, 'options')}
              className="bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold px-6 py-2.5 rounded-md text-[15px] transition-all shadow-sm"
            >
              Enroll Now
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-[70px] left-0 w-full bg-background border-t border-border shadow-md z-40">
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      scrollToSection(e, item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-4 border-b border-border text-[15px] font-medium transition-colors ${
                      activeSection === item.id 
                        ? 'bg-primary/5 text-primary' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-background border-t border-border p-3 flex gap-3 z-[100] shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold py-3.5 rounded-md text-[15px] transition-all shadow-sm"
        >
          Talk to Our Advisor
        </button>
        <button className="flex items-center justify-center gap-2 bg-background border-[2px] border-primary text-primary hover:bg-primary/5 font-bold py-3.5 px-6 rounded-md text-[15px] transition-all">
          <MessageSquare size={18} />
          Chat
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md relative p-6 pt-8 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground shadow-md hover:bg-muted transition-colors"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            <div className="text-center mb-8">
              <h4 className="text-[20px] font-bold text-foreground inline-block relative mb-0">
                Enter Your Details
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[3px] bg-primary rounded-full"></span>
              </h4>
            </div>

            <form className="flex flex-col gap-5">
              <input 
                type="text" 
                placeholder="Name*" 
                className="w-full border-b border-border bg-transparent py-2 text-[15px] text-foreground outline-none focus:border-primary placeholder:text-muted-foreground transition-colors"
                required
              />
              
              <input 
                type="email" 
                placeholder="Email*" 
                className="w-full border-b border-border bg-transparent py-2 text-[15px] text-foreground outline-none focus:border-primary placeholder:text-muted-foreground transition-colors"
                required
              />
              
              <div className="flex border-b border-border focus-within:border-primary transition-colors bg-transparent">
                <select className="py-2 pr-2 text-[15px] outline-none bg-card text-foreground">
                  <option value="IN">IN</option>
                </select>
                <div className="w-[1px] h-5 bg-border self-center mx-2"></div>
                <input 
                  type="tel" 
                  placeholder="+91 Phone Number*" 
                  className="w-full py-2 text-[15px] bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                  required
                />
              </div>

              <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-4 h-4 mt-1 shrink-0">
                  <input type="checkbox" className="peer appearance-none w-4 h-4 border border-border rounded-sm checked:bg-primary checked:border-primary cursor-pointer transition-all bg-background" defaultChecked />
                  <svg className="absolute w-3 h-3 text-primary-foreground pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-[12px] text-muted-foreground leading-relaxed">
                  By submitting this form, you consent to our <a href="#" className="text-primary hover:underline font-medium">Terms and Conditions</a> & <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a> and to be contacted by us and our partners via Email / Call / Whatsapp / SMS / AI-Call.
                </span>
              </label>

              <button 
                type="submit"
                className="w-full bg-btn-gradient hover:opacity-90 text-primary-foreground font-bold py-3.5 rounded-md text-[15px] mt-2 transition-all shadow-sm"
              >
                Select Date & Time
              </button>
            </form>
            
          </div>
        </div>
      )}
    </>
  );
}