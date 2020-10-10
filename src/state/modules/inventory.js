import apiService from '@/common/api'

export const state = {
  navbarCategories: null
}

export const mutations = {
  'SET_NAVBAR_CATEGORIES' (state, categories) {
    state.navbarCategories = categories
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchNavbarCategories')
  },
  fetchNavbarCategories: ({ commit }) => {

    apiService.get('categories/navigation/')
      .then(categories => {
        commit('SET_NAVBAR_CATEGORIES', categories.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
}

export const getters = {
  getNavbarCategories: (state) => {
    if (state.navbarCategories) return state.navbarCategories

    return null
  },
}