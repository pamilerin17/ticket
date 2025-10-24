<template>
  <header class="bg-white shadow-sm">
    <div class="container-layout px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold" aria-hidden>TA</div>
        <div>
          <h1 class="text-lg font-semibold">TicketApp</h1>
          <p class="text-xs text-gray-500">Simple ticket management</p>
        </div>
      </div>

      <nav class="flex items-center gap-4">
        <router-link to="/" class="hidden md:inline text-sm hover:underline">Home</router-link>
        <router-link v-if="!user" to="/auth/login" class="text-sm">Login</router-link>
        <router-link v-if="!user" to="/auth/signup" class="text-sm">Get started</router-link>

        <div v-if="user" class="flex items-center gap-3">
          <router-link to="/dashboard" class="text-sm">Dashboard</router-link>
          <router-link to="/tickets" class="text-sm">Tickets</router-link>
          <button @click="logout" class="text-sm px-3 py-1 bg-red-50 border border-red-200 rounded">Logout</button>
        </div>

        <button class="md:hidden" @click="mobile = !mobile" aria-label="toggle menu">
          ☰
        </button>
      </nav>
    </div>

    <div v-if="mobile" class="px-6 pb-4 md:hidden">
      <router-link to="/" class="block py-1">Home</router-link>
      <router-link v-if="!user" to="/auth/login" class="block py-1">Login</router-link>
      <router-link v-if="!user" to="/auth/signup" class="block py-1">Get started</router-link>
      <router-link v-if="user" to="/dashboard" class="block py-1">Dashboard</router-link>
      <router-link v-if="user" to="/tickets" class="block py-1">Tickets</router-link>
      <button v-if="user" @click="logout" class="block text-left py-1">Logout</button>
    </div>
  </header>
</template>

<script>
import store from './store.js'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const mobile = ref(false)
    const router = useRouter()
    const user = computed(() => store.STATE.user)
    function logout() {
      store.clearSession()
      store.pushToast('Logged out — returning to landing page.', 'info')
      router.push('/')
    }
    return { mobile, user, logout }
  }
}
</script>
