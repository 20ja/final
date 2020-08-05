import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { BootstrapVue, BootstrapVueIcons, ListGroupPlugin } from 'bootstrap-vue'
// import { VueReCaptcha } from 'vue-recaptcha-v3'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VuePageTransition from 'vue-page-transition'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import GoogleLogin from 'vue-google-login'
import 'animate.min.css'

import './styles/style.scss'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faUser, faSearch, faShoppingCart, faFacebook)
library.add(faFacebook)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VuePageTransition, GoogleLogin)
Vue.use(ListGroupPlugin)

Vue.use(VueAwesomeSwiper)
Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
