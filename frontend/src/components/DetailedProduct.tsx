import type { ProductCardProps } from "../Types";
import { formatPrice } from "../helpers/formatPrice";
import { MdLocalShipping } from "react-icons/md";
import { Card, CardContent, CardHeader } from "./ui/card";

function DetailedProduct({ product }: ProductCardProps) {
  const { id, name, photo, price, freeShipping, description } = product;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 flex justify-center items-center">
        <div
          id={`product-image-${id}`}
          className="w-48 h-48 overflow-hidden bg-muted rounded-xl"
        >
          <img
            className="w-full h-full object-cover"
            src={photo || "/placeholder.svg"}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "/diverse-products-still-life.png";
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold line-clamp-2 text-foreground">
          {name}
        </h3>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            R$ {formatPrice(price)}
          </h2>

          {freeShipping && (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
              <MdLocalShipping className="h-4 w-4" />
              <span>Frete Grátis</span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-foreground text-sm leading-relaxed">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default DetailedProduct;
