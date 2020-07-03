import allModules from '@/state/modules'
import store from '@/state/store'

export default function dispatchActionForAllModules(actionName, { modules = allModules, modulePrefix = '', flags = {} } = {}) {
  // for every module

  for (const moduleName in modules) {
    const moduleDefinition = modules[moduleName]

    // if the action is defined on the module
    if (moduleDefinition.actions && moduleDefinition.actions[actionName]) {
      // dispatch the action if the module is namespaced, if not
      // set a flag to dispatch action globally at the end
      if (moduleDefinition.namespaced) {
        store.dispatch(`${modulePrefix}${moduleName}/${actionName}`)
      } else {
        flags.dispatchGlobal = true
      }
    }

    // if there are nested submodules
    if (moduleDefinition.modules) {
      // also dispatch action for these sub-modules
      dispatchActionForAllModules(actionName, {
        modules: moduleDefinition.modules,
        modulePrefix: modulePrefix + moduleName + '/',
        flags,
      })
    }
  }

  // if this is at the root ant at least one non-namespaced module
  // was found with the action
  if (!modulePrefix && flags.dispatchGlobal) {
    // dispatch action globally
    store.dispatch(actionName)
  }
}