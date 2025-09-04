import { useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import Categories from '../components/Categories';
import ProductsList from '../components/ProductsList';
import Loading from '../components/Loading';
import { getProductsFromCategory, getProductsFromCategoryAndQuery, getProducts} from '../services/api';
import getRandomCategoryId from '../helpers/categoryRandomize';

function Home() {
  const { isLoading, isSearched, setProducts, setIsLoading } = useProductContext();

  useEffect(() => {
    if (isSearched) return;
    setIsLoading(true);
    const getProductsList = async () => {
      const results = await getProducts();
      setProducts(results);
      setIsLoading(false);
    };
    getProductsList();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 overflow-y-auto flex-shrink-0">
          <div className="p-4 mt-5 fixed top-0 max-h-screen overflow-y-auto">
            <h2 className="text-xl mt-5 pt-5 font-semibold mb-4">Categorias</h2>
            <Categories />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? <Loading /> : <ProductsList />}
        </main>
      </div>
    </div>
  );
}

export default Home;
