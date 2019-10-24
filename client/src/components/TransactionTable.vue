<template>
  <div id="transactionBlanket">
    <h4>Transactions</h4>

    <div id="transactionItemTable">
      <b-row id="transactionItem">
        <b-col id="itemCol" cols="4">The Witcher 3: Wild Hunt</b-col>
        <b-col id="priceCol" cols="3">Rp100.000</b-col>
        <b-col id="quantityCol" cols="3">
          Qty: 1
          <b-form-select id="qty" style="max-width: 50%"></b-form-select>
        </b-col>
      </b-row>

      <b-row id="transactionItem">
        <b-col id="itemCol" cols="4">Persona 5</b-col>
        <b-col id="priceCol" cols="3">Rp200.000</b-col>
        <b-col id="quantityCol" cols="3">
          Qty: 2
          <b-form-select id="qty" style="max-width: 50%"></b-form-select>
        </b-col>
      </b-row>

      <p id="totalPrice">Total price: Rp500.000</p>

      <p id="thankYou">Thank you for your purchase.</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#transactionItemTable {
  color: #ffffff;
  font-family: Nunito;
}

#transactionItem {
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

#totalPrice {
  text-align: right;
  font-weight: bold;
  margin-top: 20px;
}

#checkoutButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #74d680, #378b29);
  border: none;
  box-shadow: 0px 10px 5px -5px #111;
}
</style>