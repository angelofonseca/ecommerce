export type Category = {
  id: string;
  name: string;
};

export type Brand = {
  id: number;
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

export type Stock = {
  productId?: number;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductEditForm = {
  id?: number;
  name?: string;
  photo?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  brandId?: number;
  freeShipping?: boolean;
  stock?: { quantity: number };
  category?: Category;
  brand?: Brand;
}


export type Product = {
  id: number;
  name: string;
  photo: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  brandId: number;
  quantity: number;
  freeShipping?: boolean;
  category?: Category;
  brand?: Brand;
  stock: Stock;
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

export type CategoryContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
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

export type User = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
  address?: string;
  role?: "ADMIN" | "CUSTOMER";
}

export type Login = {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export type AuthContextType = {
  login: Login | null;
  setLogin: React.Dispatch<React.SetStateAction<Login | null>>;
  getUser: () => Login | null;
  setLocalLogin: (data: Login) => void;
  handleLogout: () => void;
};

export type ProductData = {
  name: string;
  photo: string;
  description: string;
  price: string;
  categoryId: string;
  brandId: string;
  quantity: string;
}

export type ProductType = {
  name: string;
  photo: string;
  description: string;
  price: number;
  categoryId: number;
  brandId: number;
  quantity: number;
}

export type ShopContextType = {
  // Estado
  products: Product[];
  selectedProduct: Product | null;
  categories: Category[];
  brands: Brand[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
  isSearched: boolean;
  refreshHome: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  saveProduct: (product: Product) => void;
  setCategories: (categories: Category[]) => void;
  setBrands: (brands: Brand[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsSearched: (searched: boolean) => void;
  setRefreshHome: (refresh: boolean) => void;
  resetSearch: () => void;
  
  // Refresh functions
  refreshCategories: () => Promise<void>;
  refreshBrands: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}