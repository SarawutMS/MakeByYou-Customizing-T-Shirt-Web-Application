<template>
  <Transition name="modal" appear>
    <div id="modal" v-if="ShirtShow">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                ตะกร้าสินค้า
                <span @click="$emit('close')"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="cart_show py-5" style="height: 300px; width: 100%">
                  <div class="row">
                    <div class="text-start col">
                      <small style="font-size: x-small" class="fw-bold">
                       </small>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col d-flex justify-content-center">
                  
                      <Shirts
                      :data="shirt[0]"
                        width="150px"
                      ></Shirts>
                    </div>

                    <div class="col d-flex justify-content-center">
                      <Shirts
                        :data="shirt[1]"
                        width="150px"
                      ></Shirts>
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footers container">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script scope>
import Shirts from './Shirts.vue';
export default {
  name: "ShortShirts",
  components: {Shirts},
  props: {
    shirt: Object,
    ShirtShow:Boolean
  },
  emits: ["Edit", "close"],
  inject: ["state", "carts", "user_provide"],
  data() {
    return {
       
    };
  },

  computed: {},
  updated() {},
  created() {},

  mounted() {


   
  },
  methods: {
    DataCovert(_type, shirt, color, position) {
      return { _type: _type, shirt: shirt, color: color, position: position };
    },
  },
};
</script>

<style lang="scss" scoped>
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

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  height: 100%;
  margin: 0px auto;
  position: relative;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 1s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  color: #030303;
  font-size: large;
  font-weight: 900;
}

.modal-body {
  margin: 80px 20px 0px 20px;
}

.welcome {
  font-size: large;
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

@media screen and (min-width: 900px) {
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
    width: 450px;
    height: 700px;
  }
}
.container {
  padding: 0 15%;

  margin: auto;
  .value {
    padding: 0 10%;
    width: 1000px;
  }
  @media screen and (max-width: 1000px) {
    padding: 0 0 15%;

    .value {
      width: 100%;
      padding: 0;
    }
  }
}

.detaile {
  p {
    padding: 3px 0 0 3px;
    margin: 0;
    font-size: small;
  }
  @media screen and (max-width: 1000px) {
    p {
      font-size: 3vmin;
    }
  }
}
</style>
