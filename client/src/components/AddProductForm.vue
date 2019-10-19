<template>
  <div>
    <div class="container form-container">
      <div class="notification has-background-white">
        <form @submit.prevent="addProduct">
          <b-upload v-model="file" style="margin-bottom: 10px;">
            <a class="button is-danger">
              <b-icon icon="upload"></b-icon>
              <span>Product Image</span>
            </a>
            <b-field class="file">
              <span class="file-name" v-if="file">
                {{ file.name }}
              </span>
            </b-field>
          </b-upload>
          <div class="field">
            <div class="control has-icons-right">
              <input v-model="name" class="input" type="text" placeholder="Product Name">
            </div>
          </div>
          <section>
            <div class="block" style="margin: 10px;">
              <b-radio v-for="(series, index) in this.$store.state.seriesDict" :key="`series-${index}`"
                v-model="selectedSeries"
                name="name"
                type="is-danger"
                :native-value="series">
                {{ series }}
              </b-radio>
            </div>
          </section>
          <b-field>
            <div class="number-input-container">
              <div class="number-input-item">
                Price
              </div>
              <div class="number-input-item">
                <div class="field">
                  <div class="control">
                    <input v-model="price" class="input" type="number" value="0">
                  </div>
                </div>
              </div>
            </div>
          </b-field>
          <b-field>
            <div class="number-input-container">
              <div class="number-input-item">
                Stock
              </div>
              <div class="number-input-item">
                <b-numberinput v-model="stock" class="number-input" type="is-danger"></b-numberinput>
              </div>
            </div>
          </b-field>
          <textarea v-model="description" class="textarea" placeholder="Write the description of the product here"></textarea>
          <div class="control">
            <button type="submit" class="button is-danger" style="width: 200px; float: right; margin-top: 40px;">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      selectedSeries: '',
      file: null
    }
  },
  methods: {
    addProduct () {
      let payload = {
        file: this.file,
        name: this.name,
        description: this.description,
        price: Number(this.price),
        stock: this.stock,
        series: this.selectedSeries
      }
      this.$store.dispatch('addProduct', payload)
    }
  }
}
</script>

<style>
.form-container {
  max-width: 900px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 1px 1px 10px 0px #d1d1d1;
}

button {
  width: 100%;
  margin-top: 5px;
}

.admin-show-link {
  margin-bottom: 10px;
  float: right;
  text-decoration: none;
  text-decoration-style: none;
}

.admin-show-link {
  cursor: pointer;
}

.is-text-reddish {
  color: #f73737;
}

.number-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 250px;
  margin: 10px;
}

.number-input-item {
  max-width: 180px;
  margin: 0;
}
.textarea {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
