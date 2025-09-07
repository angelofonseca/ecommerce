import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Layout from './components/layout/Layout';
import Categories from './components/Categories';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/product/*" element={ <Product /> } />
        <Route path="/categories" element={ <Categories /> } />
        <Route path="/checkout" element={ <Checkout /> } />
      </Route>
    </Routes>
  );
}

export default App;
