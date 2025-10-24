<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow bg-gray-50">
      <router-view />
    </main>
    <Footer />
    <Toast />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'

export default {
  components: { Header, Footer, Toast }
}
</script>
