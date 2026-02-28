<template>
  <div>
    <AppNav v-if="isAuthenticated" />
    <main :class="isAuthenticated ? 'pt-5 mt-3' : ''">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/authStore'
import AppNav from './components/AppNav.vue'

const authStore     = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>
