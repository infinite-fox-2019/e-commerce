<template>
    <div>
        <div class="d-flex justify-content-center">
            <img class="banner" src="../../public/banner_1.webp" alt="">
            <img class="banner" src="../../public/banner_2.webp" alt="">
        </div>
        <div>
            <div class="newArival">
                <p>OUR PRODUCTS</p>
                <h2 class="display-4">NEW ARIVAL</h2>
            </div>
            <div class="row mx-5">
                    <ProductCard class="col-3"  v-for="product in products" :key="product._id" :product="product"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  computed: mapState(['products']),
  created () {
    this.$store.dispatch('getProducts')
  }

}
</script>

<style scoped>

.banner{
    margin: 50px;
    margin-top: 100px;
}

.newArival {
    margin-top: 50px;
}

.newArival p, h1{
    margin: 0;
    padding: 0;
}
</style>>

</style>
