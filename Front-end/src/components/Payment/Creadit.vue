<template>
  <button
    type="button"
    class="btn btn-warning text-white p-1 m-1"
    @click="paymentModal = !paymentModal"
  >
    ขอถอนเงิน
  </button>
  <transition name="bounce">
    <div id="modal" v-if="paymentModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container py-3">
            <div class="modal-header">
              <slot name="header">
                ถอนเงิน
                <span @click="paymentModal = !paymentModal"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="d-flex border rounded">
                  <div class="p-2"><text class="fw-bold">ยอดเงินของคุณ </text></div>

                  <div class="p-2 ms-auto">
                    <text class="fw-bold" style="font-size: small"
                      >฿{{ storeMoney }}
                    </text>
                  </div>
                </div>

                <div class="text-danger text-end pt-1" style="font-size: xx-small">
                  *สามารถถอนเงินได้เมื่อมีเคดิตมากกว่า500ขึ้นไป
                </div>
                <div class="content px-2 my-3 py-4 border rounded">
                  <b class=""> โอนเงินไปยัง</b>

                  <div class="py-2">
                    <text class="fw-bold" style="font-size: small"> ธนาคารปลายทาง</text>
                    <div>
                      <select
                        v-model="selected"
                        class="p-2 border"
                        style="width: 100%; font-size: small"
                      >
                        <option disabled value="">เลือกธนาคาร</option>
                        <option>กสิกรไทย</option>
                        <option>ไทพานิช</option>
                      </select>
                    </div>
                  </div>

                  <div class="py-1">
                    <text class="fw-bold" style="font-size: small"> เลขที่บัญชี </text>
                    <div>
                      <input
                        type="text"
                        style="font-size: small"
                        class="border py-1 px-3"
                        v-model="BankNumber"
                        placeholder="123456789"
                        maxlength="10"
                      />
                    </div>
                  </div>
                  <div class="py-1">
                    <text class="fw-bold" style="font-size: small"> จำนวนเงิน</text>
                    <div>
                      <input
                        type="number"
                        style="font-size: small"
                        class="border py-1 px-3"
                        v-model="CountMoney"
                        @input="CheckCredit"
                        placeholder="สามารถถอนเครดิตได้เมื่อมีเครดิตมากกว่า ฿500"
                        :disabled="FiveHundred"
                      />
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footers d-flex" @click="Save_explore">
              <!--   @click="Save_explore" -->
              <slot name="footer">
                <div class="text-center position">
                  <button
                    @click="Check"
                    type="button"
                    class="btn btn-warning p-3 rounded-0"
                    style="width: 100%"
                  >
                    <small class="fw-bold"> โอนเงินเข้าบัญชีธนาคาร</small>
                  </button>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <AlertVue
    :showAlert="showAlert"
    :data="textA"
    @close="showAlert = !showAlert"
    @confirm="orderPayment"
  />
</template>
<script scoped>
import date_time from "@/components/Inputs/date_time.vue";
import AlertVue from "@/components/Alert.vue";
export default {
  name: "payment_modal",
  components: { date_time, AlertVue },
  props: {
    showModal: Boolean,
    data: Object,
  },
  computed: {
    FiveHundred() {
    
      if (this.data.storeMoney <= 500) {
        return true;
      }
    },
    storeMoney() {
      let money = this.data.storeMoney;
      if (this.CountMoney >= this.data.storeMoney) {
        this.CountMoney = this.data.storeMoney;
      }
      money = this.data.storeMoney - this.CountMoney;

      return money;
    },
  },
  data() {
    return {
      selected: "",
      paymentModal: false,
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

      bill_id: null,
      bank: null,
      BankNumber: "",
      CountMoney: "",
      selected: "",
      Non: false,
    };
  },
  mounted() {
    this.storeMoney = this.data.storeMoney;
 
  },
  updated() {},
  methods: {
    orderPayment(ev) {
      this.axios
        .post(`/payments/updatepayments/`, {
          user_id: this.data.user_id,
          banknumber: this.BankNumber,
          countmoney: this.CountMoney,
          Bank: this.selected,
        })
        .then((rep) => {
          this.showAlert = !this.showAlert
          this.paymentModal = !this.paymentModal
        
        })
        .catch((error) => {
          console.log(error);
        });
    
    },
    CheckCredit(ev) {},
    Check(ev) {
      if (this.BankNumber != "" && this.CountMoney != "" && this.selected != "") {
        this.textA = {
          head: "ยืนยันคำสั่งซื้อ",
          body: "การตรวจสอบอาจใช้เวลา 1-2 วันคุณต้องการกดยืนยันหรือมั้ย",
          type: "success",
          tool: "sure",
        };
      } else {
        this.textA = {
          head: "ข้อมูลยังไม่ครบ",
          body: "กรุณากรอกข้อมูลให้ครบ",
          type: "warning",
          tool: "some",
        };
      }

      this.showAlert = !this.showAlert;
    },
  },
};
</script>

<style lang="scss" scoped>
/* we will explain what these classes do next! */
select {
  option:first {
    color: #ffc107;
  }
}
.position {
  width: 100%;
}

.modal-footers {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.container {
  margin: auto;
}
.detail {
  height: 200px;
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

.btn-upload {
  background-color: #ffc107 !important;
  color: rgb(0, 0, 0) !important;
  width: 100%;
}

.btn-confirm {
  background-color: #ffc107 !important;
  color: rgb(0, 0, 0) !important;
  width: 100%;
}

.modal-mask {
  position: fixed;
  z-index: 9995;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
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

  @media screen and (min-width: 1000px) {
    width: 450px;
    height: 700px;
    @media screen and (max-height: 750px) {
      height: 100%;
    }
  }
}

.modal-header {
  margin-top: 2%;
  color: #030303;
  font-size: large;
  font-weight: 900;
  padding: 20px 25px;
}

.modal-body {
  margin: 20px 0;
  padding: 20px 25px;
}

.modal-default-button {
  float: right;
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
