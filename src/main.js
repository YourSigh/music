import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import store from './store/store'
import './components/index'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
