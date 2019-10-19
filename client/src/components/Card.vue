<template>
  <div>
    <b-card-img height="255px" width="255px" :src="imgsrc" alt="Image" top></b-card-img>
    <b-card
      :title="title | truncate(25, '...')"

      img-alt="Image"

      class="mb-3"
      style="height: 13rem;"
    >
      <b-card-text>
        ${{price || 1.00}}
      </b-card-text>
      
      <b-button href="#" variant="outline-dark"> <span><img src="https://image.flaticon.com/icons/svg/265/265731.svg" class="mb-1 mr-2" width="15px" height="15px"></span> Add to Cart</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {

    }
  },
  props: {
    imgsrc: String,
    title: String,
    subtitle: String,
    price: Number
  }
}
</script>

<style>

</style>
