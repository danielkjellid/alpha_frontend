<template>
  <div />
</template>

<script>
import apiService from '@/common/api'

export default {
  name: 'AuthVerifyAccount',
  page() {
    return {
      title: 'Bekreft kontoen din',
      meta: [
        {
          name: 'description',
          content: 'Bekreft kontoen din'
        }
      ]
    }
  },
  methods : {
    verifyEmail() {
      // unique id and token required to verify email
      const uid = this.$route.params.uid
      const token = this.$route.params.token

      const payload = {
        uid: uid,
        token: token
      }

      return apiService.post(`users/verify/confirm/${uid}/${token}/`, payload)
        .then(() => {
          // confirm change success to user and redirect to login
          this.$store.dispatch('auth/setUserAccountVerified', true)
          this.$store.dispatch('common/setNotification', 'Konto bekreftet')
          this.$router.push({name: 'Home'})
        })
        .catch(error => {
          // set errors for fields and notify user
          this.errors = this.$catchError(error)
          console.log(error.response.data.detail)
          this.$store.dispatch('common/setErrorNotification', this.$catchError(error))
          this.$router.push({name: 'Home'})
        })
    }
  },
  created() {
    this.verifyEmail()
  }
}
</script>