import Loading from "@/components/Loading";
import { useProductContext } from "@/context/ProductContext";
import { getProducts } from "@/services/api";
import { useEffect } from "react";
import AdminProductList from "../components/AdminProductList";
import { NavLink } from "react-router-dom";

function AdminHome() {
  const { isLoading, setProducts, setIsLoading } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const results = await getProducts();
      setProducts(results);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <main className="flex-1">
      <div>
      <NavLink className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2" to={"/admin/products/add"}>
        <p>Novo Produto</p>
      </NavLink>
      </div>
      <div className="">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loading />
          </div>
        ) : (
          <AdminProductList />
        )}
      </div>
    </main>
  );
}

export default AdminHome;
