import { Metadata } from 'next';
import { connectToDatabase } from "@/lib/db";
import Seo from "@/models/Seo";

export async function getDynamicSeoMetadata(currentPath: string, defaultMetadata?: Metadata): Promise<Metadata> {
  try {
    await connectToDatabase();
    
    const formattedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    
    const seoData = await Seo.findOne({ 
      pageUrl: { $regex: new RegExp(`^${formattedPath}$`, 'i') } 
    }).lean();

    if (seoData) {
      const isBase64Og = seoData.ogImage && seoData.ogImage.startsWith('data:image');
      
      return {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        openGraph: {
          images: (!isBase64Og && seoData.ogImage) ? [seoData.ogImage] : (defaultMetadata?.openGraph?.images || []),
        },
        alternates: {
          canonical: formattedPath
        },
        keywords: seoData.focusKeyword ? [seoData.focusKeyword] : (defaultMetadata?.keywords || []),
      };
    }
  } catch (error) {
    console.error("SEO Fetch Error:", error);
  }

  return defaultMetadata || {
    title: 'Mildain Trainings',
    description: 'Advance your career with Mildain Trainings',
    alternates: { canonical: currentPath }
  };
}

export async function getPageSchemaData(currentPath: string) {
  try {
    await connectToDatabase();
    
    const formattedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    
    const seoData = await Seo.findOne({ 
      pageUrl: { $regex: new RegExp(`^${formattedPath}$`, 'i') } 
    }).select('schemaData').lean();
    
    return seoData?.schemaData || null;
  } catch (error) {
    return null;
  }
}