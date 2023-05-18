<template>
  <transition name="modal">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                สมัครสมาชิก
                <span @click="showModal = onClickClose()"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <form id="app" @submit="checkForm" action="" method="post">
                  <div class="border-bottom row p-2">
                    <div class="col-4">
                      <label for="email " class=""><b>Email</b></label>
                    </div>
                    <div class="col">
                      <input
                        type="email"
                        id="staticEmail"
                        name="email"
                        placeholder="Email"
                        class="no-outline"
                        v-model="email"
                      />
                    </div>
                  </div>

                  <div class="border-bottom row p-2">
                    <div class="col-4">
                      <label for="name " class=""><b>ชื่อ</b></label>
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        id="name"
                        v-model="name"
                        name="name"
                        placeholder="ชื่อ"
                        class="no-outline"
                        required
                      />
                    </div>
                  </div>

                  <div class="border-bottom row p-2">
                    <div class="col-4">
                      <label for="lastname " class=""><b>นามสกุล</b></label>
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="นามสกุล"
                        v-model="last_name"
                        required
                        class="no-outline"
                      />
                    </div>
                  </div>

                  <div class="row p-2">
                    <div class="col-4">
                      <label for="Password " class=""><b>รหัสผ่าน</b></label>
                    </div>
                    <div class="col">
                      <input
                        type="password"
                        id="pass"
                        name="pass"
                        placeholder="รหัสผ่าน 6 ถึง 10 ตัวเลข"
                        class="no-outline"
                        v-model="pass"
                        @input="confirm_pass"
                      />
                    </div>
                  </div>

                  <div class="border-bottom row p-2">
                    <div class="col-4">
                      <label for="Password ">
                        <span v-html="check_confirm"></span>
                      </label>
                    </div>
                    <div class="col">
                      <input
                        type="password"
                        id="confirm_pass"
                        name="confirm_pass"
                        placeholder="ยืนยันรหัสผ่าน"
                        class="no-outline"
                        v-model="c_pass"
                        @input="confirm_pass"
                      />
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button type="submit" class="btn btn-warning">
                      <text class="text-white"> สมัครสมาชิก </text>
                    </button>
                  </div>
                </form>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <text class="text-danger">
                  <small> *กรุณาตรวจสอบข้อมูลให้เรียบร้อยก่อนทำรายการ</small>
                </text>

                <notifications
                  position="top"
                  width="60%"
                  style="margin-top: 6%; margin-left: 10%"
                />

                <button class="btn btn-facebook" @click="showModal = false">
                  Facebook
                </button>
                <button class="btn btn-google" @click="showModal = false">Google</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

import { notify } from "@kyvg/vue3-notification";

export default {
  name: "register_modal",
  props: {
    showModal: Boolean,
  },

  data() {
    return {
      errors: [],
      email: null,
      name: null,
      last_name: null,
      pass: null,
      c_pass: null,
      check_confirm: null,
      pass_confirm: false,
    };
  },
  mounted() {},
  methods: {
    re_(e) {
      (this.email = null),
        (this.name = null),
        (this.last_name = null),
        (this.pass = null),
        (this.c_pass = null),
        (this.check_confirm = null),
        (this.pass_confirm = false);
    },
    confirm_pass(e) {
      if (this.c_pass != "" || this.pass != "") {
        if (this.c_pass == this.pass && this.pass.length >= 6) {
          this.check_confirm = `<div class="text-success">
                              <i class="bi bi-check-circle-fill"></i> <small> ผ่าน </small>
                               </div>`;

          this.pass_confirm = true;
        } else if (this.c_pass != this.pass && this.c_pass != null) {
          this.pass_confirm = false;
          this.check_confirm = `<div class="text-danger">
                              <i class="bi bi-exclamation-circle-fill"></i> <small> ไม่ผ่าน </small>
                               </div>`;
        }
      } else {
        this.pass_confirm = false;
      }
    },
    checkForm(e) {
      var examine = /^[ก-๚a-zA-Z]+$/;
      //if (this.name && this.email) {
      //return true;
      // }
      this.errors = [];
      var check = true;
      if (!this.pass_confirm) {
        notify({
          type: "error",
          text: "กรุณาตรวจสอบรหัสให้ถูกต้อง",
        });
        check = false;
      }

      if (!this.name) {
        notify({
          type: "error",
          text: "กรุณากรอก ชื่อ",
        });
        check = false;
      } else if (!examine.test(this.name)) {
        notify({
          type: "warn",
          text: "ชื่อไม่ถูกต้อง",
        });
        check = false;
      }

      if (!this.last_name) {
        notify({
          type: "error",
          text: "กรุณากรอก นามสกุล",
        });
        check = false;
      } else if (!examine.test(this.last_name)) {
        notify({
          type: "warn",
          text: "นามสกุลไม่ถูกต้อง",
        });
        check = false;
      }

      if (!this.email) {
        notify({
          type: "error",
          text: "กรุณากรอก Email",
        });
        check = false;
      }

      e.preventDefault();

      if (check) {
        /// Axios connect api service
        let data = {
          email: this.email,
          name: this.name,
          last_name: this.last_name,
          pass: this.pass,
        };

        this.axios
          .post(`/register`, data)
          .then((response) => {
            if (response.data == "success") {
              this.re_();
              this.$router.push("/");
              this.$emit("close");
              notify({
                type: "success",
                text: "สมัครสมาชิกสำเร็จ",
              });
            } else {
              notify({
                type: "error",
                text: "อีเมลนี้มีอยู่ในระบบเรียบร้อบแล้ว",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    register_() {
      if (this.email != "") {
   
      }
    },

    onClickClose(e) {
      this.re_();
      this.$emit("close", { name: "this.showRegister", state: false });

      return false;
    },
    increaseCount(n) {
      this.count += n;
    },
  },
};
</script>


<style scoped>
/* we will explain what these classes do next! */
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

.modal-footer .btn:first-child {
  margin-top: 10%;
  width: 100%;
}

.btn-facebook {
  background-color: rgb(66 103 178) !important;
  color: #fff !important;
  width: 100%;
  margin-top: 10% !important;
}

.btn-google {
  background-color: rgb(219 68 55) !important;
  color: #fff !important;
  width: 100%;
  margin-top: 10px !important;
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
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 30%;
  color: #030303;
  font-size: large;
  font-weight: 900;
}

@media (min-width: 1400px) {
  .modal-header {
    margin-top: 5px;
  }

  .modal-container {
    margin: 0px auto;
    padding: 50px 25%;

    transition: all 0.3s ease;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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
</style>
