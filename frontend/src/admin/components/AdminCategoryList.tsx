import { useShopContext } from "@/context/ShopContext";
import AdminCategoryCard from "./AdminCategoryCard";

function AdminCategoryList() {
  const { categories, isSearched } = useShopContext();

  if (categories.length === 0 && isSearched) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros de pesquisa</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto cadastrado</h3>
          <p className="text-gray-500">Comece adicionando seu primeiro produto</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <AdminCategoryCard key={category.id} category={category} />
      ))}
    </>
  );
}

export default AdminCategoryList;
