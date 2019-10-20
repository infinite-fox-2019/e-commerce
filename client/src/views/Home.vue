<template>
  <div>
    <b-container>
      <ImageHeader/>
      <b-row>
        <b-col cols="12" md="3" v-for="(value,index) in productData" :key="index">
          <Card
          :imgsrc="value.image"
          :title="value.name"
          :price="value.price"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card.vue'
import ImageHeader from '@/components/ImageHeader.vue'

export default {
  name: 'Product',
  data () {
    return {
      productData: []
    }
  },
  components: {
    Card,
    ImageHeader
  },
  methods: {
    fetchData () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          console.log(data)
          this.productData = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchData()
  }

}
</script>

<style>

</style>
