import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'
import Dashboard from './components/Dashboard.vue'
import TicketManager from './components/TicketManager.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/auth/login', name: 'Login', component: LoginPage },
  { path: '/auth/signup', name: 'Signup', component: SignupPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: TicketManager, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('ticketapp_session')
  if (to.meta.requiresAuth && !session) {
    return next({ path: '/auth/login', query: { redirect: to.fullPath } })
  }
  if ((to.path === '/auth/login' || to.path === '/auth/signup') && session) {
    return next('/dashboard')
  }
  next()
})

export default router
