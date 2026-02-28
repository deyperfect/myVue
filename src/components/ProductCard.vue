<template>
  <div class="card h-100 shadow-sm border-0">
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0 fw-semibold text-truncate">{{ product.name }}</h5>
        <span class="badge bg-success-subtle text-success fs-6 ms-2">
          ${{ product.price.toFixed(2) }}
        </span>
      </div>

      <p class="card-text text-secondary small flex-grow-1">
        {{ product.description || 'No description provided.' }}
      </p>

      <div class="d-flex gap-2 mt-3">
        <RouterLink
          :to="`/products/${product._id}/edit`"
          class="btn btn-sm btn-outline-primary flex-fill"
        >
          <i class="bi bi-pencil me-1"></i>Edit
        </RouterLink>
        <button
          class="btn btn-sm btn-outline-danger flex-fill"
          :disabled="deleting"
          @click="$emit('delete', product._id)"
        >
          <span v-if="deleting" class="spinner-border spinner-border-sm"></span>
          <template v-else><i class="bi bi-trash me-1"></i>Delete</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product:  { type: Object,  required: true },
  deleting: { type: Boolean, default: false },
})
defineEmits(['delete'])
</script>
