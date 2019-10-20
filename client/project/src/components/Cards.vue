<template>
  <a-card hoverable style="width: 200px">
    <img
      alt="example"
      :src="product.image"
      slot="cover"
    />
    <a-card-meta :title="product.name">
    </a-card-meta>
     <h4>Price : {{product.price}}</h4>
     <h4>Stock : {{product.quantity}}</h4>
     <div id="addtocart" v-if="!admin && login">
       <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="Qty">
            <a-input-number 
              v-decorator="['qty', {initialValue : 0}]"
              :min='0'
              :max='product.quantity'
            />
          </a-form-item>
     <!-- <a-button @click="addCart(product._id)">add to cart</a-button> -->
     <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">
        Add to cart
      </a-button>
    </a-form-item>
       </a-form>
     </div>
        <a-button type="primary" v-if="admin && login" @click="updatePage" style="margin: 5px" size='small'>Update</a-button>
        <a-popconfirm title="Are you sure？" okText="Yes" cancelText="No" @confirm='confirm'>
        <a-button type="primary" v-if="admin && login"   size='small'>Delete</a-button>
        </a-popconfirm>
  </a-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props : ['product'],
  data(){
    return {
      // admin : false,
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
       ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'addtocart' });
  },
  methods : {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['success']({
          message: 'Update Cart',
          description:
            `${this.product.name} added into your cart`,
          placement: 'bottomRight',
          duration: 2
          });
          let productId = this.product._id
          let payload = {qty : values.qty,productId}
          this.$store.dispatch('addCart',payload)
        }
      });
    },
    showModal() {
        this.visible = true;
      },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
      handleCancel(e) {
      this.visible = false;
    },
    updatePage(){
      let id = this.product._id
      this.$router.push({path:`/update/${id}`})
    },
    deleteCard(){
      let id = this.product._id
      this.$store.dispatch('deleteProduct',id)
        .then((msg)=>{
            this.$notification['success']({
          message: 'Product deleted',
          placement: 'bottomRight',
          duration: 2
          });
          // this.$store.dispatch('getProducts')
          this.$emit('created')
        })
    },
    confirm(){
      this.deleteCard()
    }
  },
   computed : mapState(['login','admin']),
  created(){
    // cekAdmin(){
    //   } 
      let cek = localStorage.getItem('admin')
      if(cek === true){
        this.admin = true
      }
  }
}
</script>

<style>

</style>