<template>
  <b-button href="#" variant="danger" @click="destroy">Delete</b-button>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'deleteproduct',
  props: ['id'],
  methods: {
    destroy () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'delete',
              url: `http://localhost:3000/products/${this.id}`,
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(() => {
                this.$store.dispatch('getproducts')
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              })
              .catch(function (error) {
                Swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  footer: '<a href>Why do I have this issue?</a>'
                })
                console.error('Error removing document: ', error)
              })
          }
        })
        .catch(function (error) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
