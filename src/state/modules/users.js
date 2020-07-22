import { apiService } from '@/common/api.service'

export const state = {}

export const mutations = {}

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
}

export const getters = {}
