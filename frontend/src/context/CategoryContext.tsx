

import React, { createContext, useContext, useState } from "react";
import type { Category, CategoryContextType } from "../Types";

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);

  const value = {
    categories,
    setCategories,
  };

  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  );
}

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a ProductProvider");
  }
  return context;
};
