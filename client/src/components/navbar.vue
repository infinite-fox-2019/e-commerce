<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="nav-style nav-color">
      <img src="../assets/logo2.png" alt="logo" class="logo">

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <router-link to="/"><span>Home</span></router-link>
            <router-link to="/about"><span>About</span></router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item right>
           <a href="" v-if="this.$store.state.isLogin" @click="logout()">Logout</a>
              <!-- <br> -->
              <a href="" v-if="this.$store.state.userRole === 'admin'" v-b-modal.modal-prevent-closing>AddProduct</a>
              <router-link to="/login" v-if="!this.$store.state.isLogin">Login</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- modal -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add New Product"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.prevent="handleSubmit">
        <input type="text" v-model="name" placeholder="name">
        <input type="text" v-model="desc" placeholder="description">
        <input type="number" v-model="price" placeholder="price">
        <input type="number" v-model="stock" placeholder="stock">
        <input type="file" @change="previewFile">
      </form>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'navbar',
  data () {
    return {
      name: '',
      desc: '',
      price: '',
      stock: '',
      image: '',
      formUploadImg: {
        img: ''
      }
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      // localStorage.removeItem('role')
      this.$store.commit('logout')
      Swal.fire('Bye', 'logout success', 'success')
    },
    resetModal () {
      this.name = ''
      this.desc = ''
      this.price = ''
      this.stock = ''
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },

    previewFile (event) {
      // this.formUploadImg.img = event.target.files[0]
      this.formUploadImg.img = event.target.files[0]
    },
    handleSubmit () {
      let { img } = this.formUploadImg
      let bodyFormData = new FormData()
      bodyFormData.append('image', img)
      bodyFormData.append('name', this.name)
      bodyFormData.append('desc', this.desc)
      bodyFormData.append('price', this.price)
      bodyFormData.append('stock', this.stock)
      console.log(bodyFormData, 'ini body')
      // console.log(img,'ini image');

      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        headers: {
          token: localStorage.getItem('token'),
          role: localStorage.getItem('role')
        },
        data: bodyFormData
      })
        .then(result => {
          this.$emit('addSuccess')
          Swal.fire('success', 'successfully added', 'success')
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
        .catch(err => {
          Swal.fire('error', `${err}`, 'error')
        })
    }
  }
}
</script>

<style scoped>
.logo {
  width: 50px !important;
}
.nav-style {
  background-color: #dfe6e9 !important;
}
a {
  font-weight: bold;
  color: #fff;
  margin-right: 10px;
  text-decoration: none !important;
}
.nav-color {
  background-color: #619d2d !important;
}
span {
  color: #fff;
  font-weight: bold;
}
</style>
