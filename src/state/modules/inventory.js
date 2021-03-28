import apiService from '@/common/api'

export const state = {
  navbarCategories: null,
  categories: [],
}

export const mutations = {
  'SET_NAVBAR_CATEGORIES' (state, categories) {
    state.navbarCategories = categories
  },
  'SET_CATEGORIES' (state, categories) {
    state.categories = categories
  }
}

export const actions = {
  init: ({ dispatch }) => {
    dispatch('fetchCategories')
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
  fetchCategories: ({ state, commit }) => {

    if (state.categories.length <= 0) {
      apiService.get('categories/')
        .then(categories => {
          commit('SET_CATEGORIES', categories.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

export const getters = {
  getNavbarCategories: (state) => {
    if (state.navbarCategories) return state.navbarCategories

    return null
  },
  getCategories: (state) => {
    if (state.categories) return state.categories
    
    return null
  }
}