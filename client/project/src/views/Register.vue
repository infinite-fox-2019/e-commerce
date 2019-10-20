<template>
<div id="card">
<a-card>
  <a-form :form="form" @submit="handleSubmit">
    <h1>Register your account</h1>
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        Username
        <a-tooltip title="What do you want others to call you?">
        </a-tooltip>
      </span>
      <a-input
        v-decorator="['nickname',{rules: [
        { required: true, message: 'Please input your username!', whitespace: true }]}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="E-mail">
      <a-input
        v-decorator="['email', {rules: [
        {type: 'email', message: 'The input is not valid E-mail!',},
        {required: true,message: 'Please input your E-mail!'}]}]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Password">
      <a-input
        v-decorator="['password',{rules: [
        {required: true,message: 'Please input your password!',},
        {validator: validateToNextPassword}]}]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Confirm Password">
      <a-input
        v-decorator="['confirm',{rules: [
        {required: true, message: 'Please confirm your password!',},
        {validator: compareToFirstPassword,}]}]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">
        Register
      </a-button>
    </a-form-item>
  </a-form>
  </a-card>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name : 'register',
  data() {
    return {
      username : '',
      email : '',
      password : '',
      confirmDirty: false,
      formItemLayout: {labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }},
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }}
      },
      tailFormItemLayout: {wrapperCol: {
          xs: { span: 24,offset: 0 },
          sm: { span: 16,offset: 8 }},
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.username = values.nickname
          this.email = values.email
          this.password = values.password
          axios({
            method : 'post',
            // url : 'http://localhost:3000/users/add',
            url : 'http://35.186.155.204/users/add',
            data : {
              username : this.username,
              email : this.email,
              password : this.password
            }
          })
            .then((token)=>{
              localStorage.setItem('token',token.data.token)
              localStorage.setItem('admin', token.data.admin)
              localStorage.setItem('id', token.data.id)
              this.$router.push({path:'/'})
            })
            .catch((err)=>{
                this.$notification.error({
                message: `${err.response.data}`,
                description:
                  'Please use another email',
              });
            })
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  }
};
</script>

<style scoped>
#card{
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.158);
  box-shadow: 0px 5px 5px 0px rgba(17, 17, 17, 0.473)
}
</style>