import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface ProductQuantityChangeProps {
  quantity: number;
  setQuantity: (qty: number) => void;
}

const ProductQuantityChange = ({
  quantity,
  setQuantity,
}: ProductQuantityChangeProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
      <Button
        disabled={quantity === 1}
        onClick={() => setQuantity(quantity - 1)}
        className="p-4 rounded-full"
        variant={"outline"}
      >
        <Minus />
      </Button>
      <p className="text-lg font-semibold">{quantity}</p>
      <Button
        onClick={() => setQuantity(quantity)}
        className="p-4 rounded-full"
        variant={"outline"}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default ProductQuantityChange;
