<template>
    <div class="col-4 my-1 px-1 text-center" @click="pop_Modal" v-if="pages == 'gallery' || pages=='profile'">
        <div :class="Page_class">
            <div class="parent">
                <img :class="size_re(type_shirt)" v-bind:src="front_canvas" />
                <img v-bind:src="shirt_front" style="width: 100%;" class="shirt_color">
            </div>
            <div class="font_">
                {{ Name_set(data_.nameshirt_) }}
            </div>
        </div>
    </div>


    <div class="col-4 my-1 px-1 text-center d-none" v-if="pages == 'home'">


        <div @click="pop_Modal">
            <div class="parent">
                <img :class="size_re(type_shirt)" v-bind:src="front_canvas" />
                <img v-bind:src="shirt_front" style="width: 100%;" class="shirt_color">
            </div>
            <div class="font_">
                {{ Name_set(data_.nameshirt_) }}
            </div>
        </div>

    </div>


    <div v-if="pages == 'Modal'" class="mb-3">
        <div class="parent">
            <img :class="size_re(type_shirt)" v-bind:src="front_canvas" />
            <div class="shirt_color shirt_position">

            </div>
            <img v-bind:src="shirt_front" style="width: 100%;">


        </div>
        <div class="font_">
            {{ Name_set(data_.nameshirt_) }}
        </div>
    </div>

    <div v-if="pages == 'Carousel'">
        <div class="parent p-2">

            {{ Name_set(data_.nameshirt_) }}
            <img :class="size_re(type_shirt)" v-bind:src="front_canvas" />
            <div class="shirt_color shirt_position">

            </div>
            <img v-bind:src="shirt_front" style="width: 100%;">
        </div>
    </div>


    <transition name="modal">
        <div v-if="showModals || showModal" class="breakpoin">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header ">
                            <slot name="header">
                                <spam></spam>
                                <span @click="showModal = onClickClose()"><i class="bi bi-x-lg text-warning"></i>
                                </span>
                            </slot>
                        </div>
                        <div class="modal-body ">
                            <slot name="body">
                                <div class="row text-center Image-layOut">
                                    <div class="col-6 parent">
                                        <img v-bind:src="front_canvas" :class="size_re(type_shirt)" />

                                        <div class="shirt_color shirt_add">

                                        </div>

                                        <img class="ms-save " v-bind:src="shirt_front" />
                                    </div>
                                    <div class="col-6 parent">
                                        <img v-bind:src="back_canvas" :class="size_re(type_shirt)" />
                                        <div class="shirt_color shirt_add">

                                        </div>
                                        <img class="ms-save " v-bind:src="shirt_back" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-7">
                                        {{ data_.detail }}
                                    </div>
                                </div>
                                <hr>
                                <div class="container">

                                    <div class="row  " v-for=" value, key in buy">
                                        <div class="col-1 ">
                                            <input class="" type="checkbox" :id='key' :checked="checkbox[key]"
                                                @change="checkbox[key] = !checkbox[key]">
                                        </div>
                                        <div class="col-2 fw-blod">
                                            {{ key }}
                                        </div>
                                        <div class="col-1 input_UD p-0 text-center bg-warning" @click="buy[key] += 1">
                                            + </div>
                                        <div class="col-6 text-center p-0 m-0 input_UD">
                                            <input type="number" class="text-center m-0" :value="buy[key]" :id='key'
                                                @input="Check_num" />
                                        </div>
                                        <div class="col-1 input_UD  bg-warning" @click="Down_num(key)"> - </div>
                                    </div>

                                </div>

                                <hr>

                                <div class="row mx-0">
                                    <div class="col-6">
                                        <small class="fw-bold"> Total </small>

                                    </div>
                                    <div class="col-6 text-end">
                                        <small class="fw-bold"> {{ Price }} THB </small>

                                    </div>
                                </div>


                            </slot>
                        </div>
                        <div class="modal-footers bg-warning text-center " @click="AddCart">
                            <slot name="footer">



                                <div class="   col-12 py-2">
                                    <h3> <b> {{ Button }} </b> </h3>
                                </div>



                            </slot>
                        </div>


                    </div>

                </div>

            </div>

        </div>
    </transition>



</template>
  
<script scope>
import axios from 'axios';
import Cart_modalVue from '../Payment/Cart_modal.vue';
export default {
    name: "Shirt_Component",

    props: ['showModals', 'data_', 'pages'],
    emits: ['close', 'oncart', 'buynow'],
    computed: {




        Button() {
            let Text = 'Add Cart';
            if (this.pages == 'Cart') {
                Text = 'Update';
            }
            return Text;
        },
        Price() {

            let price = 0
            for (let num in this.buy) {






                if (this.checkbox[num]) {
                    this.price = price += this.price_size[num] * this.buy[num]

                }


            }



            return price;
        },



        Page_class() {
            switch (this.pages) {
                case ("gallery"):
                    return 'Layout_border';
                case ("profile"):
                    return '';
            }



        },

    },
    data() {
        return {

            data: [],
            buy: { "XS": 0, "S": 0, "M": 0, "L": 0, "XL": 0, },
            checkbox: { "XS": false, "S": false, "M": false, "L": false, "XL": false, },
            price_size: { "XS": 100, "S": 150, "M": 200, "L": 300, "XL": 350, },
            showModal: false,
            shirt_front: null,
            shirt_back: null,

            front_canvas: null,
            back_canvas: null,
            localhost: 'localhost:3000',
            price: 0,
            getId: this.$cookies.get("_id"),
            color_shirt: null,
        }

    },

    mounted() {
        if (this.pages != 'Cart' && this.pages != 'buynow') {
            this.front_canvas = `http://${this.localhost}/images/${this.data_.shirt_path.front}.png`
            this.back_canvas = `http://${this.localhost}/images/${this.data_.shirt_path.back}.png`
            this.shirt_front = require(`@/assets/img/${this.data_.property._type}front.png`)
            this.shirt_back = require(`@/assets/img/${this.data_.property._type}back.png`)
            this.color_shirt = this.data_.property.color;
            this.type_shirt = this.data_.property._type;
        }


    },
    updated() {
        if (this.pages == 'Cart') {

            this.front_canvas = `http://${this.localhost}/images/${this.data_.path.shirt_path.front}.png`
            this.back_canvas = `http://${this.localhost}/images/${this.data_.path.shirt_path.back}.png`
            this.shirt_front = require(`@/assets/img/${this.data_.path.property._type}front.png`)
            this.shirt_back = require(`@/assets/img/${this.data_.path.property._type}back.png`)
            this.color_shirt = this.data_.property.color;
            this.type_shirt = this.data_.property._type;
            for (let i in this.data_) {
                for (let c in this.buy) {
                    if (i == c) {
                        this.buy[c] = this.data_[i].count;

                        if (this.data_[i].count != 0) {
                            this.checkbox[c] = true;
                        } else {
                            this.checkbox[c] = false;
                        }

                    }

                }

            };
        }



        if (this.pages == 'buynow') {

            this.front_canvas = `http://${this.localhost}/images/${this.data_.shirt_path.front}.png`
            this.back_canvas = `http://${this.localhost}/images/${this.data_.shirt_path.back}.png`
            this.shirt_front = require(`@/assets/img/${this.data_.property._type}front.png`)
            this.shirt_back = require(`@/assets/img/${this.data_.property._type}back.png`)
            this.color_shirt = this.data_.property.color;
            this.type_shirt = this.data_.property._type;

        }

    
    },
    methods: {
        size_re(ev) {
            console.log(ev)
            if (ev == 'mens_tank_') {
                return '_tank'
            } else if (ev == 'womens_crew_') {
                return '_woman'
            } else {
                return 'crew'
            }
        },
        Shirt_type(ev) {

            switch ('') {


                case 'womens_crew_': {

                    __canvases[0].setDimensions({ width: 135, height: 250 });


                    __canvases[1].setDimensions({ width: 135, height: 250 });

                    break;
                }
                case 'mens_tank_': {
                    __canvases[0].setDimensions({ width: 140, height: 200 });


                    __canvases[1].setDimensions({ width: 140, height: 200 });
                    break;
                }
                default: {

                    __canvases[0].setDimensions({ width: 140, height: 250 });


                    __canvases[1].setDimensions({ width: 140, height: 250 });
                    break;
                }
            }
        },
        Name_set(text) {

            let re = text
            if (text.length >= 10) {
                re = `${text.slice(0, 6)}...`

            }
            return re
        },
        AddCart(ev) {

            let shirts = {};
            for (let num in this.buy) {
                if (this.checkbox[num]) {
                    shirts[num] = { 'count': this.buy[num], 'price_size': this.price_size[num] }
                } else {
                    shirts[num] = { 'count': 0, 'price_size': this.price_size[num] }
                }
            }
            let conData = this.data_._id;
            if (this.pages == "Cart") {
                conData = this.data_.path._id;
            } else {

                if (this.pages != "buynow") {
                    this.showModal = !this.showModal;
                }


            }
            shirts['shirt_id'] = conData;
            shirts['aprice'] = this.price
            const json = JSON.stringify({
                'user_id': this.getId,
                shirts
            });





        },
        advance_Modal(ev_data) {

            this.Response(ev_data, true);
        },
        Response(slide, type) {
            axios.get(`http://${this.localhost}/services/arm_service/shirts/home`)
                .then(response => {
                    this.data = response.data[slide];
                    if (type) {
                        this.$emit('showModal', { request: this.data });
                    }


                })
                .catch(error => {
                    console.log(error);
                });
            return this.data
        },
        pop_Modal(ev) {
            this.getId = this.$cookies.get("_id");
          
            this.showModal = true
        },
        Check_num(ev) {
           
            if (ev.target.value <= 0 || ev.target.value == "") {


                ev.target.value = 0
            }
            this.buy[ev.target.id] = parseInt(ev.target.value)

        },

        Down_num(size) {

            if (this.buy[size] <= 0) {
                this.buy[size] = 0;
            } else {
                this.buy[size] -= 1;
            }

        },

        onClickClose(event) {

            this.$emit('close', { '_id': this.data_._id })
            return false;
        },
    }
};
</script>
  
  
<style scoped>
/* we will explain what these classes do next! */

._tank {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45%;
    height: 50%;
    text-align: center;
}

._woman {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 70%;
    text-align: center;

}

.crew {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 70%;
    text-align: center;
}

.shirt_position {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 93%;
    text-align: center;
    z-index: -1;
}


.shirt_add {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 90%;
    text-align: center;
    z-index: -1;
}


.shirt_color {


    background-color: v-bind(color_shirt);

}

.parent {
    position: relative;
}



.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 70%;
    text-align: center;
}


input[type=number]:focus {
    outline: none;
}

.detail {
    height: 200px;
}

.shirt_choice:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.input_UD {
    border: 2px solid rgb(17, 17, 17);


}

input {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: rgb(255, 255, 255);

}

.no-outline:focus {
    outline: none;
}


.ms-save {
    width: 155px;
}

@media (max-height: 500px) {
    .modal-footer {

        display: none;

    }

    .Image-layOut {
        display: none;
    }
}

.modal-footers {



    bottom: 0;
    left: 0;

    position: absolute;

    width: 100%;



}



.font_ {
    font-size: 70%;
}

.Layout_border {

    border: 2px solid rgb(231, 224, 224);
    padding: 10px;
    border-radius: 10px 10px 10px;
}


.btn-upload {
    background-color: #ffc107 !important;
    color: rgb(0, 0, 0) !important;
    width: 100%;

    position: absolute !important;
    bottom: 50px
}

.btn-confirm {
    background-color: #ffc107 !important;
    color: rgb(0, 0, 0) !important;
    width: 100% !important;

    position: absolute !important;
    bottom: 1px
}

@media(min-width: 1400px) {
    .modal-container {

        width: 30%;
        height: 70%;
    }

    .modal-mask {

        width: 100%;
        height: 100%;

    }

    ._tank {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25%;
        height: 50%;
        text-align: center;
    }

    ._woman {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        height: 70%;
        text-align: center;

    }

    .crew {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        height: 70%;
        text-align: center;
    }
}

@media (max-width: 700px) {

    .modal-container {

        width: 100%;
        height: 100%;
    }

    .modal-mask {

        width: 100%;
        height: 100%;

    }
}


@media (max-width: 700px) {

    .modal-container {

        width: 100%;

    }

    .modal-mask {

        width: 100%;
        height: 100%;

    }
}

.modal-mask {
    position: fixed;
    z-index: 9997;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 1s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {

    z-index: 9997;


    position: relative;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
    margin-top: 1%;
    color: #030303;
    font-size: large;
    font-weight: 900;

}



.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}


.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>