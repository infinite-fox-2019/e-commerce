<template>
  <div>
    <b-card
      :title="title"
      :img-src="imgsrc"
      img-alt="Image"
      img-top
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        {{descrip || "this is nice product"}}
      </b-card-text>
      <b-button href="#" variant="primary">Detail</b-button>
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
    descrip: String
  }
}
</script>

<style>

</style>
