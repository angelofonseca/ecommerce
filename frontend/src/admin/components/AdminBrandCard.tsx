import { Brand } from "@/Types";
import { Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function AdminBrandCard({ brand }: { brand: Brand }) {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir a marca "${brand.name}"?`)) {
      // TODO: Implementar lógica de deletar marca
      console.log("Deletando marca:", brand.id);
    }
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Nome */}
        <div>
          <h3 className="text-sm font-medium text-gray-900">{brand.name}</h3>
        </div>

        {/* Data de Criação */}
        <div>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/brands/edit/${brand.id}`}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            Editar
          </Link>
          
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminBrandCard;