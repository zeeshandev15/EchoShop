// lib/hooks/useAddToCartHandler.ts
import useCartStore from "@/store/cartStore";
import { showToast } from "@/lib/showToast";
import { CartItem } from "@/types";

const useAddToCartHandler = () => {
  const { addToCart } = useCartStore();

  return (product: CartItem) => {
    addToCart(product);
    showToast(
      "Item Added To The Cart",
      product.images[0] as string,
      product.name
    );
  };
};

export default useAddToCartHandler;
