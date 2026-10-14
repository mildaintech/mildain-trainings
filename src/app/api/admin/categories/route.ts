import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Category from "@/models/Category";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, slug, careerSupportPdf, roles } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
    }

    const existingCategory = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existingCategory) {
      return NextResponse.json({ error: "Category exists" }, { status: 400 });
    }

    const category = await Category.create({ name, slug, careerSupportPdf, roles });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed" }, { status: 500 });
  }
}