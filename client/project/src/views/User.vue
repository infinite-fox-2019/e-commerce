<template>
<div>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
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
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', height: '79vh' }">
        <h1>Your shopping cart</h1>
      <table id="cartUser">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price @product</th>
            <th>Detail Product</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(cart,index) in data" :key="cart.id">
            <td>{{index+1}}</td>
            <td>{{cart.productName}}</td>
            <td>{{cart.quantity}}</td>
            <td>{{cart.price}}</td>
            <td>{{(cart.quantity)*(cart.price)}}</td>
            <td>{{cart.detail}}</td>
            <td>            
            <a-popconfirm title="Are you sure？" okText="Yes" cancelText="No" @confirm='confirm(cart.productId)'>
            <a-button>delete</a-button>
            </a-popconfirm>
            </td>
          </tr>
        </tbody>
      </table>
      <a-popconfirm title="Are you sure？" okText="Yes" cancelText="No" @confirm='confirmCK()'>
  <a-button type="primary">Checkout!</a-button>
  </a-popconfirm>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</div>
</template>



<script>
import Axios from 'axios'
import { message } from 'ant-design-vue';

  export default {
    name : 'user',
    data() {
      return {
        data : []
      };
    },
    methods : {
      remProduct(id){
        this.$store.dispatch('removecart',id)
          .then((success)=>{
            message.info('Product deleted from your cart.');
            this.getCart()
          })
      },
      getCart(){
        this.$store.dispatch('getUser')
        .then((data)=>{
          let dataArr = []
          let key = 0
          data.cart.forEach(element => {
            let obj = {}
            obj.key = key++
            obj.productName = element.productId.name
            obj.quantity = element.qty
            obj.price = element.productId.price
            obj.priceTotal = (element.qty)*(element.productId.price)
            obj.detail = element.productId.detail
            obj.productId = element.productId._id
            dataArr.push(obj)
            obj = {}
          });
          this.data = dataArr
        })
      },
      checkout(){
        this.$store.dispatch('checkout')
          .then((msg)=>{
            this.$notification['success']({
              message: 'Checkout success !',
              description:
                'We will send you a confirmation email.',
            });
            this.getCart()
          })
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
      confirm(id){
        this.remProduct(id)
      },
      confirmCK(){
        this.checkout()
      }
    },
    created(){
      this.getCart()
    }
  };
</script>

<style scoped>
  table{
    width: 90%;
    margin: 0px auto 15px auto;
    line-height: 50px;
  }
  tbody tr:nth-child(odd) {
  background: #eee;
  }
  thead{
    background: rgba(0, 24, 45, 0.623);
    color: white;
  }
</style>