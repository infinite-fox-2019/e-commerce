<template>
    <b-carousel-slide
      :img-src="getBrand.image"
      >
      <h1>Dreamcar Official</h1>
    <b-button 
      pill variant="outline-success" 
      @click='getBrandName(getBrand.name)'
      id='styleButton'
      >
      {{getBrand.name}}
      </b-button>
    </b-carousel-slide>
</template>

<script>

export default {
    data(){
        return{
            getBrand : ''
        }
    },
    props: ['importProduct'],
    methods:{
      getBrandName(name){
        this.$router.push({name: 'product',params:{name : name}})
      }
    },
    created(){
      this.getBrand = this.importProduct
    }
}
</script>

<style scoped>
*{
  background-color: grey
}
#styleButton{
  margin:100px 100px; width:500px; height: 50px; font-family: Arial, Helvetica, sans-serif
}
h1{
  background-color: transparent;
  margin: 570px auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
</style>