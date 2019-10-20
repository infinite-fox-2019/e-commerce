<template>
  <div>
    <LoginForm @showAlert="showAlert" @setLogin="setLogin"/>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    LoginForm
  },
  methods: {
    showAlert (err) {
      this.$emit('showAlert', err)
    },
    setLogin (status) {
      this.$emit('setLogin', status)
    }
  }
}
</script>

<style>

</style>
