<template>
  <a-row id="bg">
    <a-col :span="24">
      <div class="container">
        <a-row>
          <a-col :span="12" class="image">
            <img :src="activeproduct.image" style="object-fit: cover;" height="500px" width="500px" alt />
          </a-col>
          <a-col :span="12" class="content">
            <h1>{{ activeproduct.name }}</h1>
            <a-divider />
            <h2>Desciption</h2>
            <p>{{ activeproduct.description }}</p>
            <br />
            <h1 class="price">IDR{{ activeproduct.price }}</h1>
            <a-form-item
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    label="Quantity"
                    :help="number.errorMsg || tips"
                    >
                <a-input-number :min="1" :max="activeproduct.qty" v-model="value"/>
            </a-form-item>
            <br>
            <div class="cart">
                <a-button type="primary" shape="round" icon="plus-square" size="large" block @click="addToCart">ADD TO CART</a-button>
            </div>
          </a-col>
        </a-row>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { mapState } from "vuex";

function validatePrimeNumber(number) {
  if (number === 11) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: 'there ',
  };
}

export default {
  name: "detailProduct",
  data() {
    return {
      activeproduct: {},
      value: 1,
      size: "large",
      labelCol: { span: 10 },
      wrapperCol: { span: 5 },
      number: {
        value: 11,
      },
      tips:'sansmarket stock',
    };
  },
  methods : {
    handleNumberChange(value) {
      this.number = {
        ...validatePrimeNumber(value),
        value,
      }
    },
    addToCart(){
      this.$store.dispatch('addToCart' , { id : this.activeproduct._id, qty : this.value})
      .then(data => {
        this.$notification.open({
              message: "Success",
              description: data.message,
              icon: <a-icon type="smile" style="color: #108ee9" />
        })
        this.value = 1
        this.$store.dispatch('fetchProduct')
      })
      .catch(err => {
        this.$notification.open({
              message: "Fail",
              description: err.response.data.message,
              icon: <a-icon type="meh" style="color: #108ee9" />
          })
        this.value = 1
      })
      
    },
  },
  computed: mapState(["products"]),
  mounted() {
    let product = this.products.filter(product => {
      return product._id === this.$route.params.id;
    });
    this.activeproduct = product[0];
  }
};
</script>

<style scoped>
#bg{
background-color: rgb(255, 255, 255, .3);
}
.container {
  display: flex;
  flex-direction: column;
  padding: 5vh;
}
h1{
    font-weight: 700;
    font-size: 48px;
}
.price{
    font-size: 38px;
    color: rgb(190, 33, 33)
}
.content, .image{
    border: .5px solid beige;
    padding: 4vh;
    height: 80vh;
}
.content {
    padding: 8vh;
}
.cart{
    padding: 2vh 13vh;
}
</style>