import { Metadata } from 'next';
import { connectToDatabase } from "@/lib/db";
import Seo from "@/models/Seo";

export async function getDynamicSeoMetadata(currentPath: string, defaultMetadata?: Metadata): Promise<Metadata> {
  try {
    await connectToDatabase();
    
    let formattedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    
    if (formattedPath.endsWith('/') && formattedPath.length > 1) {
      formattedPath = formattedPath.slice(0, -1);
    }
    
    const seoData = await Seo.findOne({ 
      $or: [
        { pageUrl: { $regex: new RegExp(`^${formattedPath}$`, 'i') } },
        { pageUrl: { $regex: new RegExp(`^${formattedPath}/$`, 'i') } }
      ]
    }).lean() as any;

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
    
    let formattedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    
    if (formattedPath.endsWith('/') && formattedPath.length > 1) {
      formattedPath = formattedPath.slice(0, -1);
    }
    
    const seoData = await Seo.findOne({ 
      $or: [
        { pageUrl: { $regex: new RegExp(`^${formattedPath}$`, 'i') } },
        { pageUrl: { $regex: new RegExp(`^${formattedPath}/$`, 'i') } }
      ]
    }).select('schemaData').lean() as any;
    
    return seoData?.schemaData || null;
  } catch (error) {
    return null;
  }
}