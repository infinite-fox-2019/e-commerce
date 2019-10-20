<template>
  <div class="container">
    <div class="notification has-background-white">
      <DetailContent></DetailContent>
    </div>
  </div>
</template>

<script>
import DetailContent from '../components/DetailContent'

export default {
  components: {
    DetailContent
  }
}
</script>

<style scoped>
.container {
  max-width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px 0px #cccccc;
}
</style>
