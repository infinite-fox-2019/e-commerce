<template>
<div class='transss'>
    <div class="container11 flex-column d-flex" v-for='(transaction, _id) in getData' :key='_id'>
        <TransCompt
            :transactions='transaction'
            @fetchData='sendBack'
            :sendData='getData'
            />
    </div>
</div>
</template>

<script>
import TransCompt from '../../../components/TransComp'
import axios from 'axios'

export default {
  data () {
    return {
      getData: ''
    }
  },
  components: {
    TransCompt
  },
  methods: {
    fetchData () {
      axios({
        method: 'get',
        url: 'http://dreamcarserver.dreamcarofficial.com/transactions/admin',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$awn.success('fetching data')
          this.getData = data
        })
        .catch(err => {
          this.$awn.warning('something Wrong')
        })
    },
    sendBack () {
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  }

}
</script>

<style scoped>
.transss{
  margin-top: -10px;
  display: flex;
  flex-wrap: wrap;
  height:50vw;
  overflow: auto
}
.container11 {
    perspective: 100vw;
    perspective-origin: center;
}

</style>
