"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  amount: number;
  courseId: string;
  guestEmail: string;
  onSuccess: () => void;
}

export default function PayPalCheckout({ amount, courseId, guestEmail, onSuccess }: PayPalCheckoutProps) {
  const [error, setError] = useState("");

  return (
    <div className="w-full">
      <PayPalScriptProvider 
        options={{ 
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD",
          intent: "capture"
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", color: "gold", height: 45 }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount.toString(),
                  },
                  custom_id: `${guestEmail}___${courseId}`,
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              try {
                await actions.order.capture();
                onSuccess();
              } catch (err) {
                setError("Payment failed");
              }
            }
          }}
          onError={(err) => {
            setError("PayPal error occurred");
          }}
        />
      </PayPalScriptProvider>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-[13px] rounded-sm border border-red-100 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}