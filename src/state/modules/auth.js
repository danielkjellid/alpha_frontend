import apiService from '@/common/api'

export const state = {
  authError: false,
  currentUser: null
}

export const mutations = {
  'OBTAIN_TOKEN_ERROR' (state) {
    state.authError = true
  },
  'UPDATE_ACCESS_TOKEN' (state, newToken) {
    state.authError = false
    localStorage.setItem('access_token', newToken)
  },
  'UPDATE_REFRESH_TOKEN' (state, newToken) {
    state.authError = false
    localStorage.setItem('refresh_token', newToken)
  },
  'REMOVE_TOKENS' () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
  'SET_CURRENT_USER' (state, user) {
    state.currentUser = user
  }
}

export const actions = {
  init: () => {
    //dispatch('fetchCurrentUser')
    //dispatch('obtainToken')
  },
  obtainToken: ({ commit }, payload) => {
    apiService.post('auth/token/obtain/', payload)
      .then(response => {
        console.log(response)
        commit('UPDATE_ACCESS_TOKEN', response.data.access)
        commit('UPDATE_REFRESH_TOKEN', response.data.refresh)
      })
      .finally(() => {
        // populate the current user state in the users module once a token is obtained
        apiService.get('user/')
          .then(user => {
            console.log(user.data)
            commit('SET_CURRENT_USER', user.data)
          })
      })
      .catch(error => {
        console.log(error)
        commit('OBTAIN_TOKEN_ERROR')
      })
  },
  logOut: ({ commit }) => {
    
    const refreshToken = localStorage.getItem('refresh_token')

    apiService.post('auth/token/blacklist/', {'refresh_token': refreshToken})
      .then(() => {
        commit('REMOVE_TOKENS')
        apiService.defaults.headers['Authorization'] = null
        commit('SET_CURRENT_USER', null)
      })
      .catch(error => {
        console.log(error)
      })
  },
  // fetchCurrentUser({commit}, payload) {
  //   apiService.get('user/')
  //     .then(user => {

  //       if (payload === null) {
  //         commit('SET_CURRENT_USER', null)
  //       }
  //       commit('SET_CURRENT_USER', user.data)
  //     })
  //     .catch(() => {
  //       commit('SET_CURRENT_USER', null)
  //     })
  // }
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
