<template>
  <div class="container">
    <div class="text-center" :class="BG_None">
      <b class="p-2">
        <i class="bi bi-clock-history"></i> <text> ประวัติการซื้อ </text>
      </b>
    </div>

    <div v-for="(Order, orin) in data" class="overflow-auto">
      <div v-for="(Bill, index) in data[orin].Bill">
        <div v-for="(shirt, sinc) in Bill.shirts">
          <div
            v-for="(userS, sin) in Bill.Shirts"
            class="d-flex justify-content-center py-1"
          >
            <ShortShirts
              @close="ShirtShow[shirt._id] = !ShirtShow[shirt._id]"
              :ShirtShow="ShirtShow[shirt._id]"
              :shirt="[
                {
                  _type: userS.property._type,
                  shirt: userS.shirt_path.front,
                  color: userS.property.color,
                  position: 'front',
                },
                {
                  _type: userS.property._type,
                  shirt: userS.shirt_path.back,
                  color: userS.property.color,
                  position: 'back',
                },
              ]"
            />

            <div
              class="row border-bottom value py-lg-3 py-2 card"
              v-if="userS._id == shirt.shirt_id"
            >
              <div class="col fw-bold pb-2 d-flex">
                <div class="p-2">#{{ NameFormat(userS.User[0].name, 10) }}</div>
                <div class="p-2 ms-auto text-center" style="font-size: xx-small">
                  {{ Order.time }}
                  <br />
                  {{ Order.date }}
                </div>
              </div>

              <div class="row detaile">
                <div class="col text-center">
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    @click="ShirtShow[shirt._id] = !ShirtShow[shirt._id]"
                  >
                    View
                  </button>
                </div>
                <div class="col d-flex align-items-center">
                  <div class="fw-bold" style="font-size: 10.5px">
                    ชื่อ : {{ NameFormat(userS.nameshirt_, 3) }} <br />
                    Size:{{ shirt.size }}
                  </div>
                </div>
                <div class="col-2 d-flex align-items-end fw-bold">
                  {{ Color(userS.property.color) }}
                </div>
                <div
                  class="col d-flex align-items-end fw-bold justify-content-end"
                  style="font-size: small"
                >
                  ฿{{ shirt.price * shirt.count }}
                </div>
              </div>
              <hr class="my-3 mb-2" />
              <div class="row">
                <div class="col fw-bold" style="font-size: xx-small">
                  จำนวน {{ shirt.count }} ชิ้น
                </div>

                <div class="col text-end">
                  <button
                    type="button"
                    class="btn btn-dark btn-sm"
                    @click="
                      Buyagain(
                        shirt.size,
                        shirt.count,
                        shirt.shirt_id,
                        userS.property.color
                      )
                    "
                  >
                    ซื้ออีกครั้ง
                  </button>
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
import Shirts from "@/components/Shirts/Shirts.vue";
import ShortShirts from "@/components/Shirts/ShortShirts.vue";
export default {
  name: "Orders_Selled",
  components: { Shirts, ShortShirts },
  inject: ["state", "carts", "user_provide"],
  data() {
    return {
      Modal: false,
      See_Modal: false,
      data: {},
      ShirtShow: [],
      user_id: this.user_provide._id,
    };
  },
  mounted() {
    this.getHistoryOrders();
  },
  computed: {
    BG_None() {
      if (this.data.length < 1) {
        return "non-Data";
      }
    },
  },
  methods: {
    NameFormat(name, size) {
      let newName = "";

      for (let i in name) {
        if (i > size) {
          newName += "...";
          break;
        } else {
          newName += name[i];
        }
      }
      return newName;
    },
    DataCovert(data) {},
    Buyagain(size, count, shirt_id, color) {
      this.$emit("cartAdd", {
        size: size,
        count: count,
        shirt_id: shirt_id,
        color: color,
      });
    },
    Color(ev) {
      let text = "ขาว";
      if (ev == "rgb(28, 28, 28)") {
        text = "ดำ";
      }
      return text;
    },
    getHistoryOrders(ev) {
      this.axios
        .get(`/orders/yourhistorybills/${this.user_id}`)
        .then((rep) => {
          this.data = rep.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    width: 550px;
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
