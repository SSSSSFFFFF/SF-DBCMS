import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'
import './plugins/element.js'
import md5 from 'md5'
import {Loading} from 'element-ui';
import TweenMax from "gsap/TweenMax";
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.md5 = md5
Vue.prototype.axios = axios
Vue.prototype.Loading = Loading
Vue.prototype.TweenMax = TweenMax
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
