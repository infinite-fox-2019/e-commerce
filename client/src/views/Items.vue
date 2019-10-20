<template>
  <div  class="columns is-multiline pad">
    <Item v-for="item in allitems" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import Item from '../components/Item'
import { mapState } from 'vuex'
export default {
  components: {
    Item
  },
  created () {
    let tag = this.$route.name
    if (tag === 'all') {
      this.$store.dispatch('fetchItems')
    } else {
      this.$store.dispatch('fetchItemsTag', { tag: tag })
    }
  },
  computed: {
    ...mapState(['allitems']),
    routeName () {
      return this.$route.name
    }
  },
  watch: {
    routeName () {
      this.$store.dispatch('fetchItemsTag', { tag: this.routeName })
    }
  }
}
</script>

<style>
.pad{
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
</style>
