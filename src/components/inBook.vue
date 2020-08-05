<template>
  <div id="booksin">
    <b-container class="mt-5">
      <b-row>
        <b-col md="5" lg="5" class="bg">
          <img :src="bookDetail.name" alt="書籍" class="cover">
        </b-col>
        <b-col md="7">
          <h2>{{ bookDetail.title }}</h2>
          <p>{{ bookDetail.description }}</p>
          <h6>ISBN {{ bookDetail.ISBN }}</h6>
          <h6><strike>定價：NT{{ bookDetail.originalprice }}元</strike></h6>
          <h6>會員：NT {{ bookDetail.price }}元</h6>
          <b-button class="pl-3 pr-3" @click="addCart">購買</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container id="fbook">
      <b-row>
        <b-col cols="6" md="12" class="mt-5 mx-3">
          <h3 class="text-center mt-2">書籍試閱</h3>
          <div class="fbp">
          <flipbook class="flipbook" :pages= bookDetail.preview :singlePage="false">
          </flipbook>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.flipbook {
  width: 1000px;
  height: 600px;
}
</style>

<script>
import Flipbook from 'flipbook-vue'
export default {
  components: {
    Flipbook
  },
  computed: {
    bookDetail () {
      return this.$store.getters.getBookDetail
    },
    userID () {
      return this.$store.getters.getUserID
    }
  },
  methods: {
    addCart () {
      const form = {
        id: this.userID,
        product: this.bookDetail
      }
      this.axios.post(process.env.VUE_APP_APIURL + '/cart', form)
        .then(response => {
          console.log(response.data.result)
        })
    }
  }
}
</script>
