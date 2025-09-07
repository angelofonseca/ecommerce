import ProductCard from "./ProductCard";
import { useProductContext } from "../context/ProductContext";

function ProductsList() {
  const { products, isSearched } = useProductContext();

  if (products.length === 0 && isSearched) {
    return <h2>Nenhum produto foi encontrado</h2>;
  }
  return products.map((product) => (
    <ProductCard key={product.id} product={product} isDetailedView={false} />
  ));
}

export default ProductsList;
