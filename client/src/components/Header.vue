<template>
  <v-toolbar class="elevation-1 header" style="background:#005AC6" :height="90">
    <v-spacer></v-spacer>
    <v-toolbar-title class="headline">
      <span class="white--text">Gameify</span>
      <!--         <span class="font-weight-light">AWESOME DESIGN</span> -->
    </v-toolbar-title>
    <v-text-field
      class="search white--text"
      filled
      rounded
      dense
      label="Search"
      append-icon="mdi-magnify"
      background-color="#0049A6"
    ></v-text-field>
    <v-btn
      text
      class="sign-in-btn accent ml-10 py-6 d-flex"
      @click="showUserFormSignIn"
      v-if="!loggedUser"
    >
      <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
      <div class="text-capitalize">
        Gameify world
        <br />
        <span class="font-weight-light" style="font-size:10px;">Sign in or sign up</span>
      </div>
      <v-icon class="ml-2">mdi-dots-vertical</v-icon>
    </v-btn>
    <v-btn
      text
      class="sign-in-btn accent ml-10 py-6 d-flex"
      v-if="loggedUser"
    >
      <v-icon class="mr-2">mdi-account-circle</v-icon>
      <div class="text-capitalize">
        <span class="font-weight-light" style="font-size:10px;">Welcome:</span>
        <br />{{loggedUser.username}}
      </div>
      <v-icon class="ml-2">mdi-dots-vertical</v-icon>
    </v-btn>
    <v-btn
      text
      class="sign-in-btn accent ml-10 py-6 d-flex"
      v-if="loggedUser"
      @click="logout"
    >
      <v-icon class="mr-2">mdi-account-arrow-right</v-icon>
      <div class="text-capitalize">LOGOUT</div>
      <v-icon class="ml-2">mdi-dots-vertical</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import {
  mdiAccount,
  mdiPencil,
  mdiShareVariant,
  mdiDelete
} from '../../node_modules/@mdi/js'

export default {
  data: function () {
    return {
      icons: [mdiAccount, mdiPencil, mdiShareVariant, mdiDelete]
    }
  },
  methods: {
    ...mapMutations(['showUserFormSignIn']),
    ...mapActions(['logout'])
  },
  computed: {
    ...mapState(['loggedUser'])
  }
}
</script>

<style>
.header {
  justify-content: center;
}

.search {
  color: white !important;
}

.search .v-icon {
  color: white !important;
}

.search label {
  color: white !important;
}

.header span {
  color: white;
}

.sign-in-btn {
  flex-direction: column;
}

.buttons-div {
  height: 50px;
  background-color: yellow;
  justify-content: center;
}
</style>
