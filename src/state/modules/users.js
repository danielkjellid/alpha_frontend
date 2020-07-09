import { apiService } from '@/common/api.service'

export const state = {
  requestUserPermissions: [],
  usersList: [],
}

export const mutations = {
  'FETCH_USER_PERMISSIONS' (state, permissions) {
    state.requestUserPermissions = permissions
  },
  'FETCH_USERS' (state, users) {
    state.usersList = users
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchUserPermissions')
  },
  fetchUserPermissions: ({ commit }) => {
    apiService('user/permissions/')
      .then(userPermissions => {
        commit('FETCH_USER_PERMISSIONS', userPermissions)
      })
  },
  fetchUsers: ({ commit }) => {
    apiService('users/')
      .then(users => {
        commit('FETCH_USERS', users)
      })
  }
}

export const getters = {}
