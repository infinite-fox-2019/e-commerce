<template>
    <div class="product">
        <b-card :title="productData.name" :img-src="productData.image" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>
            <p class="p-text">{{ productData.desc }}</p>
            </b-card-text>

            <b-button href="#" variant="success" block v-if="this.$store.state.userRole !== 'admin'">Add to cart <i class="fas fa-shopping-cart"></i></b-button>
            <div v-if="this.$store.state.userRole === 'admin'">
              <b-button href="#" variant="success" block><i class="fas fa-pen-square"></i> Update</b-button>
              <b-button href="#" variant="danger" block><i class="fas fa-trash"></i> Delete</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      productData: ''
    }
  },
  props: ['productFromHome'],
  methods: {

  },
  created () {
    this.productData = this.productFromHome
  }
}
</script>

<style>
    .product img{
        height: 250px;
        object-fit: cover;
    }
    .p-text{
        text-align: center;
        /* width: 250px; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
