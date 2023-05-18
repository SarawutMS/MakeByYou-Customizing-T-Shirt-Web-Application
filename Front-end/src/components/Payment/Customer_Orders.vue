<template>
  <div class="container-xxl">
    <dvi :class="BG_None">
      <b>
        <i class="bi bi-wallet2"></i>
        รายการรอชำระเงิน
      </b>
    </dvi>
    <div class="row text-center bg-light border p-2 head" v-if="data.length > 1">
      <div class="col-4">
        <b> วันที่/เวลา</b>
      </div>

      <div class="col">
        <b>จัดการ</b>
      </div>

      <div class="col-2">
        <b>สถานะ</b>
      </div>
    </div>

    <div style="height: 400px; overflow-x: hidden body">
      <div v-for="(order, index) in data">
        <div class="row text-center p-2 border-bottom">
          <div class="col-4" style="font-size: 14px">
            {{ order.time }}
            <br />
            {{ order.date }}
          </div>
          <div class="col d-flex justify-content-center" style="font-size: 12px">
            <div
              class="btn btn-outline-dark m-1 p-1 bi bi-receipt-cutoff"
              @click="showBill[index] = !showBill[index]"
            >
              <text> สินค้า </text>
            </div>

            <BillProduct
              :bills="order.Bill[0]"
              :showBill="showBill[index]"
              @close="showBill[index] = !showBill[index]"
              @totalMoney="
                (ev) => {
                  totalMoney[index] = ev;
                }
              "
            />

            <button
              class="btn btn-success m-1 p-1 bi bi-wallet"
              :disabled="order.state != 'ยังไม่ผ่าน'"
              @click="
                $router.push({
                  name: 'Payment',
                  query: { bill_id: order.Bill[0]._id, total: this.totalMoney[index] },
                })
              "
            >
              <text> ชำระเงิน </text>
            </button>
            <button
              class="btn btn-danger m-1 p-1 bi bi-trash"
              @click="AlertSet(order._id)"
              :disabled="order.state != 'ยังไม่ผ่าน'"
            >
              <text> ยกเลิก </text>
            </button>
          </div>
          <div
            class="col-2 d-flex justify-content-center align-items-center"
            style="font-size: small"
          >
            <text class="text-secondary textState">
              {{ order.state }}
            </text>
          </div>
        </div>
    
        <AlertVue
          :showAlert="showAlert"
          :data="textA"
          @close="showAlert = !showAlert"
          @confirm="dropOrders"
        />
      </div>
    </div>
  </div>
</template>
<script scope>
import AlertVue from "@/components/Alert.vue";
import BillProduct from "@/components/Payment/BillProduct.vue";
export default {
  name: "Customer_Orders",
  props: {
    showModal: Boolean,
  },
  components: { AlertVue, BillProduct },
  inject: ["state", "carts", "user_provide"],
  data() {
    return {
      data: [],
      showAlert: false,
      showBill: [],
      totalMoney: [],
      textA: {
        head: "แจ้งเตือน",
        body: "คุณต้องการยกเลิกคำสั่งซื้อสินค้าของคุณหรือไม่",
        type: "danger",
        tool: "sure",
      },
      Order_id: "",
    };
  },
  mounted() {
    this.getOrders();
  },
  computed: {
    BG_None() {
      if (this.data.length < 1) {
        return "non-Data";
      }
    },
  },
  methods: {
    AlertSet(ev) {
      console.log()
      this.showAlert = !this.showAlert;
      this.Order_id = ev;
    },
    Money(ev) {
      this.totalMoney[index] = count * price;

      console.log(ev.Bill);
    },
    dropOrders(ev) {
      console.log(this.Order_id)
      this.axios
        .delete(`/orders/drop/${this.Order_id}`)
        .then((response) => {
          this.getOrders();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOrders(ev) {
      this.axios
        .get(`/orders/yourorders/${this.user_provide._id}`)
        .then((response) => {
          this.showAlert = false;
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  updated() {},
};
</script>
<style scoped lang="scss">
.non-Data {
  font-size: 0px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 40%;
  i {
    font-size: 115px;
  }
}

.container {
  margin: auto;
}
.container-xxl {
  margin: auto;
  @media screen and (min-width: 1144px) {
    padding: 0 17%;
  }
}
.head {
  b {
    font-size: 80%;
  }
}

.btn {
  @media screen and (max-width: 500px) {
    text {
      display: none;
    }
  }
  text {
    font-size: 0.8vmax;
  }
}
.textState {
  font-size: 0.7vmax;
  @media screen and (max-width: 1000px) {
    font-size: 2.2vmin;
  }
}
</style>
