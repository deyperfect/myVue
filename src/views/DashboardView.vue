<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="fw-bold mb-1">My Products</h1>
        <p class="text-secondary mb-0">{{ products.length }} product{{ products.length !== 1 ? 's' : '' }}</p>
      </div>
      <RouterLink to="/products/new" class="btn btn-primary">
        <i class="bi bi-plus-lg me-1"></i>Add Product
      </RouterLink>
    </div>

    <!-- Error state -->
    <AlertMessage :message="error" />

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="text-secondary mt-3">Loading products...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!loading && products.length === 0" class="text-center py-5">
      <i class="bi bi-inbox fs-1 text-secondary"></i>
      <h4 class="mt-3 fw-semibold">No products yet</h4>
      <p class="text-secondary">Create your first product to get started.</p>
      <RouterLink to="/products/new" class="btn btn-primary mt-2">
        <i class="bi bi-plus-lg me-1"></i>Create Product
      </RouterLink>
    </div>

    <!-- Products grid -->
    <div v-else class="row g-3">
      <div
        v-for="product in products"
        :key="product._id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <ProductCard
          :product="product"
          :deleting="deletingId === product._id"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '../stores/productsStore'
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import AlertMessage from '../components/AlertMessage.vue'

const store = useProductsStore()

// storeToRefs preserves reactivity when destructuring from a Pinia store
const { products, loading, error } = storeToRefs(store)

const deletingId = ref(null)

onMounted(() => store.fetchProducts())

async function handleDelete(id) {
  if (!confirm('Are you sure you want to delete this product?')) return

  deletingId.value = id
  try {
    await store.deleteProduct(id)
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to delete product.'
  } finally {
    deletingId.value = null
  }
}
</script>
