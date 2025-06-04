import api from '../../api/axios';

export const apiGETProducts = async () => {
    const { data } = await api.get('/products');
    return data;
};

export const apiGETProductDetails = async (productId) => {
    const { data } = await api.get(`/products/${productId}`);
    return data;
};
export const apiPOSTProduct = async (body) => {
    const { data } = await api.post('/products', body);
    return data;
};
export const apiPUTProduct = async (productId, body) => {
    const { data } = await api.put(`/products/${productId}`, body);
    return data;
};
export const apiDELETEProducts = async (productId) => {
    const { data } = await api.delete(`/products/${productId}`);
    return data;
};

export const apiGETProductReviews = async (productId) => {
    const { data } = await api.get(`/reviews/${productId}`);
    return data;
};

export const apiPOSTReview = async (body) => {
    const { data } = await api.post('/reviews', body);
    return data;
};
export const apiPUTReview = async (reviwId, body) => {
    const { data } = await api.put(`/reviews/${reviwId}`, body);
    return data;
};
export const apiDELETEReview = async (reviwId) => {
    const { data } = await api.delete(`/reviews/${reviwId}`);
    return data;
};