import { useEffect } from "react";
import Categories from "../components/Categories";
import ProductsList from "../components/ProductsList";
import Loading from "../components/Loading";
import { useShopContext } from "@/context/ShopContext";

function Home() {
  const { isLoading, refreshHome, setRefreshHome, refreshProducts } =
    useShopContext();

  useEffect(() => {
    if (refreshHome) {
      refreshProducts();
      setRefreshHome(false);
    }
  }, [refreshHome, refreshProducts, setRefreshHome]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 shrink-0">
            <div className="bg-card rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                Categorias
              </h2>
              <Categories />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8 animate-slide-up">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Produtos em Destaque
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-20">
                  <Loading />
                </div>
              ) : (
                <ProductsList />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
