<template>
  <div>
    <h3 class="text-lg font-semibold mb-2">{{ initial ? 'Edit Ticket' : 'New Ticket' }}</h3>

    <form @submit.prevent="submit" novalidate>
      <label class="block">
        <span class="text-sm">Title</span>
        <input v-model="form.title" class="mt-1 block w-full border rounded px-3 py-2" aria-required="true" />
      </label>
      <p v-if="errors.title" class="text-xs text-red-600 mt-1">{{ errors.title }}</p>

      <label class="block mt-3">
        <span class="text-sm">Description (optional)</span>
        <textarea v-model="form.description" rows="3" class="mt-1 block w-full border rounded px-3 py-2"></textarea>
      </label>
      <p v-if="errors.description" class="text-xs text-red-600 mt-1">{{ errors.description }}</p>

      <label class="block mt-3">
        <span class="text-sm">Status</span>
        <select v-model="form.status" class="mt-1 block w-full border rounded px-3 py-2" aria-required="true">
          <option disabled value="">Select status</option>
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
      </label>
      <p v-if="errors.status" class="text-xs text-red-600 mt-1">{{ errors.status }}</p>

      <div class="mt-4 flex gap-3">
        <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">{{ initial ? 'Save' : 'Create' }}</button>
        <button type="button" @click="$emit('cancel')" class="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from './store.js'
import { reactive, toRefs } from 'vue'

export default {
  props: { initial: { type: Object, default: null } },
  emits: ['saved', 'cancel'],
  setup(props, { emit }) {
    const form = reactive({
      id: props.initial ? props.initial.id : null,
      title: props.initial ? props.initial.title : '',
      description: props.initial ? props.initial.description : '',
      status: props.initial ? props.initial.status : ''
    })
    const errors = reactive({})

    function validate() {
      errors.title = ''
      errors.status = ''
      errors.description = ''

      if (!form.title || !form.title.trim()) errors.title = 'Title is required.'
      if (!form.status || !['open', 'in_progress', 'closed'].includes(form.status)) errors.status = 'Status must be open, in_progress or closed.'
      if (form.description && form.description.length > 500) errors.description = 'Description too long (max 500).'
      return !errors.title && !errors.status
    }

    function submit() {
      if (!validate()) return
      const payload = {
        id: form.id,
        title: form.title.trim(),
        description: form.description ? form.description.trim() : '',
        status: form.status
      }
      if (form.id) {
        const ok = store.updateTicket(payload)
        if (ok) store.pushToast('Ticket updated.', 'success')
        else store.pushToast('Failed to update ticket.', 'error')
      } else {
        store.createTicket(payload)
        store.pushToast('Ticket created.', 'success')
      }
      emit('saved')
    }

    return { form, errors, submit, ...toRefs(form) }
  }
}
</script>
