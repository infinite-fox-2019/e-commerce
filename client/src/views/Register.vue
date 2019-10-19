<template>
  <div>
    <RegisterForm @showAlert="showAlert" @setLogin="setLogin"/>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'

export default {
  components: {
    RegisterForm
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
