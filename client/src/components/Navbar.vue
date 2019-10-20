<template>
  <div id="navbar">
    <div id="leftSide" class="submenu">
      <h1 @click="toHome">Sansmarket!</h1>
    </div>
    <div id="centerSide" class="submenu">
      <a-input-search
        placeholder="search product"
        @search="onSearch"
        v-model="search"
        style="width: 400px;"
      ></a-input-search>
    </div>
    <div id="rightSide" class="submenu">
      <a-badge :count="user.cart.length" class="cart" @click="toCart" v-if="isLogin">
        <a-avatar
          shape="square"
          :count="user.cart.length"
          :style="{ backgroundColor: '#FF9671', verticalAlign: 'middle'}"
        >
          <a-icon type="shopping-cart" />
        </a-avatar>
      </a-badge>

      <a-divider type="vertical"></a-divider>

      <a-popover trigger="hover">
        <template slot="content">
          <p>track your transaction here</p>
        </template>
        <a-badge v-if="isLogin" class="cart" @click="toTransaction">
          <a-avatar shape="square" :style="{ backgroundColor: '#0171BB', verticalAlign: 'middle'}">
            <a-icon type="schedule" />
          </a-avatar>
        </a-badge>
      </a-popover>

      <a-modal title="Transaction Status" v-model="visibleTransaction" @ok="handleTransaction" :footer="null">
        <UserTransactionInfo :transactions="transactions"></UserTransactionInfo>
      </a-modal>

      <a-divider type="vertical"></a-divider>

      <a-button
        id="logoutbtn"
        v-if="isLogin && isAdmin === 'a231kljklasd92131ajldajlsd'"
        @click="toAdmin"
      >
        <a-icon type="robot" />admin
      </a-button>

      <PopconfirmLogout v-if="isLogin"></PopconfirmLogout>
      <a-button id="logoutbtn" v-if="!isLogin" @click="showModal">
        <a-icon type="robot" />log in
      </a-button>
      <a-modal
        :visible="visible"
        style="top:20px; right: -30%; width:200%;"
        footer="Login to be awesome!"
        @cancel="handleCancel"
      >
        <h4>Sansmarket login!</h4>
        <LoginForm @loginSuccess="handleOk" v-if="auth === 'login'"></LoginForm>
        <RegisterForm v-if="auth === 'register'" @registerSuccess="auth = 'login'"></RegisterForm>

        <p v-if="auth === 'login'">
          dont have an account yet?
          <a @click="auth = 'register'">register here</a>
        </p>
        <p v-if="auth === 'register'">
          already a member of Sansmarket?
          <a @click="auth = 'login'">Login</a>
        </p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register";
import PopconfirmLogout from "../components/PopconfirmLogout";
import UserTransactionInfo from '../components/UserTransactionInfo'
import { mapState } from "vuex";

export default {
  name: "navbar",
  components: {
    LoginForm,
    RegisterForm,
    PopconfirmLogout,
    UserTransactionInfo
  },
  data() {
    return {
      visible: false,
      visibleTransaction : false,
      auth: "login",
      search: "",
      transactions: null,
    };
  },
  methods: {
    toTransaction() {
      this.$store
        .dispatch("userTransaction")
        .then(data => {
          this.transactions = data
          this.visibleTransaction = true
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    toCart() {
      this.$router.push("/cart");
    },
    toHome() {
      this.$router.push("/");
    },
    toAdmin() {
      this.$router.push("/admin");
    },
    onSearch(value) {
      this.$store.commit("SEARCHFILTER", this.search);
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      this.visible = false;
    },
    handleTransaction(){
      this.visibleTransaction = false
    },
    logout() {
      this.$router.push("/");
      this.$store.dispatch("logout");
    }
  },
  // computed: mapState(["isLogin", "isAdmin", "user"]),
  computed: {
    ...mapState(["isLogin", "isAdmin", "user"])
  },
  watch: {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster|Varela+Round&display=swap");
#navbar {
  height: 8vh;
  /* background-image: radial-gradient(circle, #ffb398, #ffb88f, #ffbe87, #ffc47f, #f9cc78); */
  background-color: rgb(245, 236, 246);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-family: "Lobster", cursive;
  margin: auto 2vh;
  cursor: pointer;
}
.submenu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: auto 5vh;
}
.submenu a,
.submenu #logoutbtn {
  margin: auto 2vh;
}
a {
  font-family: "Varela Round", sans-serif;
  font-size: 14px;
}
h4 {
  font-family: "Lobster", cursive;
  font-size: 32px;
}
.cart {
  cursor: pointer;
}
p {
}
</style> 