<template>
  <button class="btn btn-dark" @click="AddressModal = !AddressModal">
    <i class="bi bi-house fa-2xs"></i>
  </button>
  <Transition name="bounce" appear>
    <div id="modal" v-if="AddressModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                ที่อยู่

                <span @click="AddressModal = !AddressModal"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body" style="height: 80%">
              <slot name="body">
                <div class="d-flex justify-content-end me-5">
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="Adrress_ac = !Adrress_ac"
                  >
                    เพิ่ม
                  </button>
                  <Add_address
                    :Bt="Adrress_ac"
                    @close="Adrress_ac = !Adrress_ac"
                    @add="updateADD('ADD')"
                  />
                </div>

                <div
                  class="overflow-auto"
                  style="position: relative; max-height: 500px; width: 100%"
                >
                  <div style="">
                    <div class="items my-2" v-for="(item, index) in data">
                      <div class="menu d-flex">
                        <div
                          class="btn btn-sm mx-1"
                          :class="ChoiceS(item.youraddress)"
                          @click="choiceADD(item._id, item.user_id)"
                        >
                          เลือก
                        </div>
                        <div
                          class="btn btn-sm mx-1"
                          @click="Editfuntion(index, textedit, item._id)"
                          :class="editState(edit[index])"
                        >
                          {{ textedit }}
                        </div>
                        <div
                          class="btn btn-danger btn-sm ms-auto"
                          @click="deleteADD(item._id)"
                        >
                          ลบ
                        </div>
                      </div>

                      <div
                        class="my-2 d-flex justify-content-center px-2 align-items-center"
                        v-if="!edit[index]"
                      >
                        <div class="overflow-auto card text-start" style="width: 100%">
                          <div class="show px-2">
                            <p>
                              <b> ที่อยู่จัดส่ง</b>: {{ item.line1 }}
                              {{ item.line2 }}
                            </p>
                            <p>
                              <b> หมายเลขติดต่อ </b>:
                              {{ item.phonenumber }}
                            </p>
                            <p><b> รหัสไปษณีย์ </b>: {{ item.zip }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="text-start card detail p-3 my-2" v-if="edit[index]">
                        <div class="row">
                          <div class="col-4 fw-bold">Address</div>
                          <div class="col">
                            <input
                              @input="(event) => (update.line1 = event.target.value)"
                              :value="item.line1"
                              class="px-2 form-control-plaintext"
                              type="text"
                              placeholder="Line1"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4 fw-bold">Address2</div>

                          <div class="col">
                            <input
                              class="px-2 form-control-plaintext"
                              type="text"
                              placeholder="Line2"
                              @input="(event) => (update.line2 = event.target.value)"
                              :value="item.line2"
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4 fw-bold">Zipcode</div>

                          <div class="col">
                            <input
                              :value="item.zip"
                              @input="(event) => (update.zip = event.target.value)"
                              class="px-2 form-control-plaintext"
                              type="text"
                              placeholder="Zipcode"
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-4 fw-bold">Phonenumber</div>

                          <div class="col">
                            <input
                              :value="item.phonenumber"
                              @input="
                                (event) => (update.phonenumber = event.target.value)
                              "
                              class="px-2 form-control-plaintext"
                              type="text"
                              placeholder="Phonenumber"
                            />
                          </div>
                        </div>
                      </div>

                      <hr />
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footers container text-end">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script scope>
import Add_address from "./Add_address.vue";
export default {
  name: "Select_address",
  components: { Add_address },
  inject: ["user_provide"],

  data() {
    return {
      AddressModal: false,
      Adrress_ac: false,
      edit: [],
      data: [],
      textedit: "แก้ไข",
      update: {
        line1: "",
        line2: "",
        zip: "",
        phonenumber: "",
        user_id: this.user_provide._id,
      },
    };
  },
  computed: {},
  updated() {},
  mounted() {
    this.getAddress();
  },
  methods: {
    Editfuntion(index, data, _id) {
      if (this.edit[index]) {
       
        this.updateADD("select", _id);
      }
      this.edit[index] = !this.edit[index];
    },
    editState(ev) {
      if (ev) {
        this.textedit = "บันทึก";
        return "btn-success";
      } else {
        this.textedit = "แก้ไข";
        return "btn-outline-secondary";
      }
    },
    ChoiceS(ev) {
      if (ev) {
        return "btn-primary";
      } else {
        return "btn-outline-primary";
      }
    },
    getAddress(ev) {
      this.axios
        .get(`/users/address`, {
          params: {
            _id: this.user_provide._id,
          },
        })
        .then((response) => {
          this.data = response.data[0].Address;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateADD(ev, _id) {
      if (ev == "ADD") {
        this.Adrress_ac = !this.Adrress_ac;
      } else {
        let Data = {};
        for (let i in this.update) {
          if (this.update[i]) {
            Data[i] = this.update[i];
          }
        }
        
        Data["address_id"] = _id;
        this.axios
          .put(`/users/changaddress`, Data)
          .then((response) => {
            this.$emit("updateADD");
            this.getAddress();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.getAddress();
    },
    choiceADD(_id, user_id) {
      this.axios
        .put(`/users/address`, { _id: _id, user_id: user_id })
        .then((response) => {
          this.$emit("updateADD");
          this.getAddress();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteADD(_id) {
      this.axios
        .delete(`/users/address`, {
          params: { _id: _id },
        })
        .then((response) => {
          this.getAddress();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
/* we will explain what these classes do next! */
.show {
  height: 100px;
  width: auto;

  p {
    font-size: 3vmin;
    margin: 0;
    @media screen and (min-width: 700px) {
      font-size: 12px;
    }
  }
}
.container {
  margin: auto;
}
.detail {
  height: 200px;
  width: 100%;
  .fw-bold {
    font-size: 3vmin;
  }
  .col {
    input.disabled {
      pointer-events: none;
      color: #aaa;
      background: #f5f5f5;
    }
  }

  @media screen and (min-width: 770px) {
    .fw-bold {
      font-size: 12px;
    }
  }
}

.no-outline:focus {
  outline: none;
}

.modal-footer {
  position: absolute;

  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5%;
  button {
    margin-bottom: 10px;
  }
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
  z-index: 99999;
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
  padding: 20px 30px;
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
      width: 100%;
    }
  }
}
.menu {
  padding: 0;
  width: auto;
}
.modal-header {
  margin-top: 2%;
  color: #030303;
  font-size: large;
  font-weight: 900;
}

.modal-body {
  margin: 20px 0;
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
</style>
