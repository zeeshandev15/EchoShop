"use client";
import React from "react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

import { CartItem } from "@/types";
import useAddToCartHandler from "@/lib/hooks/useAddToCartHandler";

const AddToCartBtn = ({ product }: { product: CartItem }) => {
  const handleAddToCart = useAddToCartHandler();

  return (
    <Button
      onClick={() => handleAddToCart(product)}
      className="w-full p-8 rounded-full text-xl hover:ring-2 ring-slate-500 flex items-center gap-4"
    >
      <ShoppingBag /> Add To Cart
    </Button>
  );
};

export default AddToCartBtn;
