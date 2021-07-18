export default {
  bind: function(element, binding, vnode) {
    console.log('el', typeof element)
    console.log('bind', typeof binding)
    console.log('vnode', typeof vnode)
    element.clickOutsideEvent = function(event) {

      console.log('e', typeof event)
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