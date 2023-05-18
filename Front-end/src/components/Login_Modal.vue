<template>
  <transition name="bounce">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <div class="d-flex" style="width: 100%">
                  <div>เข้าสู่ระบบ</div>

                  <div class="ms-auto" @click="Close()">
                    <i class="bi bi-x-lg text-warning"></i>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div class="text-center mb-5">
                  <h3 class="text-dark">Make By You</h3>
                </div>

                <div class="border-bottom row p-2">
                  <div class="col-4">
                    <label for="email " class=""><b>อีเมล</b></label>
                  </div>
                  <div class="col">
                    <input
                      type="text"
                      v-model="email"
                      id="staticEmail"
                      name="email"
                      placeholder="อีเมล"
                      class="no-outline"
                    />
                  </div>
                </div>

                <div class="border-bottom row p-2">
                  <div class="col-4">
                    <label for="pass " class=""><b>รหัสผ่าน</b></label>
                  </div>
                  <div class="col">
                    <input
                      v-model="password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="รหัสผ่าน"
                      class="no-outline"
                    />
                  </div>
                </div>

                <transition name="alert">
                  <div v-if="WarpAlert">
                    <div class="container mt-5" style="">
                      <p class="m-0 text-end">
                        <text class="text-warning" style="font-size: small"
                          >!! ไม่สามารถเข้าสู่ระบบได้</text
                        >
                      </p>
                      <p class="m-0 text-end">
                        <text class="text-danger" style="font-size: small"
                          >*กรุณาตรวจสอบอีเมลและรหัสผ่านให้ถูกต้อง</text
                        >
                      </p>
                    </div>
                  </div>
                </transition>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <div class="d-grid gap-1">
                  <button class="btn btn-warning p-2 rounded-0" @click="login()">
                    Login
                  </button>
                  <button class="btn btn-dark p-2 rounded-0" @click="Register">
                    Register
                  </button>
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
import faceBook from "@/facebook/faceBook.vue";
import router from "@/router";
export default {
  name: "login_modal",
  props: ["showModal"],
  emits: ["close", "confirm"],
  data() {
    return {
      db_users: [],
      count: 0,
      state_login: false,
      email: null,
      password: null,
      log: "____________________",
      WarpAlert: false,
    };
  },
  components: {
    faceBook,
  },
  mounted() {
    //this.getList("http://localhost:3000/services/arm_service/");
  },
  methods: {
    Register(ev) {
      this.$router.push({ name: "Register" });
    },
    getList(api) {
      this.axios
        .get(api)
        .then((response) => {})
        .catch((error) => {});
    },
    Close(event) {
      //this.$router.go(-1)
      this.$emit("close");
      this.clear_value();
    },
    login(ev) {
      const data = { email: this.email, password: this.password };

      this.axios
        .post(`/login`, data)
        .then((response) => {
          this.$cookies.set("Logon", response.data, "24h");

          window.location.reload();
          this.Close();
        })
        .catch((error) => {
          this.WarpAlert = !this.WarpAlert;
          setTimeout(() => {
            this.WarpAlert = !this.WarpAlert;
          }, 2000);
          console.log(error);
        });

      /*
            axios.post(`http://${this.localhost}/services/arm_service/login`, data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
              .then(response => {
                if (response.data.state == "success") {
                  this.log = 'เข้าสู่ระบบเรียบร้อย'




                  this.$cookies.set("email", this.email, '24h');
                  this.$cookies.set("password", this.password, '24h');
                  this.$cookies.set("_id", response.data.id, '24h');
                  this.$emit('login');
                  this.$emit('close');
                } else {

                  this.log = 'อีเมลหรือรหัสผ่านไม่ถูกต้องกรุณาตรวจสอบใหม่'
                }
              })
              .catch(error => {
                console.log(error);
              });

      */
      // this.clear_value()
    },

    clear_value() {
      this.email = null;
      this.password = null;
      this.log = "____________________";
    },
  },
};
</script>

<style scoped lang="scss">
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

.modal-footer {
  position: absolute;
  bottom: 0;

  width: 100%;
  display: block;
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
  width: 100%;
  height: 100%;
  margin: 0px auto;
  position: relative;

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 1s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {

  padding: 40px 30px;
  color: #030303;
  font-size: large;
  font-weight: 900;
  width: 100%;
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

.modal-body {
  padding: 90px 60px;
  position: absolute;
  width: 100%;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  transition: opacity 1s ease;
}

.bounce-leave-active {
  position: fixed;
  width: 100%;
  z-index: 99999;
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

.alert-enter-active {
  animation: bounce-in 0.5s;

  transition: opacity 1s ease;
}

.alert-leave-active {
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

@media screen and (min-width: 900px) {
  .modal-mask {
    position: fixed;
    z-index: 999999;
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
</style>
