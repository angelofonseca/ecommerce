import { RiShoppingCartLine } from "react-icons/ri"
import { useCartContext } from "../../context/CartContext"

function CartIcon() {
  const { cartLength } = useCartContext()

  return (
    <div className="relative inline-block text-2xl">
      <RiShoppingCartLine className="w-6 h-6" />
      <span
        data-testid="shopping-cart-size"
        className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[1.25rem]"
      >
        {cartLength}
      </span>
    </div>
  )
}

export default CartIcon
