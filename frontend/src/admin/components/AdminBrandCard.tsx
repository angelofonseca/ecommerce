import { Brand } from "@/Types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminBrandCard({ brand }: { brand: Brand }) {
  const navigate = useNavigate();
  const handleDelete = () => {
    if (
      window.confirm(`Tem certeza que deseja excluir a marca "${brand.name}"?`)
    ) {

      console.log("Deletando marca:", brand.id);
    }
  };

      const handleEdit = () => {
    navigate(`/admin/brands/edit/${brand.id}`);
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="grid grid-cols-3 gap-4 items-center">

        <div>
          <h3 className="text-sm font-medium text-gray-900">{brand.name}</h3>
        </div>

        <div>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleEdit}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Editar produto"
          >
            <FaEdit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Excluir produto"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminBrandCard;
