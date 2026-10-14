import Link from "next/link";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; tracking_id?: string }>;
}) {
  const params = await searchParams;
  const orderId = params?.order_id || "N/A";
  const trackingId = params?.tracking_id || "N/A";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">Your transaction has been completed successfully.</p>
        <div className="text-left bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-gray-800">Order ID:</span> {orderId}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Tracking ID:</span> {trackingId}
          </p>
        </div>
        <Link href="/student" className="inline-block w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}