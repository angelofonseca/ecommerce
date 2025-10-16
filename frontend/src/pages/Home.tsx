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
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/modern-footwear-collection-hero-background.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Descubra o produto <span className="text-primary">Ideal</span>{" "}
              para você!
            </h1>
          </div>
        </div>
      </section>

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

      <section className="bg-secondary/30 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Qualidade Premium</h3>
              <p className="text-muted-foreground">
                Materiais selecionados e acabamento impecável em todos os
                produtos
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-accent-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">
                Receba seus calçados em até 48h em todo o Brasil
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Garantia Total</h3>
              <p className="text-muted-foreground">
                30 dias para troca e devolução sem complicações
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
