import React from 'react';
import StarRating from './StarRating';


export default function ReviewCard({ review, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-800">{review.author}</h4>
                        <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
                </div>

                {(onEdit || onDelete) && (
                    <div className="flex gap-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(review)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Editar
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(review._id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                Excluir
                            </button>
                        )}
                    </div>
                )}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
        </div>
    );
};
