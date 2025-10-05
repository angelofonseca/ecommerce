import { useShopContext } from "@/context/ShopContext";
import { createURLSlug } from "@/helpers/createURLSlug";
import { getProductsFromCategory } from "@/services/api";
import { useNavigate } from "react-router-dom";

function useCategory() {
  const { 
    setProducts, 
    setIsSearched, 
    setIsLoading, 
    setSelectedCategory 
  } = useShopContext();
  const navigate = useNavigate();

  const handleCategory = async (categoryId: string) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
    
    try {
      const results = await getProductsFromCategory(categoryId);
      setProducts(results);
      
      const slug = results[0]?.category?.name
        ? createURLSlug(results[0].category.name)
        : "";
      
      navigate("/?search=" + slug);
      setIsSearched(true);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return handleCategory;
}

export default useCategory;
