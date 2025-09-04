import { Product, Shipping, Mode } from '../Types';

const initialShipping: Shipping = {
  store_pick_up: false,
  free_shipping: false,
  logistic_type: null,
  mode: Mode.NotSpecified,
  tags: [],
  benefits: null,
  promise: null,
  shipping_score: 0,
};

// export const initialProduct: Product = {
//   id: 'notfound',
//   title: 'Produto não encontrado',
//   condition: 'new',
//   thumbnail_id: '',
//   catalog_product_id: '',
//   sanitized_title: 'produto-nao-encontrado',
//   permalink: '',
//   site_id: '',
//   category_id: '',
//   domain_id: '',
//   thumbnail: '',
//   order_backend: 0,
//   price: 0,
//   original_price: null,
//   available_quantity: 0,
//   official_store_id: null,
//   use_thumbnail_id: false,
//   accepts_mercadopago: false,
//   stop_time: new Date(),
//   shipping: initialShipping,
//   installments: null,
//   winner_item_id: null,
//   catalog_listing: false,
//   discounts: null,
//   decorations: null,
//   promotions: null,
//   inventory_id: null,
//   official_store_name: '',
//   quantity: 0,
// };

export const initialProduct = {
  id: '',
  name: '',
  photo: '',
  description: '',
  price: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categoryId: '',
  brandId: ''
};