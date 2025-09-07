import type { CartType, Product } from '../Types';
import { useCartContext } from '../context/CartContext';

function useCart() {
  const { cart, setCart, cartLength, setCartLength, totalPrice, setTotalPrice } = useCartContext();

  const updateCart = (updatedCart: CartType) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateCartLength = (updatedLength: number) => {
    localStorage.setItem('cartsize', JSON.stringify(updatedLength));
    setCartLength(updatedLength);
  };

  const updateTotalPrice = (updatedPrice: number) => {
    localStorage.setItem('totalPrice', JSON.stringify(updatedPrice));
    setTotalPrice(updatedPrice);
  };

  const addToCart = (product: Product) => {
    const { id } = product;
    const updatedCart = { ...cart };

    if (updatedCart[id]) {
      updatedCart[id].quantity += 1;
    } else {
      updatedCart[id] = { ...product, quantity: 1 };
    }

    updateCart(updatedCart);
    updateCartLength(cartLength + 1);
    updateTotalPrice(totalPrice + product.price);
  };

  const incrementQuantity = (id: string) => {
    const updatedCart = { ...cart };
    updatedCart[id].quantity += 1;

    updateCart(updatedCart);
    updateCartLength(cartLength + 1);
    updateTotalPrice(totalPrice + cart[id].price);
  };

  const decrementQuantity = (id: string) => {
    const updatedCart = { ...cart };
    if (updatedCart[id].quantity > 1) {
      updatedCart[id].quantity -= 1;
    } else {
      delete updatedCart[id];
    }

    updateCart(updatedCart);
    updateCartLength(cartLength - 1);
    updateTotalPrice(totalPrice - cart[id].price);
  };

  const removeProduct = (id: string) => {
    const updatedCart = { ...cart };
    const { quantity } = updatedCart[id];
    delete updatedCart[id];

    updateCart(updatedCart);
    updateCartLength(cartLength - quantity);
    updateTotalPrice(totalPrice - (cart[id].price * cart[id].quantity));
  };

  return { cart, addToCart, incrementQuantity, decrementQuantity, removeProduct };
}

export default useCart;
