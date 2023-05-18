<template>
  <div>
    <div class="d-lg-flex">
      <div class="list" style="position: relative">
        <div class="bg-white bills" style="position: absolute">
          <div class="text-center"><b> บิลออร์เดอร์ล่าสุดที่มีการสั่งซื้อ </b></div>

          <div class="" v-for="(bill, index) in bills">
            <div class="" v-for="shirts in bill.Bill">
              <div class="border-bottom" v-for="(shirt, num) in shirts.shirts">
                <div class="d-flex justify-content-end" style="font-size: x-small">
                  วันที่:{{ bill.date }} เวลา:{{ bill.time }}
                </div>
                <div class="px-3">
                  <div class="px-2">เสื้อ</div>
                  <p class="text-center py-2" @click="Id_Search(shirt.shirt_id)">
                    ไอดีเสื้อ : {{ shirt.shirt_id }}
                  </p>
                  <p>ขนาด : {{ shirt.size }}</p>
                  <p>ไอดีผู้ซื้อ : {{ shirt.own_id }}</p>
                  <p>ราคาคำสั่งซื้อ : {{ shirt.price * shirt.count }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="" style="width: 100%; height: 100%">
        <div class="d-flex justify-content-center pt-4" style="width: 100%">
          <div class="card p-3 search bg-white" style="height: fit-content">
            <small class="text-danger">*ค้นหาด้วย _id เสื้อเท่านั้น</small>
            <div class="row">
              <b class="pb-2 p-2" style="font-size: larger"> ค้นหา </b>
              <div class="col">
                <input
                  v-model="this.sas"
                  class="px-2"
                  style="font-size: xx-small"
                  type="text"
                  placeholder="ช่องค้นหา Object_id เช่น 643d99709a63d344fcca17b1 "
                  @input="
                    (value) => {
                      Id_Search(value.target.value);
                    }
                  "
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white d-lg-flex user_slot mx-lg-3 px-3 px-lg-5 justify-content-center rounded"
          style="height: fit-content"
        >
          <div class="py-5">
       
              <div class="card p-3" style="height: fit-content; min-width: 300px">
                <div>
                  <b> ชื่อเจ้าของเสื้อ </b>

                  <div class="" v-if="this.shirt">
                    <p>_id: {{ shirt.user[0]._id }}</p>
                    <p>email: {{ shirt.user[0].email }}</p>
                    <p>name: {{ shirt.user[0].name }} {{ shirt.user[0].last_name }}</p>
                  </div>

                  <div class="" v-else>
                    <p>_id:</p>
                    <p>email:</p>
                    <p>name:</p>
                  </div>
                </div>
              </div>
        
            <div class="card p-3" style="height: fit-content">
              <div>
                <b> รายละเอียดเสื้อ </b>

                <div class="" v-if="this.shirt">
                  <p>_id:{{ this.shirt._id }}</p>
                  <p>nameshirt_: {{ this.shirt.nameshirt_ }}</p>
                  <p>detail: {{ this.shirt.detail }}</p>

                  <p>shirtPrice: {{ this.shirt.shirtPrice }}</p>
                </div>
                <div class="" v-else>
                  <p>_id:</p>
                  <p>nameshirt_:</p>
                  <p>detail:</p>

                  <p>shirtPrice:</p>
                </div>
              </div>
            </div>

            <div
              class="card"
              style="height: fit-content; width: fit-content"
              v-if="this.shirt"
            >
              <div>
                dowload SVG

                <div class="">
                  <a
                    type="button"
                    class="btn btn-dark"
                    :href="`http://${HOst}/services/mongo/shirts/download/${shirt.shirt_path.front}`"
                    @click="Download(shirt.shirt_path.front)"
                  >
                    Front
                  </a>
        
                  <a
                    type="button"
                    class="btn btn-dark"
                    :href="`http://${HOst}/services/mongo/shirts/download/${shirt.shirt_path.back}`"
                    @click="Download(shirt.shirt_path.front)"
                  >
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center m-lg-5" v-if="this.shirt">
   

            <div class="custtom py-1">
              <canvas
                class="m-1"
                :style="ShirtColor"
                style="position: absolute; width: 90%; height: 90%"
              >
              </canvas>
              <img :src="Canvas" style="opacity: 0.95" :style="Canvastype" alt="..." />
              <img
                :src="require(`@/assets/img/${shirt.property._type}front.png`)"
                class="img-top custtom"
                alt="..."
                style="width: 200px"
              />
            </div>

            <div class="custtom py-2">
              <canvas
                class="m-1"
                :style="ShirtColor"
                style="position: absolute; width: 90%; height: 90%"
              >
              </canvas>
              <img :src="Canvas_" style="opacity: 0.95" :style="Canvastype" alt="..." />
              <img
                :src="require(`@/assets/img/${shirt.property._type}back.png`)"
                class="img-top custtom"
                alt="..."
                style="width: 200px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script scope>
export default {
  name: "Store",

  data() {
    return {
      ses: "",
      shirt: null,
      bills: "",
    HOst:window.location.host ,
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
    Download(ev) {
      this.axios
        .get(`/shirts/download/${ev}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    Id_Search(ev) {
      this.sas = ev;

      this.servay();
    },
    getOrder(ev) {
      this.axios
        .get(`/orders/bills`)
        .then((response) => {
          this.bills = response.data;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
@media screen and (min-width: 1000px) {
  .list {
    width: 40%;
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
