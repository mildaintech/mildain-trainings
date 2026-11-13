
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, PhoneCall } from 'lucide-react';

type TawkAPI = {
  onBeforeLoad?: () => void;
  onLoad?: () => void;
  onChatMinimized?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  maximize?: () => void;
};

type TawkWindow = Window & {
  Tawk_API?: TawkAPI;
  Tawk_LoadStart?: Date;
};

export default function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pendingChatRef = useRef(false);

  // Sticky Bottom Bar Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tawk.to Integration
  useEffect(() => {
    const tawkWindow = window as TawkWindow;

    tawkWindow.Tawk_API = tawkWindow.Tawk_API || {};
    tawkWindow.Tawk_LoadStart = new Date();

    const api = tawkWindow.Tawk_API;

    const previousBeforeLoad = api.onBeforeLoad;
    const previousOnLoad = api.onLoad;
    const previousOnChatMinimized = api.onChatMinimized;

    // Hide widget before loading
    api.onBeforeLoad = () => {
      previousBeforeLoad?.();
      api.hideWidget?.();
    };

    // Hide floating icon when widget loads
    api.onLoad = () => {
      previousOnLoad?.();

      api.hideWidget?.();

      // Open only if user already clicked Live Chat
      if (pendingChatRef.current) {
        pendingChatRef.current = false;

        api.showWidget?.();
        api.maximize?.();
      }
    };

    // Hide widget completely when chat is minimized
    api.onChatMinimized = () => {
      previousOnChatMinimized?.();

      api.hideWidget?.();
    };

    // Hide immediately if already loaded
    if (typeof api.hideWidget === 'function') {
      api.hideWidget();
    }

    // Load Tawk.to script only once
    const scriptId = 'tawk-to-live-chat';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');

      script.id = scriptId;
      script.async = true;
      script.src =
        'https://embed.tawk.to/6af58cbaac77853c49a5aaee/1k77iremp';

      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');

      document.head.appendChild(script);
    }
  }, []);

  // Open chat only when Live Chat button is clicked
  const handleLiveChat = () => {
    const tawkWindow = window as TawkWindow;
    const api = tawkWindow.Tawk_API;

    if (
      typeof api?.showWidget === 'function' &&
      typeof api?.maximize === 'function'
    ) {
      pendingChatRef.current = false;

      api.showWidget();
      api.maximize();
    } else {
      pendingChatRef.current = true;
    }
  };

  return (
    <div
      className={`fixed left-0 w-full bg-background border-t border-border border-b-4 border-b-muted-foreground/30 z-[100] h-12 md:h-14 flex justify-center shadow-lg transition-all duration-300 ease-in-out ${
        isVisible
          ? 'bottom-0 translate-y-0 opacity-100'
          : '-bottom-20 translate-y-full opacity-0'
      }`}
    >
      <div className="w-full max-w-[1440px] h-full flex justify-between items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        <div className="flex items-center h-full gap-4 md:gap-8 px-4 sm:px-6 lg:px-12 xl:px-16 shrink-0">

          {/* Request a Callback */}
          <a
            href="tel:+918929199704"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <div className="bg-primary rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Phone
                className="text-primary-foreground w-3.5 h-3.5 md:w-4 md:h-4"
                fill="currentColor"
              />
            </div>

            <span className="text-foreground font-semibold text-xs md:text-sm whitespace-nowrap">
              Request a Callback
            </span>
          </a>

          <div className="w-px h-5 md:h-6 bg-border mx-1 shrink-0"></div>

          {/* Call Us */}
          <a
            href="tel:+918929199704"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <div className="bg-primary rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <PhoneCall
                className="text-primary-foreground w-3.5 h-3.5 md:w-4 md:h-4"
                fill="currentColor"
              />
            </div>

            <span className="text-foreground font-semibold text-xs md:text-sm whitespace-nowrap">
              Call Us
              <span className="hidden md:inline">
                {' '}+918929199704
              </span>
            </span>
          </a>

        </div>

        {/* Live Chat Button */}
        <button
          type="button"
          onClick={handleLiveChat}
          className="bg-btn-gradient text-primary-foreground h-full flex items-center justify-center gap-2 px-6 md:px-10 hover:opacity-90 transition-opacity shrink-0 shadow-sm"
        >
          <div className="bg-background rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0">
            <MessageCircle
              className="text-primary w-3 h-3 md:w-3.5 md:h-3.5"
              fill="currentColor"
            />
          </div>

          <span className="font-bold text-xs md:text-sm whitespace-nowrap">
            Live Chat
          </span>
        </button>

      </div>
    </div>
  );
}
