import useGoBack from "@/hooks/useGoBack";
import {
  getBrands,
  getCategories,
  getProductByID,
  updateProduct,
} from "@/services/api";
import { Category, ProductEditForm } from "@/Types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AdminEditProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductEditForm>({});
  const [updatedFormData, setUpdatedFormData] = useState<ProductEditForm>({});
  const [stockQuantity, setStockQuantity] = useState<number | string>("");
  const { id } = useParams();
  const handleGoBack = useGoBack();

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProductByID(id as string);
      setFormData(result);
    };
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    const fetchBrands = async () => {
      const result = await getBrands();
      setBrands(result);
    };
    fetchCategories();
    fetchBrands();
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setStockQuantity(formData?.stock?.quantity || 0);
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { target } = event;
    setFormData((prevForm) => ({ ...prevForm, [target.name]: target.value }));
    setUpdatedFormData((prevForm) => ({
      ...prevForm,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = {
      ...updatedFormData,
      stock: { quantity: stockQuantity as number },
    };
    try {
      if (!formData || !formData.id) throw new Error("Form data or ID is missing");
      await updateProduct(formData?.id.toString(), finalFormData);
      alert("Produto atualizado com sucesso!");
      handleGoBack();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div className="h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Editar Produto
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Preencha as informações abaixo para adicionar um novo produto
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          {/* Grid layout for better organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome do Produto */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome do Produto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
                placeholder="Ex: Tênis Nike Air Max"
              />
            </div>

            {/* URL da Foto */}
            <div className="md:col-span-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL da Foto *
              </label>
              <input
                type="url"
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descrição *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 resize-none"
                placeholder="Descreva as características principais do produto..."
              />
            </div>

            {/* Preço */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preço (R$) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">R$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="0,00"
                />
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantidade em Estoque *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                min="0"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>

            {/* Categoria */}
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Categoria *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Marca */}
            <div>
              <label
                htmlFor="brandId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Marca *
              </label>
              <select
                id="brandId"
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
              >
                <option value="">Selecione uma marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Salvar
              </span>
            </button>
          </div>

          {/* Required fields note */}
          <div className="text-center text-sm text-gray-500">
            <p>* Campos obrigatórios</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProduct;
