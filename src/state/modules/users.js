import { apiService } from '@/common/api.service'

export const state = {
  authenticated: false,
  userPermissions: [],
}

export const mutations = {
  'SET_AUTHENTICATED' (state, is_authenticated) {
    state.authenticated = is_authenticated
  },
  'SET_PERMISSIONS' (state, permissions) {
    state.userPermissions = permissions
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchUserAuthenticated')
    dispatch('fetchUserPermissions')
  },
  fetchUserAuthenticated: ({ commit }) => {
    apiService('user/auth/')
      .then(res => {
        commit('SET_AUTHENTICATED', res.is_authenticated)
        console.log('fetched auth')
      })
  },  
  fetchUserPermissions: ({ commit }) => {
    apiService('user/permissions/')
      .then(userPermissions => {
        commit('SET_PERMISSIONS', JSON.stringify(userPermissions))
      })
      .catch(() => {
        commit('SET_PERMISSIONS', null)
      })
  },
}

export const getters = {
  getAuthenticated: (state) => {
    return state.authenticated
  },
}
