<template>
  <b-container>
    <b-row>
      <b-col>
      <p class="my-4 h1 cart-title">Your Cart List</p>
        <div>
          <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(actions)="row">
              <b-button size="sm" variant="warning" class="mr-1">
                Delete Cart
              </b-button>
            </template>
          </b-table>
          <div class="mt-3">
            <b-button variant="success" class="mr-1"> Checkout </b-button>
            <b-button variant="danger" class="mr-1"> Delete Cart </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  components: {
    
  },
  data(){
    return{
      fields: [
          {
            key: 'last_name',
            sortable: true
          },
          {
            key: 'first_name',
            sortable: true
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
          },
          { 
            key: 'actions', 
            label: 'Actions' 
          }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    }
  }
}
</script>

<style>
  .cart-title{
    font-weight: bold
  }
</style>