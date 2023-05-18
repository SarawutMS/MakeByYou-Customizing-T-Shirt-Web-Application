<template>
    <div class="container breakpoin">
        <div class="row p-2">
            <b class="text-center border-bottom p-2">
                <i class="bi bi-shop-window"></i>
                Design Gallery
            </b>
        </div>
        <div class="row ">


            <Shirt_Component v-for="item of data" :data_="item" :pages="'gallery'" @close="this.$emit('cart')" />

        </div>
    </div>

</template>
<script scope>
import Shirt_Component from '@/components/Menu_bar/Shirt_Component.vue';
import axios from 'axios';
export default {
    name: "Gallery",
    components: {
        Shirt_Component,
    },
    emits: ['cart'],
    data() {
        return {
            data: [],

            localhost:window.location.host,

        }

    },
    mounted() {
        axios.get(`http://${this.localhost}/services/arm_service/shirts/gallery`)
            .then(response => {
                this.data = response.data;

            })
            .catch(error => {
                console.log(error);
            });


    },
    methods: {
        closeFn(ev) {

            this.$emit('cart');

        },

    }

};

</script> 

<style lang="scss" scoped>
@media (min-width: 1400px) {



    .breakpoin {

        padding-inline: 10%;
    }
}
</style>
