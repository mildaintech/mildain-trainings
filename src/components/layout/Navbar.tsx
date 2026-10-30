'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight, Menu, X, LayoutGrid, ChevronDown, User, LayoutDashboard, LogOut } from 'lucide-react';

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
  const [lastScrollY, setLastScrollY] = useState(0);

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const headerRef = useRef<HTMLHeadingElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
        const res = await fetch("/api/admin/courses");
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setCourses(data);
            const uniqueCategories = Array.from(new Set(data.map((c: Course) => c.category))) as string[];
            setCategories(uniqueCategories);
            if (uniqueCategories.length > 0) setActiveCategory(uniqueCategories[0]);
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
      className={`fixed top-0 left-0 z-50 w-full bg-background border-b border-border h-[64px] lg:h-[76px] flex items-center transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
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

          <div className="relative hidden lg:flex items-center w-[260px] xl:w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-muted-foreground stroke-[1.5]" />
            <Input
              type="text"
              placeholder="What do you want to learn?"
              className="pl-10 pr-4 h-[38px] lg:h-[42px] text-[13px] lg:text-[14px] rounded-sm bg-primary/5 border border-primary/20 focus:bg-primary/10 focus:ring-1 focus:ring-primary/30 transition-all text-foreground placeholder:text-muted-foreground w-full shadow-none"
            />
          </div>
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
            <Link href="/corporate" className="flex items-center justify-center bg-btn-gradient hover:opacity-95 shadow-md shadow-primary/20 text-primary-foreground px-4 xl:px-6 h-[38px] xl:h-[42px] rounded-sm font-bold text-[13px] xl:text-[14px] transition-all whitespace-nowrap shrink-0">
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
                  {user.role === "admin" ? (
                    <User className="w-8 h-8 xl:w-9 xl:h-9 fill-current text-primary" strokeWidth={1.5} />
                  ) : (
                    <User className="w-8 h-8 xl:w-9 xl:h-9 fill-current text-primary" strokeWidth={1.5} />
                  )}
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

      {isMegaMenuOpen && (
        <div 
          className="absolute top-[64px] lg:top-[76px] left-0 w-full px-0 sm:px-6 lg:px-16 flex justify-center shadow-sm z-40 bg-black/40 lg:bg-transparent h-[calc(100vh-64px)] lg:h-auto"
          onMouseEnter={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(true); }}
          onMouseLeave={() => { if (window.innerWidth >= 1024) setIsMegaMenuOpen(false); }}
        >
          <div className="w-full max-w-[1300px] bg-background lg:rounded-b-2xl shadow-[0_24px_48px_rgba(0,0,0,0.08)] border-t lg:border-x lg:border-b border-border flex flex-col lg:flex-row overflow-hidden h-full lg:h-auto lg:min-h-[500px] lg:max-h-[85vh]">
            
            <div className="w-full lg:w-[320px] bg-background border-b lg:border-b-0 lg:border-r border-border flex flex-col py-4 shrink-0 shadow-none lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 max-h-[35vh] lg:max-h-none overflow-y-auto">
              <h3 className="px-6 py-3 lg:py-2 text-[18px] lg:text-[22px] font-bold text-foreground tracking-wider uppercase">
                CATEGORIES
              </h3>
              <ul className="flex-1">
                {categories.map((cat) => (
                  <li 
                    key={cat}
                    onMouseEnter={() => { if (window.innerWidth >= 1024) setActiveCategory(cat); }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 lg:py-2.5 cursor-pointer flex justify-between items-center text-[14px] lg:text-[13.5px] transition-all ${
                      activeCategory === cat 
                        ? 'bg-primary/10 text-primary font-bold border-l-[3px] border-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5 border-l-[3px] border-transparent font-medium'
                    }`}
                  >
                    <span className="capitalize">{cat}</span>
                    {activeCategory === cat && <ChevronRight size={16} className="text-primary" />}
                  </li>
                ))}
                {categories.length === 0 && (
                  <li className="px-6 py-4 text-sm text-muted-foreground">No categories found</li>
                )}
              </ul>
            </div>

            <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-secondary/30 h-full">
              <div className="mb-2 lg:mb-3">
                <h3 className="text-[18px] lg:text-[20px] font-bold text-foreground">Career Aligned Learning Paths</h3>
                <p className="text-[13px] text-muted-foreground mt-0.5">Master essential skills for your dream career</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 pb-8 lg:pb-0">
                {activeCourses.map(course => (
                  <Link 
                    href={`/courses/${course.slug}`} 
                    key={course._id} 
                    className="group block border border-border rounded-xl p-4 bg-background hover:shadow-lg transition-all relative min-h-[140px] flex flex-col hover:border-primary/30"
                  >
                    <div className="h-[30px] min-h-[30px] mb-[12px] max-w-full flex items-center justify-start">
                      {(course.logoImage || course.image) ? (
                        <img 
                          src={course.logoImage || course.image} 
                          alt={course.provider || "Provider"} 
                          className="h-full w-auto object-contain max-w-full"
                        />
                      ) : (
                        <span className="text-[15px] font-bold text-muted-foreground uppercase tracking-wider">
                          {course.provider || "MILDAN ED-TECH"}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-foreground text-[16px] leading-[1.4] line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h4>
                    
                    <div className="mt-auto pt-3 flex justify-between items-center">
                      <p className="text-[12px] font-medium text-muted-foreground">
                        {course.duration || "Self-Paced"}
                      </p>
                    </div>

                    {course.badge && (
                      <div className={`absolute bottom-0 right-0 ${getBadgeColor(course.badge)} text-white text-[11px] font-bold px-3 py-1.5 rounded-tl-xl rounded-br-xl shadow-sm`}>
                        {course.badge}
                      </div>
                    )}
                  </Link>
                ))}
                
                {activeCourses.length === 0 && (
                  <div className="col-span-full py-10 text-muted-foreground text-center text-sm">
                    No courses available in this category.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {isMobileSearchOpen && (
        <div className="lg:hidden absolute inset-0 bg-background z-[60] flex items-center justify-between px-4 sm:px-6 border-b border-border h-full gap-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-primary stroke-[2]" />
            <Input
              type="text"
              placeholder="What do you want to learn?"
              className="pl-10 pr-4 h-[42px] text-[14px] rounded-lg bg-primary/10 border border-primary/20 focus:bg-primary/10 focus:ring-1 focus:ring-primary/30 transition-all text-foreground placeholder:text-muted-foreground w-full shadow-none"
              autoFocus
            />
          </div>
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
            <Link href="/more" className="text-[14px] font-bold text-foreground flex justify-between items-center">
              More <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
            <Link href="/blogs" className="text-[14px] font-bold text-foreground">Blogs</Link>
            <Link href="/careers" className="text-[14px] font-bold text-foreground">Careers</Link>
          </div>
          
          <div className="flex flex-col gap-3 mt-2">
            <Button asChild className="bg-btn-gradient hover:opacity-95 shadow-md shadow-primary/20 text-primary-foreground font-bold text-[14px] rounded-lg w-full h-[42px]">
              <Link href="/corporate">Corporate</Link>
            </Button>

            {!user ? (
              <Button asChild className="bg-transparent hover:bg-primary/10 text-primary border-[1.5px] border-primary font-bold text-[14px] rounded-lg w-full h-[42px]">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <div className="flex flex-col gap-2 border border-border rounded-lg p-3 bg-secondary/20">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  {user.role === "admin" ? (
                    <User className="w-8 h-8 fill-current text-primary" strokeWidth={1.5} />
                  ) : (
                    <User className="w-8 h-8 fill-current text-primary" strokeWidth={1.5} />
                  )}
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