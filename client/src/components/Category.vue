<template>
    <button @click="showCategory(categoriesData._id)" class="category-btn">{{categoriesData.name}}</button>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Category',
  data () {
    return {
      categoriesData: '',
      productsInCategory: ''
    }
  },
  props: ['categoriesfromhome', 'showCategory'],
  methods: {

  },
  created () {
    this.categoriesData = this.categoriesfromhome
  }

}
</script>

<style scoped>

body {
  font-family: "Lato", sans-serif;
}

.category-btn {
  border: none;
  padding: 15px;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
  background-color: #3b5998;
  color: white;
  font-weight: bold;
}

.category-btn:hover {
  background-color: #ffa500;
  color: #420420;
  font-weight: bold;
  transform: rotate(10deg);
}

</style>
