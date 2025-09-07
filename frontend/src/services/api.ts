export async function getCategories() {
  const URL = "http://localhost:3001/category";
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProducts() {
  const URL = "http://localhost:3001/product";
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProductsFromQuery(query: string) {
  const URL = `http://localhost:3001/product?name=${query}`;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProductsFromCategory(categoryId: string) {
  const URL = `http://localhost:3001/product/category/${categoryId}`; // category é um id
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
