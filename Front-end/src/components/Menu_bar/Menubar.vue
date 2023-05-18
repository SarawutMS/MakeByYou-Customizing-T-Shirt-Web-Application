<template>
  <nav class="navbar p-0 shadow">
    <div class="container-fluid py-2 bg-white breakpoin">
      <div class="branding">
        <img
          v-bind:src="require(`@/assets/07.png`)"
          alt="Bootstrap"
          width="200"
          height="50"
        />
      </div>

      <div class="d-flex">
        <Cart_Modal @close="click_event" @Edit="Edit_" />

        <!--   Mobile  -->
        <div class="BrowserSize">
          <ListMenu @Login="login = !login" @logout="logout" />
        </div>
      </div>
    </div>

    <div class="menuBrowser">
      <div class="row" v-if="!state">
        <router-link class="col views" :to="{ name: 'Home' }" @click="CloseNave">
          <b>หน้าแรก </b>
        </router-link>

        <router-link
          class="col views"
          :to="{ name: 'Register' }"
          @click="CloseNave"
          v-if="!state"
        >
          <b>สมัครสมาชิก </b>
        </router-link>

        <router-link class="col views" :to="{ name: 'Gallery' }" @click="CloseNave">
          <b>Gallery </b>
        </router-link>

        <div class="col views" @click="login = !login">
          <b> เข้าสู่ระบบ </b>
        </div>
      </div>

      <div class="row" v-else>
        <router-link class="col views" :to="{ name: 'Home' }" @click="CloseNave">
          <b>หน้าแรก </b>
        </router-link>
        <div class="col">
          <div class="dropdown">
            <b class="text-secondary">จัดการ</b>
            <div class="dropdown-content">
              <router-link class="views" :to="{ name: 'Profile' }" @click="CloseNave">
                <b>โปรไฟล์ </b>
              </router-link>
              <br />
              <router-link class="views" :to="{ name: 'ListPayment' }">
                <b>รอชำระเงิน </b>
              </router-link>
              <br />
              <router-link class="views" :to="{ name: 'selled' }" @click="CloseNave">
                <b>แบบเสื้อที่มีการสั่งซื้อ </b>
              </router-link>
              <br />
              <router-link
                class="views"
                :to="{ name: 'Orders_Selled' }"
                @click="CloseNave"
              >
                <b>ประวัติการสั่งซื้อ </b>
              </router-link>
              <br />

              <br />
            </div>
          </div>
        </div>

        <router-link class="col views" :to="{ name: 'Gallery' }" @click="CloseNave">
          <b> Design Gallery </b>
        </router-link>

        <div class="col views" @click="logout">
          <b> ออกจากระบบ </b>
        </div>
      </div>
    </div>
  </nav>

  <div class="WarpMenu">
    <button
      type="button"
      class="btn btn-outline-primary bi bi-pencil"
      @click="$router.push({ name: 'Create' })"
    >
      ออกแบบเสื้อ
    </button>
  </div>

  <Login :showModal="login" @close="login = !login" />

  <!-- The Modal -->
  <Logout_ModalVue :showModal="showLogout" @close="close" @logOut="logOut" />
  <Register_ModalVue :showModal="showRegister" @close="click_event" />

  <OrdersVue
    :showModal="showOrders"
    @Cancel_Alert="OrdersAlert"
    @close="showOrders = !showOrders"
  />

  <AlertVue :showAlert="on_alert" :data="alert_data" @close="on_alert = !on_alert" />
</template>
<script>
import ListMenu from "@/components/Menu_bar/Mobile/ListMenu.vue";
import Logout_ModalVue from "@/components/Logout_Modal.vue";
import Register_ModalVue from "@/components/Register_Modal.vue";
import Login from "@/components/Login_Modal.vue";

import Cart_Modal from "@/components/Payment/Cart_modal.vue";
import AlertVue from "@/components/Alert.vue";
import Edit_Modal from "@/components/Menu_bar/Edit_Modal.vue";
import { notify } from "@kyvg/vue3-notification";
import OrdersVue from "@/components/Orders.vue";

export default {
  name: "menubar",
  inject: ["state", "carts"],

  props: {
    update_: Boolean,
  },
  components: {
    OrdersVue,
    Register_ModalVue,
    Login,
    ListMenu,
    Cart_Modal,
    Logout_ModalVue,
    AlertVue,
  },

  computed: {
    switchs() {
      this.$route.name;

      return [this.isActive ? "shadow bg-warning" : "none"];
    },

    name() {
      return this.$route.name;
    },
  },
  data() {
    return {
      showCustomer: false,
      test_c: false,
      isActiveHome: false,
      isActiveCreate: false,
      isActiveGallery: false,
      showOrders: false,

      login: false,
      Menu_show: false,

      showEdit: false,
      showRegister: false,

      showLogout: false,
      showPayment: false,
      showCart: false,

      act: null,
      alert_data: null,
      on_alert: false,
    };
  },

  updated() {
    this.showWhenNotlogin;
  },
  created() {},
  computed: {
    // computed property that auto-updates when the prop changes
    showWhenNotlogin() {
      if (!this.state) {
        this.update_;
        this.login = true;
      }
    },
    tessst() {
      return this.state;
      if (this.state) {
        this.login = !this.login;
      }
    },
  },
  mounted() {
    this.check_login_();
    let now_ = window.location.pathname.replace("/", "");
  },
  methods: {
    logout(ev) {
      $cookies.remove("Logon");

      this.$router.push({ path: "/" });

      setTimeout(() => window.location.reload(), 100);
    },
    Edit_(ev) {},
    OnPayment(ev) {
      this.showPayment = !this.showPayment;
    },
    OrdersAlert(ev) {
      this.alert_data = ev;

      this.on_alert = !this.on_alert;
    },
    Close(ev) {
      this.Menu_show = false;
    },
    Active(e) {
      this.isActive = !this.isActive;
    },

    test() {},
    check_login_() {
      const login = this.$cookies.get("email");

      if (login != null) {
        this.login = true;
        this.$emit("cart");
      } else {
        this.login = false;
      }
    },
    logOut(ev) {
      this.showLogout = false;
      this.$emit("cart");
      this.check_login_();
      this.CloseNave();
    },
    close(ev) {
      this.showLogout = false;
      this.showEdit = false;
    },
    click_event(ev) {
      this.showLogout = false;
      this.CloseNave();
    },
    submit() {
      this.$emit("submit", 1);
    },
    EndNav() {
      this.Menu_show = false;

      this.clear();
    },

    clear() {
      this.showRegister = false;
      this.showCart = false;
      this.showPayment = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9f3;
  min-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 30px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.WarpMenu {
  position: fixed;
  right: 8%;
  bottom: 5%;
  z-index: 5;
}

.sidebar {
  height: 100%;
  width: 250px;
  position: fixed !important;
  z-index: 9995;
  top: 0;
  right: 0;
  background-color: #111;
  opacity: 90%;
  overflow-x: hidden;
  // transition: 0.5s;
  padding-top: 60px;

  .backgroud {
    background-color: rgba(255, 255, 255, 0.89);
  }
}

@media (min-width: 1400px) {
}

.navbar {
  position: fixed;
  width: 100%;
  z-index: 9995;
}

.views {
  text-decoration: none;
  color: #646464;
  cursor: pointer;
}

.views.active {
  text-decoration: none;
  color: #ffc000;
  cursor: pointer;
}

nav .active.link.menu_bt {
  color: #ffc000;
  background-color: #000000;
}

nav .link.menu_bt {
  color: #000000;
  background-color: #ffc000;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.sidebar {
  height: 100%;
  width: 250px;
  position: fixed !important;
  z-index: 9995;
  top: 0;
  right: 0;
  background-color: #111;
  opacity: 90%;
  overflow-x: hidden;
  // transition: 0.5s;
  padding-top: 60px;

  .backgroud {
    background-color: rgba(255, 255, 255, 0.89);
  }
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 16px;
  color: #050505;
  display: block;
  transition: 0.3s;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 40px;
  margin-left: 50px;
  color: orange;
}

.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

.openbtn:hover {
  background-color: #444;
}

@media (max-height: 500px) {
  .menubottom {
    display: none;
  }
}

.menuBrowser {
  padding: 15px 20% 12px 30%;
  background-color: rgba(255, 252, 252, 0.959);
  width: 100%;
  b {
    font-size: 0.9vmax;
  }
}

@media only screen and (min-width: 900px) {
  .menubottom {
    display: none;
  }

  .breakpoin {
    padding-inline: 22%;
  }

  .BrowserSize {
    visibility: hidden;
  }
}

@media only screen and (max-width: 900px) and (max-width: 899px) {
  .menuBrowser,
  .WarpMenu {
    display: none;
  }
}

.menubottom {
  .link {
    font-size: 15px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
