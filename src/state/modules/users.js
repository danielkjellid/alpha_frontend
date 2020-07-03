import axios from 'axios'

export const state = {
  requestUser: [],
  usersList: [],
}

export const mutations = {
  'FETCH_REQUEST_USER' (state, user) {
    state.requestUser = user
  },
  'FETCH_USERS' (state, users) {
    state.usersList = users
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchUser')
  },
  fetchUser: ({ commit }) => {
    axios.get('user/').then(result => {
      commit('FETCH_REQUEST_USER', result.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  fetchUsers: ({ commit }) => {
    axios.get('users/').then(result => {
      commit('FETCH_USERS', result.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  }
}

export const getters = {}

