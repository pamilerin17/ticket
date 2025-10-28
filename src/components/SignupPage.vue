<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center mb-6">Create Account</h2>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="Enter your full name"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Sign Up
        </button>
      </form>

      <p class="text-center text-gray-500 text-sm mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

function handleSignup() {
  const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
  const exists = users.find(u => u.email === email.value)

  if (exists) {
    alert('An account with this email already exists!')
    return
  }

  // Create and save user
  const newUser = { name: name.value, email: email.value, password: password.value }
  users.push(newUser)
  localStorage.setItem('ticketapp_users', JSON.stringify(users))

  // Auto-login: save session
  localStorage.setItem('ticketapp_session', JSON.stringify({ loggedIn: true, email: email.value }))

  alert('Account created successfully! Redirecting to your dashboard...')
  router.push('/dashboard') // ✅ Redirect to dashboard
}
</script>
