import apiService from '@/common/api.js'

export const state = {
  currentUser: null,
}

export const mutations = {
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
  },
  'SET_USER_ACCOUNT_CONFIRMED' (state, verified) {
    state.currentUser.has_confirmed_email = verified
  }
}

export const actions = {
  init: ({dispatch}) => {
    dispatch('fetchCurrentUser')
  },
  obtainToken: ({ commit, dispatch }, payload) => {
    // get new token pair
    apiService.post('auth/token/obtain/', payload)
      .then(response => {
        // update localStorage with access and refresh key
        commit('UPDATE_ACCESS_TOKEN', response.data.access)
        commit('UPDATE_REFRESH_TOKEN', response.data.refresh)
      })
      .finally(() => {
        // populate the current user state in the users module once tokens is obtained
        dispatch('fetchCurrentUser')
      })
  },
  logOut: ({ commit }) => {

    // save the refresh token var
    const refreshToken = localStorage.getItem('refresh_token')

    // blacklist token
    apiService.post('auth/token/blacklist/', {'refresh_token': refreshToken})
      .then(() => {
        // remove token from localstorage
        commit('REMOVE_TOKENS')
        // set auth headers to null
        apiService.defaults.headers['Authorization'] = null
        // set current user to null
        commit('SET_CURRENT_USER', null)
      })
      .catch(error => {
        console.log(error)
      })
  },
  fetchCurrentUser: ({commit}) => {
    const refreshToken = localStorage.getItem('refresh_token')
    const accessToken = localStorage.getItem('access_token')

    if (refreshToken && accessToken) {
      // set auth header for request
      apiService.defaults.headers['Authorization'] = `JWT ${accessToken}`

      // populate the current user state in the users module once tokens is obtained
      return apiService.get('user/')
        .then(user => {
          if (user) {
            // set the state as the user data
            commit('SET_CURRENT_USER', user.data)
          }
        })
    }
  },
  resendVerificationEmail: ({commit, state}) => {
    apiService.post('users/verify/', {email: state.currentUser.email})
      .then(() => {
        commit('common/SET_NOTIFICATION', 'E-post sendt!', { root: true })
      })
      .catch(() => {
        commit('common/SET_ERROR_NOTIFICATION', 'Det har oppstått en feil. Prøv igjen senere.', { root: true })
      })
  },
  setUserAccountVerified: ({commit}, verified) => {
    commit('SET_USER_ACCOUNT_CONFIRMED', verified)
  }
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
  },
  getIsAccountVerified: (state) => {
    if (state.currentUser) {
      if (state.currentUser.has_confirmed_email) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
}
