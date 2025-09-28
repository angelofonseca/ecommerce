import { ProductData, User } from "@/Types";

const BACKEND_BASEURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


export async function registerNewProduct(product: ProductData) {
  const payload = {
    ...product,
    price: Number(product.price),
    quantity: Number(product.quantity),
    categoryId: Number(product.categoryId),
    brandId: Number(product.brandId),
  };
  console.log(JSON.stringify(payload));
  const response = await fetch(`${BACKEND_BASEURL}/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function getCategories() {
  const URL = `${BACKEND_BASEURL}/category`;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getBrands() {
  const URL = `${BACKEND_BASEURL}/brand`;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProducts() {
  const URL = `${BACKEND_BASEURL}/product`;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProductsFromQuery(query: string) {
  const URL = `${BACKEND_BASEURL}/product?name=${query}`;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function getProductsFromCategory(categoryId: string) {
  const URL = `${BACKEND_BASEURL}/product/category/${categoryId}`; // category é um id
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function registerUser(user: User) {
  const response = await fetch(`${BACKEND_BASEURL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function login(user: { email: string; password: string }) {
  const response = await fetch(`${BACKEND_BASEURL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function adminLogin(user: { email: string; password: string }) {
  const response = await fetch(`${BACKEND_BASEURL}/user/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
