<template>
<div>
  <div id="update">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header  :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <a-row>
        <a-col :span="4" style="color: white">Palu Gada</a-col>
        <a-col :span="14" >
        </a-col>
        <a-col :span="6" >
          <a-button type="primary" @click="home" style="margin-right: 10px">Home</a-button>
          <a-button type="primary" @click="logout">Logout</a-button>
        </a-col>
      </a-row>
      </a-layout-header>
    <a-layout-content style="padding: 0 50px">
       <div :style="{ background: '#fff', padding: '24px', minHeight: '280px'}">
         <br><br><br>
          <h1>Welcome to Admin Page</h1>
           <a-row type="flex" justify="space-around" align="top">
            <a-col :span="12" style="border: 1px black solid" class="box">
                <a-spin :spinning="spinning" size='large' tip='Uploading...'>
      <a-form :form="form" @submit="handleSubmit">
          <h2>Fillout this form to add new product</h2>
          <a-form-item >
            <span slot="label">
              Product Name
              <a-tooltip title="What do you want others to call you?">
              </a-tooltip>
            </span>
            <a-input
              v-decorator="['name',{rules: [
              { required: true, message: 'Please input your product name!', whitespace: true }]}]"
            />
          </a-form-item>
          <a-form-item  label="Price">
            <a-input-number 
              v-decorator="['price', {initialValue : 1000},{rules: [
              {required: true,message: 'Please input your product price!'}]}]"
             :min='1000'
              :max='1000000'
            />
          </a-form-item>
          <a-form-item  label="Quantity">
            <a-input-number 
              v-decorator="['quantity', {initialValue : 0},{rules: [
              {required: true,message: 'Please input your product quantity!'}]}]"
              :min='1'
            />
          </a-form-item>
          <a-form-item  label="Detail">
            <a-input
              v-decorator="['detail',{rules: [
              {required: true, message: 'Please input your detail!'}]}]"
              type="textarea"
            />
          </a-form-item>

          <a-form-item  label="Add Image">
              <a-upload-dragger
                name="files"
                :multiple='false'
                :beforeUpload='beforeUpload'
                >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </a-upload-dragger>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">
              Add Product
            </a-button>
          </a-form-item>
        </a-form>
        </a-spin>
            </a-col>
            <a-col :span="12"  style="border: 1px black solid" class="box">
              <h2>Transactions History</h2>
              <hr>
              <div v-for="(trans,index) in transactions" :key="trans.id">
                <p>No: {{index+1}}</p>
                <p>Transaction Date: {{trans.createdAt.slice(0,10)}}</p>
                <p>Email Customer: {{trans.userId.email}}</p>
                <p>Products: <div v-for="cart in trans.cart" :key="cart.id">
                  {{cart.product.name}} - 
                  {{cart.qty}} pcs
                  </div> 
                  </p>  
                <hr>
              </div>
            </a-col>
          </a-row>
              
       </div>
    </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
  </a-layout>
  </div>




</div>
</template>

<script>
import Axios from 'axios'

export default {
  name : 'admin',
  data() {
    return {
      image : '',
      confirmDirty: false,
      spinning: false,
      transactions : [],
      username : []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'addProduct' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
           this.spinning = !this.spinning;
          let formData = new FormData()
          formData.append('image', this.image)
          formData.append('name', values.name)
          formData.append('price', values.price)
          formData.append('quantity', values.quantity)
          formData.append('detail', values.detail)
          let token = localStorage.getItem('token')
          Axios({
            method: 'post',
            // url: 'http://localhost:3000/products/add',
            url: 'http://35.186.155.204/products/add',
            data: formData,
            headers: {
              token
            }
          })
        .then(({ data }) => {
          console.log(data, 'ini hasil addProduct====----')
          this.spinning = !this.spinning;
            this.$notification['success']({
            message: 'Product Uploaded',
            placement: 'bottomRight',
            duration: 2
            });
        })
        .catch((err) => {
          console.log(err)
        })
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    beforeUpload(file) {
      this.image = file
      return false
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    localStorage.removeItem('id')
    this.$store.dispatch('logout_state')
      this.$router.push({path:'/'})
    },
    home(){
      this.$router.push({path:'/'})
    },
  },
  created(){
    this.$store.dispatch('transactions')
      .then(({data})=>{
        this.transactions = data
      })
      .catch((err)=>{
        console.log(err)
      })
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
.box{
  padding: 15px
}
 tbody tr:nth-child(odd) {
  background: #eee;
  /* border: 1px solid black; */
  }
    table{
    width: 90%;
    margin: 0px auto 15px auto;
    line-height: 20px;
  }
</style>