<template>
  <div>
      <div class="productCard">
          <img :src="product.image" :alt="product.name">
          <div class="viewDetail">
               
              <button  @click.prevent="viewDetail" >View Detail</button>
              <button v-if="isAdmin" @click.prevent="deleteProduct" style="background-color: rgba(255, 54, 54, 0.767);">Delete</button>
                
          </div>
          <p>{{ product.name }}</p>
          <p>{{ '$'+product.price+'.00' }}</p>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'


export default {
  computed: mapState(['isAdmin']),
  name: 'ProductCard',
  props: ['product'],
  methods: {
    viewDetail () {
      this.$router.push(`/products/${this.product._id}`)
    },
    deleteProduct () {
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteProduct', this.product._id)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
    }
  }
}
</script>

<style>

.viewDetail {
    width: 100%;
}

.viewDetail button{
    width: 85%;
    height: 35px;
    border: none;
    background-color: rgba(0, 0, 0, 0.767);
    color: white;
}

.viewDetail button:hover{
    background-color: rgba(0, 0, 0, 0.513);

}

.productCard img{
    width: 85%;
    margin-top: 25px;
    outline: none;
}

.productCard p {
    padding: 0;
    margin: 0;
}

</style>
