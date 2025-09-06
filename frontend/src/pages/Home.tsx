import { useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import Categories from '../components/Categories';
import ProductsList from '../components/ProductsList';
import Loading from '../components/Loading';
import {getProducts} from '../services/api';

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
    <div className="">
      <div className="">
        <aside className="">
          <div className="">
            <h2 className="">Categorias</h2>
            <Categories />
          </div>
        </aside>
        <main className="">
          {isLoading ? <Loading /> : <ProductsList />}
        </main>
      </div>
    </div>
  );
}

export default Home;
