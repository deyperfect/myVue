import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api/auth'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  // State — rehydrate from localStorage so a page refresh keeps the session alive
  const token = ref(localStorage.getItem('token') || null)
  const user  = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  async function register(name, email, password) {
    const { data } = await authApi.register({ name, email, password })
    _persistSession(data.data)
  }

  async function login(email, password) {
    const { data } = await authApi.login({ email, password })
    _persistSession(data.data)
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  // Private helper — saves session to state + localStorage
  function _persistSession(payload) {
    token.value = payload.token
    user.value  = { _id: payload._id, name: payload.name, email: payload.email }
    localStorage.setItem('token', payload.token)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  return { token, user, isAuthenticated, register, login, logout }
})
