<template>
  <div id="update">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header>
        <a-row>
        <a-col :span="4" style="color: white">Palu Gada</a-col>
        <a-col :span="14" >
        </a-col>
        <a-col :span="6" >
          <a-button type="primary" @click="home"  style="margin-right: 10px">Home</a-button>
          <a-button type="primary" @click="logout">Logout</a-button>
        </a-col>
      </a-row>
      </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', height: '79vh' }">
        <h1> Update Product Page</h1>
         <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="Product Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input
              v-decorator="['name', { rules: [{ required: true, message: 'Please input your note!' }] }]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Price" >
          <a-input-number 
            v-decorator="['price',{rules: [
            {required: true,message: 'Please input your product price!'}]}]"
            :min='1000'
            :max='1000000'
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Quantity">
          <a-input-number 
            v-decorator="['quantity',{rules: [
            {required: true,message: 'Please input your product quantity!'}]}]"
            :min='1'
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Detail">
          <a-input
            v-decorator="['detail',{rules: [
            {required: true, message: 'Please input your detail!'}]}]"
            type="textarea"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
      </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
  </a-layout>
  </div>
</template>

<script>
export default {
  name : 'updateproduct',
  data(){
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      product : {},
      formItemLayout: {labelCol: {
          xs: { span: 5 },
          sm: { span: 5 }},
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 12 }}
      }
    }
  },
  methods : {
     handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['success']({
          message: 'Product Updated',
          placement: 'bottomRight',
          top: "50px",
          duration: 2
          });
          let id = this.$route.params.id
          let payload = {id,values}
          this.$store.dispatch('updateProduct',payload)
          }
      });
    },
    setField() {
      this.form.setFieldsValue({
        name: this.product.name,
        price : this.product.price,
        quantity : this.product.quantity,
        detail : this.product.detail
      });
    },
    getThisProduct(){
      let id = this.$route.params.id
      this.$store.dispatch('getSpecificProduct',id)
        .then((data)=>{
          this.product.name = data.name,
          this.product.price = data.price,
          this.product.quantity = data.quantity,
          this.product.detail = data.detail,
          this.product.image = data.image
        this.setField()
        })
    },
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        localStorage.removeItem('id')
        // this.admin = false
        // this.login = false
        this.$store.dispatch('logout_state')
         this.$router.push({path:'/'})
      },
      home(){
        this.$router.push({path:'/'})
      },
  },
  created(){
    this.getThisProduct()
  }
}
</script>

<style>

</style>