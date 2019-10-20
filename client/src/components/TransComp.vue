<template>
  <div>
      <div class="cards">
    <div class="cards-content flex-row d-flex">
      <div class="outlined-box">DC</div>
        <div class="d-flex flex-column">
          <span class="title">
          </span>
          <span class="subtitle">
            <ul>
              <li>
                 Transaction ID 
              </li>
              <li>
                <span> {{ transactions.transactionId }} </span>
              </li>
            </ul>
            <ul>
              <li>
                Buyer
              </li>
              <li>
                <span>{{ transactions.buyer }}</span>
              </li>
            </ul>
            <ul>
              <li>
                Purshace
              </li>
              <li>
                <span>{{ transactions.brand+ ' ' +transactions.name }}</span>
              </li>
            </ul>
            <ul>
              <li>
                DP
              </li>
              <li>
                <span>${{ transactions.dp }} </span>
              </li>
            </ul>
            <ul>
              <li>
                Minus
              </li>
              <li>
                <span>${{ transactions.minus }} </span>
              </li>
            </ul>
            <ul>
              <li>
                CreatedAt
              </li>
              <li>
                <span>{{ transactions.date }}</span>
              </li>
            </ul>
            <ul>
              <li>
                <button>Process</button>
              </li>
              <li>
                  <button @click='deleteTransaction(transactions._id)'>Denied</button>
              </li>
            </ul>
          </span>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['transactions','getData'],
    methods: {
        deleteTransaction(id){
            axios({
                method: 'delete',
                url: `http://dreamcarserver.dreamcarofficial.com/transactions/${id}`,
                headers:{
                    token: localStorage.getItem('token')
                }
            })
                .then(({data})=>{
                    this.$awn.success('Transactions deleted!');
                    this.$emit('fetchData');
                    this.getData()
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>

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

span{
  color:red;
  margin-left: 10px;
}

.d-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}
</style>