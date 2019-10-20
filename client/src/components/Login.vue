<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item
      :validate-status="emailError() ? 'error' : ''"
      :help="emailError() || ''"
      class="input-item"
    >
      <a-input
        v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your email!' }] },
        ]"
        placeholder="Email"
        autocomplete="off"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
      class="input-item"
    >
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="input-button">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >Log in</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: "LoginForm",
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" })
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        this.$store
          .dispatch("login", values)
          .then(data => {
            this.$notification.open({
              message: "Login Success",
              description: "yeay! login success. please enjoy Sansmarket!",
              icon: <a-icon type="smile" style="color: #108ee9" />
            });
            this.form.resetFields();
            this.$emit("loginSuccess", true);
          })
          .catch(err => {
            this.$notification.open({
              message: "Login Fail",
              description: err,
              icon: <a-icon type="meh" style="color: #108ee9" />
            });
          });
      });
    }
  }
};
</script>

<style  scoped>
.input-item {
  margin: 1vh !important;
}
.input-button {
  left: 53vh;
  margin: 0;
}
</style>