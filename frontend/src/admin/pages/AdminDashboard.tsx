import { useShopContext } from "@/context/ShopContext";
import { useEffect } from "react";
import { VictoryPie, VictoryTheme } from "victory";

function AdminDashboard() {
  const { products, categories, brands, isLoading, refreshProducts } =
    useShopContext();

  useEffect(() => {
    refreshProducts();
  }, []);

  const categoryChartData = categories.map((category) => ({
    x: category.name,
    y: products.filter((p) => String(p.categoryId) === String(category.id))
      .length,
  }));

  const brandChartData = brands.map((brand) => ({
    x: brand.name,
    y: products.filter((p) => String(p.brandId) === String(brand.id)).length,
  }));

  if (isLoading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p>
          Categorias: {categories.length} | Produtos: {products.length}
        </p>
      </div>

      <div className="flex flex-row justify-around">
        {categoryChartData.some((item) => item.y > 0) ? (
          <div className="w-96 h-96 mb-6">
            <VictoryPie
              data={categoryChartData.filter((item) => item.y > 0)}
              theme={VictoryTheme.material}
            />
          </div>
        ) : (
          <div className="p-4 bg-yellow-100 rounded mb-6">
            <p>Nenhum produto encontrado. Dados do contexto:</p>
            <pre>
              {JSON.stringify(
                { categories: categories.length, products: products.length },
                null,
                2
              )}
            </pre>
          </div>
        )}

        {brandChartData.some((item) => item.y > 0) ? (
          <div className="w-96 h-96 mb-6">
            <VictoryPie
              data={brandChartData.filter((item) => item.y > 0)}
              theme={VictoryTheme.material}
            />
          </div>
        ) : (
          <div className="p-4 bg-yellow-100 rounded mb-6">
            <p>Nenhum produto encontrado. Dados do contexto:</p>
            <pre>
              {JSON.stringify(
                { categories: categories.length, products: products.length },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
