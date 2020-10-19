<template>
  <AuthTemplate>
    <template #auth-heading>
      <h1 class="text-xl font-medium text-gray-900">Instruksjoner sendt</h1>
      <div class="flex items-center justify-center mt-1 mb-6 text-sm text-gray-700">
        Vi har sendt deg instruksjoner på e-post om hvordan du setter et nytt passord. Den burde være hos deg ganske snart.
      </div>
      <hr>
      <p class="mt-6 text-sm text-gray-600">
        Får du ikke e-post fra oss? Undersøk søppelpost og reklame-mappen din og forsikre deg om ikke er registrert hos oss med en annen e-postadresse enn den du fylte inn i feltet. Er du i tvil om du skrev riktig? <router-link to="/konto/nullstill-passord/" class="ml-1 font-medium text-gray-900 underline">Gå tilbake</router-link>
      </p>
    </template>
  </AuthTemplate>
</template>

<script>
import AuthTemplate from '@/views/templates/auth.vue'

export default {
  name: 'ResetPasswordConfirm',
  page() {
    return {
      title: 'Nullstill passord',
      meta: [
        {
          name: 'description',
          content: 'Nullstill passordet ditt hos oss'
        }
      ]
    }
  },
  components: {
    AuthTemplate
  },
}
</script>