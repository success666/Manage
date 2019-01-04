import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  // plugins: [vuexLocal.plugin] 暂时不处理刷新保留数据
})

export default store
