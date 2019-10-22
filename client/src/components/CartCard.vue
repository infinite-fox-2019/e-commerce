<template>

    <div class="list">
        <div class="left-content">
          <h3>
            <b>{{product.name}}</b>
          </h3>
          <h5>{{ product._id }}</h5>
        </div>
        <a-divider type="vertical" />
        <div class="center-content">
          <h5>price : ${{product.price}}</h5>
        </div>
        <a-divider type="vertical" />
        <div class="right-content">
          <a-popconfirm
            title="Are you sure remove this item from your cart?"
            @confirm="confirm(product)"
            @cancel="cancel"
            okText="Yes"
            cancelText="No"
          >
            <a>Remove Item</a>
          </a-popconfirm>
        </div>
      </div>
    </div>

</template>

<script>
export default {
    name : 'CartCard',
    props : ['product'],
    data(){
        return {
            name : `${this.product.name}`,
            price : `IDR ${this.product.price}`
        }
    },
    methods : {
        confirm(payload) {
            this.$store.dispatch('removeFromCart', payload)
            .then( data => {
                
                this.$notification.open({
                    message: "Remove Item Success",
                    description: data.message,
                    icon: <a-icon type="smile" style="color: #108ee9" />
                });
            })
            .catch( err => {
                this.$notification.open({
                    message: "Remove Item Fail",
                    description: data.message,
                    icon: <a-icon type="meh" style="color: #108ee9" />
                });
            })
        },
        cancel(e) {
        this.$message.success("Okay! ganbatte!");
        }
    }
};
</script>

<style scoped>
.lists {
  padding: 3vh 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.list {
  border: 0.1px solid rgb(170, 170, 170, 0.5) !important;
  background-color: white;
  width: 400px;
  padding: 1vh 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1vh;
}
h3,
h5 {
  margin: 1vh;
}
</style>