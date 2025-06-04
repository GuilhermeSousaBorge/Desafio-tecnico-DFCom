import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductDetail from '../../components/ProductDetail';
import ProductForm from '../../components/ProductForm';
import { Plus, Search } from 'lucide-react';
import { toast } from 'react-toastify'
import {apiDELETEProducts, apiDELETEReview, apiGETProductDetails, apiGETProductReviews, apiGETProducts, apiPOSTProduct, apiPOSTReview, apiPUTReview, apiPUTProduct} from './actions'

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await apiGETProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar produtos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProductReviews = async (productId) => {
    try {
      const reviews = await apiGETProductReviews(productId);
      setProductReviews(reviews);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar avaliações",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = async (product) => {
    setSelectedProduct(product);
    await loadProductReviews(product._id);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiDELETEProducts(productId);
      await loadProducts();
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao excluir produto",
        variant: "destructive"
      });
    }
  };

  const handleCreateProduct = async (productData) => {
    console.log(productData)
    try {
      await apiPOSTProduct(productData);
      await loadProducts();
      setShowProductForm(false);
      toast({
        title: "Sucesso",
        description: "Produto criado com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar produto",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProduct = async (productData) => {
    if (!editingProduct) return;

    try {
      await apiPUTProduct(editingProduct._id, productData);
      await loadProducts();
      setShowProductForm(false);
      setEditingProduct(null);
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar produto",
        variant: "destructive"
      });
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      await apiPOSTReview(reviewData);
      await loadProductReviews(reviewData.productId);
      await loadProducts(); // Atualizar média de avaliações
      toast({
        title: "Sucesso",
        description: "Avaliação adicionada com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao adicionar avaliação",
        variant: "destructive"
      });
    }
  };

  const handleEditReview = async (review) => {
    try {
      await apiPUTReview(review._id, review);
      await loadProductReviews(review.productId);
      await loadProducts();
      toast({
        title: "Sucesso",
        description: "Avaliação atualizada com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar avaliação",
        variant: "destructive"
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    try {
      await apiDELETEReview(reviewId);
      await loadProductReviews(selectedProduct._id);
      await loadProducts();
      toast({
        title: "Sucesso",
        description: "Avaliação excluída com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao excluir avaliação",
        variant: "destructive"
      });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Avaliações de Produtos
              </h1>
              <p className="text-gray-600 mt-1">
                Descubra e avalie os melhores produtos
              </p>
            </div>
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Adicionar Produto
            </button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Tente buscar com outros termos'
                : 'Comece adicionando seu primeiro produto'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Adicionar Primeiro Produto
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onViewDetails={handleViewDetails}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          reviews={productReviews}
          onClose={() => setSelectedProduct(null)}
          onAddReview={handleAddReview}
          onEditReview={handleEditReview}
          onDeleteReview={handleDeleteReview}
        />
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct || undefined}
        />
      )}
    </div>
  );
};