import Link from "next/link";

export default async function PaymentFailure({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string; error?: string; status?: string }>;
}) {
  const params = await searchParams;
  const orderId = params?.order_id || "N/A";
  const errorMsg = params?.error || params?.status || "Payment processing failed";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-6">We could not process your transaction at this time.</p>
        <div className="text-left bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-gray-800">Order ID:</span> {orderId}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Reason:</span> {errorMsg}
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/student" className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300 transition text-center">
            Dashboard
          </Link>
          <Link href="/student" className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition text-center">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}