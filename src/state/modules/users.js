import { apiService } from '@/common/api.service'

export const state = {
  currentUser: null
}

export const mutations = {
  'SET_CURRENT_USER' (state, user) {
    state.currentUser = user
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchCurrentUser')
  },
  fetchCurrentUser: ({ commit }) => {
    return new Promise((resolve, reject) => {
      apiService('user/')
      .then(user => {
        commit('SET_CURRENT_USER', user)
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
}

export const getters = {
  getCurrentUser: (state) => {
    if (state.currentUser) return state.currentUser

    return null
  },
  getIsAuthenticated: (state) => {
    if (state.currentUser) return state.currentUser.is_authenticated

    return false
  },
  getIsStaff: (state) => {
    if (state.currentUser) return state.currentUser.is_staff

    return false
  }
}
