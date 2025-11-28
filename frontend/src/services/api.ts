import { Product, ProductData, User } from "@/Types";

const BACKEND_BASEURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export async function registerNewProduct(product: ProductData) {
  const payload = {
    ...product,
    price: Number(product.price),
    quantity: Number(product.quantity),
    categoryId: Number(product.categoryId),
    brandId: Number(product.brandId),
  };
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

export async function updateProduct(id: string, productData: Partial<Product>) {
  const URL = `${BACKEND_BASEURL}/product/${id}`;
  const response = await fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...productData }),
  });
  const data = await response.json();
  return data;
}

export async function updateProductFreeShipping(id: string, isChecked: boolean) {
  const URL = `${BACKEND_BASEURL}/product/${id}`;
  const response = await fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ freeShipping: isChecked }),
  });
  const data = await response.json();
  return data;
}

export async function deleteProductByID(id: string) {
  const URL = `${BACKEND_BASEURL}/product/${id}`;
  const response = await fetch(URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function deleteCategoryByID(id: string) {
  const URL = `${BACKEND_BASEURL}/category/${id}`;
  const response = await fetch(URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function deleteBrandByID(id: string) {
  const URL = `${BACKEND_BASEURL}/brand/${id}`;
  const response = await fetch(URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
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

export async function getProductsWithFilters(filters: {
  name?: string;
  categoryName?: string;
  brandName?: string;
  freeShipping?: boolean;
}) {
  const url = new URL(`${BACKEND_BASEURL}/product`);

  if (filters.name) url.searchParams.append('name', filters.name);
  if (filters.categoryName) url.searchParams.append('categoryName', filters.categoryName);
  if (filters.brandName) url.searchParams.append('brandName', filters.brandName);
  if (filters.freeShipping !== undefined) {
    url.searchParams.append('freeShipping', filters.freeShipping.toString());
  }

  const response = await fetch(url.toString());
  const data = await response.json();

  return data;
}

export async function getProductsFromCategory(categoryId: string) {
  const URL = `${BACKEND_BASEURL}/product/category/${categoryId}`;
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao cadastrar usuário");
  }

  return data;
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

export async function getProductByID(id: string) {
  const URL = `${BACKEND_BASEURL}/product/${id}`;
  const response = await fetch(URL);
  const data = await response.json();

  return data;
}

export async function requestPasswordReset(email: string) {
  const response = await fetch(`${BACKEND_BASEURL}/user/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao solicitar recuperação de senha");
  }

  return data;
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  const response = await fetch(`${BACKEND_BASEURL}/user/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao resetar senha");
  }

  return data;
}

export async function validateResetCode(email: string, code: string) {
  const response = await fetch(`${BACKEND_BASEURL}/user/validate-reset-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Código inválido ou expirado");
  }

  return data;
}

// ============================================
// BACKUP E RESTORE
// ============================================

export async function createBackup(token: string) {
  const response = await fetch(`${BACKEND_BASEURL}/backup`, {
    method: "GET",
    headers: {
      "authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar backup");
  }

  return await response.json();
}

export async function restoreBackup(token: string, backupData: Record<string, unknown>) {
  const response = await fetch(`${BACKEND_BASEURL}/backup/restore`, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backupData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao restaurar backup");
  }

  return data;
}
