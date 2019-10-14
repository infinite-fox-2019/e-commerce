<template>
  <div id="form">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
export default {
  data: function() {
    return {};
  },
  components: {
    RegisterForm
  }
};
</script>

<style scoped>
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>