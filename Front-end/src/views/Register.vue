<template>
  <div class="blackdrop">
    <div class="modal-container">
      <span @click="Close()" class="d-flex justify-content-end mb-5"
        ><i class="bi bi-x-lg text-warning" style="font-size: 18px"></i>
      </span>

      <h4 class="text-secondary mb-3">สมัครสมาชิก</h4>

      <form id="app" @submit="checkForm" action="" method="post">
        <div class="border-bottom row p-2">
          <div class="col-4 col-sm-2">
            <label for="email " style="font-size: small"><b>Email</b></label>
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
          <div class="col-4 col-sm-2">
            <label for="name " style="font-size: small"><b>ชื่อ</b></label>
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
          <div class="col-4 col-sm-2">
            <label for="lastname " style="font-size: small"><b>นามสกุล</b></label>
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
          <div class="col-4 col-sm-2">
            <label for="Password " style="font-size: small"><b>รหัสผ่าน</b></label>
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
          <div class="col-4 col-sm-2">
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
          <div class="btnfoot">
            <button type="submit" class="btn btn-warning">
              <text class="text-white"> สมัครสมาชิก </text>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

import { notify } from "@kyvg/vue3-notification";

export default {
  name: "register",
  props: {
    showModal: Boolean,
  },
  emits: ["Dontlogin", "cartAdd"],
  data() {
    return {
      localhost: window.location.host,
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
        let request = {
          email: this.email,
          name: this.name,
          last_name: this.last_name,
          password: this.pass,
        };

        this.axios
          .post(`/register`, request)
          .then((response) => {
           
            if (response.data.success) {
              request["_id"] = response.data.msg._id;
              console.log(request);
              this.$cookies.set(
                "Logon",
                { state: true, _id: response.data.msg._id, data: request },
                "24h"
              );
              this.re_();
              this.$router.go(-1);

              setTimeout(() => window.location.reload(), 100);

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

    Close() {
      this.$router.go(-1);
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
/* we will explain what these classes do next! 
 background-color: rgba(204, 177, 119, 0.979);*/
.blackdrop {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(44, 44, 44, 0.979);
  display: table;
  transition: opacity 1s ease;
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

.modal-footer {
  position: absolute;
  bottom: 10%;
  right: 10%;
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
  position: relative;
  width: 400px;
  margin: 150px auto;
  padding: 20px 1.5% 10% 1.5%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(255, 208, 0, 0.425);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  padding-bottom: 10%;
}

.modal-header {
  margin-top: 30%;
  color: #030303;
  font-size: large;
  font-weight: 900;
}

@media only screen and (max-width: 820px) {
  .modal-container {
    width: 100%;
    height: 100%;
    padding: 25px;
    margin-top: 0;
    border-radius: 0;
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
