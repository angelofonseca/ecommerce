import { useShopContext } from "@/context/ShopContext";
import { Category } from "@/Types";

function AdminCategoryCard({ category }: { category: Category }) {
  const { setIsLoading } = useShopContext();

  const handleDelete = async () => {
    setIsLoading(true);
    // await deleteCategory(category.id);
    setIsLoading(false);
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">{category.name}</h3>
      <button onClick={handleDelete} className="text-red-500">
        Delete
      </button>
    </div>
  );
}
export default AdminCategoryCard;