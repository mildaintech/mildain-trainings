import { NextResponse } from "next/server";
import { decrypt } from "@/lib/ccavenue";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const encResp = formData.get("encResp");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";

    if (!encResp || typeof encResp !== "string") {
      return NextResponse.redirect(`${baseUrl}/student/payment-failure?error=invalid_response`);
    }

    const working_key = process.env.CCAVENUE_WORKING_KEY || "TEST_WORKING_KEY";
    
    const decryptedStr = decrypt(encResp, working_key);
    const dataParams = new URLSearchParams(decryptedStr);
    
    const order_status = dataParams.get("order_status");
    const tracking_id = dataParams.get("tracking_id");
    const order_id = dataParams.get("order_id");

    await connectToDatabase();

    if (order_status === "Success") {
      return NextResponse.redirect(`${baseUrl}/student/payment-success?order_id=${order_id}&tracking_id=${tracking_id}`);
    } else {
      return NextResponse.redirect(`${baseUrl}/student/payment-failure?order_id=${order_id}&status=${order_status}`);
    }
  } catch (error) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:9002";
    return NextResponse.redirect(`${baseUrl}/student/payment-failure?error=server_error`);
  }
}