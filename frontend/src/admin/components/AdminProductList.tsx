import AdminProductCard from "./AdminProductCard";
import { useProductContext } from "@/context/ProductContext";

function AdminProductList() {
  const { products, isSearched } = useProductContext();

  if (products.length === 0 && isSearched) {
    return <h2>Nenhum produto foi encontrado</h2>;
  }
  return products.map((product) => (
    <AdminProductCard key={product.id} product={product} isDetailedView={false} />
  ));
}

export default AdminProductList;
