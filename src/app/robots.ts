import { headers } from 'next/headers';
import { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  if (host.includes('vercel.app')) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${host}/sitemap.xml`,
  };
}