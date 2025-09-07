import type { AddToCartProps } from '../Types';
import { Button } from './ui/button';
import useCart from '../hooks/useCart';
import { useCartContext } from '@/context/CartContext';

function AddToCart({ product, classCard }: AddToCartProps) {
  const { addToCart } = useCart();
  const { cart } = useCartContext();
  const { stock: { quantity: inStock } } = product;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addToCart(product);
  };

  return (
    <Button
      variant="link"
      disabled={ cart[product.id]?.quantity === inStock }
      onClick={ handleClick }
      className={ classCard }
    >
      {cart[product.id]?.quantity === inStock ? 'Esgotado' : 'Adicionar ao carrinho'}
    </Button>
  );
}

export default AddToCart;
