import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Seo from "@/models/Seo";

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export async function GET() {
  try {
    await connectDB();
    const globalSeo = await Seo.findOne({ pageUrl: "GLOBAL_SCHEMA" }).lean() as any;
    return NextResponse.json({ schemaData: globalSeo?.schemaData || "" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { schemaData } = await req.json();
    
    let globalSeo = await Seo.findOne({ pageUrl: "GLOBAL_SCHEMA" }) as any;
    
    if (globalSeo) {
      globalSeo.schemaData = schemaData;
      await globalSeo.save();
    } else {
      globalSeo = await Seo.create({
        pageUrl: "GLOBAL_SCHEMA",
        metaTitle: "Global",
        metaDescription: "Global",
        schemaData
      });
    }
    
    return NextResponse.json(globalSeo, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}