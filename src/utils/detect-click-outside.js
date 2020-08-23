export default {
  bind: function(element, binding, vnode) {
    element.clickOutsideEvent = function(event) {
      // check if the click was outside the element and its children
      if (!(element == event.target || element.contains(event.target))) {
        // if it is, call method provided in attribute value
         vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', element.clickOutsideEvent)
  },
  unbind: function(element) {
    document.body.removeEventListener('click', element.clickOutsideEvent)
  }
}