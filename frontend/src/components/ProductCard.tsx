"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Comment, ProductCardProps } from "../Types";
import { formatPrice } from "../helpers/formatPrice";
import AddToCart from "./AddToCart";
import { useShopContext } from "../context/ShopContext";
import { createURLSlug } from "../helpers/createURLSlug";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MdLocalShipping } from "react-icons/md";

function ProductCard({ product }: ProductCardProps) {
  const [, setComments] = useState<Comment[]>([]);

  const { saveProduct } = useShopContext();
  const { id, name: title, price, photo, freeShipping } = product;
  const navigate = useNavigate();

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(String(id)) || "[]");
    setComments(savedReviews);
  }, [id]);

  const handleClick = () => {
    saveProduct(product);
    navigate(`/product/${createURLSlug(title)}`);
  };

  const installmentPrice = price / 10;

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-border bg-card/50 backdrop-blur-sm animate-fade-in">
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <button
          onClick={handleClick}
          className="absolute inset-0 w-full h-full bg-transparent cursor-pointer group"
          aria-label={`View details for ${title}`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            src={photo || "/placeholder.svg"}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = "/diverse-products-still-life.png";
            }}
          />
        </button>

        {freeShipping && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg animate-pulse">
            <MdLocalShipping className="w-3 h-3" />
            <span>Frete Grátis</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col gap-4">
        <button className="text-left group" onClick={handleClick}>
          <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
            {title}
          </CardTitle>
        </button>

        <div className="mt-auto space-y-3">
          <div className="flex items-baseline gap-2">
            <CardDescription className="text-3xl font-bold text-primary">
              R$ {formatPrice(price)}
            </CardDescription>
          </div>
          <CardDescription className="text-sm text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
            ou{" "}
            <span className="font-semibold text-accent">
              10x de R$ {formatPrice(installmentPrice)}
            </span>{" "}
            sem juros
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-4">
        <AddToCart product={product} classCard="w-full" />
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
