<template>
  <div class="home">
    <slide />
    <HomeProduct />
   <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Slide from '@/components/Slide.vue'
import HomeProduct from '@/components/HomeProduct.vue'
import Detail from '@/views/Detail'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Slide,
    HomeProduct,
    Detail
  }
}
</script>
