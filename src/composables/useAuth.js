import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

/**
 * Reusable composable that wraps the auth store with local loading/error state.
 * Components import this instead of talking to the store directly.
 */
export function useAuth() {
  const authStore = useAuthStore()
  const router    = useRouter()
  const loading   = ref(false)
  const error     = ref(null)

  async function login(email, password) {
    loading.value = true
    error.value   = null
    try {
      await authStore.login(email, password)
      router.push('/dashboard')
    } catch (err) {
      error.value = err?.response?.data?.message || 'Login failed.'
    } finally {
      loading.value = false
    }
  }

  async function register(name, email, password) {
    loading.value = true
    error.value   = null
    try {
      await authStore.register(name, email, password)
      router.push('/dashboard')
    } catch (err) {
      error.value = err?.response?.data?.message || 'Registration failed.'
    } finally {
      loading.value = false
    }
  }

  function logout() {
    authStore.logout()
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
  }
}
