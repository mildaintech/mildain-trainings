import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "@/models/Category";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      slug,
      displayOrder,
      careerSupportPdf,
      roles,
      headerTitle,
      headerSubtitle,
      description,
      bannerImage,
      faqs,
      metaTitle,
      metaDescription,
      focusKeyword,
      ogImage,
      ogImageAlt,
      ogImageTitle,
      schemaData,
    } = body;

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug,
        displayOrder: displayOrder !== undefined && displayOrder !== "" ? Number(displayOrder) : 999,
        careerSupportPdf,
        roles,
        headerTitle,
        headerSubtitle,
        description,
        bannerImage,
        faqs,
        metaTitle,
        metaDescription,
        focusKeyword,
        ogImage,
        ogImageAlt,
        ogImageTitle,
        schemaData,
      },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}