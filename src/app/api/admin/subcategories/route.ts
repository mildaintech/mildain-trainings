import { NextResponse } from 'next/server';
import SubCategory from '@/models/SubCategory';
import Category from '@/models/Category';
import { connectToDatabase } from '@/lib/db';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    
    if (!Category) {
      console.log("Category model initialized");
    }
    
    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get('parent');

    let query = {};
    if (parentId) {
      query = { parentCategory: parentId };
    }

    const subcategories = await SubCategory.find(query).populate('parentCategory', 'name slug').lean();
    
    return NextResponse.json(subcategories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch subcategories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.slug || !data.parentCategory) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newSubCategory = new SubCategory({
      name: data.name,
      slug: data.slug,
      parentCategory: data.parentCategory,
      description: data.description || "",
      logoImage: data.logoImage || "",
      curriculumTitle: data.curriculumTitle || "",
      curriculumDescription: data.curriculumDescription || "",
      curriculumModules: data.curriculumModules || [],
      curriculumPdf: data.curriculumPdf || "",
      toolsHeading: data.toolsHeading || "",
      toolsList: data.toolsList || [],
      careerSupportTitle: data.careerSupportTitle || "",
      careerSupportDescription: data.careerSupportDescription || "",
      careerSupportBrochurePdf: data.careerSupportBrochurePdf || "",
      careerSupportBgImage: data.careerSupportBgImage || "",
      careerSupportItems: data.careerSupportItems || [],
      advisorHeading: data.advisorHeading || "",
      advisors: data.advisors || [],
      successVideoUrl: data.successVideoUrl || "",
      successVideoImage: data.successVideoImage || "",
      successVideoImageAlt: data.successVideoImageAlt || "",
      successVideoImageTitle: data.successVideoImageTitle || "",
      reviews: data.reviews || [],
      pathSalariesHeading: data.pathSalariesHeading || "",
      pathSalariesDescription: data.pathSalariesDescription || "",
      pathRoles: data.pathRoles || [],
      isActive: true
    });

    await newSubCategory.save();
    return NextResponse.json(newSubCategory, { status: 201 });

  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Slug already exists. Choose a different name." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Failed to create subcategory" }, { status: 500 });
  }
}