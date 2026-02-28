<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-sm border-0 w-100" style="max-width: 420px;">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <i class="bi bi-box-seam fs-1 text-primary"></i>
          <h2 class="fw-bold mt-2 mb-1">Create account</h2>
          <p class="text-secondary small">Start managing your products</p>
        </div>

        <AlertMessage :message="error" />

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label fw-medium">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              placeholder="Jane Doe"
              required
              autofocus
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-medium">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="mb-4">
            <label class="form-label fw-medium">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="Min. 6 characters"
              minlength="6"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-secondary small mt-4 mb-0">
          Already have an account?
          <RouterLink to="/login" class="text-primary text-decoration-none fw-medium">
            Sign in
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

const { register, loading, error } = useAuth()

const form = reactive({ name: '', email: '', password: '' })

async function handleRegister() {
  await register(form.name, form.email, form.password)
}
</script>
