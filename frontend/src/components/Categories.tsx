import { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import type { Category } from "../Types";
import { useShopContext } from "../context/ShopContext";
import { Label } from "@radix-ui/react-label";
import useCategory from "@/hooks/useCategory";

function Categories() {
  const { 
    setIsSearched, 
    selectedCategory, 
    setSelectedCategory, 
    setRefreshHome 
  } = useShopContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const handleCategory = useCategory();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <input
          type="radio"
          id="categoria-all"
          name="category"
          value="all"
          checked={selectedCategory === null || selectedCategory === ""}
          onChange={() => {
            setSelectedCategory(null);
            setIsSearched(false);
            setRefreshHome(true);
          }}
          className="sr-only"
        />
        <Label
          htmlFor="categoria-all"
          className={`block w-full p-4 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium border-2 ${
            selectedCategory === null || selectedCategory === ""
              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-primary shadow-lg transform scale-105"
              : "hover:bg-secondary/50 hover:text-foreground hover:border-border hover:shadow-md"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                selectedCategory === null || selectedCategory === ""
                  ? "bg-primary-foreground"
                  : "bg-muted-foreground"
              }`}
            ></div>
            <span>Todos os Produtos</span>
            {(selectedCategory === null || selectedCategory === "") && (
              <div className="ml-auto">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </Label>
      </div>

      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <div key={category.id}>
            <input
              type="radio"
              id={`categoria-${category.id}`}
              name="category"
              value={category.name}
              checked={selectedCategory === category.id}
              onChange={() => handleCategory(category.id)}
              className="sr-only"
            />
            <Label
              htmlFor={`categoria-${category.id}`}
              className={`block w-full p-4 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium border-2 ${
                isSelected
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-primary shadow-lg transform scale-105"
                  : "hover:bg-secondary/50 hover:text-foreground hover:border-border hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-primary-foreground" : "bg-muted-foreground"
                  }`}
                ></div>
                <span className="capitalize">{category.name}</span>
                {isSelected && (
                  <div className="ml-auto">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </Label>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
