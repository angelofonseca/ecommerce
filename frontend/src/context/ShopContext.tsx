import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product, Category, Brand, ShopContextType } from "../Types";
import { getCategories, getBrands, getProducts } from "../services/api";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [refreshHome, setRefreshHome] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (categories.length > 0 && brands.length > 0 && products.length > 0) return;
      
      try {
        setIsLoading(true);
        const promises = [];
        
        if (categories.length === 0) {
          promises.push(getCategories().then(setCategories));
        }
        
        if (brands.length === 0) {
          promises.push(getBrands().then(setBrands));
        }
        
        if (products.length === 0) {
          promises.push(getProducts().then(setProducts));
        }
        
        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [categories.length, brands.length, products.length]);

  const saveProduct = (product: Product) => {
    setSelectedProduct(product);
    localStorage.setItem("product", JSON.stringify(product));
  };

  const resetSearch = () => {
    setSearchQuery("");
    setIsSearched(false);
    setSelectedCategory(null);
    setProducts([]);
  };

  const refreshCategories = async () => {
    setIsLoading(true);
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error refreshing categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBrands = async () => {
    setIsLoading(true);
    try {
      const brandsData = await getBrands();
      setBrands(brandsData);
    } catch (error) {
      console.error("Error refreshing brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error refreshing products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: ShopContextType = {
    // Estado
    products,
    selectedProduct,
    categories,
    brands,
    selectedCategory,
    searchQuery,
    isLoading,
    isSearched,
    refreshHome,
    
    // Actions
    setProducts,
    setSelectedProduct,
    saveProduct,
    setCategories,
    setBrands,
    setSelectedCategory,
    setSearchQuery,
    setIsLoading,
    setIsSearched,
    setRefreshHome,
    resetSearch,
    refreshCategories,
    refreshBrands,
    refreshProducts,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

// Hook
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
};