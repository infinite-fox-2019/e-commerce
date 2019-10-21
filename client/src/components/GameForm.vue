<template>
  <v-row justify="center" class="user-form" v-if="loggedUser !== 'james_ciri@yahoo.com'">
    <v-card>
      <v-card-title>
        <span class="headline" >Add game</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name*" required v-model="game.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Description*" required v-model="game.description"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-select
                    :items="platform"
                    label="Platform*"
                    v-model="game.chosenPlatform"
                ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Unit price*" required v-model="game.price"></v-text-field>
            </v-col>
             <v-col cols="12">
              <v-text-field label="Stock*" required v-model="game.stock"></v-text-field>
            </v-col>
             <v-col cols="9">
              <v-file-input label="Image*" show-size required placeholder="Featured image for the game" accept="image/*" @change="updateFile"></v-file-input>
            </v-col>
            <v-col cols="4">
                <v-checkbox label="Deal*" value v-model="game.deal"></v-checkbox>
            </v-col>
          </v-row>
          <div v-if="errorToasts.showAddGameError">
            <div style="color:red" v-for="(error,i) in errors.addGame" :key="i">
              {{ error }}
            </div>
          </div>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="addGame(game)">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      game: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        chosenPlatform: '',
        deal: '',
        image: ''
      },
      platform: ['Switch', 'Playstation', 'Xbox']
    }
  },
  methods: {
    updateFile: function (file) {
      this.game.image = file
    },
    ...mapActions(['addGame'])
  },
  computed: {
    ...mapState(['loggedUser', 'errorToasts'])
  }
}
</script>

<style>

</style>
