<template lang="pug">
  b-container#book.mx-0(fluid)
      h4.mt-3 書籍分類
      b-tabs(card vertical)
        b-tab(title="平面設計")
          //-平面設計
          b-row
            b-col(cols='6' md='4' lg="3" xl='2' v-for="(Graphicdesign,index) in Graphicdesigns" :key="index").mt-3.mx-3
              .card.h-100(@click="showDetail(Graphicdesign)")
                img(:src="Graphicdesign.name").card-img-top
                .card-body.d-flex.flex-column
                  h6.card-title.flex-fill {{ Graphicdesign.title }}
                  span.text-center NT.{{ Graphicdesign.price }}
                  b-button.ml-2(@click.stop.prevent="addCart(Graphicdesign)") 加入購物車
              //- 插畫
        b-tab(title="插畫")
              .row
                b-col(cols='6' md='4' lg="3" xl='2' v-for="(illustration,index) in illustrations" :key="index")
                  .card.h-100(@click="showDetail(illustration)")
                    img(:src="illustration.name").card-img-top
                    .card-body.d-flex.flex-column
                      h6.card-title.flex-fill {{ illustration.title }}
                      span.text-center NT.{{ illustration.price }}
                      b-button.ml-2(@click.stop="addCart(illustration)") 加入購物車
        b-tab(title="商業設計")
          b-row
            b-col(cols='6' md='4' lg="3" xl='2' v-for="(BusinessDesign,index) in BusinessDesigns" :key="index").mt-3.mx-3
              .card.h-100(@click="showDetail(BusinessDesign)")
                img(:src="BusinessDesign.name").card-img-top
                .card-body.d-flex.flex-column
                  h6.card-title.flex-fill {{ BusinessDesign.title }}
                  span.text-center NT.{{ BusinessDesign.price }}
                  b-button.ml-2(@click="addCart(BusinessDesign)") 加入購物車
        b-tab(title="工業設計")
          b-row
            b-col(cols='6' md='4' lg="3" xl='2' v-for="(industrialdesign,index) in industrialdesigns" :key="index")
              .card.h-100(@click="showDetail(industrialdesign)")
                img(:src="industrialdesign.name").card-img-top
                .card-body.d-flex.flex-column
                  h6.card-title.flex-fill {{ industrialdesign.title }}
                  span.text-center NT.{{ industrialdesign.price }}
                  b-button.ml-2(@click="addCart(industrialdesign)") 加入購物車
</template>

<script>
export default {
  data () {
    return {
      Graphicdesigns: [
      ],
      illustrations: [
      ],
      BusinessDesigns: [
      ],
      industrialdesigns: [

      ]
    }
  },
  methods: {
    addCart (data) {
      console.log(this.userID)
      const form = {
        id: this.userID,
        product: data
      }
      this.axios.post(process.env.VUE_APP_APIURL + '/cart', form)
        .then(response => {
          console.log(response.data.result)
        })
    },
    showDetail (data) {
      this.$store.commit('showDetail', data)
      this.$router.push('/inbook')
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_APIURL + '/upload')
      .then(response => {
        for (const i of response.data.result) {
          i.name = process.env.VUE_APP_APIURL + '/upload/' + i.name
          for (let j = 0; j < i.preview.length; j++) {
            i.preview[j] = process.env.VUE_APP_APIURL + '/upload/' + i.preview[j]
          }
          if (i.category === '商業設計') {
            this.BusinessDesigns.push(i)
          } else if (i.category === '平面設計') {
            this.Graphicdesigns.push(i)
          } else if (i.category === '工業設計') {
            this.industrialdesigns.push(i)
          } else if (i.category === '插畫') {
            this.illustrations.push(i)
          }
        }
      })
  },
  computed: {
    userID () {
      return this.$store.getters.getUserID
    }
  }
}
</script>
