<template>
  <div id="home">
    <Board></Board>
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '../components/Board'

export default {
  name: 'home',
  components: {
    Board
  }
}
</script>
<style scoped>
#home{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
}
</style>