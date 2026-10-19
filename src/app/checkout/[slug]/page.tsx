import { connectToDatabase } from "@/lib/db";
import Course from "@/models/Course";
import { notFound } from "next/navigation";
import CheckoutForm from "@/components/payment/CheckoutForm";
import { cookies } from "next/headers";

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();
  
  await connectToDatabase();
  
  const course = await Course.findOne({ 
    $or: [
      { slug: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } },
      { urlSlug: { $regex: new RegExp(`^${decodedSlug}$`, 'i') } }
    ]
  }).lean() as any;

  if (!course) {
    return notFound();
  }
  
  const plainCourse = JSON.parse(JSON.stringify(course));

  const cookieStore = await cookies();
  const regionCookie = cookieStore.get('userRegion');
  const isIndia = regionCookie?.value === 'IN' ? true : false;
  
  return <CheckoutForm course={plainCourse} isIndia={isIndia} />;
}