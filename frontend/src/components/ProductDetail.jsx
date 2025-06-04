import React, { useState } from 'react';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { ArrowUp } from 'lucide-react';


export default function ProductDetail ({ 
  product, 
  reviews, 
  onClose, 
  onAddReview,
  onEditReview,
  onDeleteReview 
})  {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  console.log("reviews ", reviews);
  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleSubmitReview = (reviewData) => {
    if (editingReview) {
      onEditReview({ ...reviewData, _id: editingReview._id, createdAt: editingReview.createdAt });
    } else {
      onAddReview(reviewData);
    }
    setShowReviewForm(false);
    setEditingReview(null);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setEditingReview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Product Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-8xl text-gray-400">📦</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descrição</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Preço</h3>
                <div className="text-3xl font-bold text-green-600">
                  R$ {product.price.toFixed(2)}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Avaliação</h3>
                <div className="flex items-center gap-3">
                  <StarRating rating={product.averageRating || 0} size="lg" />
                  <span className="text-lg font-medium">
                    {product.averageRating ? product.averageRating.toFixed(1) : '0.0'}
                  </span>
                  <span className="text-gray-500">
                    ({reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Avaliações</h2>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Escrever Avaliação
              </button>
            </div>
            
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Ainda não há avaliações para este produto.</p>
                <p>Seja o primeiro a avaliar!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews?.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onEdit={handleEditReview}
                    onDelete={onDeleteReview}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={product._id}
          onSubmit={handleSubmitReview}
          onCancel={handleCancelReview}
          initialData={editingReview || undefined}
        />
      )}
    </div>
  );
};