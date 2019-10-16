<template>
  <div>
    <b-card
      :title="product.name"
      img-src="https://picsum.photos/600/600/?image=20"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 14rem;"
      class="mb-2"
    >
      <b-card-text>
        <p></p>
        <p>{{ getPrice }}</p>
      </b-card-text>

      <b-button variant="success">Add to Cart</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    getPrice () {
      return 'Rp. ' + this.product.price
    }
  }
}
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    /* padding: 10px; */
    margin: 15px;
  }
  img{
    width: 100%;
    height: 200px;
  }
</style>
