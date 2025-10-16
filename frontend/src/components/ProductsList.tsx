import ProductCard from "./ProductCard";
import { useShopContext } from "../context/ShopContext";

function ProductsList() {
  const { products, isSearched } = useShopContext();

  if (products.length === 0 && isSearched) {
    return <h2>Nenhum produto foi encontrado</h2>;
  }
  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}

export default ProductsList;
