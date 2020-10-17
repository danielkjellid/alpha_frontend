export default {
  methods: {
    $errorMsg(message) {
      // return message in string format with capital first letter
      if (message !== undefined) return message.toString().charAt(0).toUpperCase() + message.toString().slice(1)
    }
  }
}