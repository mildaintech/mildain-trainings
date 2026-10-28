import { NextResponse } from 'next/server';
import SubCategory from '@/models/SubCategory';
import { connectToDatabase } from '@/lib/db';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Subcategory ID is required" }, { status: 400 });
    }

    const data = await req.json();

    const updatedSubcategory = await SubCategory.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          logoImage: data.logoImage,
          curriculumTitle: data.curriculumTitle,
          curriculumDescription: data.curriculumDescription,
          curriculumModules: data.curriculumModules,
          curriculumPdf: data.curriculumPdf,
          toolsHeading: data.toolsHeading,
          toolsList: data.toolsList,
          careerSupportTitle: data.careerSupportTitle,
          careerSupportDescription: data.careerSupportDescription,
          careerSupportBrochurePdf: data.careerSupportBrochurePdf,
          careerSupportBgImage: data.careerSupportBgImage,
          careerSupportItems: data.careerSupportItems,
          advisorHeading: data.advisorHeading,
          advisors: data.advisors,
          successVideoUrl: data.successVideoUrl,
          successVideoImage: data.successVideoImage,
          successVideoImageAlt: data.successVideoImageAlt,
          successVideoImageTitle: data.successVideoImageTitle,
          reviews: data.reviews,

        }
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedSubcategory) {
      return NextResponse.json({ error: "Subcategory not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSubcategory, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update subcategory" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Subcategory ID is required" }, { status: 400 });
    }

    const deletedSubcategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubcategory) {
      return NextResponse.json({ error: "Subcategory not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subcategory deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete subcategory" }, { status: 500 });
  }
}