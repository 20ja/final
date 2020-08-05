<template>
  <div id="app">
    <header></header>
    <div>
      <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
        <b-navbar-brand to="/"><img src="../public/img/logo橫.png" height="40px" alt="LOGO"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto navline">
            <b-navbar-nav>
              <b-nav-item to="/about">關於我們</b-nav-item>
              <b-nav-item to="/newbook">新書排行</b-nav-item>
              <b-nav-item to="/book">書籍分類</b-nav-item>
            </b-navbar-nav>

          <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em><font-awesome-icon class="text-g" :icon="['fas', 'user']"></font-awesome-icon></em>
              </template>
              <!-- <b-dropdown-item to="/reg">註冊</b-dropdown-item> -->
              <b-dropdown-item v-if="getAccount.length === 0" to="/reg">註冊</b-dropdown-item>
              <b-dropdown-item v-if="getAccount.length === 0" ><b-button id="r-bt" v-b-modal.modal-1>登入</b-button></b-dropdown-item>
              <b-dropdown-item v-else @click="logout" >登出</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="搜尋書籍" v-if="toggle" v-model="searchvalue" @keydown.enter="search"></b-form-input>
              <b-nav-item size="sm" class="my-2 my-sm-0" type="submit"><font-awesome-icon class="text-g" :icon="['fas', 'search']" @click='toggle = !toggle'></font-awesome-icon></b-nav-item>
            </b-nav-form>
            <b-nav-item @click="tobuy"><font-awesome-icon class="text-g" :icon="['fas', 'shopping-cart']"></font-awesome-icon></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-modal id="modal-1" hide-footer>
      <div hide-footer class="h-100 d-flex justify-content-center align-items-center">
        <b-container class="d-flex justify-content-center align-items-center">
            <b-row>
                <b-col class="justify-content-center align-items-center d-flex" cols="12">
                    <div>
                        <h1 class="text-center">登入</h1>
                        <b-form @submit="submit">
                            <b-form-group label="帳號" label-for="input-account" description="帳號長度為 6 - 20 個字" invalid-feedback="帳號格式不符" :state="state('account')">
                                <b-form-input id="input-account" type="text" v-model="account" :state="state('account')"></b-form-input>
                            </b-form-group>
                            <b-form-group label="密碼" label-for="input-password" description="密碼長度為 6 - 20 個字" invalid-feedback="密碼格式不符" :state="state('password')">
                                <b-form-input id="input-password" type="password" v-model="password" :state="state('password')"></b-form-input>
                            </b-form-group>
                            <b-button type="submit" @click="$bvModal.hide('modal-1')">登入</b-button>
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </b-container>
      </div>
    </b-modal>
    <vue-page-transition id="webcontent">
      <router-view></router-view>
    </vue-page-transition>
    <footer>
      <div class="container-fluid bg-light text-dark pt-2">
        <div class="row">
          <div class="col-6 col-md-3 d-flex justify-content-center">
            <img src="../../front/public/img/logo.png" class="rounded-circle">
          </div>
          <div class="col-6 col-md-3">
            <b>Address</b>
            <div>公司地址:台北市復興北路15號14樓之4 (1417室) 芝麻大廈</div>
          </div>
          <!-- d-flex flex-column 才不會讓電話到下一行 -->
          <div class="col-6 col-md-3 d-flex flex-column">
            <b>Contacts</b>
            <div>Phone：2777-3020</div>
            <div>E-mail: service@sungoodbooks.com</div>
          </div>
            <div class="col-6 col-md-3">
            <b>FB</b>
            <b-nav-item href="https://www.facebook.com/sungoodbookstore/" target="_blank"><font-awesome-icon class="text-g" size="2x" :icon="['fab', 'facebook']"></font-awesome-icon></b-nav-item>
          </div>
        </div>
        <div class="text-center pt-3 ">&copy; Copyright 2020 網頁前端班專題</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      toggle: false,
      // reg------------
      account: '',
      password: '',
      searchvalue: ''
    }
  },
  methods: {
    tobuy () {
      if (this.getAccount.length === 0) {
        alert('請先登入')
        this.$bvModal.show('modal-1')
      } else if (this.$route.path !== '/buy') {
        this.$router.push('/buy')
      }
    },
    // reg--------------
    state (type) {
      if (type === 'account') {
        if (this.account.length < 6 || this.account.length > 20) {
          return null
        } else {
          return true
        }
      } else if (type === 'password') {
        if (this.password.length < 6 || this.password.length > 20) {
          return null
        } else {
          return true
        }
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.account.length < 6 || this.account.length > 20) {
        alert('帳號格式不符')
      } else if (this.password.length < 6 || this.password.length > 20) {
        alert('密碼格式不符')
      }

      this.axios.post(
        process.env.VUE_APP_APIURL + '/login',
        { account: this.account, password: this.password }
      )
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            alert('登入成功')
            // 呼叫 vuex 的登入
            this.$store.commit('login', data.result[0])
            // 如果現在不是在，跳到登出後的頁
            if (this.$route.path !== '/book') {
              // 跳到登入後的頁面
              this.$router.push('/book')
            }
          } else {
            // 不是就顯示回來的 message
            alert(data.message)
          }
        })
        .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    },
    logout () {
      this.axios.delete(process.env.VUE_APP_APIURL + '/logout')
        .then(response => {
          const data = response.data
          if (data.success) {
            // 如果回來的資料 success 是 true
            alert('登出成功')
            // 呼叫 vuex 的登入
            this.$store.commit('logout')
            // 如果現在不是在首頁，跳到登出後的首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            // 不是就顯示回來的 message
            alert(data.message)
          }
        }).catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
          alert(error.response.data.message)
        })
    },
    search (e) {
      e.preventDefault()
      this.axios.get(process.env.VUE_APP_APIURL + '/search/' + this.searchvalue)
        .then(response => {
          const data = response.data.result[0]
          data.name = process.env.VUE_APP_APIURL + '/upload/' + data.name
          for (let i = 0; i < data.preview.length; i++) {
            data.preview[i] = process.env.VUE_APP_APIURL + '/upload/' + data.preview[i]
          }
          this.$store.commit('showDetail', data)
          this.$router.push('/inbook')
          this.toggle = false
        })
    }
  },
  computed: {
    getAccount () {
      return this.$store.getters.getAccount
    }
  }
}
</script>
