<template>
  <div class="container11 flex-column d-flex">
  <div class="cards">
    <div class="cards-content flex-row d-flex">
      <div class="outlined-box">DC</div>
        <div class="d-flex flex-column">
          <span class="title">
            {{ getData.brand+ ' ' +getData.name }}
          </span>
          <span class="subtitle">
            <ul>
              <li>
                 Transaction ID
              </li>
              <li>
                <span>{{ idTransaction }}</span>
              </li>
            </ul>
            <ul>
              <li>
                Price
              </li>
              <li>
                <span>${{ getData.price }}</span>
              </li>
            </ul>
            <ul>
              <li>
                Min DP {{ minimal }}%
              </li>
              <li>
                <span>${{ dp }}</span>
              </li>
            </ul>
            <ul>
              <li>
                Date
              </li>
              <li>
                <span> {{date}}</span>
              </li>
            </ul>
            <ul>
              <li>
                Code
              </li>
              <li>
                <input type="text" v-model='inputCode'>
              </li>
            </ul>
            <ul>
              <li>
                <button @click='buyNow()'>Deal Yoww</button>
              </li>
            </ul>
            <small>
              <ul>
                <li>
                  Exp
                </li>
                <li>
                  <span> 2 Days after Deal</span>
                </li>
              </ul>
            </small>
          </span>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      inputCode: '',
      getData: '',
      idTransaction: '',
      getCode: 0,
      dp: 0,
      minimal: 0,
      date: new Date().toLocaleDateString()
    }
  },
  props: ['sendId'],
  methods: {
    buyNow () {
      if (this.getCode == this.inputCode) {
        let transactionId = this.idTransaction
        let brand = this.getData.brand
        let name = this.getData.name
        let dp = this.dp
        let date = this.date
        let minus = this.getData.price - dp
        axios({
          method: 'post',
          url: 'http://dreamcarserver.dreamcarofficial.com/transactions',
          data: {
            transactionId,
            brand,
            name,
            dp,
            date,
            minus
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            swal.fire({
              type: 'success',
              title: 'Yeahh',
              text: data.msg
            })
            this.$router.push(`/product/${brand}`)
          })
          .catch(err => {
            swal.fire({
              type: 'warning',
              title: 'Oooops!',
              text: err.msg
            })
          })
      } else {
        swal.fire({
          type: 'error',
          title: 'oops',
          text: 'Wrong Code'
        })
      }
    },
    getRandomId () {
      for (let i = 0; i < 15; i++) {
        let alpa = 'fjakfndopqierpqwiofhqwpfnkdsnc3841074832519çƒ∂å∂∑œ∂ø∑ç˚∂ß˜µç˚¬ß∂∆¬√µ∂ßåçπœ–¬π≥®…≥ç…®≥π£º•£™¢¡ºˆ¡¢¡π¢øç√≠¡353284734123438478356'
        let random = Math.floor(Math.random() * alpa.length)
        this.idTransaction += alpa[random]
      }
    },
    fetchProduct () {
      this.getRandomId()
      axios({
        method: 'get',
        url: `http://dreamcarserver.dreamcarofficial.com/products/sc/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let price = data.price
          let min
          if (data.brand == 'Lamborghini') {
            min = 45
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 420
          } else if (data.brand == 'Honda') {
            min = 15
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 450
          } else if (data.brand == 'Ferrari') {
            min = 40
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 225
          } else if (data.brand == 'Audi') {
            min = 35
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 500
          } else if (data.brand == 'Toyota') {
            min = 15
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 190
          } else if (data.brand == 'BMW') {
            min = 35
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 775
          } else if (data.brand == 'Mercedes-Benz') {
            min = 40
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 772
          } else {
            min = 30
            this.dp = price - ((min * data.price) / 100)
            this.getCode = 335
          }
          this.minimal = min
          this.getData = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$awn.info('Waiting Create Transaction', setTimeout(() => {
      this.fetchProduct()
      this.$awn.success('Success create transaction')
    }, 2000))
  }
}
</script>

<style scoped>
input{
  width:70px !important;
}
span{
  color:red;
  margin-left: 10px;
}
.container11 {
  justify-content: center;
  align-items: center;
  height: 45vh;

  perspective: 100vw;
  perspective-origin: center;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.cards {
  width: 650px;
  height: 370px;
  border-radius: 10px;

  overflow: hidden;
  position: relative;

  background: #0f0f0f;

  transform-style: preserve-3d;
  transition: all ease 1000ms;
}

.cards:hover {
  transform: rotate3d(1, -0.5, 0, 16deg);
  box-shadow: 3px 6px 15px 0px #0000005f
}

.cards:after {
  width: 200%;
  height: 120%;

  content: "";
  background: linear-gradient(
    115deg,
    #ffffff00,
    #f5f9ff23,
    #ffffff00
  );

  top: 0;
  left: 0;

  transition: all ease 600ms;
}

.cards:hover:after {
  left: -100%;
  top: -20%;
}

.cards-content {
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 10px
}

.outlined-box {
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  border: 1px solid gold;

  color: violet;
  text-align: center;
  align-items: center;
  font-size: 34px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 300;
}

.title {
  color: #b3b3b3;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 25px;
  letter-spacing: 1.35px;
}

.subtitle {
  color: #b3b3b3;
  margin: -10px 10px;
  font-weight: 300;
  font-size: 19px;
  letter-spacing: 2px;
}
li{
  display: inline-block;
}

</style>
