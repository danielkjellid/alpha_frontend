<template>
  <div>
    <div v-for="(note, index) in notes" :key="index" class="relative flex items-start justify-between my-6">
      <div class="flex items-start">
        <div :style="`background-color: ${note.profile.avatar_color}`" class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white rounded-full">{{ note.profile.initial }}</div>
        <div>
          <div class="flex items-center">
            <p class="mr-2 text-sm font-medium text-gray-900">{{ note.profile.full_name }}</p>
            <span class="text-sm text-gray-400">{{ note.updated_at }}</span>
          </div>
          <p class="mt-2 text-sm text-gray-800">
            {{ note.note }}
          </p>
        </div>
      </div>
      <div>
        <button @click="displayActions(note.id)" class="hover:text-gray-900 flex justify-end w-full text-gray-800">
          <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
        <div v-show="clickedItemId == note.id" class="absolute right-0 z-20 w-24 mr-8 -mt-5">
          <div class="py-2 bg-white rounded-md shadow">
            <button @click="edit(note.id)" class="hover:bg-gray-200 block w-full px-4 py-2 text-sm text-left text-gray-800 appearance-none">Rediger</button>
            <button @click="deleteNote(note.id)" class="hover:bg-gray-200 block w-full px-4 py-2 text-sm text-left text-red-600 appearance-none">Slett</button>
          </div>
        </div>
      </div>
    </div>
    <!-- close actions menu, if a menu is open when clicking outside menu -->
    <div v-if="clickedItemId != null" @click="closeActions" class="absolute inset-0 z-10 bg-transparent"></div>
    <div v-if="currentUser && currentUser != undefined" class="flex items-center">
      <div :style="`background-color: ${currentUser.avatar_color}`" class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white rounded-full">{{ currentUser.initial }}</div>
      <BaseInput 
        v-model="note" 
        label="Add note" 
        hiddenLabel 
        block 
        placeholder="Legg til et notat" 
        class="mr-2" 
      />
      <BaseButton v-if="!editing" @click="addNote" light>Legg til</BaseButton>
      <BaseButton v-else @click="editNote" light>Oppdater notat</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminNotes',
  props: {
    notes: {
      type: [Array, Object],
      required: true
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters['auth/getCurrentUser']
    }
  },
  data() {
    return {
      clickedItemId: null,
      editItemId: null,
      note: '',
      editing: false,
    }
  },
  methods: {
    displayActions(id) {
      this.clickedItemId = id
    },
    closeActions() {
      this.clickedItemId = null
    },
    edit(id) {
      const note = this.notes.find(note => note.id == id)

      this.editItemId = note.id
      this.clickedItemId = null
      this.editing = true

      if (note != undefined) {
        this.note = note.note
      }
    },
    addNote() {
      this.$emit('add-note', this.note)
      this.note = ''
    },
    editNote() {
      if (this.editItemId != null) {
        this.$emit('edit-note', {id: this.editItemId, note: this.note})
        this.editing = false
        this.note = ''
      }
    },
    deleteNote(id) {
      this.$emit('delete-note', id)
    }
  }
}
</script>