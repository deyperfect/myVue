import api from './axios'

// All product-related API calls in one place
export const productsApi = {
  getAll: ()           => api.get('/products'),
  getOne: (id)         => api.get(`/products/${id}`),
  create: (payload)    => api.post('/products', payload),
  update: (id, payload)=> api.put(`/products/${id}`, payload),
  remove: (id)         => api.delete(`/products/${id}`),
}
