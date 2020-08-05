<template lang="pug">
  #new.h-100
    b-container(fluid)
      h2.text-center.mb-5.mt-3 本週新書排行
      b-row.animate__animated.animate__fadeInLeft
        b-col.h-50(cols='6' style='background-color: var(--g)').d-flex.flex-column.mt-5
          h1.text-center NO.1
          h4.text-center.text-white Tokyo TDC Vol.30: The Best in International Typography & Design
        b-col.h-50(cols='6' class='p-0')
          b-img(src='../../public/img/newbook/01.jpg' left fluid)
      b-row.animate__animated.animate__fadeInRight
        b-col.h-50(cols='6' class='p-0')
          b-img(src='../../public/img/newbook/02.jpg' right fluid)
        b-col.h-50(cols='6' style='background-color: var(--g)').d-flex.flex-column.mt-5
          h1.text-center NO.2
          h4.text-center.text-white 印刷用紙サンプルBOOK: 200種類以上の印刷用紙に、同絵柄．文字を刷って１冊に。
      b-row.animate__animated.animate__fadeInLeft
        b-col.h-50(cols='6' style='background-color: var(--g)').d-flex.flex-column.mt-5
          h1.text-center NO.3
          h4.text-center.text-white Keep in Touch: Contemporary Design for Invitation, Postcards, Stamps & Seals
        b-col.h-50(cols='6' class='p-0')
          b-img(src='../../public/img/newbook/04.jpg' left fluid)
      b-row.animate__animated.animate__fadeInRight
        b-col.h-50(cols='6' class='p-0')
          b-img(src='../../public/img/newbook/07.jpg' right fluid)
        b-col.h-50(cols='6' style='background-color: var(--g)').d-flex.flex-column.mt-5
          h1.text-center NO.4
          h4.text-center.text-white Optimum Type: Custom Typography Design and Application
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
