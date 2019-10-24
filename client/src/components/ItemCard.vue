<template>
  <b-card id="itemCard" class="text-wrap mr-3 mt-2 mb-2">
    <b-card-img id="itemImage" :src="product.imageUrl" height="300px" width="200px" alt="Image"></b-card-img>

    <b-card-title id="itemTitle">{{product.name}}</b-card-title>

    <b-card-text id="itemCardDescription">Description: {{product.description}}</b-card-text>

    <b-card-text id="itemCardPrice">Price: EUR {{product.price}}</b-card-text>

    <b-card-text id="itemCardStock">Stock left: {{product.quantity}} pcs</b-card-text>

    <!--Button Add to Cart is in special footer so it stays below no matter how long the item card is-->
    <template v-slot:footer>
      <b-button
        pill
        v-if="!isAdmin"
        id="addToCartButton"
        @click.prevent="addToCart(product._id)"
      >Add to Cart</b-button>
      <b-button v-if="isAdmin" pill id="editItemButtonAdmin">Edit</b-button>
      <b-button
        v-if="isAdmin"
        pill
        id="deleteItemButtonAdmin"
        @click.prevent="showDeleteModal"
      >Delete</b-button>
    </template>
  </b-card>
</template>

<script>
import axios from "axios";
import errorHandler from "@/helpers/errorHandler";
export default {
  created: function() {
    this.isAdmin = this.$store.state.isAdmin;
  },
  props: ["product"],
  data: function() {
    return {
      isAdmin: ""
    };
  },
  methods: {
    addToCart(id) {
      if (!localStorage.getItem("token")) {
        this.$swal.fire({
          type: "info",
          title: "Oops...",
          text: `You need to log in first! Thank you!`
        });
        this.$router.push("/login");
      } else {
        this.$swal.fire(
          "Success!",
          "Item succesfully added to the cart!",
          "success"
        );
        // axios({
        //   url: `${this.$store.state.baseUrl}/users/cart/${id}`,
        //   method: 'PATCH',
        //   headers: {
        //     token: localStorage.getItem('token')
        //   }
        // })
        // .then(({data}) => {
        //   this.$store.dispatch('fetchCart')
        // }).catch(errorHandler)
      }
    }
  }
};
</script>

<style scoped>
#itemCard {
  width: 20rem;
  font-family: Nunito;
}

#itemImage {
  margin-bottom: 20px;
}

#addToCartButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #09203f, #537895);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
}

#editItemButtonAdmin {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #ffdd00, #fbb034);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
  color: #000000;
}

#deleteItemButtonAdmin {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #ff0000, #990000);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
}
</style>