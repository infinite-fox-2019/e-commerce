<template>
    <HelloWorld />
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
    components: {
        HelloWorld
    },
    created() {
        this.$awn.tip("Success");
    }
};
</script>
