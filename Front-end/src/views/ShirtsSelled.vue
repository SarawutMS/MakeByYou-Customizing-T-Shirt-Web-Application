<template>
  <div class="my-4">
    <div class="textZone">
      <div class="container">
        <div>
          <p class="my-3">ดูแบบเสื้อที่มีคนสั่งซื้อ</p>

          <p class="">
            ยอดเงินทั้งหมดที่ขายเสื้อยืดได้:<text class="text-primary fs-5"
              >{{ pay.AllMoney }}
            </text>
            ฿
          </p>

          <p class="">
            เงินที่แจ้งข้อโอนเงินมายังผู้ขายแล้ว:<text class="text-success fs-5"
              >{{ pay.OwnMoney }} </text
            >฿
          </p>
          <p class="">
            ยอดเงินคงเหลือ:<text class="text-warning">{{ pay.storeMoney }} </text>฿
          </p>
          <div class="d-flex justify-content-end container py-3" v-if="pay">
            <Creadit
              :showModal="paymentModal"
              :data="pay"
              @close="paymentModal = !paymentModal"
            />
          </div>
        </div>
        <div class="text-center bg-white p-3">
          <div class="row fw-bold py-2 border" style="font-size: x-small">
            <div class="col">ไซซ์</div>

            <div class="col">วันที่/เวลา</div>
            <div class="col-2">ราคา</div>
            <div class="col-2">จำนวน</div>
            <div class="col-2">ได้รับ</div>
          </div>
          <div class="overflow-scrol pb-5" style="height: max-content">
            <div v-for="(bill, sinc) in data">
              <div v-for="orders in bill.Orders" v-if="bill != null">
                <div v-for="shirt in bill.shirts">
                  <div
                    class="row value border-bottom d-flex align-items-center"
                    v-if="shirt != null"
                  >
                    <div class="col">{{ shirt.size }}</div>

                    <div class="col">{{ orders.time }} {{ orders.date }}</div>
                    <div class="col-2">{{ shirt.price }} ฿</div>
                    <div class="col-2">{{ shirt.count }}</div>
                    <div class="col-2">{{ 30 * shirt.count }} ฿</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script scope>
import Creadit from "@/components/Payment/Creadit.vue";
export default {
  name: "ShirtsSelled",
  components: {
    Creadit,
  },

  inject: ["state", "carts", "user_provide"],
  data() {
    return {
      paymentModal: false,
      data: {},

      pay: {
        AllMoney: 0,
        OwnMoney: 0,
        storeMoney: 0,
      },
    };
  },
  methods: {
    DataCovert(_type, shirt, color, position) {
      return { _type: _type, shirt: shirt, color: color, position: position };
    },
    getCredits(ev) {
      this.axios
        .get(`/orders/yourcredits/${this.user_provide._id}`)
        .then((rep) => {
          if (rep.data) {
            this.data = rep.data;
           
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPaymentsCredit(ev) {
      this.axios
        .get(`/payments/payments/${this.user_provide._id}`)
        .then((rep) => {
          if (rep.data) {
            this.pay = rep.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCredits();
    this.getPaymentsCredit();
  },
  updated() {},
  created() {},
};
</script>

<style lang="scss" scoped>
.value {
  div {
    font-size: 0.8vmax;
  }
  @media screen and (max-width: 1000px) {
    div {
      font-size: 3vmin;
    }
  }
}

.textZone {
  .container {
    padding: 0 17%;

    @media screen and (max-width: 1000px) {
      padding: 0;
    }
  }
  p {
    font-size: 18px;
    font-weight: bold;
    margin: 5px;
  }
  @media screen and (max-width: 1000px) {
    p {
      font-size: 1.98vmax;
    }
  }
}
</style>
