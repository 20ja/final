<template lang="pug">
#cart
  h1.text-center 購物車
    b-container(style='font-size: 16pt')
      b-row
        b-col
          b-table(striped hover :items="items" :fields="fields")
            template(v-slot:cell(src)='row')
              img(:src="row.item.src" :style="{maxWidth:'100px'}")
            template(v-slot:cell(action)='row')
              b-button(variant="danger" @click="cancel([row.item.id,row.index])") 刪除
            template(v-slot:cell(count)='row')
              b-form-spinbutton(v-model="row.item.count" min="1")
      b-row.justify-content-end.align-items-center(v-if="items.length !== 0")
        | 總金額為 {{ totalprice }}
        b-button(variant="warning" @click="order").ml-2 確定下訂
  h3.text-center.mb-5 您可能也感興趣
  carousel
    template(slot='prev' :number="3" :boolean="true" :nav="true" )
    img(src='../../public/img/newbook/01.jpg')
    img(src='../../public/img/newbook/02.jpg')
    img(src='../../public/img/newbook/03.jpg')
    img(src='../../public/img/newbook/04.jpg')
    template(slot='next')
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  components: { carousel },
  data () {
    return {
      items: [],
      fields: [
        {
          key: 'src',
          label: '商品圖片',
          class: 'text-center align-middle'
        },
        {
          key: 'title',
          label: '書籍名稱',
          class: 'text-center align-middle'
        },
        {
          key: 'price',
          label: '價格',
          class: 'text-center align-middle'
        },
        {
          key: 'count',
          label: '數量',
          class: 'text-center align-middle'
        },
        {
          key: 'action',
          label: '刪除',
          class: 'text-center align-middle'
        }
      ]
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/cart/' + this.userID)
      .then(response => {
        // console.log(response.data.result)
        this.items = response.data.result.map(d => {
          return {
            id: d._id,
            src: d.product.name,
            title: d.product.title,
            price: d.product.price,
            count: 1
          }
        })
      })
  },
  computed: {
    userID () {
      return this.$store.getters.getUserID
    },
    totalprice () {
      let result = 0
      for (const i of this.items) {
        result += i.price * i.count
      }
      return result
    }
  },
  methods: {
    cancel (data) {
      this.axios.delete(process.env.VUE_APP_APIURL + '/cart/' + data[0])
        .then(response => {
          this.items.splice(data[1], 1)
        })
        .catch(e => {
          alert('刪除錯誤')
        })
    },
    order () {
      const form = {
        id: this.userID,
        carts: this.items.map(d => {
          return {
            name: d.src,
            title: d.title,
            count: d.count
          }
        }),
        totalprice: this.totalprice
      }
      this.axios.post(process.env.VUE_APP_APIURL + '/order', form)
        .then(response => {
          alert('下訂成功')
          this.items = []
          alert(`你的訂單編號為${response.data.result._id}`)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
