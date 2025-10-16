import { useEffect, useState } from "react";
import { ProductCardProps } from "@/Types";
import { formatPrice } from "@/helpers/formatPrice";
import { MdLocalShipping } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { deleteProductByID, updateProductFreeShipping } from "@/services/api";
import { useShopContext } from "@/context/ShopContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }: ProductCardProps) {
  const [, setComments] = useState<Comment[]>([]);
  const { id, name: title, price, photo, freeShipping } = product;
  const [localFreeShipping, setLocalFreeShipping] = useState(
    product.freeShipping
  );
  const { setProducts, saveProduct, products } = useShopContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLocalFreeShipping(product.freeShipping);
  }, [product.freeShipping]);

  useEffect(() => {
    const savedReviews = JSON.parse(
      localStorage.getItem(id.toString()) || "[]"
    );
    setComments(savedReviews);
  }, [id]);

  const handleEdit = () => {
    saveProduct(product);
    navigate(`/admin/products/edit/${id}`);
  };
  const handleDelete = async () => {
    try {
      await deleteProductByID(id.toString());
      setProducts(products.filter((product) => product.id !== id));
      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Erro ao excluir produto");
    }
  };

  const handleFreeShipping = async (id: string, isChecked: boolean) => {
    try {
      await updateProductFreeShipping(id, isChecked);

      setLocalFreeShipping(isChecked);

      const updatedProducts = products.map((product) =>
        product.id === Number(id)
          ? { ...product, freeShipping: isChecked }
          : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating free shipping:", error);
      setLocalFreeShipping(!isChecked);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-6 hover:bg-gray-50 transition-colors duration-200">
      {}
      <div className="flex items-center">
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden shadow-sm bg-gray-100 flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={photo}
            alt={title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/80x80?text=No+Image";
            }}
          />
        </div>
      </div>

      {}
      <div className="hidden md:flex items-center">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
          {title}
        </p>
      </div>

      {}
      <div className="hidden md:flex items-center">
        <span className="text-lg font-bold text-green-600">
          {formatPrice(price)}
        </span>
      </div>

      {}
      <div className="hidden md:flex items-center justify-center">
        <Switch
          checked={localFreeShipping}
          onCheckedChange={(e) => handleFreeShipping(id.toString(), e)}
        />
      </div>

      {}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={handleEdit}
          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="Editar produto"
        >
          <FaEdit className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="Excluir produto"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>

      <div className="md:hidden space-y-2">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            {formatPrice(price)}
          </span>
          {freeShipping && (
            <div className="flex items-center gap-1 text-green-600">
              <MdLocalShipping className="w-4 h-4" />
              <span className="text-xs">Grátis</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleEdit}
            className="flex-1 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200 text-sm font-medium"
          >
            <FaEdit className="w-3 h-3 inline mr-1" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200 text-sm font-medium"
          >
            <FaTrash className="w-3 h-3 inline mr-1" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
