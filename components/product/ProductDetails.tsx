"use client";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import ProductTab from "./ProductTab";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductQuantityChange from "./ProductQuantityChange";
import RatingReview from "../others/RatingReview";
import ProductDescription from "./ProductDescription";
import ProductColorSelection from "./ProductColorSelection";
import { Product } from "@/types";
import Link from "next/link";
import { calculateDiscount } from "@/lib/calculateDiscount";
import { useRouter, usePathname } from "next/navigation";
import useAddToCartHandler from "@/lib/hooks/useAddToCartHandler";

const ProductDetails = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const hasSpoken = useRef(false);
  const awaitingBuyConfirmation = useRef(false);
  const hasAskedCheckout = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleAddToCart = useAddToCartHandler();

  // Speak product details only once
  useEffect(() => {
    if (hasSpoken.current || pathname.includes("checkout")) return;

    const message = `Product: ${
      product.name
    }. Price after discount is ${calculateDiscount(
      product.price,
      product.discount
    )} dollars. How many items would you like to add? You can say "increase quantity" or "decrease quantity".`;

    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);

    hasSpoken.current = true;
  }, [product, pathname]);

  // Voice command handler
  useEffect(() => {
    const recognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!recognition) return;

    const recognizer = new recognition();
    recognizer.continuous = true;
    recognizer.interimResults = false;
    recognizer.lang = "en-US";

    recognizer.onresult = (event: any) => {
      const command = event.results[event.resultIndex][0].transcript
        .trim()
        .toLowerCase();
      console.log("Voice Command:", command);

      const numberMatch = command.match(/\d+/);
      const number = numberMatch ? parseInt(numberMatch[0]) : 1;

      // 🔄 On /checkout page
      if (pathname.includes("checkout")) {
        if (!hasAskedCheckout.current) {
          const ask = new SpeechSynthesisUtterance(
            "Do you want to place the order or go back?"
          );
          speechSynthesis.speak(ask);
          hasAskedCheckout.current = true;
        }

        if (command.includes("place order")) {
          const confirmation = new SpeechSynthesisUtterance(
            "Order placed successfully."
          );
          speechSynthesis.speak(confirmation);
        } else if (command.includes("back")) {
          const backMsg = new SpeechSynthesisUtterance("Going back");
          speechSynthesis.speak(backMsg);
          router.back();
        }
        return;
      }

      // ✅ Buy Confirmation
      if (awaitingBuyConfirmation.current) {
        if (command.includes("yes")) {
          handleAddToCart({ ...product, quantity, selectedColor });
          const confirm = new SpeechSynthesisUtterance(
            "Product added to cart. Redirecting to checkout."
          );
          speechSynthesis.speak(confirm);
          router.push("/checkout");
        } else {
          const cancel = new SpeechSynthesisUtterance("Okay, not buying now.");
          speechSynthesis.speak(cancel);
        }
        awaitingBuyConfirmation.current = false;
        return;
      }

      // 🎤 Quantity control
      if (command.includes("increase quantity")) {
        setQuantity(() => number);
        const askToBuy = new SpeechSynthesisUtterance(
          "Would you like to purchase now?"
        );
        speechSynthesis.speak(askToBuy);
        awaitingBuyConfirmation.current = true;
      } else if (command.includes("decrease quantity")) {
        setQuantity((prev) => Math.max(1, prev - number));
        const askToBuy = new SpeechSynthesisUtterance(
          "Would you like to buy now?"
        );
        speechSynthesis.speak(askToBuy);
        awaitingBuyConfirmation.current = true;
      }

      // 🛍️ Handle "add to cart"
      else if (command.includes("add to cart")) {
        handleAddToCart({ ...product, quantity, selectedColor });
        const addedMsg = new SpeechSynthesisUtterance("Product added to cart");
        speechSynthesis.speak(addedMsg);
      }

      // 🛒 Handle "purchase"
      else if (command.includes("purchase")) {
        handleAddToCart({ ...product, quantity, selectedColor });
        const confirmBuy = new SpeechSynthesisUtterance(
          "Product added to cart. Redirecting to checkout."
        );
        speechSynthesis.speak(confirmBuy);
        router.push("/checkout");
      }

      // 🔙 Back command
      else if (command.includes("back")) {
        const backMsg = new SpeechSynthesisUtterance("Going back");
        speechSynthesis.speak(backMsg);
        router.back();
      }
    };

    recognizer.onerror = (e: any) => console.error("Speech error:", e);
    recognizer.start();
    return () => recognizer.stop();
  }, [router, pathname, product, quantity, selectedColor]);

  return (
    <div className="space-y-2 mt-2">
      <Link
        href={`/shop?category=${product.category}`}
        className="bg-lime-500 py-1 px-4 rounded-full w-fit"
      >
        {product?.category}
      </Link>
      <h2 className="text-2xl md:text-3xl font-bold capitalize">
        {product?.name}
      </h2>
      <RatingReview
        rating={product?.rating || 0}
        review={product?.reviews.length || 0}
      />
      <ProductDescription description={product?.description as string} />
      <div>
        {product.stockItems === 0 ? (
          <p className="text-lg w-fit rounded-md text-muted-foreground">
            Out of stock
          </p>
        ) : (
          <p className="text-lg w-fit rounded-md text-muted-foreground">
            Only{" "}
            <span className="text-lg text-black dark:text-white">
              ({product.stockItems})
            </span>{" "}
            items in stock
          </p>
        )}
      </div>
      <ProductColorSelection
        color={selectedColor}
        setColor={setSelectedColor}
        allColors={product.color!}
      />
      <div className="flex items-center gap-6">
        <div>
          <p className="text-muted-foreground line-through text-2xl">
            ${product?.price}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-500 border-green-500 border py-2 px-6 rounded-lg">
              ${calculateDiscount(product.price, product.discount)}
            </p>
            <ProductQuantityChange
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 !my-6">
        <AddToCartBtn product={{ ...product, quantity, selectedColor }} />
        <BuyNowBtn product={{ ...product, quantity, selectedColor }} />
      </div>
      <Separator className="!mt-4" />
      <ProductTab aboutItem={product?.aboutItem!} reviews={product?.reviews} />
    </div>
  );
};

export default ProductDetails;
