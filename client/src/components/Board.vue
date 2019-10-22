<template>
  <div id="board">
    <div id="cards">
      <Card v-for="(product,i) in products" :key="i" :product="product"></Card>
    </div>

  </div>
</template>

<script>
import Card from "./Card";
import { mapState } from "vuex";

export default {
  name: "board",
  components: {
    Card
  },
  data(){
    return {
      
    }
  },
  computed: mapState(["products"])
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
#board {
  width: 95%;
  background: #fff;
  border-radius: 2px;
  margin: 1rem;
  background-color: rgb(255, 255, 255, .3);
  padding: 2vh;
}
#cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.card {
  margin: 1vh;
}
h1 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  letter-spacing: -1;
}
</style>