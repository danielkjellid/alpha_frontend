import axios from 'axios'

export const state = {
  usersList: [],
}

export const mutations = {
  'FETCH_USERS' (state, users) {
    state.usersList = users
  }
}

export const actions = {
  fetchUsers: ({ commit }) => {
    axios.get('users/').then(result => {
      commit('FETCH_USERS', result.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  }
}

export const getters = {

}

