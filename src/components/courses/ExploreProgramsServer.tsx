import { headers } from 'next/headers';
import ExplorePrograms from './ExplorePrograms';
import type { ProgramCourse, ProgramCategory } from '@/lib/usePrograms';

const COURSE_FIELDS = [
  '_id',
  'title',
  'slug',
  'category',
  'provider',
  'duration',
  'cohortStarts',
  'badge',
  'image',
  'bannerImage',
  'logoImage',
  'isMostPopular',
  'popularOrder',
  'displayOrder',
] as const;

const CATEGORY_FIELDS = ['_id', 'name', 'displayOrder'] as const;

const pick = (source: Record<string, unknown>, fields: readonly string[]) => {
  const result: Record<string, unknown> = {};
  for (const key of fields) {
    if (source[key] !== undefined) result[key] = source[key];
  }
  return result;
};

async function getBaseUrl() {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

async function getList(base: string, path: string): Promise<Record<string, unknown>[]> {
  try {
    const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function ExploreProgramsServer() {
  const base = await getBaseUrl();

  const [courses, categories] = await Promise.all([
    getList(base, '/api/admin/courses?view=cards'),
    getList(base, '/api/admin/categories'),
  ]);

  if (courses.length === 0) {
    return <ExplorePrograms />;
  }

  return (
    <ExplorePrograms
      initialData={{
        courses: courses.map((c) => pick(c, COURSE_FIELDS)) as unknown as ProgramCourse[],
        categories: categories.map((c) => pick(c, CATEGORY_FIELDS)) as unknown as ProgramCategory[],
      }}
    />
  );
}