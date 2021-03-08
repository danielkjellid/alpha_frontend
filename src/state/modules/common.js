export const state = {
  notification: null,
  errorNotification: null,
}

export const mutations = {
  'SET_NOTIFICATION' (state, message) {
    state.notification = message
  },
  'SET_ERROR_NOTIFICATION' (state, message) {
    state.errorNotification = message
  }
}

export const actions = {
  setNotification({commit}, message) {
    commit('SET_NOTIFICATION', message)
  },
  resetNotification({commit}) {
    commit('SET_NOTIFICATION', null)
  },
  setErrorNotification({commit}, message) {
    commit('SET_ERROR_NOTIFICATION', message)
  },
  resetErrorNotification({commit}) {
    commit('SET_ERROR_NOTIFICATION', null)
  }
}

export const getters = {
  getNotification: (state) => {
    return state.notification
  },
  getErrorNotification: (state) => {
    return state.errorNotification
  }
}