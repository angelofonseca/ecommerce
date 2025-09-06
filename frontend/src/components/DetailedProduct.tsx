import { useEffect, useState } from "react";
import { Comment, ProductCardProps } from "../Types";
import RatingAndComment from "./RatingAndComment";
import { formatPrice } from "../helpers/formatPrice";
import { MdLocalShipping } from "react-icons/md";

function DetailedProduct({ product, isDetailedView = true }: ProductCardProps) {
  const [, setComments] = useState<Comment[]>([]);
  const { id, name, photo, price, freeShipping } = product;

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(id) || "[]");
    setComments(savedReviews);
  }, [id]);

  return (
    <div id={id}>
      <img className="cardImg" src={photo} alt={photo} />
      <h3 className="text-left line-clamp-2 overflow-hidden text-ellipsis text-bold">
        {name}
      </h3>
      <h2 className="text-center font-bold">R$ {formatPrice(price)}</h2>
      {freeShipping && (
        <div className="text-white text-xs rounded-full bg-green-700 px-2 py-1 inline-flex items-center">
          <MdLocalShipping className="mr-1" />
          <span>Frete Grátis</span>
        </div>
      )}
      {isDetailedView && <RatingAndComment productId={id} />}
    </div>
  );
}

export default DetailedProduct;
