<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item
      :validate-status="emailError() ? 'error' : ''"
      :help="usernameError() || ''"
      class="input-item"
    >
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
        autocomplete="off"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item
      :validate-status="emailError() ? 'error' : ''"
      :help="emailError() || ''"
      class="input-item"
    >
      <a-input
        v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your email!' } , {
                type: 'email',
                message: 'The input is not valid E-mail!',
              }] },
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
      >Register</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: "RegisterForm",
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
    usernameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("username") && getFieldError("username");
    },
    emailError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("email") && getFieldError("email");
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
          .dispatch("register", values)
          .then(({ data }) => {
            this.$notification.open({
              message: "Register Success",
              description:
                "yeay! register success. thank you for joining Sansmarket! please login to continue and becamoe more awesome",
              icon: <a-icon type="smile" style="color: #108ee9" />
            });
            this.form.resetFields();
            this.$emit("registerSuccess");
          })
          .catch(err => {
            this.$notification.open({
              message: "Register Failed",
              description: err.response.data.message,
              icon: <a-icon type="mehh" style="color: #108ee9" />
            });
            console.log(err.response);
          });
        console.log(values);
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