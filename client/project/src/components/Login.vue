<template>
<div>
   <a-alert
      v-if="visible"
      :message= this.message
      type="error"
      closable
      :afterClose="handleClose"
    />
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
     v-decorator="['email', {rules: [
        {type: 'email', message: 'The input is not valid E-mail!',},
        {required: true,message: 'Please input your E-mail!'}]}]"
        placeholder="Email"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      <!-- <a-button type="primary" icon="google" >google</a-button> -->
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      visible: false,
      message: 'Email/Password wrong'
    }
  },
   beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods :{
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('loggingIn',values)
            .then(()=>{
              console.log('masuk resolve');
            })
            .catch((err)=>{
              this.visible = true
              console.log(err.response)
          
            })
        }
      });
    },
    handleClose() {
        this.visible = false;
      },
  }
}
</script>

<style>

  .ant-input-group-wrapper {
    display: inline-block;
    width: 10%;
    text-align: start;
    vertical-align: top;
  }
  #components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#login{
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center
}
</style>