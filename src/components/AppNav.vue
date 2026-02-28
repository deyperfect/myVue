<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/dashboard">
        <i class="bi bi-box-seam me-2"></i>ProductManager
      </RouterLink>

      <div class="d-flex align-items-center gap-3">
        <span class="text-secondary small d-none d-md-inline">
          <i class="bi bi-person-circle me-1"></i>{{ user?.name }}
        </span>
        <RouterLink to="/products/new" class="btn btn-sm btn-primary">
          <i class="bi bi-plus-lg me-1"></i>New Product
        </RouterLink>
        <button class="btn btn-sm btn-outline-secondary" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i>Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'

const { logout, user } = useAuth()
</script>
