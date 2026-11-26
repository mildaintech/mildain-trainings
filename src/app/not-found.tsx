'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  speed: string;
}

export default function NotFound() {
  const pathname = usePathname();
  const [stars, setStars] = useState<Star[]>([]);
  const [boxStars, setBoxStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: `${Math.random() * 5}s`,
      speed: `${Math.random() * 2 + 1}s`,
    }));

    const generatedBoxStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 4,
      delay: `${Math.random() * 5}s`,
      speed: `${Math.random() * 2 + 1}s`,
    }));

    setStars(generatedStars);
    setBoxStars(generatedBoxStars);
  }, []);

  return (
    <div className="h-[100dvh] bg-[#1c1c1c] text-white flex items-center justify-center relative p-4 md:p-6 overflow-hidden font-sans w-full">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes star-blink {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .animate-star-blink {
              animation: star-blink var(--blink-speed, 2s) infinite ease-in-out;
            }
          `,
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-star-blink"
            style={
              {
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                '--blink-speed': star.speed,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-20 w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-10 overflow-hidden flex flex-col justify-center min-h-[55vh] md:min-h-[50vh] max-h-[95vh] md:max-h-[90vh]">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {boxStars.map((star) => (
            <div
              key={`box-${star.id}`}
              className="absolute bg-white rounded-full animate-star-blink"
              style={
                {
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: star.delay,
                  '--blink-speed': star.speed,
                  boxShadow: `0 0 ${star.size + 3}px rgba(255, 255, 255, 0.6)`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <img
          src="/images/404.png"
          alt="Astronaut sitting on a planet"
          className="hidden md:block absolute right-0 top-0 h-full w-[50%] lg:w-[45%] max-w-[600px] object-cover object-right drop-shadow-[0_15px_30px_rgb(255,255,255,0.1)] mix-blend-lighten pointer-events-none z-10"
        />

        <div className="relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[55%] md:pl-8 lg:pl-[80px] xl:pl-[120px]">
          <p className="inline-block text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium bg-gradient-to-r from-[#FFE3A1] via-[#F8C56C] to-[#EFAE4B] bg-clip-text text-transparent mb-2 md:mb-4 tracking-tight">
            Sorry, we can&apos;t find that page
          </p>

          <h1 className="text-[80px] sm:text-[100px] md:text-[140px] lg:text-[170px] font-black text-white leading-none tracking-tight mb-2 drop-shadow-2xl">
            404
          </h1>

          <h2 className="inline-block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FFE3A1] via-[#F8C56C] to-[#EFAE4B] bg-clip-text text-transparent mb-4 md:mb-5 tracking-tight capitalize">
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white/70 mb-6 md:mb-8 tracking-wide break-all max-w-[95%] md:max-w-full mx-auto lg:mx-0">
            https://mildaintrainings.com{mounted ? pathname : ''}
          </p>

          <Link href="/">
            <Button className="h-11 sm:h-12 md:h-14 rounded-full px-6 sm:px-8 md:px-10 bg-gradient-to-r from-[#FFE3A1] via-[#F8C56C] to-[#EFAE4B] hover:opacity-90 border-0 text-[#1c1c1c] font-bold text-sm sm:text-base md:text-lg flex items-center gap-2 md:gap-3 shadow-2xl transition-all active:scale-95 w-fit mx-auto lg:mx-0 cursor-pointer">
              <MoveLeft className="h-4 w-4 md:h-5 md:w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}