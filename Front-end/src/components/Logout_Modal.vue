<template>
    <transition name="alert">
        <div v-if="showModal">

            <div class="alert-mask">

                <div class="alert-wrapper">

                    <div class="alert-container ">

                        <div class="alert-header bg-warning p-3 shadow">
                            <slot name="header">

                                <div class="center  text-white">
                                    คุณต้องการออกจากระบบ
                                </div>
                            </slot>
                        </div>

                        <div class="alert-body ">
                            <slot name="body">

                                !คุณต้องการทำรายการออกจากระบบ
                            </slot>
                        </div>

                        <div class="alert-footers text-end ">
                            <slot name="footer">

                                <div class="btn btn-outline-secondary mx-2" @click="onClickClose">ยกเลิก</div>

                                <div class="btn btn-outline-warning" @click="onConfirm">ออกจากระบบ</div>


                            </slot>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>





</template>
    
<script>
import axios from 'axios';

export default {
    name: "logout_modal",

    props: {
        showModal: Boolean
    },

    data() {
        return {
            localhost: 'localhost',
            localhosts: '103.174.191.75',
            db_users: [],
            count: 0,
            state_login: false,
            email: null,
            password: null,
            log: '____________________',
        }

    },
    mounted() {






    },
    methods: {
        clear_value() {
            this.email = null
            this.password = null
            this.log = '____________________'
        },
        onClickClose(ev) {
            this.$emit('close', { name: 'this.showLogOut', state: false })
            this.clear_value()
        },

        onConfirm(ev) {
            this.$cookies.remove("email");
            this.$cookies.remove("password");
            this.$cookies.remove("_id");
            this.$emit('logOut')
        }

    }
};
</script>
    
    
<style scoped>
/* we will explain what these classes do next! */
input {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: rgb(255, 255, 255);
    width: 100%;

}

.no-outline:focus {
    outline: none;
}


.alert-footers {
    position: absolute;
    bottom: 0;
    padding-bottom: 20px;
    right: 0;
    padding-right: 20px;
}

.alert-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 1s ease;
}



.alert-wrapper {

    display: table-cell;
    vertical-align: middle;
}

.alert-container {
    position: relative;
    width: 300px;
    height: 200px;
    margin: 0px auto;

    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}



.alert-header {
    margin-top: 5%;

    color: #030303;
    font-size: large;
    font-weight: 900;
}

.alert-body {
    margin: 30px 20px 10px 20px;
}

.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.modal-body {
    margin: 30px 20px 10px 20px;
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

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.01s ease;
}


.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}


@media (min-width: 600px) {
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 1s ease;
    }

    .modal-container {
        width: 30%;
        height: 80%;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }
}
</style>