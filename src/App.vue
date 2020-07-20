<template>
  <div id="app">
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">NavBar</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item to="/about">關於我們</b-nav-item>
          <b-nav-item to="/newbook">新書快報</b-nav-item>
          <b-nav-item to="/book">書籍分類</b-nav-item>
        </b-navbar-nav>

      <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em><font-awesome-icon class="text-g" :icon="['fas', 'user']"></font-awesome-icon></em>
          </template>
          <b-dropdown-item to="/login">登入</b-dropdown-item>
          <b-dropdown-item href="#">登出</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="搜尋書籍" v-if="toggle"></b-form-input>
          <b-nav-item size="sm" class="my-2 my-sm-0" type="submit"><font-awesome-icon class="text-g" :icon="['fas', 'search']" @click='search'></font-awesome-icon></b-nav-item>
        </b-nav-form>
        <b-nav-item><router-link to="/buy"><font-awesome-icon class="text-g" :icon="['fas', 'shopping-cart']"></font-awesome-icon></router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  <vue-page-transition>
    <router-view/>
  </vue-page-transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      toggle: false
    }
  },
  methods: {
    search () {
      this.toggle = !this.toggle
    }
  }
}
</script>
