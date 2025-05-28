"use client";
import OrderSummaryForCheckout from "@/components/carts/OrderSummaryForCheckout";
import CheckoutForm from "@/components/forms/CheckoutForm";
import CouponCodeForm from "@/components/forms/CouponCodeForm";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";

const CheckoutPageOne = () => {
  const router = useRouter();
  const hasAsked = useRef(false);
  let { clearCart } = useCartStore();
  useEffect(() => {
    const recognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!recognition) return;

    const recognizer = new recognition();
    recognizer.continuous = true;
    recognizer.interimResults = false;
    recognizer.lang = "en-US";

    recognizer.onstart = () => {
      if (!hasAsked.current) {
        const ask = new SpeechSynthesisUtterance(
          "Do you want to place the order or go back?"
        );
        speechSynthesis.speak(ask);
        hasAsked.current = true;
      }
    };

    recognizer.onresult = (event: any) => {
      const command = event.results[event.resultIndex][0].transcript
        .trim()
        .toLowerCase();
      console.log("Voice Command:", command);

      if (command.includes("place order")) {
        const confirm = new SpeechSynthesisUtterance(
          "Order placed successfully. Thank you so much."
        );
        clearCart();
        router.push("/shop");
        speechSynthesis.speak(confirm);
        // Add your order placement logic here (e.g., form submission or API call)
      } else if (command.includes("back")) {
        const backMsg = new SpeechSynthesisUtterance("Going back");
        speechSynthesis.speak(backMsg);
        router.back();
      }
    };

    recognizer.onerror = (e: any) => console.error("Speech error:", e);
    recognizer.start();

    return () => recognizer.stop();
  }, [router]);

  return (
    <section className="px-4 py-4 lg:px-16  bg-white dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white ">
            Checkout
          </h1>
          <p>Please fill out the address form if you haven&apos;t save it</p>
          <Separator className="dark:bg-white/50 mt-2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address */}
          <div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Shipping Address
              </h2>
              <CheckoutForm />
            </div>
            <CouponCodeForm />
          </div>
          {/* Order Summary */}
          <OrderSummaryForCheckout />
        </div>
      </div>
    </section>
  );
};

export default CheckoutPageOne;
