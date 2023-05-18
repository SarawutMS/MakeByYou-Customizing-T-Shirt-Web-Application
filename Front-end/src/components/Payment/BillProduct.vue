<template>
  <transition name="bounce">
    <div v-if="showBill">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header ">
              <slot name="header"> บิล </slot>

              <span @click="$emit('close')"
                ><i class="bi bi-x-lg text-warning"></i>
              </span>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="text-center">
                  <small class="text-dark fs-5 fw-bold">สินค้าของคุณ</small>
                  <div
                    class="overflow-auto mt-3"
                    style="width: 100%; height: 90%; position: absolute"
                  >
                    <div v-for="bill in bills.shirts">
                      <div v-for="shirt in bills.Shirts">
                        <div
                          class="d-flex border-bottom py-2 align-items-center text-start px-3"
                          v-if="bill.shirt_id == shirt._id"
                        >
                          <div class="">
                            <small style="font-size: x-small" class="fw-bold">
                              Name: {{ shirt.nameshirt_ }}
                              <br />
                              Size: {{ bill.size }}
                              <br />
                              Price: ฿{{ bill.count * bill.price }}
                              <br />
                              Count: {{ bill.count }}
                            </small>
                          </div>

                          <div class="ms-auto">
                            <div class="row">
                              <div class="col">
                                <Shirts
                                  :data="{
                                    _type: shirt.property._type,
                                    shirt: shirt.shirt_path.front,
                                    color: shirt.property.color,
                                    position: 'front',
                                  }"
                                  width="80px"
                                />
                              </div>
                              <div class="col">
                                <Shirts
                                  :data="{
                                    _type: shirt.property._type,
                                    shirt: shirt.shirt_path.back,
                                    color: shirt.property.color,
                                    position: 'back',
                                  }"
                                  width="80px"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </slot>

              <div class="modal-footers">
                <slot name="footer"> </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script scoped>
import Shirts from "@/components/Shirts/Shirts.vue";
export default {
  name: "BillProduct",
  props: ["showBill", "bills"],
  emits: ["close", "confirm"],
  updated() {},
  data() {
    return {
      totalBill: 0,
    };
  },
  computed: {},
  components: { Shirts },
  mounted() {
    this.totalData();
  },
  computed: {},
  methods: {
    totalData() {
      for (let i in this.bills) {
        if (i == "shirts") {
          for (let c in this.bills[i]) {
            this.totalBill += this.bills[i][c].count * this.bills[i][c].price;
          }
        }
      }

      this.$emit("totalMoney", this.totalBill);
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
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
 
  color: #030303;
  font-size: large;
  font-weight: 900;
}

.modal-body {
  margin: 20px 0;
  position: relative;
  height: 90%;
}

.modal-footers {
  /* */

  position: absolute;
  bottom: 0;
  right: 0;

  padding: 20px 50px 20px 50px;

  max-width: 100%;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
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

  .modal-container {
    width: 450px;
    height: 700px;
    position: relative;
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


  .fade-enter-active,
.fade-leave-active {
  width: inherit;
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
