import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modalVisible: false,
    userModalVisible: false,
    city_id: null,
    resp: ""
  },
  getters: {
    modalVisible(state) {
      return state.modalVisible
    },
    userModalVisible(state) {
      return state.userModalVisible
    },
    getCityId(state) {
      return state.city_id
    },
    getUserResp(state) {
      return state.resp
    }
  },
  mutations: {
    showModal(state, payload) {
      state.city_id = payload
      state.modalVisible = true
    },
    closeModal(state) {
      state.modalVisible = false
    },
    closeUserModal(state) {
      state.userModalVisible = false
    },
    setUser(state, payload) {
      state.resp = payload
      state.userModalVisible = true
    }
  },
  actions: {
    async fetchUser(ctx, user) {
      try {
        const data = await axios.post(
          'http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
          {
            name: user.name,
            phone: user.phone,
            email: user.email,
            city_id: user.city_id
          },
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
        )
        ctx.commit('setUser', data.data)
      }
      catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
