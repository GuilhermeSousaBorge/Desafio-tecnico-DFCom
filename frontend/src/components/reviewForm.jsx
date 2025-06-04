import React, { useState } from 'react';
import StarRating from './StarRating';


export default function ReviewForm({ productId, onSubmit, onCancel, initialData }) {
    const [formData, setFormData] = useState({
        author: initialData?.author || '',
        rating: initialData?.rating || 0,
        comment: initialData?.comment || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            alert('Por favor, selecione uma avaliação (estrelas)');
            return;
        }
        onSubmit({
            productId,
            ...formData
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {initialData ? 'Editar Avaliação' : 'Nova Avaliação'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seu Nome
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Avaliação
                            </label>
                            <div className="flex items-center gap-2">
                                <StarRating
                                    rating={formData.rating}
                                    size="lg"
                                    interactive
                                    onRatingChange={handleRatingChange}
                                />
                                <span className="text-sm text-gray-500 ml-2">
                                    {formData.rating > 0 ? `${formData.rating} estrela${formData.rating > 1 ? 's' : ''}` : 'Clique nas estrelas'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comentário
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Conte sobre sua experiência com este produto"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                                {initialData ? 'Atualizar' : 'Publicar'} Avaliação
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};