export default {
  methods: {
    $catchError(error) {
      // if the error message is general, e.g. not related to a specific field
      // return the general message
      if (error.response.data.detail) return [error.response.data.detail]

      // is the error is related to a field, 
      // return entire response data object
      return error.response.data
    }
  }
}