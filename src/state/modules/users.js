import { apiService } from '@/common/api.service'

export const state = {
  userPermissions: []
}

export const mutations = {
  'SET_PERMISSIONS' (state, permissions) {
    state.userPermissions = permissions
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchUserPermissions')
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

export const getters = {}
