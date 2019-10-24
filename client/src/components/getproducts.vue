<template>
  <div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'getallproducts',
  methods: {
    getallproducts () {
      axios({
        url: 'http://localhost:3000/products',
        method: 'get'
      })
        .then(({ data }) => {
          this.$emit('getallproducts', data)
        })
        .catch(console.log)
    }
  },
  created () {
    this.getallproducts()
  }
}
</script>

<style>

</style>
