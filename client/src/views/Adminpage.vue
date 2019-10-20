<template>
  <div id="wrapper">
    <a-button type="" shape="round" icon="plus-square" :size="size" block @click="toAddProduct">Add Product</a-button>
    <a-button type="" shape="round" icon="bars" :size="size" block @click="toTransaction">Transaction</a-button>
    <div class="lists">
      <div class="list" v-for="product in products" :key="product._id">
        <div class="left-content">
          <h3>
            <b>{{product.name}}</b>
          </h3>
          <h5>{{ product._id }}</h5>
        </div>
        <a-divider type="vertical" />
        <div class="center-content">
          <h5>price : ${{product.price}}</h5>
          <h5>stock : {{product.qty}}</h5>
        </div>
        <a-divider type="vertical" />
        <div class="right-content">
          <a href @click.prevent="toEdit(product._id)">Edit</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="Are you sure delete this task?"
            @confirm="confirm(product)"
            @cancel="cancel"
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </a-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "adminpage",
  components : {
    
  },
  data() {
    return {
        size : 'large'
    };
  },
  mounted() {},
  methods: {
    toTransaction(){
      this.$store.dispatch('fetchTransaction')
      this.$router.push(`admin/transaction`)
    },
    toEdit(id){
        this.$router.push(`admin/editproduct/${id}`)
    },
    toAddProduct(){
        this.$router.push('admin/addproduct')
    },
    confirm(payload) {
      this.$store
        .dispatch("deleteProduct", payload)
        .then(data => {
          this.$message.success(data.message);
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    cancel(e) {
      this.$message.success("Okay! ganbatte!");
    }
  },
  computed: mapState(["products"])
};
</script>
<style scoped>
#wrapper{
  padding: 3vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;  
}
.lists {
  padding: 3vh 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.list {
  border: 0.1px solid rgb(170, 170, 170, 0.5) !important;
  width: 600px;
  padding: 1vh 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1vh;
}
h3,
h5 {
  margin: 1vh;
}
</style>
