<template>
<div class='spacee'>
  <div class="contaiiner">
    <div class="card33"  v-for='(product, i) in theProducts' :key='i'>
      <SetComponent :get-product='product' @fetchPage='okeyFetch'/>
    </div>
  </div>
</div>
</template>

<script>
import SetComponent from '../../../components/SetComponent'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      theProducts: ''
    }
  },
  components: {
    SetComponent
  },
  methods: {
    okeyFetch () {
      this.goPorduct();
    },
    goProduct () {
      this.$awn.info('loading...')
      axios({
        method: 'get',
        url: 'http://dreamcarserver.dreamcarofficial.com/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.theProducts = data
          this.$awn.success('Donee..')
        })
        .catch(err => {
          swal.fire({
            type: 'error',
            title: 'Don\'t have access!',
            text: err.response.data.msg
          })
        })
    }
  },
  created () {
    this.goProduct()
  }
}
</script>

<style lang='scss'>
.spacee{
  overflow: auto;
}
* {
  box-sizing: border-box;
  line-height: 1.5;
  font-family: 'Open Sans', sans-serif;
}

img {
  max-width: 100%;
}

.contaiiner {
  display: flex;
  flex-wrap: wrap;
  height: 46.5vw;
}

@keyframes LineFadeIn {
  0% { opacity: 0; d: path("M 0 300 Q 0 300 0 300 Q 0 300 0 300 C 0 300 0 300 0 300 Q 0 300 0 300 "); stroke: #fff; }
  50% { opacity: 1; d: path("M 0 300 Q 50 300 100 300 Q 250 300 350 300 C 350 300 500 300 650 300 Q 750 300 800 300"); stroke: #888BFF; }
  100% { opacity: 1; d: path("M -2 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 802 400"); stroke: #545581; }
}

@keyframes ContentFadeIn {
  0% { transform: translateY(-1rem); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes ImageFadeIn {
  0% { transform: translate(-.5rem, -.5rem) scale(1.05); opacity: 0; filter: blur(2px); }
  50% { opacity: 1; filter: blur(2px); }
  100% { transform: translateY(0) scale(1.0); opacity: 1; filter: blur(0); }
}
</style>
