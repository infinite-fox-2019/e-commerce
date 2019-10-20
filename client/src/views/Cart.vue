<template>
  <div class="cart">
      <CartComp
      @countFromChild="countFromChild"
      />
  </div>
</template>

<script>
import CartComp from '../components/CartComp'
export default {
  data () {
    return {
      count: ''
    }
  },
  components: {
    CartComp
  },
  methods: {
    countFromChild (data) {
      this.count = data
      // this.$router.replace({name : 'users', params : {count : this.count}})
    }
  }
}
</script>

<style>

</style>
