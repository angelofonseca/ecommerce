import Loading from "@/components/Loading";
import { useShopContext } from "@/context/ShopContext";
import AdminCategoryList from "../components/AdminCategoryList";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function AdminCategories() {
  const { isLoading } = useShopContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Gerenciar Categorias
          </h1>

          {}
          <div className="flex justify-end">
            <Link
              to="/admin/categories/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Categoria
            </Link>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <div>Nome</div>
              <div>Data de Criação</div>
              <div>Ações</div>
            </div>
          </div>

          {}
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loading />
              </div>
            ) : (
              <AdminCategoryList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminCategories;
