<template>

  <div class="EditProduct">
    <EditProductComp
    :dataFromMain="dataFromMain"
    />
  </div>
</template>

<script>
import axios from '../myAxios/axios'
import EditProductComp from '../components/EditProductComp'

export default {
  props: ['dataFromMain'],
  name: 'editProduct',
  data () {
    return {

    }
  },
  components: {
    EditProductComp
  },
  methods: {

  }
}
</script>

<style>

</style>
