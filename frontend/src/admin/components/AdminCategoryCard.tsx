import { Category } from "@/Types";

function AdminCategoryCard({ category }: { category: Category }) {

  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold">{category.name}</h3>
    </div>
  );
}
export default AdminCategoryCard;