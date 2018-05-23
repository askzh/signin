import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portrait: undefined,
    name: undefined,
    phone: undefined,
    tpl: undefined
  },
  mutations: {
    setPortrait (state, portrait) {
      state.portrait = portrait
    },
    setName (state, name) {
      state.name = name
    },
    setPhone (state, phone) {
      state.phone = phone
    },
    setTpl (state, tpl) {
      state.tpl = tpl
    }
  }
})
