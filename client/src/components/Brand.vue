<template>
    <b-carousel-slide
      :img-src="getBrand.image"
      >
    <span 
      pill variant="outline-success" 
      @click='getBrandName(getBrand.name)'
       class="btn btn-two"
      >
      {{getBrand.name}}
      </span>

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

.btn-two::before, .btn-two::after {
  content: '';
  position: absolute;
  width: 100%;
	height: 100%;
  bottom: 0;
	left: 0;
	z-index: 1;
  transition: all 0.3s;
  border: 2px solid red;
  border-radius: 10px;
}

.btn-two:hover::after {
  animation-name: rotatecw;
  animation-duration: 2s;
}
.btn-two:hover::before {
  animation-name: rotateccw; 
  animation-duration: 2s;
}
.btn-two:hover::after, .btn-two:hover::before {
  left: 100px;
  width: 60px;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotatecw {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

@keyframes rotateccw {
    from {transform: rotate(0deg);}
    to {transform: rotate(-360deg);}
}
.btn {
  margin: 500px 0;
  position: relative;
  font-size: 30px;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  color: gold;
  width: 256px;
  height: 64px;
  line-height: 64px;
  transition: all 0.3s;
}

</style>