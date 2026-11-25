// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db";
// import Course from "@/models/Course";

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const courses = await Course.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(courses, { status: 200 });
//   } catch (error) {
//     console.error("DB Connection Error: ", error);
//     return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     await connectToDatabase();
//     const body = await request.json();
//     const newCourse = await Course.create(body);
//     return NextResponse.json(newCourse, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";

const CARD_FIELDS =
  "title slug category provider duration cohortStarts badge image bannerImage logoImage isMostPopular popularOrder displayOrder";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const view = new URL(request.url).searchParams.get("view");

    if (view === "cards") {
      const cards = await Course.find({}, CARD_FIELDS).sort({ createdAt: -1 }).lean();
      return NextResponse.json(cards, {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
      });
    }

    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("DB Connection Error: ", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newCourse = await Course.create(body);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}