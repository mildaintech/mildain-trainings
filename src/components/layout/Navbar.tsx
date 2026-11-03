'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, Menu, X, LayoutGrid, ChevronDown, User, LayoutDashboard, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';

interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  provider?: string;
  duration?: string;
  badge?: string;
  image?: string;
  logoImage?: string;
  bannerImage?: string;
}

export default function Navbar() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const [isVisible, setIsVisible] = useState(true);
  const [promoHeight, setPromoHeight] = useState(48);
  const [isFixed, setIsFixed] = useState(false);
  const lastScrollY = useRef(0);

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const promo = document.querySelector<HTMLElement>('[data-promo-banner]');
    if (!promo) return;
    const observer = new ResizeObserver(() => setPromoHeight(promo.getBoundingClientRect().height));
    observer.observe(promo);
    setPromoHeight(promo.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsFixed(current > 100);
      if (current <= 100) setIsVisible(true);
      else if (current > lastScrollY.current + 1) setIsVisible(false);
      else if (current < lastScrollY.current - 1) setIsVisible(true);
      lastScrollY.current = current;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideProfile = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideProfile);
    return () => document.removeEventListener('mousedown', handleClickOutsideProfile);
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const cachedData = sessionStorage.getItem("nav_courses_cache");
        if (cachedData) {
          const { cachedCourses, cachedCategories } = JSON.parse(cachedData);
          setCourses(cachedCourses);
          setCategories(cachedCategories);
          if (cachedCategories.length > 0) setActiveCategory(cachedCategories[0]);
        }
      } catch (e) {
        console.warn("Session storage error", e);
      }

      try {
        const res = await fetch("/api/admin/courses", { cache: 'force-cache' });
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setCourses(data);
            const uniqueCategories = Array.from(new Set(data.map((c: Course) => c.category))) as string[];
            setCategories(uniqueCategories);
            if (uniqueCategories.length > 0 && !activeCategory) setActiveCategory(uniqueCategories[0]);
            
            try {
              sessionStorage.setItem("nav_courses_cache", JSON.stringify({
                cachedCourses: data,
                cachedCategories: uniqueCategories
              }));
            } catch(err) { console.warn(err); }
          }
        }
      } catch (err) {}
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {}
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setIsMobileMenuOpen(false);
      router.push("/login");
    } catch (error) {}
  };

  const activeCourses = courses.filter(c => c.category === activeCategory);

  const getBadgeColor = (badgeText: string) => {
    const lower = badgeText.toLowerCase();
    if (lower.includes("popular")) return "bg-gradient-to-r from-orange-400 to-orange-500";
    if (lower.includes("trending")) return "bg-gradient-to-r from-green-500 to-green-600";
    return "bg-primary"; 
  };

  return (
    <header
      ref={headerRef}
      style={isFixed ? { top: promoHeight } : undefined}
      className={`${isFixed ? 'fixed left-0' : 'relative'} z-[150] w-full bg-background border-b border-border h-[64px] lg:h-[76px] flex items-center transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full h-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between bg-secondary/5 z-50">
        
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-4 xl:gap-5 h-full shrink-0">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary p-1 -ml-1"
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>
          
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo/mildain training logo.png"
              alt="Mildain Trainings Logo"
              width={160}
              height={45}
              className="h-6 sm:h-7 lg:h-8 xl:h-9 w-auto object-contain"
              priority
            />
          </Link>

          <div 
            className="hidden lg:flex h-full items-center ml-1 xl:ml-3 cursor-pointer"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className="flex items-center gap-1.5 sm:gap-2 bg-btn-gradient hover:opacity-95 shadow-md shadow-primary/20 text-primary-foreground px-4 lg:px-5 h-[38px] lg:h-[42px] rounded-sm font-medium transition-all whitespace-nowrap shrink-0">
              <LayoutGrid size={16} className="w-[16px] h-[16px]" />
              <span className="text-[13px] lg:text-[14px]">All Courses</span>
            </button>
          </div>

          <SearchBar courses={courses} />
        </div>

        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 h-full shrink-0">
          
          <div className="lg:hidden flex items-center h-full">
            <button 
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-1.5 bg-btn-gradient hover:opacity-95 shadow-md shadow-primary/20 text-primary-foreground px-3 sm:px-4 h-[36px] sm:h-[40px] rounded-sm font-medium transition-all whitespace-nowrap shrink-0"
            >
              <LayoutGrid size={14} />
              <span className="text-[12px] sm:text-[13px]">All Courses</span>
            </button>
          </div>

          <button 
            className="lg:hidden text-primary p-1"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search size={22} strokeWidth={2} />
          </button>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-[13.5px] xl:text-[14.5px] font-bold text-foreground h-full">
            <Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
            <Link href="/more" className="hover:text-primary transition-colors flex items-center gap-1">
              More <ChevronDown size={14} className="mt-0.5 text-muted-foreground" />
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4 h-full">
            <Link href="/corporate-training" className="flex items-center justify-center bg-btn-gradient hover:opacity-95 shadow-md shadow-primary/20 text-primary-foreground px-4 xl:px-6 h-[38px] xl:h-[42px] rounded-sm font-bold text-[13px] xl:text-[14px] transition-all whitespace-nowrap shrink-0">
              Corporate
            </Link>

            {!user ? (
              <Button asChild className="bg-transparent hover:bg-primary/10 text-primary border-[1.5px] border-primary font-bold text-[13px] xl:text-[14px] rounded-sm px-5 xl:px-7 h-[38px] xl:h-[42px] transition-all shadow-none shrink-0">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <div className="relative flex items-center h-full ml-1" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105"
                >
                  <User className="w-8 h-8 xl:w-9 xl:h-9 fill-current text-primary" strokeWidth={1.5} />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-[60px] right-0 w-56 bg-background border border-border rounded-md shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-[14px] font-bold text-foreground truncate">{user.name}</p>
                      <p className="text-[11px] font-bold text-primary uppercase tracking-wider mt-0.5">{user.role}</p>
                    </div>

                    <Link
                      href={user.role === "admin" ? "/admin/courses" : "/student"}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-foreground hover:bg-secondary hover:text-primary transition-colors mt-1"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Extracted Mega Menu Component */}
      <MegaMenu 
        isMegaMenuOpen={isMegaMenuOpen}
        setIsMegaMenuOpen={setIsMegaMenuOpen}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeCourses={activeCourses}
        getBadgeColor={getBadgeColor}
      />

      {isMobileSearchOpen && (
        <div className="lg:hidden absolute inset-0 bg-background z-[60] flex items-center justify-between px-4 sm:px-6 border-b border-border h-full gap-3">
          <SearchBar courses={courses} isMobile onClose={() => setIsMobileSearchOpen(false)} />
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-1 text-muted-foreground hover:text-foreground shrink-0"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[64px] left-0 w-full bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4 z-40">
          <div className="flex flex-col gap-4 border-b border-border pb-4">
            <Link href="/more" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-bold text-foreground flex justify-between items-center">
              More <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
            <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-bold text-foreground">Blogs</Link>
            <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-bold text-foreground">Careers</Link>
          </div>
          
          <div className="flex flex-col gap-3 mt-2">
            <Button asChild className="bg-btn-gradient hover:opacity-95 shadow-md shadow-primary/20 text-primary-foreground font-bold text-[14px] rounded-lg w-full h-[42px]">
              <Link href="/corporate-training" onClick={() => setIsMobileMenuOpen(false)}>Corporate</Link>
            </Button>

            {!user ? (
              <Button asChild className="bg-transparent hover:bg-primary/10 text-primary border-[1.5px] border-primary font-bold text-[14px] rounded-lg w-full h-[42px]">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              </Button>
            ) : (
              <div className="flex flex-col gap-2 border border-border rounded-lg p-3 bg-secondary/20">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <User className="w-8 h-8 fill-current text-primary" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-foreground truncate">{user.name}</p>
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">{user.role}</p>
                  </div>
                </div>
                <Link
                  href={user.role === "admin" ? "/admin/courses" : "/student"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 text-[14px] text-foreground hover:text-primary transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-2 py-2 text-[14px] text-red-600 transition-colors text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}