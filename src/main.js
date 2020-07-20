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
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import VuePageTransition from 'vue-page-transition'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import './styles/style.scss'
import './styles/font.css'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faUser, faSearch, faShoppingCart)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VuePageTransition)

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
