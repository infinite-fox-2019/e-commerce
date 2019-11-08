<template>
    <div id="centering">
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex justify-center align-center">
                    <v-img
                        alt="logo"
                        src="../assets/VNStore.jpg"
                        max-height="500"
                        max-width="100%"
                        contain
                    ></v-img>
                </v-col>
                <v-col cols="12">
                    <router-view />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "login",
    components: {}
};
</script>

<style scoped>
#centering {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>