<template>
  <div class="container py-4" style="max-width: 600px;">
    <!-- Back link -->
    <RouterLink to="/dashboard" class="text-decoration-none text-secondary small mb-4 d-inline-flex align-items-center gap-1">
      <i class="bi bi-arrow-left"></i> Back to Dashboard
    </RouterLink>

    <div class="card shadow-sm border-0 mt-3">
      <div class="card-body p-4">
        <h2 class="fw-bold mb-1">{{ isEditing ? 'Edit Product' : 'New Product' }}</h2>
        <p class="text-secondary small mb-4">
          {{ isEditing ? 'Update the details below.' : 'Fill in the details below.' }}
        </p>

        <!-- Loading skeleton while fetching product for edit -->
        <div v-if="fetchingProduct" class="text-center py-4">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <template v-else>
          <AlertMessage :message="error" />
          <AlertMessage :message="successMsg" type="success" />

          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label fw-medium">Product Name <span class="text-danger">*</span></label>
              <input
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="e.g. Wireless Headphones"
                required
                autofocus
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-medium">Description</label>
              <textarea
                v-model="form.description"
                class="form-control"
                rows="3"
                placeholder="Optional product description..."
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="form-label fw-medium">Price ($) <span class="text-danger">*</span></label>
              <input
                v-model.number="form.price"
                type="number"
                class="form-control"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary flex-fill" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                {{ loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Product' }}
              </button>
              <RouterLink to="/dashboard" class="btn btn-outline-secondary">
                Cancel
              </RouterLink>
            </div>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/productsStore'
import { productsApi } from '../api/products'
import AlertMessage from '../components/AlertMessage.vue'

const route  = useRoute()
const router = useRouter()
const store  = useProductsStore()

// If the route has an :id param, we're in edit mode
const isEditing     = computed(() => !!route.params.id)
const loading       = ref(false)
const fetchingProduct = ref(false)
const error         = ref(null)
const successMsg    = ref(null)

const form = reactive({ name: '', description: '', price: '' })

// When editing, fetch the product and pre-fill the form
onMounted(async () => {
  if (!isEditing.value) return

  fetchingProduct.value = true
  try {
    const { data } = await productsApi.getOne(route.params.id)
    const p = data.data
    form.name        = p.name
    form.description = p.description || ''
    form.price       = p.price
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to load product.'
  } finally {
    fetchingProduct.value = false
  }
})

async function handleSubmit() {
  loading.value    = true
  error.value      = null
  successMsg.value = null

  try {
    if (isEditing.value) {
      await store.updateProduct(route.params.id, form)
      successMsg.value = 'Product updated successfully!'
    } else {
      await store.createProduct(form)
      router.push('/dashboard')
    }
  } catch (err) {
    error.value = err?.response?.data?.message || 'Failed to save product.'
  } finally {
    loading.value = false
  }
}
</script>
