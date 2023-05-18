<template>
  <div>
    <div class="d-lg-flex">
      <div class="list" style="position: relative">
        <div class="bg-white bills" style="position: absolute">
          <div class="text-center"><b> บิลออร์เดอร์ล่าสุดที่มีการสั่งซื้อ </b></div>

          <div
            class="border-bottom"
            v-for="(order, index) in Orders"
            @click="orderData = order"
          >
            <p>_id: {{ order._id }}</p>
            <p>bill_id: {{ order.bill_id }}</p>
            <p>สถานะ: {{ order.state }}</p>
            <p>วันที่: {{ order.date }}</p>
            <p>เวลา: {{ order.time }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white action" style="margin: 50px 10%" v-if="orderData">
     
        <div
          class="d-flex justify-content-center align-items-center"
          style="height: 100%"
        >
          <div class="p-3">
            <div class="text-center py-5">
              <img
                :src="`http://${host}:3015/payments/${orderData.bill_id}.png`"
                alt="ยังไม่มีการยืนยัน"
                height="300"
              /><br />
            </div>
            <button
              type="button"
              class="btn btn-success"
              @click="UpdateOrder(orderData._id, `ผ่าน`)"
            >
              <p>ผ่าน</p>
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              @click="UpdateOrder(orderData._id, `กำลังตรวจสอบ`)"
            >
              <p>กำลังตรวจสอบ</p>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="UpdateOrder(orderData._id, `ไม่ผ่าน`)"
            >
              <p>ไม่ผ่าน</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script scope>
export default {
  name: "confirmPayments",

  data() {
    return {
      ses: "",
      shirt: null,
      bills: "",
      Orders: {},
      orderData: null,
      host: window.location.hostname,
    };
  },
  created() {
    this.getOrder();
  },
  computed: {
    Size() {
      return `width:${this.width};
  
  
        `;
    },
    Canvastype() {
      let type = "";
      switch (this.shirt.property._type) {
        case "womens_crew_": {
          type = `position: absolute;
            width: 43%;
                    right: 28%;
                    top: 15%;`;

          break;
        }
        case "mens_tank_": {
          type = `position: absolute;
                    width: 45%;
                    right: 25%;
                    top: 25%;`;
          break;
        }
        default: {
          type = `position: absolute;
                    width: 45%;
                    right: 28%;
                    top: 15%;`;
          break;
        }
      }
      return type;
    },
    Canvas() {
      const port = 3015;
      console.log(this.shirt.shirt_path);
      return `http://${window.location.hostname}:${port}/shirts/${this.shirt.shirt_path.front}.png`;
    },
    Canvas_() {
      const port = 3015;
      console.log(this.shirt.shirt_path);
      return `http://${window.location.hostname}:${port}/shirts/${this.shirt.shirt_path.back}.png`;
    },
    Shirt() {
      return require(`@/assets/img/${this.shirt.property._type}.png`);
    },
    ShirtColor() {
      return `background-color:${this.shirt.property.color};
  
      `;
    },
  },
  updated() {},
  methods: {
    UpdateOrder(order_id, state) {
      this.axios
        .post(`/orders/state`, { order_id: order_id, state: state })
        .then((response) => {
          this.getOrder();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },

    getOrder(ev) {
      this.axios
        .get(`/Orders`)
        .then((response) => {
          this.Orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    servay(ev) {
      if (this.sas.length >= 23) {
        this.axios
          .post(`/shirts/findshirts`, { _id: this.sas })
          .then((response) => {
            this.shirt = response.data[0];
            console.log(response.data);
            if (!this.shirt) {
              this.shirt = null;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }
    },
  },
};
</script>
<style scoped>
p {
  color: black;
  font-size: small;
}
input,
input::placeholder {
  font: 10px sans-serif;
}

.bills {
  height: 100%;

  overflow: auto;
  width: 100%;
  padding: 6%;
  border-radius: 10px;
}
.list {
  width: 100%;
  height: 500px;
}

.action {
  width: 100%;
  height: 500px;
}
@media screen and (min-width: 1000px) {
  .list {
    width: 40%;
    height: 800px;
  }
  .action {
    width: 100%;
    height: 800px;
  }
  .search {
    width: 30%;
  }
  .user_slot {
    padding: 18px;
    border-radius: 100px !important;
  }
}
.custtom {
  position: relative;
}
.canvas {
  position: absolute;
  width: 70px;
  right: 25%;
  top: 10%;
  border-style: solid;
  border-color: rgb(255, 255, 255);
}

.img-top {
  margin-left: auto;
  margin-right: auto;
}
</style>
