<template>
  <div class="swiper">
    <swiper :options="swiperOption">

      <swiper-slide
        v-for="(item,index) in banners"
        :key="index">
        <a :href="item.url" class="bg-img"
           :style="{background: 'url('+item.banner+') no-repeat center'}"></a>
      </swiper-slide>

    </swiper>
  </div>
</template>
<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props: {
      banners: {
        default: ''
      }
    },
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 0,
          centeredSlides: true,
          speed: 600,
          loop:true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
        }
      }
    }
  }
</script>
<style lang="less">
  .swiper {
    width: 100%;
    height: calc(~"100vh - 10.8rem");
    box-shadow: 0 2px 9px #ddd;
    .swiper-container {
      height: 100%;
      .swiper-slide {
        height: 100%;
        .bg-img {
          width: 100%;
          height: 100%;
          display: block;
          background-size: cover !important;
        }
      }
    }
  }
</style>
