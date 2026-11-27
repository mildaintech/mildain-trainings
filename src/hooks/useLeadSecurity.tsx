'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          size?: 'invisible' | 'normal' | 'compact';
          badge?: 'bottomright' | 'bottomleft' | 'inline';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => number;
      execute: (widgetId?: number) => void;
      reset: (widgetId?: number) => void;
    };
  }
}

let recaptchaScriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
    return Promise.resolve();
  }
  if (recaptchaScriptPromise) return recaptchaScriptPromise;

  recaptchaScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector('script[data-recaptcha-v2="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-recaptcha-v2', 'true');
    script.onload = () => resolve();
    script.onerror = () => {
      recaptchaScriptPromise = null;
      reject(new Error('Failed to load reCAPTCHA'));
    };
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

export function useLeadSecurity() {
  const [honeypot, setHoneypot] = useState('');
  const formLoadedAtRef = useRef<number>(Date.now());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const pendingResolveRef = useRef<((token: string) => void) | null>(null);
  const pendingRejectRef = useRef<((reason?: unknown) => void) | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
    if (!siteKey) return;

    let cancelled = false;

    loadRecaptchaScript()
      .then(() => {
        if (cancelled || !window.grecaptcha) return;
        window.grecaptcha.ready(() => {
          if (cancelled || !containerRef.current || widgetIdRef.current !== null || !window.grecaptcha) {
            return;
          }
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            size: 'invisible',
            callback: (token: string) => {
              if (pendingResolveRef.current) {
                pendingResolveRef.current(token);
                pendingResolveRef.current = null;
                pendingRejectRef.current = null;
              }
            },
            'expired-callback': () => {
              if (pendingRejectRef.current) {
                pendingRejectRef.current(new Error('Verification expired'));
                pendingResolveRef.current = null;
                pendingRejectRef.current = null;
              }
            },
            'error-callback': () => {
              if (pendingRejectRef.current) {
                pendingRejectRef.current(new Error('Verification error'));
                pendingResolveRef.current = null;
                pendingRejectRef.current = null;
              }
            },
          });
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  const executeSecurity = useCallback(async () => {
    let recaptchaToken = '';

    if (siteKey) {
      await loadRecaptchaScript();

      recaptchaToken = await new Promise<string>((resolve, reject) => {
        if (!window.grecaptcha || widgetIdRef.current === null) {
          reject(new Error('Security widget not ready. Please try again.'));
          return;
        }
        pendingResolveRef.current = resolve;
        pendingRejectRef.current = reject;
        try {
          window.grecaptcha.reset(widgetIdRef.current);
          window.grecaptcha.execute(widgetIdRef.current);
        } catch (err) {
          pendingResolveRef.current = null;
          pendingRejectRef.current = null;
          reject(err);
        }
      });
    }

    return {
      website: honeypot,
      formLoadedAt: formLoadedAtRef.current,
      recaptchaToken,
    };
  }, [honeypot, siteKey]);

  const resetSecurity = useCallback(() => {
    setHoneypot('');
    formLoadedAtRef.current = Date.now();
    if (window.grecaptcha && widgetIdRef.current !== null) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch {}
    }
  }, []);

  const SecurityElements = (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <label htmlFor="website-field">Website</label>
        <input
          id="website-field"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <div ref={containerRef} />
    </>
  );

  return {
    executeSecurity,
    resetSecurity,
    SecurityElements,
  };
}