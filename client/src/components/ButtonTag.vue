<template>
  <div>
    <b-button class="is-primary" style="margin:8px" @click="clickbtn">{{tagRename}}</b-button>
  </div>
</template>

<script>
export default {
  props: ['tag'],
  computed: {
    tagRename () {
      if (this.tag === 'bestseller') {
        return 'Best Seller'
      } else if (this.tag === 'brush') {
        return 'Paint Brush'
      } else if (this.tag === 'paint') {
        return 'Paint'
      } else if (this.tag === 'profesional') {
        return 'Profesional'
      } else if (this.tag === 'kids') {
        return 'Kids'
      } else {
        return this.tag
      }
    }
  },
  methods: {
    clickbtn () {
      this.$router.push({ path: '/shop/' + this.tag })
    }
  }
}
</script>

<style>
</style>
