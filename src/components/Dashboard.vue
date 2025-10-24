<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          👋 Welcome, {{ user?.name || 'Guest' }}
        </h1>
        <button
          @click="logout"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div class="bg-white shadow-md p-6 rounded-2xl text-center">
          <p class="text-4xl font-bold text-blue-600">{{ totalTickets }}</p>
          <p class="text-gray-600 font-medium mt-1">Total Tickets</p>
        </div>

        <div class="bg-white shadow-md p-6 rounded-2xl text-center">
          <p class="text-4xl font-bold text-green-600">{{ openTickets }}</p>
          <p class="text-gray-600 font-medium mt-1">Open</p>
        </div>

        <div class="bg-white shadow-md p-6 rounded-2xl text-center">
          <p class="text-4xl font-bold text-yellow-500">{{ inProgressTickets }}</p>
          <p class="text-gray-600 font-medium mt-1">In Progress</p>
        </div>

        <div class="bg-white shadow-md p-6 rounded-2xl text-center sm:col-span-3 md:col-span-1">
          <p class="text-4xl font-bold text-gray-500">{{ closedTickets }}</p>
          <p class="text-gray-600 font-medium mt-1">Closed</p>
        </div>
      </div>

      <!-- Create Ticket Button -->
      <div class="flex justify-center">
        <router-link
          to="/tickets"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          ➕ Create or Manage Tickets
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref(null)
const totalTickets = ref(0)
const openTickets = ref(0)
const inProgressTickets = ref(0)
const closedTickets = ref(0)

onMounted(() => {
  // 🔐 Check session
  const session = localStorage.getItem('ticketapp_session')
  if (!session) {
    alert('Your session has expired — please log in again.')
    router.push('/login')
    return
  }

  user.value = JSON.parse(session)

  // 🎫 Load user's tickets
  const allTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
  const userTickets = allTickets.filter(t => t.userEmail === user.value.email)

  totalTickets.value = userTickets.length
  openTickets.value = userTickets.filter(t => t.status === 'open').length
  inProgressTickets.value = userTickets.filter(t => t.status === 'in_progress').length
  closedTickets.value = userTickets.filter(t => t.status === 'closed').length
})

function logout() {
  localStorage.removeItem('ticketapp_session')
  alert('You have been logged out.')
  router.push('/')
}
</script>

<style scoped>
/* Optional styling tweaks for layout balance */
</style>
