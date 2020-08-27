import { apiService } from '@/common/api.service'

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
    return new Promise((resolve, reject) => {
      apiService('categories/navigation/')
      .then(categories => {
        commit('SET_NAVBAR_CATEGORIES', categories)
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
}

export const getters = {
  getNavbarCategories: (state) => {
    if (state.navbarCategories) return state.navbarCategories

    return null
  },
}