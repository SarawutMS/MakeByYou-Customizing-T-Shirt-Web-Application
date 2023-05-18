<template>
  <Transition name="modal" appear>
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <div></div>
                <span @click="$emit('close')"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="container p-3" :class="BG_None">
                  <b>
                    <i class="bi bi-wallet2"></i>
                    รายการรอชำระเงิน
                  </b>
                </div>

                <div class="row text-center bg-light border p-2">
                  <div class="col-5">
                    <b> วันที่</b>
                  </div>

                  <div class="col-3">
                    <b>สถานะ</b>
                  </div>
                  <div class="col">
                    <b> </b>
                  </div>
                </div>

                <div style="height: 400px; overflow-x: hidden">
                  <div
                    class="row text-center p-2 border-bottom align-items-center"
                    v-for="(item, key) in data"
                  >
                    <div class="col-5" style="font-size: 10px">
                      {{ item.date }}
                    </div>

                    <div class="col-3">
                      <div class="row text-center">
                        <span
                          :class="[
                            item.state
                              ? 'text-success bi bi-check-square-fill'
                              : 'text-warning bi bi-exclamation-square-fill',
                          ]"
                        >
                        </span>
                        <text style="font-size: xx-small" class="text-secondary">
                          {{ WaitPay(key) }}
                        </text>
                      </div>
                    </div>
                    <div class="col" v-if="item.state">
                      <i
                        class="bi bi-receipt fa-2xs mx-3 text-secondary"
                        style="font-size: 18px"
                        @click="showModalPayment = !showModalPayment"
                      ></i>
                    </div>
                    <div class="col" v-else>
                      <i
                        class="bi bi-eye fa-2xs mx-3 text-primary"
                        style="font-size: 18px"
                        @click="showModalPayment = !showModalPayment"
                      ></i>
                      <i
                        class="bi bi bi-x-octagon fa-2xs text-danger"
                        style="font-size: 18px"
                        @click="Cancel(item._id)"
                      ></i>
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <Transition name="modal">
    <div v-if="showModalPayment">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                ชำระเงิน/หลักฐาน

                <span @click="showModalPayment = !showModalPayment"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <!-- img -->
                <div class="row container">
                  <div class="col">
                    <div class="text-center align-items-center">
                      <img :src="this.Tes" style="height: 125px; width: 125px" />
                    </div>
                  </div>
                  <div class="col">
                    ---------------------------- ----------------------------- ---
                  </div>
                </div>

                <div class="detail mt-4 border m-3" style="height: 100px">
                  <text class="container"> </text>
                </div>
              </slot>
            </div>
            <b class="ms-3"> แนบไฟล์หลักฐาน </b>
            <div class="modal-footer">
              <slot name="footer">
                <div class="row p-4">
                  <button class="btn btn-warning p-2 col-12" @click="popFileSelector">
                    อัพโหลดรูปภาพ
                  </button>
                  <button class="btn btn-dark p-2 mt-2 col-12" @click="showModal = false">
                    ยืนยันหรือส่งหลักฐานการชำระเงิน
                  </button>

                  <input
                    type="file"
                    @change="handleFiles"
                    id="fileElem"
                    style="display: none"
                    multiple
                    accept="image/*"
                  />
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <AlertVue
    :show-alert="Cancelalert"
    :data="_data"
    @confirm="Confirm"
    @close="Cancelalert = !Cancelalert"
  >
  </AlertVue>
</template>
<script scope>
import AlertVue from "./Alert.vue";
export default {
  name: "Order",
  props: ["showModal"],
  emits: ["update:showModal"],
  components: {
    AlertVue,
  },
  computed: {},
  data() {
    return {
      Modal: false,
      showModalPayment: false,
      user_id: this.$cookies.get("_id"),
      localhost: `localhost:3000`,
      data: [],
      order_id: null,
      Cancelalert: false,
      _data: {},
      previewImg: "",
      Tes: `https://upload.wikimedia.org/wikipedia/commons/a/a5/Allenton_Hippo_QR_Code.jpg`,
    };
  },
  computed: {
    BG_None() {
      if (this.data.length < 1) {
        return "non-Data";
      }
    },
  },
  mounted() {},
  updated() {
    this.Data("page:");
  },
  methods: {
    handleFiles(ev) {
      this.previewImg = URL.createObjectURL(ev.target.files[0]);
    },
    popFileSelector() {
      var el = document.getElementById("fileElem");
      if (el) {
        el.click();
      }
    },
    Data(ev) {
      this.user_id = this.$cookies.get("_id");

      this.axios
        .get(`order/${this.user_id}/${ev}`)
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
          if (response.data.deletedCount) {
            this.Cancelalert = !this.Cancelalert;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    WaitPay(i) {
      let text = "รอชำระเงิน";

      if (this.data[i].state) {
        text = "เรียบร้อย";
      }
      return text;
    },
    Cancel(_id) {
      this.Cancelalert = !this.Cancelalert;
      this._data = {
        head: "แจ้งเตือน",
        body: "คุณต้องการยกเลิกคำสั่งซื้อ",
        type: "danger",
      };
      this.order_id = _id;
    },
    Payment(ev) {
      this.$emit("Payment");
    },
    Confirm(ev) {
      this.Data(`delete:${this.order_id}`);
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
