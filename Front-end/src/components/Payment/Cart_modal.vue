<template>
  <div class="text-info parent p-2 card mt-1" style="height: 10px">
    <div class="child">{{ length }}</div>
  </div>
  <div class="views m-1" @click="CartShow">
    <i class="bi bi-cart2 fa-2x text-warning"> </i>
  </div>

  <Transition name="bounce" appear>
    <div id="modal" v-if="showCart">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container py-3">
            <div class="modal-header px-3 ">
              <slot name="header">
                ตะกร้าสินค้า
                <span @click="showCart = !showCart"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div
                  v-if="state"
                  class="overflow-auto p-5 px-3"
                  :class="BG_None"
                  style="height: 65%"
                >
                  <div
                    v-if="cart"
                    class="border-bottom p-1 mx-3"
                    v-for="(item, idex) in cart"
                  >
                    <div class="row">
                      <div class="text-start col">
                        <small style="font-size: x-small" class="fw-bold">
                          Size: {{ item.shirt.size }}
                          <br />
                          Price: ฿{{ item.count * item.price }}
                        </small>
                      </div>
                      <div class="text-end col">
                        <div class="btn px-2" @click="DeleteCart(item._id)">
                          <i class="bi bi-trash2 text-danger"></i>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col d-flex justify-content-center">
                        <Shirts
                          :data="
                            DataCovert(
                              item.shirt_[0].property._type,
                              item.shirt_[0].shirt_path.front,
                              item.shirt_[0].property.color,
                              'front'
                            )
                          "
                          width="100px"
                        ></Shirts>
                      </div>
                      <div class="col d-flex justify-content-center">
                        <Shirts
                          :data="
                            DataCovert(
                              item.shirt_[0].property._type,
                              item.shirt_[0].shirt_path.back,
                              item.shirt_[0].property.color,
                              'back'
                            )
                          "
                          width="100px"
                        ></Shirts>
                      </div>

                      <div class="cart-update">
                        <div class="text-center">
                          <div
                            class="btn mx-2 p-1 px-2"
                            @click="UpdateCart(item._id, item.count, `down`)"
                          >
                            <i class="bi bi-dash-circle-fill"></i>
                          </div>
                          <input
                            class="text-center border-input"
                            type="Number"
                            style="width: 80px"
                            :value="item.count"
                            @input="
                              (event) =>
                                UpdateCart(item._id, event.target.value, `middle`)
                            "
                          />
                          {{ item.shirt.count }}
                          <div
                            class="btn m-1 p-1 px-2"
                            @click="UpdateCart(item._id, item.count, `up`)"
                          >
                            <i class="bi bi-plus-circle-fill"></i>
                          </div>
                        </div>

                        <div class="col text-end"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div
                    class="text-center text-danger"
                    style="height: 400px; padding-top: 50%"
                  >
                    *กรุณาเข้าสู่ระบบเพื่อใช้งานตะกร้าสินค้า
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footer pt-2 bg-white border-top " style="border-radius: 20px 20px 0 0;">
              <slot name="footer">
                <div class="row" v-if="state">
                  <AddressVue :_id="user_id" @nowaddress="(ev) => (address_id = ev)" />

                  <div class="d-flex px-5 py-2">
                    <b > Total </b>
                    <span class="ms-auto my-auto " style="font-size:14px;"> {{ Total }} <small class="fw-bold">THB</small></span>
                  </div>
                  <div class="p-0">
                    <button
                      class="btn btn-confirm col-12 p-2 rounded-0"
                      @click="showAlert = !showAlert"
                      :class="button_disabled"
                    >
                      ยืนยันรายการสั่งซื้อ
                    </button>
                    <button class="btn btn-dark col-12 p-2 rounded-0" @click="moreFun">
                      เลือกสินค้าเพิ่มเติม
                    </button>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div class="d-none" v-if="this.carts">{{ this.carts }}</div>

  <AlertVue
    :showAlert="showAlert"
    :data="textA"
    @close="showAlert = !showAlert"
    @confirm="Order_Create()"
  />
</template>

<script>
import Shirts from "../Shirts/Shirts.vue";
import AddressVue from "@/components/Create/Address/Address.vue";

import AlertVue from "@/components/Alert.vue";
import { objectTypeIndexer } from "@babel/types";
export default {
  name: "cart_modal",
  components: {
    AddressVue,
    Shirts,
    AlertVue,
  },

  emits: ["Edit", "close"],
  inject: ["state", "carts", "user_provide"],
  data() {
    return {
      showAlert: false,
      textA: {
        head: "แจ้งเตือน",
        body: "คุณยืนยันการสั่งซื้อสินค้าหรือไม่",
        type: "warning",
        tool: "sure",
      },
      login: false,

      length: 0,
      cart_: this.carts,

      cart: null,
      showCart: false,

      total: 0,

      cart_shirts: [],
      user_id: 0,
      shirt_id: null,
      cart_id: null,
      color_shirt: null,

      address_id: null,
    };
  },

  computed: {
    BG_None() {
      if (this.cart.length < 1) {
        return "cart_show";
      }
    },
    updatedUser_id() {
      return this.user_id;
    },
    button_disabled() {
      if (!this.state) {
        return "disable";
      }
    },
    Total() {
      let total = 0;

      for (let i in this.cart) {
        total += this.cart[i].price * this.cart[i].count;
      }
      return total;
    },
    cartServe_computed() {
      this.PostCart();
    },
  },
  updated() {
    this.cartServe_computed;

    /*

    if (this.permistion != "del") {
      this.user_id = this.user_provide._id;
      this.cartServe();
    }*/
  },
  created() {},

  mounted() {
    this.GetCart();
  },
  methods: {
    Order_Create() {
      this.axios
        .post(`/carts/createOrders/`, {
          user_id: this.cart[0].user_id,
          address_id: this.address_id,
        })
        .then((response) => {
          this.showAlert = !this.showAlert;
          this.showCart = !this.showCart;

          this.$router.push({ name: "ListPayment" });

          this.GetCart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moreFun() {
      this.showCart = !this.showCart;
    },
    DataCovert(_type, shirt, color, position) {
      return { _type: _type, shirt: shirt, color: color, position: position };
    },

    CartShow(ev) {
      this.showCart = !this.showCart;

      this.GetCart();
    },
    GetCart(ev) {
      this.user_id = this.user_provide._id;

      if (this.state) {
        this.axios
          .get(`/carts/storecarts/${this.user_id}`)
          .then((response) => {
            this.cart = response.data;

            this.length = this.cart.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    PostCart() {
      if (this.cart_ != 0) {
        this.axios
          .post(
            `/carts/storecarts`,
            { cartSide: this.cart_, own_user: this.user_provide.data },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            this.GetCart();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    UpdateCart(_id, count, ac) {
      if (ac == "up") {
        count += 1;
      } else if (ac == "down") {
        if (count > 1) {
          count -= 1;
        }
      } else {
        if (count < 1) {
          count = 1;
        }
      }

      this.axios
        .put(`/carts/update/${_id}`, {
          count: count,
        })
        .then((response) => {
          if (response) {
            this.GetCart();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    DeleteCart(cart_id) {
      this.axios
        .delete(`/carts/drop/${cart_id}`)
        .then((response) => {
          this.GetCart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickClose(event) {
      this.$emit("close", { name: "Payment_Modal", state: false });

      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.cart_show {
  background-image: url("@/assets/icons/MBY.png");
  background-repeat: no-repeat;
  background-size: 150px 150px;
  background-position: center;
  opacity: 0.06;
}
.parent {
  position: relative;
}
.border-input {
  border-style: solid;
  border-radius: 20%;
}
.views {
  z-index: 9992;
  cursor: pointer;
}

.shirt_position {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 128%;
  text-align: center;
  z-index: 0.9;
}

.shirt_add {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 90%;
  text-align: center;
  z-index: 0.9;
}

.shirt_color {
  background-color: v-bind(color_shirt);
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77px;

  text-align: center;
}

.child-can {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45px;
  height: auto;
  text-align: center;
}

/* we will explain what these classes do next! */
.detail {
  height: 150px;
}

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

.lay {
  bottom: 0;
}

.btn-another {
  background-color: #181818 !important;
  color: rgb(255, 255, 255) !important;
}

.btn-confirm {
  background-color: #ffc107 !important;
  color: rgb(0, 0, 0) !important;
}

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
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px auto;

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  @media screen and (min-width: 900px) {
    width: 450px;
    height: 700px;
  }
}

.modal-header {
  color: #030303;
  font-size: large;
  font-weight: 900;
}

.modal-body {
  position: absolute;
  width: 100%;
  height: 100%;
}

.modal-footer {
  /* */

  position: absolute;
  width: 100%;
  bottom: 0;

  display: block;
  // padding: 20px 50px 20px 50px;
}


.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
@media (min-width: 900px) {
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
}

._tank {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 70%;
  text-align: center;
}

._woman {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 100%;
  text-align: center;
}

.crew {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 100%;
  text-align: center;
}

@media (min-width: 1000px) {
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
    width: 30%;
    height: 80%;
    text-align: center;
  }
  .test {
    position: absolute;
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
    width: 60%;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

}

.bounce-leave-active {
  position: fixed;
  width: 100%;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }

100% {
    transform: scale(1);
  }
}
</style>
