<template>
  <div v-if="message" :class="`alert alert-${type} d-flex align-items-center gap-2`" role="alert">
    <i :class="iconClass"></i>
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: { type: String, default: null },
  type:    { type: String, default: 'danger' }, // danger | success | warning | info
})

const iconClass = computed(() => ({
  danger:  'bi bi-exclamation-triangle-fill',
  success: 'bi bi-check-circle-fill',
  warning: 'bi bi-exclamation-circle-fill',
  info:    'bi bi-info-circle-fill',
}[props.type] || 'bi bi-info-circle-fill'))
</script>
