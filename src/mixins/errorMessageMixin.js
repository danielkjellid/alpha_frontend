export default {
  methods: {
    $errorMsg(message) {
      if (message !== undefined) return message.toString()
    }
  }
}