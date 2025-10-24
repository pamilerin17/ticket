<template>
  <div class="container-layout px-6 py-10">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold">Tickets</h2>
      <div>
        <button @click="openCreate" class="px-4 py-2 bg-green-600 text-white rounded">New Ticket</button>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white p-4 rounded shadow flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between gap-3">
            <h3 class="font-semibold">{{ ticket.title }}</h3>
            <span class="text-xs px-2 py-1 rounded" :class="statusClass(ticket.status)">{{ ticket.status }}</span>
          </div>
          <p class="mt-2 text-sm text-gray-600" v-if="ticket.description">{{ ticket.description }}</p>
        </div>

        <div class="mt-4 flex gap-2">
          <button @click="editTicket(ticket)" class="px-3 py-1 border rounded text-sm">Edit</button>
          <button @click="confirmDelete(ticket)" class="px-3 py-1 border rounded text-sm">Delete</button>
        </div>
      </div>
    </div>

    <!-- Ticket form modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-40 p-4">
      <div class="bg-white rounded-lg max-w-xl w-full p-6">
        <ticket-form :initial="editing" @saved="onSaved" @cancel="closeForm"></ticket-form>
      </div>
    </div>

    <!-- Confirmation modal -->
    <div v-if="confirm.visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <p class="text-gray-700">{{ confirm.message }}</p>
        <div class="mt-4 flex justify-end gap-3">
          <button @click="confirm.visible=false" class="px-4 py-2 border rounded">Cancel</button>
          <button @click="doDelete" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from './store.js'
import TicketForm from './TicketForm.vue'
export default {
  components: { TicketForm },
  data() {
    return {
      showForm: false,
      editing: null,
      confirm: { visible: false, id: null, message: '' }
    }
  },
  computed: {
    tickets() {
      return store.STATE.tickets
    }
  },
  methods: {
    openCreate() {
      this.editing = null
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
    },
    editTicket(t) {
      this.editing = { ...t }
      this.showForm = true
    },
    onSaved() {
      this.showForm = false
    },
    confirmDelete(t) {
      this.confirm = { visible: true, id: t.id, message: `Delete "${t.title}"? This cannot be undone.` }
    },
    doDelete() {
      const ok = store.deleteTicket(this.confirm.id)
      if (ok) store.pushToast('Ticket deleted.', 'success')
      else store.pushToast('Failed to delete ticket.', 'error')
      this.confirm.visible = false
    },
    statusClass(s) {
      if (s === 'open') return 'bg-green-50 text-ticketopen'
      if (s === 'in_progress') return 'bg-amber-50 text-ticketinprogress'
      return 'bg-gray-100 text-ticketclosed'
    }
  }
}
</script>
