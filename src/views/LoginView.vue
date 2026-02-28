<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-sm border-0 w-100" style="max-width: 420px;">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <i class="bi bi-box-seam fs-1 text-primary"></i>
          <h2 class="fw-bold mt-2 mb-1">Welcome back</h2>
          <p class="text-secondary small">Sign in to your account</p>
        </div>

        <AlertMessage :message="error" />

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label fw-medium">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="you@example.com"
              required
              autofocus
            />
          </div>

          <div class="mb-4">
            <label class="form-label fw-medium">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-secondary small mt-4 mb-0">
          Don't have an account?
          <RouterLink to="/register" class="text-primary text-decoration-none fw-medium">
            Register
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuth } from '../composables/useAuth'
import AlertMessage from '../components/AlertMessage.vue'

const { login, loading, error } = useAuth()

const form = reactive({ email: '', password: '' })

async function handleLogin() {
  await login(form.email, form.password)
}
</script>
