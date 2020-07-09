<template>
  <div>
    <AdminEdit
      title='User fullname'
      subtitle="user@example.com"
      :breadcrumbs="breadcrumbs"
    >
      <template #page-actions>
        <BaseButton>Main action</BaseButton>
      </template>
      <template #edit-content>
        <FormGroup :groups="formGroups" @save-changes="saveChanges">
          <template #contactinfo>
            <BaseInput label="Test" block></BaseInput>
          </template>
          <template #notifications>
            <p>Test 2</p>
          </template>
        </FormGroup>
      </template>
    </AdminEdit>
  </div>
</template>

<script>
import AdminEdit from '@/views/templates/admin-edit'
import FormGroup from '@/components/form-group'

export default {
  name: 'UserEdit',
  components: {
    AdminEdit,
    FormGroup
  },
  data() {
    return {
      breadcrumbs: [
        { text: 'Brukere', disabled: false, href: 'backend/users' }, 
        { text: 'Example user', disabled: true, href: 'backend/users' }
      ],
      formGroups: [
        { title: 'Kontaktinfo', text: 'Generel kontaktinformasjon', value: 'contactinfo' },
        { title: 'Varslinger', text: 'Hvordan ønsker du at vi skal holde kontakt med deg? Generelle preferanser og innstillinger for varsling.', value: 'notifications' }
      ]
    }
  },
  methods: {
    saveChanges() {
      console.log('test')
    }
  }
}
</script>