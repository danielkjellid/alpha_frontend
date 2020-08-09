export default {
  methods: {
    $perm(permission) {

      let currentUser = this.$store.state.users.currentUser

      if (currentUser) {
        if (
          currentUser.is_superuser 
          || currentUser.permissions.includes(permission) 
          || currentUser.group_permissions.includes(permission)
          ) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}