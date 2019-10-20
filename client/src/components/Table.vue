<template>
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
</template>

<script>
export default {
  data () {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
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
          sortable: true
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
