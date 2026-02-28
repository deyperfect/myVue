import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import LoginView     from '../views/LoginView.vue'
import RegisterView  from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductForm   from '../views/ProductForm.vue'

const routes = [
  { path: '/',          redirect: '/dashboard' },
  { path: '/login',     component: LoginView },
  { path: '/register',  component: RegisterView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/new',
    component: ProductForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id/edit',
    component: ProductForm,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard — runs before every route change
// Pinia store must be accessed inside the guard (not at module level) to ensure it's initialized
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { path: '/login' }
  }

  // Redirect already logged-in users away from login/register pages
  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    return { path: '/dashboard' }
  }
})

export default router
