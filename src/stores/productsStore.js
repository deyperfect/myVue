import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '../api/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading  = ref(false)
  const error    = ref(null)

  function _setError(err) {
    error.value = err?.response?.data?.message || 'Something went wrong.'
  }

  async function fetchProducts() {
    loading.value = true
    error.value   = null
    try {
      const { data } = await productsApi.getAll()
      products.value = data.data
    } catch (err) {
      _setError(err)
    } finally {
      loading.value = false
    }
  }

  async function createProduct(payload) {
    const { data } = await productsApi.create(payload)
    products.value.unshift(data.data) // Add to top of list immediately
  }

  async function updateProduct(id, payload) {
    const { data } = await productsApi.update(id, payload)
    const index = products.value.findIndex((p) => p._id === id)
    if (index !== -1) products.value[index] = data.data
  }

  async function deleteProduct(id) {
    await productsApi.remove(id)
    products.value = products.value.filter((p) => p._id !== id)
  }

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct }
})
