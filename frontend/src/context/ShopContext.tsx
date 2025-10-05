/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";
import { Product, Category, Brand } from "../Types";

// Context Type
interface ShopContextType {
  // Estado
  products: Product[];
  selectedProduct: Product | null;
  categories: Category[];
  brands: Brand[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  isSearched: boolean;
  refreshHome: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  saveProduct: (product: Product) => void;
  setCategories: (categories: Category[]) => void;
  setBrands: (brands: Brand[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsSearched: (searched: boolean) => void;
  setRefreshHome: (refresh: boolean) => void;
  resetSearch: () => void;
}

// Context
const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Provider
export function ShopProvider({ children }: { children: ReactNode }) {
  // Estados individuais usando useState
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [refreshHome, setRefreshHome] = useState<boolean>(false);

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