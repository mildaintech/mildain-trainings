'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

interface SearchBarProps {
  courses: Course[];
  isMobile?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ courses, isMobile, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Course[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, courses]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  return (
    <div ref={searchRef} className={`relative ${isMobile ? 'w-full' : 'hidden lg:flex items-center w-[260px] xl:w-[320px]'}`}>
      <form onSubmit={handleSubmit} className="relative w-full group">
        <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isMobile ? 'h-[18px] w-[18px] text-primary stroke-[2]' : 'h-[16px] w-[16px] text-muted-foreground group-focus-within:text-primary transition-colors stroke-[2]'}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to learn?"
          className={`pl-10 pr-10 ${isMobile ? 'h-[44px] text-[14px] rounded-xl bg-background border-border focus:ring-primary/20' : 'h-[40px] lg:h-[44px] text-[13px] lg:text-[14px] rounded-sm bg-background border-border hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/10'} border outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground w-full shadow-sm`}
          autoFocus={isMobile}
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </form>

      {isOpen && results.length > 0 && (
        <div className={`absolute ${isMobile ? 'top-full mt-2' : 'top-[calc(100%+12px)]'} left-0 w-full bg-background border border-border rounded-xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto ring-1 ring-black/5`}>
          <div className="px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Top Results</span>
          </div>
          {results.map((course) => (
            <Link
              key={course._id}
              href={`/courses/${course.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
                if (onClose) onClose();
              }}
              className="group flex items-center justify-between px-4 py-2 hover:bg-primary/5 transition-all border-b border-border/50 last:border-0"
            >
              <div className="flex items-start gap-3.5">

                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                    {course.title}
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                    {course.category}
                  </span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
      
      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className={`absolute ${isMobile ? 'top-full mt-2' : 'top-[calc(100%+12px)]'} left-0 w-full bg-background border border-border rounded-xl shadow-2xl p-8 z-50 flex flex-col items-center justify-center text-center ring-1 ring-black/5`}>
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
            <Search size={20} strokeWidth={2} />
          </div>
          <p className="text-[14px] font-bold text-foreground">No results found</p>
          <p className="text-[13px] text-muted-foreground mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}