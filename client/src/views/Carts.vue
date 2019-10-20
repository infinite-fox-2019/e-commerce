<template>
  <div class="container">
    <div class="notification has-background-white">
      <CartsContent></CartsContent>
    </div>
  </div>
</template>

<script>
import CartsContent from '../components/CartsContent'

export default {
  components: {
    CartsContent
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px 0px #cccccc;
}
</style>
