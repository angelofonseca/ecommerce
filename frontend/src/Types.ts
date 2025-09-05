export type Category = {
  id: string;
  name: string;
};

export type ProductsListProps = {
  showAddToCart?: boolean;
};

export type AddToCartProps = {
  product: Product;
  classCard?: string;
};

export type ProductCardProps = {
  product: Product;
  isDetailedView?: boolean;
};

export type CartType = {
  [id: string]: Product;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  brandId: string;
};

export enum Mode {
  NotSpecified = 'not_specified',
}

export type Comment = {
  email: string;
  text: string;
  rating: number;
};
export type CommentsList = {
  [productId: string]: Comment[];
};

export type ProductContextType = {
  product: Product;
  saveProduct: (item: Product) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CartContextType = {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
  cartLength: number;
  setCartLength: React.Dispatch<React.SetStateAction<number>>;
  getCartSize: () => number;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};
