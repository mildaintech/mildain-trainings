import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Seo from "@/models/Seo";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const body = await req.json();
    const { pageUrl, metaTitle, metaDescription, focusKeyword, ogImage, schemaData } = body;

    const formattedUrl = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;
    const { id } = await params;

    const seo = await Seo.findByIdAndUpdate(
      id,
      { pageUrl: formattedUrl, metaTitle, metaDescription, focusKeyword, ogImage, schemaData },
      { returnDocument: 'after' }
    );

    if (!seo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(seo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const seo = await Seo.findByIdAndDelete(id);

    if (!seo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}