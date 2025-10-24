<template>
  <div aria-live="polite" class="fixed right-4 top-4 z-50 flex flex-col gap-2">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="min-w-[220px] px-4 py-2 rounded shadow-lg bg-white border flex items-center gap-3"
      :class="{
        'border-green-200': t.type==='success',
        'border-red-200': t.type==='error',
        'border-blue-200': t.type==='info'
      }"
      role="status"
    >
      <span class="text-sm truncate">{{ t.message }}</span>
      <button @click="dismiss(t.id)" aria-label="Dismiss toast" class="ml-auto text-xs opacity-60">✕</button>
    </div>
  </div>
</template>

<script>
import store from './store.js'
import { computed } from 'vue'
export default {
  setup() {
    const toasts = computed(() => store.STATE.toasts)
    function dismiss(id) {
      store.STATE.toasts = store.STATE.toasts.filter((t) => t.id !== id)
    }
    return { toasts, dismiss }
  }
}
</script>
