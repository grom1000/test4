import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import './assets/css/index.css'
import './assets/fonts/font.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
