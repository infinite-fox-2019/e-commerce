<template>
  <div id="form">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  data: function() {
    return {};
  },
  components: {
    LoginForm
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