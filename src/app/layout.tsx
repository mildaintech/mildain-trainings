import type { Metadata } from 'next';
// @ts-ignore
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { generateOrganizationSchema } from '@/lib/schema';
import { connectToDatabase } from '@/lib/db';
import Seo from '@/models/Seo';

export const metadata: Metadata = {
  title: 'Mildain Trainings - Learn Smarter, Achieve Knowledge',
  description: 'Expand your knowledge and open doors to exciting careers with our online education platform.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  let globalSchemaData = "";

  try {
    await connectToDatabase();
    const globalSeo = await Seo.findOne({ pageUrl: "GLOBAL_SCHEMA" }).lean() as any;
    if (globalSeo && globalSeo.schemaData) {
      globalSchemaData = globalSeo.schemaData;
    }
  } catch (error) {
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: orgSchema }} 
        />
        {globalSchemaData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: globalSchemaData }}
          />
        )}
      </head>
      <body className="antialiased min-h-screen bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}