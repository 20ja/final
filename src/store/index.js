import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    account: '',
    bookDetail: { },
    userID: ''
  },
  mutations: {
    login (state, data) {
      state.account = data.account
      state.userID = data._id
    },
    logout (state) {
      state.account = ''
    },
    showDetail (state, data) {
      state.bookDetail = data
    }
  },
  getters: {
    getAccount (state) {
      return state.account
    },
    getBookDetail (state) {
      return state.bookDetail
    },
    getUserID (state) {
      return state.userID
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
