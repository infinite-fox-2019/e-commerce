<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(color,i) in colors" :key=i><div class="glide-item">Slide {{i}}</div></swiper-slide>
    <!-- <swiper-slide><div class="glide-item">Slide 2</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 3</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 4</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 5</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 6</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 7</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 8</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 9</div></swiper-slide>
    <swiper-slide><div class="glide-item">Slide 10</div></swiper-slide> -->
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
        'green',
        'black'
      ],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 3,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style>
.gliders {
  margin: 5%;
  overflow-x: scroll;
}

.glide-item {
  width: 300px;
  height: 400px;
  margin: 1% 2%;
  background-color: red;
  color: white;
}

.swiper {
    width: 70vw;
}
</style>
