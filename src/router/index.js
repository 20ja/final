import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false,
      title: '首頁'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      login: false,
      title: '關於我們',
      transition: 'fade'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      login: false,
      title: '登入'
    }
  },
  {
    path: '/newbook',
    name: 'Newbook',
    component: () => import(/* webpackChunkName: "newbook" */ '../views/Newbook.vue'),
    meta: {
      login: false,
      title: '新書資訊',
      transition: 'fade-in-up'
    }
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue'),
    meta: {
      login: false,
      title: '書籍',
      transition: 'fade'
    }
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import(/* webpackChunkName: "buy" */ '../views/Buy.vue'),
    meta: {
      login: true,
      title: '購物車'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !StorageEvent.state.user) {
    next('/login')
  } else {
    next()
  }
})

export default router
