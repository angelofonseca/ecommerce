import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import { useShopContext } from "@/context/ShopContext";
import AdminProductList from "../components/AdminProductList";

function AdminProducts() {
  const { isLoading } = useShopContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Gerenciar Produtos
          </h1>
          
          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="flex-1">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <div>Produto</div>
              <div className="hidden md:block">Nome</div>
              <div className="hidden md:block">Preço</div>
              <div className="hidden md:block">Frete Grátis</div>
              <div className="hidden md:block">Ações</div>
              <div className="md:hidden">Detalhes</div>
            </div>
          </div>

          {/* Products List */}
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loading />
              </div>
            ) : (
              <AdminProductList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminProducts;
