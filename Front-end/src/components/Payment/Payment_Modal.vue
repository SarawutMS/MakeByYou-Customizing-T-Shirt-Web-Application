<template>
  <transition name="bounce">
    <div class="modal-mask" v-if="this.show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              ชำระเงิน/หลักฐาน

              <span @click="close"><i class="bi bi-x-lg text-warning"></i> </span>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div
                class="overflow-auto p-5 rounded"
                style="position: absolute; height: 76%"
              >
                <!-- img -->

                <div class="row">
                  <div class="col d-flex justify-content-center">
                    <!--<div class="border " style=" padding: 50px 25px 75px 100px;">-->
                    <img
                      v-bind:src="require('@/assets/img/Bank/qr.jpg')"
                      alt="Bootstrap"
                      width="150"
                      height="150"
                    />
                  </div>
                  <div class="col d-flex align-items-center">
                    <text style="font-size: 14px"
                      >โอนเงินผ่าน Mobile & Internet Banking ชำระเงินผ่าน สแกน QR Code
                      ได้เลย</text
                    >
                  </div>
                  <div class="col">
                    <date_time :totalMoney="totalMoney" @update="(ev) => (bank = ev)">
                    </date_time>
                  </div>
                </div>

                <!--<div class="detail mt-4 border">
                            <text class="container">
                            </text>
                            <p>{{ message }} บาท</p>
                        </div>-->

                <div class="Slipt mt-5">
                  <div><b> แนบไฟล์หลักฐาน </b></div>
                  <div class="border p-5 mt-1 text-center">
                    <span v-for="item in previewImg">
                      <img :src="item" style="max-width: 180px" class="py-3" />
                    </span>

                    <font-awesome-icon
                      v-if="previewImg.length == 0"
                      style="font-size: 80px"
                      :icon="['fas', 'file-invoice-dollar']"
                    />
                  </div>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="d-grid">
                <button class="btn btn-outline-warning p-2 rounded-0" @click="popFileSelector">
                  อัพโหลดรูปภาพ
                </button>
                <button type="button" class="btn btn-dark p-2 rounded-0" @click="Check()">
                  ยืนยันหรือส่งหลักฐานการชำระเงิน
                </button>
              </div>
            </slot>
            <!-- Input File -->
            <input
              type="file"
              @change="handleFiles"
              id="fileElem"
              style="display: none"
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>

  <AlertVue
    :showAlert="showAlert"
    :data="textA"
    @close="showAlert = !showAlert"
    @confirm="PaymentSOrders"
  />
</template>
<script>
import date_time from "@/components/Inputs/date_time.vue";
import AlertVue from "@/components/Alert.vue";
export default {
  name: "payment_modal",
  components: { date_time, AlertVue },
  props: {
    showModal: Boolean,
  },

  data() {
    return {
      count: 0,
      textA: {
        head: "แจ้งเตือน",
        body: "กรุณากรอกข้อมูลให้ครบ",
        type: "warning",
        tool: "some",
      },
      showAlert: false,
      message: "",
      previewImg: [],
      imagePayments: "",
      totalMoney: 0,
      bill_id: null,
      bank: null,
      show: false,
    };
  },
  mounted() {
    this.totalMoney = this.$route.query.total;
    this.bill_id = this.$route.query.bill_id;

    this.show = true;
  },

  methods: {
    close(ev) {
      this.show = false;
      this.$router.go(-1);
    },
    Check(ev) {
      if (this.imagePayments.length != 0 && this.bank.bank != "") {
        this.textA = {
          head: "ยืนยันคำสั่งซื้อ",
          body: "การตรวจสอบอาจใช้เวลา 1-2 วันคุณต้องการกดยืนยันหรือมั้ย",
          type: "success",
          tool: "sure",
        };
      }

      this.showAlert = !this.showAlert;
    },
    testC(ev) {
      console.log(ev);
    },
    async PaymentSOrders(ev) {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);

          reader.onerror = (error) => reject(error);
        });

      const fileData = await toBase64(this.imagePayments[0]);
      var base64str = fileData.substring(fileData.indexOf(",") + 1);
      var decoded = atob(base64str);


      await this.axios
        .post(`/bills/payment/`, {
          infor: "sda",
          img: fileData,
          total: this.totalMoney,
          bank: this.bank,
          bill_id: this.bill_id,
        })
        .then((rep) => {
          this.data = rep.data;
        
          this.$router.push({ name: "ListPayment" });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleFiles(ev) {
      this.imagePayments = ev.target.files;

      for (let i in ev.target.files) {
        this.previewImg[i] = URL.createObjectURL(ev.target.files[i]);
      }
    },
    popFileSelector() {
      var el = document.getElementById("fileElem");
      if (el) {
        el.click();
      }
    },
    onClickClose(event) {
      this.$emit("close", { name: "Payment_Modal", state: false });
      return false;
    },
    increaseCount(n) {
      this.count += n;
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

  padding: 3%;
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
