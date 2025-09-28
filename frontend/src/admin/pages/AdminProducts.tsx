import Loading from "@/components/Loading";
import SearchBar from "@/components/SearchBar";
import { useProductContext } from "@/context/ProductContext";
import { getProducts } from "@/services/api";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminProductList from "../components/AdminProductList";

function AdminProducts() {
  const { isLoading, setProducts, setIsLoading } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const results = await getProducts();
      setProducts(results);
      setIsLoading(false);
    };
    fetchProducts();
  }, [setIsLoading, setProducts]);

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
            <NavLink
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center px-6 py-3 font-semibold transition duration-200 transform hover:scale-105 shadow-lg min-w-fit"
              to={"/admin/products/add"}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Novo Produto
            </NavLink>
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
