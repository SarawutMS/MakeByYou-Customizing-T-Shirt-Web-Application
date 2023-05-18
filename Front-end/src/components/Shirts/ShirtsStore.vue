<template>
  <div class="container pt-5" v-if="shirt != null">
    <div class="row head g-1" style="padding: 0 20%">
      <div class="col-12">
        name :
        <text class="text-dark">
          {{ shirt.nameshirt_ }}
        </text>
      </div>
      <div class="col owner">
        <text
          class="text-dark"
          v-if="shirt.user[0]"
          @click="gotoProfile(shirt.user[0]._id)"
        >
          create by {{ `${shirt.user[0].name} ${shirt.user[0].last_name}` }}</text
        >
        <text class="text-dark" v-else> ไม่มีชื่อผู้ใช้ </text>
      </div>
    </div>
    <div class="row body py-5" style="padding: 20%">
      <div class="col-lg-6 col-12">
        <div class="d-flex justify-content-center">
          <Shirts
            :data="
              DataCovert(
                shirt.property._type,
                shirt.shirt_path.front,
                shirt.property.color,
                'front'
              )
            "
            width="200px"
          ></Shirts>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="  ">
          <div class="d-flex justify-content-center">
            <Shirts
              :data="
                DataCovert(
                  shirt.property._type,
                  shirt.shirt_path.back,
                  shirt.property.color,
                  'back'
                )
              "
              width="200px"
            ></Shirts>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center menu">
      <div class="border p-2 foot">
        <text class="text-secondary" style="font-size: x-small">Size </text>

        <div class="row px-2">
          <button
            class="btn btn-outline-dark mx-1 col"
            :class="StateAc(item)"
            @click="Size(name)"
            v-for="(item, name) in size"
          >
            {{ name }}
          </button>
        </div>
        <div class="my-3">
          <div class="count text-center">
            <div class="btn mx-2 p-1 px-2" @click="count -= 1">
              <i class="bi bi-dash-circle-fill"></i>
            </div>
            <input
              class="text-center border-input"
              type="Number"
              :value="Count_condition"
            />

            <div class="btn m-1 p-1 px-2" @click="count += 1">
              <i class="bi bi-plus-circle-fill"></i>
            </div>
          </div>
        </div>

        <div class="acion text-center">
          <button
            type="button"
            class="btn btn-warning text-white"
            style="width: 100%"
            @click="AddCart"
          >
            Add
          </button>
        </div>
      </div>
      <div class="detail p-3 border mx-3 rounded" style="width: 300px">
        <text class="name text-secondary">รายละเอียด </text>
        <div>
          <small class="text-danger" style="font-size: xx-small">
            *ราคาเสื้อรวมค่าผลิตเรียบแล้ว
          </small>
        </div>

        <div v-if="this.shirt.property.color == 'rgb(255,255,255)'">
          <div class="row" style="font-size: x-small">
            <div class="col-6 col-lg-12">
              <div>Size XS S M</div>
              <div>ราคา 289 ต่อตัว</div>
            </div>
            <div class="col-6 col-lg-12">
              <div>Size L</div>
              <div>ราคา 309 ต่อตัว</div>
            </div>
            <div class="col-6 col-lg-12">
              <div>Size XL</div>

              <div>ราคา 359 ต่อตัว</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row" style="font-size: x-small">
            <div class="col-6 col-lg-12">
              <div>Size XS S M</div>
              <div>ราคา 489 ต่อตัว</div>
            </div>
            <div class="col-6 col-lg-12">
              <div>Size L</div>
              <div>ราคา 509 ต่อตัว</div>
            </div>
            <div class="col-6 col-lg-12">
              <div>Size XL</div>

              <div>ราคา 589 ต่อตัว</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shirts from "./Shirts.vue";
function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

export default {
  name: "register",
  inject: ["state", "carts", "user_provide"],
  props: {
    showModal: Boolean,
  },
  components: {
    Shirts,
  },
  emits: ["update", "cartAdd"],
  data() {
    return {
      shirt: null,
      size: { XS: false, S: false, M: false, L: false, XL: false },
      value: "",
      count: 1,
      user: this.user_provide.data,
      shirt_id: this.$route.params._id,
      static_size: "",
      priceShirt: 0,
    };
  },
  computed: {
    Count_condition() {
      if (this.count <= 1) {
        this.count = 1;
      }
      return this.count;
    },

    ShirtType() {
      let list = {
        front: require(`@/assets/img/${this.shirt.property._type}front.png`),
        back: require(`@/assets/img/${this.shirt.property._type}back.png`),
      };
      return list;
    },
    ShirtColor() {
      return `background-color:${this.shirt.property.color}`;
    },
  },
  mounted() {
    this.axios
      .get(`shirts/store/${this.$route.params._id}`, {})
      .then(({ data }) => {
        this.shirt = data[0];
        this.priceShirt = this.shirt.shirtPrice;
      })
      .catch((error) => {
        $state.error();
      });
  },
  methods: {
    DataCovert(_type, shirt, color, position) {
      return { _type: _type, shirt: shirt, color: color, position: position };
    },
    gotoProfile(_id) {
      this.$router.push({
        path: `/Office/${_id}`,
      });
    },
    AddCart(ev) {
      if (!this.state) {
        this.$emit("update");
      } else {
        this.size[0];
        if (Object.values(this.size).find((element) => element)) {
          this.$emit("cartAdd", {
            size: this.static_size,
            count: this.Count_condition,
            shirt_id: this.shirt_id,
            color: this.shirt.property.color,
            priceShirt: this.priceShirt,
          });
        } else {
          this.$notify({
            type: "error",
            text: "กรุณาเลือกไซต์ที่ต้องการ",
          });
        }
        /**/
      }
    },
    Size(ev) {
      for (let i in this.size) {
        this.size[i] = false;
      }
      this.size[ev] = true;
      this.static_size = ev;
    },
    StateAc(state) {
      if (state) {
        return "active";
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* we will explain what these classes do next! */

.border-input {
  border-style: solid;
  border-radius: 20%;
}
.menu {
  @media screen and (min-width: 1000px) {
    margin-top: 10% !important;
    margin-bottom: 25% !important;
  }
}
.detail {
  @media screen and (max-width: 1000px) {
    margin-bottom: 25% !important;
  }
}
.container {
  margin: auto;
}

.img-shirt {
  width: 200px;
}

.foot {
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.404);
  height: fit-content;
}

.foot .name {
  font-size: 18px !important;
}

.foot button {
  width: 60px;
  font-size: 15px;
}

.owner text {
  font-size: small;
  color: rgb(117, 117, 117) !important;
}

.count button {
  height: 35px;
}

.count input {
  width: 100px;
}

@media only screen and (max-width: 900px) {
  .container {
    margin-top: 150px;
  }

  .foot {
    position: fixed;
    top: 90px;
    margin: 0;
    border: none;
  }

  .foot button {
    width: 40px;
    font-size: 10px;
  }

  .foot .name {
    font-size: 12px !important;
  }

  .count button {
    width: 400;
    height: 25px;
  }
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
</style>
