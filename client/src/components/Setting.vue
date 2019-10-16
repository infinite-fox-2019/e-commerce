<template>
  <div class="row">
    <div 
        v-for='(product, _id) in theProducts'
        :key='_id'
        class='check'
        >
        <b-card 
            no-body 
            class="overflow-hidden" 
            style="max-width: 540px;"
            >
            <b-row no-gutters>
                <b-col md="6">
                    <b-card-img 
                        :src="product.image" 
                        class="rounded-0"
                        >
                    </b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body 
                        :title="product.brand+ ' ' + product.name"
                        >
                    <b-card-text>
                        <table>
                            <tr>
                                <td>Stock</td>
                                <td>{{product.stock}}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>$ {{product.price}}</td>
                            </tr>
                        </table>
                            <button 
                                type='button' 
                                class='btn-primary'
                                >Edit
                            </button> | 
                            <button 
                                type='button'
                                class='btn-danger'
                                >Delete
                            </button>
                    </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
    props:['theProducts']
}
</script>

<style>
.row{
    display: flex;
}
td{
    width:250px;
}
.check{
    padding:10px
}
.row{
    display:flex;
    flex-wrap: wrap;
}
</style>