<template>
  <transition name="bounce" :style="show_Modal">
    <div v-if="savemenu">
      <div class="menu-mask">
        <div id="SaveMenu">
          <div class="row">
            <div
              class="col-12 p-3 bg-warning my-lg-1 rounded fw-bold"
              @click="Check_Login"
            >
              Save/Sell
            </div>

            <div
              class="col-12 p-3 bg-dark text-white rounded fw-bold"
              @click="onClickClose"
            >
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <transition name="bounce">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                Save
                <span @click="showModal = onClickClose()"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <div class="overflow-auto p-5" style="height: 80%">
                  <div class="row">
                    <div class="col-lg-6 col-12">
                      <div class="d-flex justify-content-center">
                        <Shirts
                          :data="
                            DataCovert(
                              this.typeshirt,
                              canvasdata.front,
                              this.color_shirt,
                              'front'
                            )
                          "
                          width="200px"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6 col-12">
                      <div class="  ">
                        <div class="d-flex justify-content-center">
                          <Shirts
                            :data="
                              DataCovert(
                                this.typeshirt,
                                canvasdata.back,
                                this.color_shirt,
                                'back'
                              )
                            "
                            width="200px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 p-4 pb-2">
                      <label for="staticEmail">
                        <b class=""> ชื่อแบบเสื้อ {{ shirt_name }}</b>
                      </label>
                    </div>
                    <div class="col-12">
                      <input
                        type="text"
                        class="form-control-plaintext border ps-1"
                        id="staticEmail"
                        v-model="shirt_name"
                        placeholder="ชื่อเสื้อ"
                      />
                    </div>
                  </div>

                  <div class="row pt-4 pb-2">
                    <label
                      class="form-check-label fw-bold mx-2 text-danger"
                      for="flexCheckDefault"
                      style="font-size: xx-small"
                    >
                      *แสดงรูปแบบเสื้อในหน้าหลักของร้านค้า
                    </label>
                    <div class="col my-2 ms-2">
                      <input
                        class=""
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        v-model="permission_check"
                      />
                    </div>
                    <div class="col-10">
                      <label
                        class="form-check-label fw-bold"
                        style="font-size: 14px"
                        for="flexCheckDefault"
                      >
                        แสดงใน Design Gallery เพื่อให้คนอื่นสามารถเลือกซื้อได้
                      </label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 pt-1 p-4 pb-1">
                      <label for="staticEmail">
                        <b class=""> รายละเอียด </b>
                      </label>
                    </div>
                    <div class="col-12">
                      <textarea
                        type="text"
                        class="form-control-plaintext border"
                        rows="4"
                        v-model="detail"
                        cols="50"
                      >
 รายละเอียด </textarea
                      >
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footers" @click="Save_explore">
              <!--   @click="Save_explore" -->
              <slot name="footer">
                <div class="">
                  <div class="btn btn-warning p-3 rounded-0" style="width: 100%">
                    <small class="fw-bold"> Save</small>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Shirts from "@/components/Shirts/Shirts.vue";
export default {
  name: "save",
  props: ["canvasdata", "savemenu", "typeshirt", "property"],
  emits: ["close", "save", "alert"],
  inject: ["state"],
  components: { Shirts },
  data() {
    return {
      saveClick: false,
      showModal: false,
      shirt_name: "",
      permission_check: false,
      detail: null,
      color_shirt: null,
      shirt_price: null,
    };
  },

  computed: {
    Condition() {
      if (this.shirt_price < 1) {
        this.shirt_price = 1;
      }
    },
    show_Modal() {
      if (this.showModal) {
        return "display:none;";
      }
    },

    close() {
      return this.saveMenu;
    },
  },
  updated() {
    this.color_shirt = this.property.color;
  },
  mounted() {
    this.type = this.typeshirt;
  },
  methods: {
    DataCovert(_type, base64, color, position) {
      return { _type: _type, base64: base64, color: color, position: position };
    },
    Buy_now() {
      this.$emit("Buy_now");
    },
    Modal_Show() {
      this.showModal = !this.showModal;
    },
    Check_Login() {
      if (this.state) {
        this.Modal_Show();
      } else {
        this.$emit("login");
      }
    },
    test(ev) {},
    Save_explore(ev) {
      if (this.shirt_name == "") {
        this.$emit("alert", {
          head: "แจ้งเตือน",
          body: "กรุณากรอกชื่อแบบเสื้อ",
          type: "warning",
          tool: "some",
        });
      } else if (this.shirt_price == 0) {
        this.$emit("alert", {
          head: "แจ้งเตือน",
          body: "กรุณากำหนดราคาของคุณ",
          type: "warning",
          tool: "some",
        });
      } else {
        this.$emit("save", {
          head: "คุณต้องการบันทึกข้อมูล",
          body: "ยืนยันการเพิ่มข้อมูลลงในฐานข้อมูล",
          type: "warning",
          tool: "full",
          container: {
            nameshirt_: this.shirt_name,
            detail: this.detail,
            permission: this.permission_check,
            price: this.shirt_price,
          },
        });
      }
    },
    onClickClose(event) {
      this.$emit("close");
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
/* we will explain what these classes do next! */

/* Enter and leave animations can use different */
/* durations and timing functions.              */

#SaveMenu {
  width: 100%;
  position: fixed !important;
  z-index: 9998;
  bottom: 0;

  text-align: center;

  @media (min-width: 900px) {
    width: 20%;
    bottom: 26%;
    left: 28%;

    text-align: center;
    margin-bottom: 100px;
    padding: 20px 20px 20px 40px;
    background-color: rgba(190, 190, 190, 0.082);
    border-radius: 10px;
  }
}

.detail {
  height: 200px;
}

.shirt_choice:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

.ms-save {
  width: 155px;
}

.modal-mask {
  position: fixed;
  z-index: 9997;
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

  @media screen and (min-width: 1000px) {
    width: 450px;
    height: 700px;
  }
}

.modal-header {
  color: #030303;
  font-size: large;
  font-weight: 900;
  padding: 20px 25px;
}

.modal-body {
  position: absolute;
  height: 100%;
  width: 100%;
}

.modal-footers {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.modal-default-button {
  float: right;
}

.menu-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0); */
  display: table;

  transition: opacity 1s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-containers,
.modal-leave-active .modal-containers {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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

.show-enter-active,
.show-leave-enter {
  transform: translateX(0);
  position: fixed;
  width: 100%;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  transition: all 0.3s linear;
}
.show-enter,
.show-leave-to {
  position: fixed;
  width: 100%;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  transform: translateX(100%);
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  transition: opacity 1s ease;
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
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
