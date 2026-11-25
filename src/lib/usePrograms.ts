'use client';

import { useEffect, useSyncExternalStore } from 'react';

export interface ProgramCourse {
  _id: string;
  title: string;
  slug: string;
  category: string;
  provider?: string;
  duration?: string;
  cohortStarts?: string;
  badge?: string;
  image?: string;
  bannerImage?: string;
  logoImage?: string;
  isMostPopular?: boolean;
  popularOrder?: number;
  displayOrder?: number;
}

export interface ProgramCategory {
  _id: string;
  name: string;
  displayOrder?: number;
}

interface ProgramsData {
  courses: ProgramCourse[];
  categories: ProgramCategory[];
}

const STORAGE_KEY = 'programs-data-v1';
const EMPTY_COURSES: ProgramCourse[] = [];
const EMPTY_CATEGORIES: ProgramCategory[] = [];

export const formatTitleCase = (value: string) =>
  (value || '').replace(/\b\w/g, (char) => char.toUpperCase());

let snapshot: ProgramsData | null = null;
let serialized = '';
let pending: Promise<void> | null = null;
let refreshed = false;
const listeners = new Set<() => void>();

const publish = (data: ProgramsData, persist: boolean) => {
  const next = JSON.stringify(data);
  if (next === serialized) return;
  serialized = next;
  snapshot = data;
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }
  listeners.forEach((listener) => listener());
};

const refresh = (): Promise<void> => {
  if (!pending) {
    const options: RequestInit & { priority?: string } = { priority: 'high' };

    pending = Promise.all([
      fetch('/api/admin/courses', options).then((res) => (res.ok ? res.json() : null)),
      fetch('/api/admin/categories', options).then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([coursesRaw, categoriesRaw]) => {
        const coursesOk = Array.isArray(coursesRaw);
        const categoriesOk = Array.isArray(categoriesRaw);

        if (!coursesOk && !categoriesOk) {
          refreshed = false;
          if (!snapshot) publish({ courses: EMPTY_COURSES, categories: EMPTY_CATEGORIES }, false);
          return;
        }

        const courses = coursesOk
          ? (coursesRaw as ProgramCourse[]).map((c) => ({
              ...c,
              category: formatTitleCase(c.category || ''),
            }))
          : snapshot?.courses ?? EMPTY_COURSES;

        const categories = categoriesOk
          ? (categoriesRaw as ProgramCategory[])
          : snapshot?.categories ?? EMPTY_CATEGORIES;

        publish({ courses, categories }, true);
      })
      .catch(() => {
        refreshed = false;
        if (!snapshot) publish({ courses: EMPTY_COURSES, categories: EMPTY_CATEGORIES }, false);
      })
      .finally(() => {
        pending = null;
      });
  }
  return pending;
};

const ensureFresh = () => {
  if (refreshed) return;
  refreshed = true;
  refresh();
};

if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && Array.isArray(parsed.courses) && Array.isArray(parsed.categories)) {
        snapshot = parsed;
        serialized = stored;
      }
    }
  } catch {}
  ensureFresh();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => snapshot;
const getServerSnapshot = () => null;

export function usePrograms() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    ensureFresh();
  }, []);

  return {
    courses: data ? data.courses : EMPTY_COURSES,
    categories: data ? data.categories : EMPTY_CATEGORIES,
    isLoading: data === null,
  };
}