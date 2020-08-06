<template>
  <div id="home">
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          img-src="../../public/img/01.jpg"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide img-src="../../public/img/02.jpg">
        </b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template v-slot:img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              :src="'./img/03.jpg'"
              alt="image slot"
            >
          </template>
        </b-carousel-slide>

      </b-carousel>
    </div>
    <div class="banner-s pt-1">
      <h3 style="text-align:center" class="mt-4 mb-5">新書推薦</h3>
      <swiper class="swiper mb-2" :options="swiperOption">
        <swiper-slide><img :src="'./img/newbook/01.jpg'" alt="new1"><div>Tokyo TDC Vol.30: The Best in International Typography & Design</div>
        <p>79折 NT1659元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/02.jpg'" alt="new2">印刷用紙サンプルBOOK: 200種類以上の印刷用紙に、同絵柄．文字を刷って１冊に
        <p>85折 NT2066元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/03.png'" alt="new3">佐藤大提問中!:日本設計鬼才與17組大師的非官方對談集
        <p>79折 NT332元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/04.jpg'" alt="new4">Keep in Touch: Contemporary Design for Invitation, Postcards, Stamps & Seals
        <p>79折 NT1106元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/05.jpg'" alt="new5">Thinking in Services: Encoding and Expressing Strategy through Design
        <p>79折 NT1304元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/06.jpg'" alt="new6">Fashion Illustration: Outfit of the Day
        <p>79折 NT632元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/07.jpg'" alt="new7">Optimum Type: Custom Typography Design and Application
        <p>79折 NT1106元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/08.jpg'" alt="new8">50 Years of Japanese Logotypes and Symbol Marks
        <p>79折 NT1264元</p></swiper-slide>
        <swiper-slide><img :src="'./img/newbook/09.png'" alt="new9">Originality in Japanese Layout Design &emsp;&emsp;&emsp;&emsp;&emsp;
        <p>79折 NT1067元</p></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-scrollbar"></div>
      </swiper>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        // slidesPerGroup: 3,
        centeredSlides: true,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      },
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
