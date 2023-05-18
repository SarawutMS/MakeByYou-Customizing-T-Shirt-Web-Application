<template>
  <div></div>
  <div class="app">
    <!-- @cart="submitForm"-->
    <Menubar :update_="log" />
    <span></span>

    <!--  <Navigation /> -->
    <div class="space"></div>

    <router-view @cartAdd="plusCart" @update="log = !log" class="s" />

    <div id="fb-root"></div>

    <div class="tash">
      <notifications class="notifications" width="60%" />
    </div>
  </div>
</template>

<script scope>
import Menubar from "./components/Menu_bar/Menubar.vue";
import Login_Modal from "./components/Login_Modal.vue";

import { notify } from "@kyvg/vue3-notification";
import { computed } from "vue";
export default {
  name: "App",
  components: {
    Menubar,
    Login_Modal,
  },

  provide() {
    return {
      state: this.onLog(),
      add: this.add(),
      user_provide: this.user,
      carts: computed(() => this.num),
    };
  },

  data() {
    return {
      Cart_on: false,
      logon: false,
      num: 0,
      user: {},
      log: false,
    };
  },

  created() {
    this.checkLocalNetWork(); /// Check local network connection.
  },
  mounted() {
    this.$watch(
      () => this.$route.path,
      (to, from) => {
        if (
          !this.onLog() &&
          !to.includes("/gallery") &&
          !to.includes("/create") &&
          !to.includes("/register") &&
          !to.includes("/store_shirts") &&
          !to.includes("/Office")
        ) {
          this.$router.push({ name: "Home" });
        
        }
      }
    );
  },

  methods: {
    loginOn(ev) {
      return (this.logon = !this.logon);
    },
    plusCart(ev) {
      this.num = ev;
    },
    add(ev) {
      return ev;
    },
    toggleView() {
      ("Test");
    },
    onLog(ev) {
      let state = false;

      if (this.$cookies.get("Logon")) {
        this.user = this.$cookies.get("Logon");

        state = true;
      }

      
      return state;
    },
    submitForm(ev) {
      this.Cart_on = !this.Cart_on;
    },

    checkLocalNetWork() {
      let local = window.location.hostname;

      const port = 3015;

      const conIp = `http://${local}:${port}/services/mongo`;
      this.axios
        .get(conIp)
        .then((response) => {
          console.log(`Can get it!! ${window.location.hostname} : ${port}`);
        })
        .catch((error) => {
          console.log(`err ${window.location.host} `);
          local = "localhost";
        });

      this.axios.defaults.baseURL = `http://${local}:${port}/services/mongo`;
    },
  },
};
</script>

<style lang="scss" >






@import url("https://fonts.googleapis.com/css2?family=Prompt&display=swap%27");
* {
  box-sizing: border-box;
  font-family: Prompt, sans-serif;
  font-weight: 400;
}


.app {
  min-height: 100vh;
  position: relative;
}

.s {
  z-index: 9998;
}

.notifications {
  position: absolute;
  z-index: 9998;
}

.space {
  padding-top: 100px;
}

@media (min-width: 900px) {
  .notifications {
    width: 20% !important;
  }

  .space {
    padding-top: 150px;
  }
}
.tash {
  position: fixed;
  bottom: 30%;
  width: 100%;
  right: 48%;

  @media screen and (max-width: 900px) {
    top: 10%;
    position: static;
  }
}
</style>
