// Tirar o handleCategory do componente Category, colocar aqui reutilizar o useCategory no aside do Admin.

import { useHomeContext } from "@/context/HomeContext";
import { useProductContext } from "@/context/ProductContext";
import { createURLSlug } from "@/helpers/createURLSlug";
import { getProductsFromCategory } from "@/services/api";
import { useNavigate } from "react-router-dom";

function useCategory() {
  const { setProducts, setIsSearched, setIsLoading } = useProductContext();
  const { setSelectedCategory } = useHomeContext();
  const navigate = useNavigate();
  const handleCategory = async (categoryId: string) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
    const results = await getProductsFromCategory(categoryId);
    setProducts(results);
    const slug = results[0]?.category?.name
      ? createURLSlug(results[0].category.name)
      : "";
    navigate("/?search=" + slug);
    setIsSearched(true);
    setIsLoading(false);
  };

  return handleCategory;
}

export default useCategory;
