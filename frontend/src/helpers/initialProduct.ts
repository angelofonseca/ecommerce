export const initialProduct = {
  id: '1',
  name: '',
  photo: '',
  description: '',
  price: 0,
  quantity: 0,
  stock: { productId: 1, quantity: 0, createdAt: '', updatedAt: '' },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  freeShipping: false,
  categoryId: 1,
  brandId: 1
};