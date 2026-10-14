'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 md:bottom-16 right-6 z-[999]"
        >
          <button
            onClick={scrollToTop}
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6 text-primary" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-border"
                strokeWidth="5"
                fill="transparent"
              />

              <motion.circle
                cx="50"
                cy="50"
                r="45"
                className="text-primary"
                stroke="currentColor"
                strokeWidth="5"
                fill="transparent"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}