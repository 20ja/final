import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import INBOOK from '../components/inBook.vue'

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
    // inbook:id
    path: '/inbook',
    name: 'inBook',
    component: INBOOK,
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
      login: false,
      title: '購物車'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      login: false,
      title: '註冊'
    }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Upload.vue'),
    meta: {
      login: true,
      title: '上架'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
    meta: {
      login: true,
      title: '訂單資訊'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
