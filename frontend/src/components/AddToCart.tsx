"use client";

import type React from "react";

import type { AddToCartProps } from "../Types";
import { Button } from "./ui/button";
import useCart from "../hooks/useCart";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddToCart({ product, classCard }: AddToCartProps) {
  const { addToCart } = useCart();
  const { cart } = useCartContext();
  const { getUser } = useAuthContext();
    const {
      stock: { quantity: inStock },
    } = product;
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (getUser()) {
      addToCart(product);
    } else {
      navigate("/login");
    }
  };


  const isOutOfStock = cart[product.id]?.quantity === inStock;

  return (
    <Button
      variant={isOutOfStock ? "secondary" : "default"}
      disabled={isOutOfStock}
      onClick={handleClick}
      className={`${classCard} ${
        isOutOfStock
          ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
          : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      } py-3 px-6 rounded-xl text-sm`}
    >
      <div className="flex items-center justify-center gap-2">
        {isOutOfStock ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>Esgotado</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <span>Adicionar ao Carrinho</span>
          </>
        )}
      </div>
    </Button>
  );
}

export default AddToCart;
