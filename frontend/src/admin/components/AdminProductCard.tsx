import { useEffect, useState } from "react";
import { ProductCardProps } from "@/Types";
import { formatPrice } from "@/helpers/formatPrice";
import { MdLocalShipping } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function ProductCard({ product }: ProductCardProps) {
  const [, setComments] = useState<Comment[]>([]);
  const { id, name: title, price, photo, freeShipping } = product;

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(id) || "[]");
    setComments(savedReviews);
  }, [id]);

  const handleClick = () => {};

  return (
    <div className="grid grid-cols-6 gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <img className="h-24 w-24" src={photo} alt={title} />
      <p>{title}</p>
      <p>{formatPrice(price)}</p>
      <p>{freeShipping && <MdLocalShipping />}</p>
      <FaTrash />
      <FaEdit />
    </div>
  );
}
export default ProductCard;
