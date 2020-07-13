export default {
  methods: {
    $perm(permission) {
      let userPermissions = JSON.parse(localStorage.getItem('userPermissions'))

      if (
        userPermissions.is_staff 
        || userPermissions.permissions.includes(permission) 
        || userPermissions.group_permissions.includes(permission)
        ) {
        return true
      } else {
        return false
      }
    }
  }
}