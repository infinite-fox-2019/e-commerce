<template>

  <b-container class="h-100">
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col cols="8" style="margin-top:25vh">      
          <p class="h1 mb-4" style="font-weight:bold;">Register Here...</p>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter password"
                type="password"
              ></b-form-input>
            </b-form-group>
            <p>Have account? Login <router-link to="/login">here.</router-link></p>
            <b-button type="submit" class="mr-2" variant="info">Register</b-button>
            <b-button type="reset" class="mr-2" variant="danger">Reset</b-button>
          </b-form>
        
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>
  body,html{
    height:100%;
  }
</style>