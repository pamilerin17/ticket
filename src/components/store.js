import { reactive } from 'vue'

const STATE = reactive({
  user: null,
  toasts: [],
  tickets: []
})

const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'

function boot() {
  const s = localStorage.getItem(SESSION_KEY)
  if (s) {
    try { STATE.user = JSON.parse(s).user } catch(e) { STATE.user = null }
  }
  const t = localStorage.getItem(TICKETS_KEY)
  if (t) {
    try { STATE.tickets = JSON.parse(t) } catch(e) { STATE.tickets = [] }
  } else {
    STATE.tickets = [
      { id: 1, title: 'Sample: Login bug', description: 'Cannot login on mobile', status: 'open' },
      { id: 2, title: 'Export feature', description: 'Add CSV export', status: 'in_progress' },
      { id: 3, title: 'UI tweak', description: 'Spacing adjustments', status: 'closed' }
    ]
    persistTickets()
  }
}

function persistSession(payload) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload))
  STATE.user = payload.user
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  STATE.user = null
}
function persistTickets() {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(STATE.tickets))
}
function createTicket(ticket) {
  ticket.id = Date.now()
  STATE.tickets.unshift(ticket)
  persistTickets()
}
function updateTicket(updated) {
  const idx = STATE.tickets.findIndex((t) => t.id === updated.id)
  if (idx !== -1) {
    STATE.tickets.splice(idx, 1, updated)
    persistTickets()
    return true
  }
  return false
}
function deleteTicket(id) {
  const idx = STATE.tickets.findIndex((t) => t.id === id)
  if (idx !== -1) {
    STATE.tickets.splice(idx, 1)
    persistTickets()
    return true
  }
  return false
}
function pushToast(message, type='info', timeout=3500) {
  const id = Date.now() + Math.random()
  STATE.toasts.push({ id, message, type })
  setTimeout(() => {
    STATE.toasts = STATE.toasts.filter((t) => t.id !== id)
  }, timeout)
}

boot()

export default {
  STATE,
  SESSION_KEY,
  persistSession,
  clearSession,
  createTicket,
  updateTicket,
  deleteTicket,
  pushToast
}
