<template>
  <main class="min-h-screen">
    <section class="relative overflow-hidden bg-gradient-to-b from-white to-sky-50">
      <!-- decorative circles -->
      <div class="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-indigo-100 opacity-60"></div>
      <div class="absolute right-8 -top-6 w-28 h-28 rounded-full bg-sky-100 opacity-70"></div>

      <div class="container-layout px-6 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-4xl font-extrabold">TicketApp — Manage issues faster</h2>
            <p class="mt-4 text-gray-600">A lightweight ticketing UI built with Vue and Tailwind. Built for clarity — create, update and close tickets with instant validation and session-based auth.</p>
            <div class="mt-6 flex gap-3">
              <router-link to="/auth/login" class="px-4 py-2 rounded-md border bg-white hover:shadow">Login</router-link>
              <router-link to="/auth/signup" class="px-4 py-2 rounded-md bg-indigo-600 text-white">Get Started</router-link>
            </div>
          </div>

          <div aria-hidden class="relative">
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded bg-indigo-50 flex items-center justify-center">🎫</div>
                <div>
                  <div class="font-semibold">Ticket tracking</div>
                  <div class="text-sm text-gray-500">Create and manage tickets quickly.</div>
                </div>
              </div>
              <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="p-3 rounded bg-sky-50">Fast setup</div>
                <div class="p-3 rounded bg-rose-50">Accessible</div>
                <div class="p-3 rounded bg-green-50">Status tags</div>
                <div class="p-3 rounded bg-amber-50">Validation</div>
              </div>
            </div>

            <!-- overlapping decorative circle -->
            <div class="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-yellow-50 border border-yellow-100"></div>
          </div>
        </div>
      </div>

      <!-- wavy SVG -->
      <svg class="w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path fill="#f8fafc" d="M0,0 C360,120 1080,0 1440,120 L1440 0 L0 0 Z"></path>
      </svg>
    </section>

    <section class="container-layout px-6 py-12">
      <h3 class="text-2xl font-semibold mb-6">Features</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 rounded-lg bg-white shadow-sm">
          <h4 class="font-semibold">Authentication</h4>
          <p class="mt-2 text-sm text-gray-500">Session-based simulation using localStorage.</p>
        </div>
        <div class="p-6 rounded-lg bg-white shadow-sm">
          <h4 class="font-semibold">Ticket CRUD</h4>
          <p class="mt-2 text-sm text-gray-500">Create, edit, delete and search tickets with validation.</p>
        </div>
        <div class="p-6 rounded-lg bg-white shadow-sm">
          <h4 class="font-semibold">Accessible</h4>
          <p class="mt-2 text-sm text-gray-500">Semantic HTML, focus states, and color contrast.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default { name: 'LandingPage' }
</script>
