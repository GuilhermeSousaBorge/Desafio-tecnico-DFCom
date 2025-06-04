import StarRating from "./StarRating";
import { Edit, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onViewDetails, onEditProduct,  onDeleteProduct  }) {

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEditProduct(product);
      };
    
      const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
          onDeleteProduct(product._id);
        }
      };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            onClick={() => onViewDetails(product)}>
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-6xl text-gray-400 group-hover:scale-110 transition-transform duration-300">
                    📦
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <StarRating rating={product.averageRating || 0} size="sm" />
                        <span className="text-sm text-gray-500">
                            ({product.reviewCount || 0} avaliações)
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                        Ver Detalhes
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                        onClick={handleEditClick}
                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                    >
                        <Edit size={16} />
                        Editar
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                        <Trash2 size={16} />
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}