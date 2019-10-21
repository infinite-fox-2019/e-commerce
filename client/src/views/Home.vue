<template>
  <div class="home">
    <Carousel />
    <Platforms />
    <Deals />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import Platforms from '@/components/Platforms'
import Deals from '@/components/Deals'
export default {

  name: 'home',
  components: {
    Carousel,
    Platforms,
    Deals
  }
}
</script>
