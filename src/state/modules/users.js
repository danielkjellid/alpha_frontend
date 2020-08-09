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
    apiService('user/')
      .then(user => {
        commit('SET_CURRENT_USER', user)
      })
      .catch(() => {
        commit('SET_CURRENT_USER', null)
      })
  },
}

export const getters = {
  getAuthenticated: (state) => {
    return state.currentUser.is_authenticated
  },
}
