<template>
  <div id="itemCardBlanket" class="d-flex flex-wrap container justify-content-around">
    <ItemCard
      v-for="(product, index) in this.$store.state.allProducts"
      :key="index"
      :product="product"
    />
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard.vue";
export default {
  data: function() {
    return {};
  },
  methods: {
    showDeleteModal() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.$swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
    }
  },
  components: {
    ItemCard
  },
  created: function() {
    this.$store.dispatch("fetchAllProducts");
  }
};
</script>

<style scoped>
</style>