<template>
    <b-card id="trans-card"
    overlay
    img-src="https://i.imgur.com/lC5VBJO.png"
    img-alt="Card Image"
    text-variant="white"
    title="Transaction is made, details below:"
    >
    <b-card-text>
        <h5>
        Name: {{userTransaction.name}} <br>
        Address: {{userTransaction.address}} <br>
        Total: ${{userTransaction.total}} </h5>
        <h5>Please kindly wait for our confirmation, thanks for shopping!</h5>
    </b-card-text>
    </b-card>
</template>

<script>
export default {
    props: ['userTransaction', 'checkout']

}
</script>

<style>

</style>