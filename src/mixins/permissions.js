export default {
  methods: {
    $perm(permission) {

      let userPermissions = JSON.parse(this.$store.state.users.userPermissions)

      if (userPermissions !== null) {
        if (
          userPermissions.is_superuser 
          || userPermissions.permissions.includes(permission) 
          || userPermissions.group_permissions.includes(permission)
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