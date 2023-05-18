<template>
  <Transition name="bounce" appear>
    <div id="modal" v-if="Bt">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                เพิ่ม
                <span @click="$emit('close')"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body text-start">
              <slot name="body">
                <div class="my-3 container text-start">
                  <div class="text-secondary" style="font-size: 14px">
                    ข้อมูลการติดต่อสำหรับการจัดส่งสินค้า
                  </div>
                </div>

                <div class="container">
                  <div class="my-3">
                    <text class="text-secondary mx-2">Address Line1 </text
                    ><text class="text-danger"> * </text>
                    <input
                      type="text"
                      class="border-light"
                      style="width: 100%"
                      v-model="data.line1"
                      placeholder="ที่อยู่ Line1"
                      maxlength="50"
                    />
                  </div>
                  <div class="my-3">
                    <text class="text-secondary mx-2">Address Line2 </text
                    ><text class="text-danger"> * </text>
                    <input
                      type="text"
                      class="border-light"
                      style="width: 100%"
                      v-model="data.line2"
                      placeholder="ที่อยู่ Line2"
                      maxlength="50"
                    />
                  </div>

                  <div class="my-3">
                    <text class="text-secondary mx-2"> ZIP Code </text
                    ><text class="text-danger"> * </text>
                    <br />
                    <input
                      type="number"
                      class="border-light"
                      style="width: 30%"
                      v-model="data.zip"
                      placeholder="รหัสไปษณีย์"
                    />
                  </div>

                  <div class="my-3">
                    <text class="text-secondary mx-2"> Phonenumber </text
                    ><text class="text-danger"> * </text>
                    <br />
                    <input
                    placeholder="เบอร์โทรศัทพ์"
                      type="number"
                      class="border-light"
                      v-model="data.phonenumber"
                    />
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                
                  <div class="btn btn-warning p-3 rounded-0" style="width: 100%;" @click="SaveAddress">
                    <small class="fw-bold"> บันทึก</small>
                  </div>
              
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script scope>
export default {
  name: "Add_Address",
  components: {},
  inject: ["user_provide"],
  props: ["_id", "Bt"],
  data() {
    return {
      Show: this.Bt,
      data: {
        line1: "",
        line2: "",
        zip: "",
        phonenumber: "",
        user_id: this.user_provide._id,
      },
    };
  },
  computed: {},
  updated() {
    this.data.line1 = "";
    this.data.line2 = "";
    this.data.zip = "";
    this.data.phonenumber = "";
    this.data.user_id = this.user_provide._id;
  },
  mounted() {},
  methods: {
    SaveAddress(ev) {
      this.axios
        .post(`/users/address`, this.data)
        .then((address) => {
          if (address.data.type) {
            this.$emit("add");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: auto;
}
.detail {
  height: 200px;
}

.no-outline:focus {
  outline: none;
}

.modal-footer {
  position: absolute;

  bottom: 0;

    
 width: 100%;
  
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
  z-index: 9999;
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
    @media screen and (max-height: 750px) {
      height: 100%;
    }
  }
}

.modal-header {

  color: #030303;
  font-size: large;
  font-weight: 900;
  padding: 20px 30px;
}

.modal-body {

  padding: 20px 30px;
  position: absolute;
  width: 100%;
  height: 100%;
}

.modal-default-button {
  float: right;
}

.fade-enter-active,
.fade-leave-active {

  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.position {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .btn {
    width: 200px;
    margin: 25px;
  }
  @media (max-width: 100px) {
    position: fixed;
    .btn {
      width: 100%;
      margin: 0px;
      border-radius: 0px !important;
    }
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
