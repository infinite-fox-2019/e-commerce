<template>
<div class="back">
  <div class="home">
  <div class="name"></div>
<HelloWorld />
<p>©ARTZONE by ayusudi 2019</p>
  </div>

</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.back{
  background-image: url(../assets/homeback.jpg)
}
.home{
  height: calc(100vh - 10.6vh);
  background-image: url(../assets/bb.png);
  background-repeat: no-repeat;
  background-position:center bottom;
  display: flex;
  flex-direction: column
}
.name{
 background: url(../assets/name.svg);
 background-repeat: no-repeat;
 background-position: center;
 background-size: 800px;
 height: 200px;
}

p{
  top: 96vh;
  position: sticky;
  font-size: 10pt;
  color: white
}

</style>
