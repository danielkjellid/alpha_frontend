import { apiService } from '@/common/api.service'

export const state = {
  usersList: [],
}

export const mutations = {
  'FETCH_USERS' (state, users) {
    state.usersList = users
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchUserPermissions')
  },
  fetchUserPermissions() {
    apiService('user/permissions/')
      .then(userPermissions => {
        localStorage.setItem('userPermissions', JSON.stringify(userPermissions))
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
