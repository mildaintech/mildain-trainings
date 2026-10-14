import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Seo from "@/models/Seo";
import Course from "@/models/Course";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function GET() {
  try {
    await connectDB();
    const seoData = await Seo.find().lean();
    const courses = await Course.find().select('category slug title overviewImage').lean();
    const allPages: any[] = [];
    
    const staticPages = [
      { url: '/', name: 'Home Page' },
      { url: '/about-us', name: 'About Us' },
      { url: '/contact-us', name: 'Contact Us' },
      { url: '/courses', name: 'All Courses' }
    ];

    staticPages.forEach(page => {
      const seo = seoData.find((s: any) => s.pageUrl === page.url);
      allPages.push({
        pageUrl: page.url,
        pageName: page.name,
        hasSeo: !!seo,
        seoDetails: seo || null
      });
    });

    courses.forEach((course: any) => {
      if (course.category && course.slug) {
        const url = `/courses/${course.category}/${course.slug}`;
        const seo = seoData.find((s: any) => s.pageUrl === url);
        allPages.push({
          pageUrl: url,
          pageName: `Course: ${course.title}`,
          hasSeo: !!seo,
          seoDetails: seo || null,
          defaultImage: course.overviewImage || null
        });
      }
    });

    seoData.forEach((seo: any) => {
      const exists = allPages.find(p => p.pageUrl === seo.pageUrl);
      if (!exists) {
        allPages.push({
          pageUrl: seo.pageUrl,
          pageName: 'Custom Page',
          hasSeo: true,
          seoDetails: seo
        });
      }
    });

    return NextResponse.json(allPages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { pageUrl, metaTitle, metaDescription, focusKeyword, ogImage, ogImageAlt, ogImageTitle, schemaData } = body;
    
    if (!pageUrl || !metaTitle || !metaDescription) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const formattedUrl = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;

    const existingSeo = await Seo.findOne({ pageUrl: formattedUrl });
    if (existingSeo) {
      return NextResponse.json({ error: "SEO for this URL already exists" }, { status: 400 });
    }

    const newSeo = await Seo.create({
      pageUrl: formattedUrl,
      metaTitle,
      metaDescription,
      focusKeyword,
      ogImage,
      ogImageAlt,
      ogImageTitle,
      schemaData
    });
    
    return NextResponse.json(newSeo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}