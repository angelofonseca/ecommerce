import { useEffect } from 'react';
import AddToCart from '../components/AddToCart';
import { useShopContext } from '../context/ShopContext';
import DetailedProduct from '../components/DetailedProduct';

function Product() {
  const { selectedProduct: product, saveProduct } = useShopContext();

  useEffect(() => {
    if (!product) return;
    const getProduct = localStorage.getItem('product');
    const item = getProduct ? JSON.parse(getProduct) : null;
    if (item && item.id !== product.id) saveProduct(item);
  }, [saveProduct, product]);

  if (!product) {
    return <h1>Produto não encontrado</h1>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <DetailedProduct product={ product } />
          <AddToCart product={ product } />
        </div>
      </main>
    </div>
  );
}

export default Product;
