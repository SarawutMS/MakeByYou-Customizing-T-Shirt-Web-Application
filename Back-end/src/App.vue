<template>
  <div class="" >
    <notifications></notifications>
    <router-view
      :key="$route.fullPath"
      v-if="statLogin"
      @success="statLogin = !statLogin"
    ></router-view>
    <Login v-else @login="statLogin = true" />
  </div>
</template>

<script scope>


import Login from "@/pages/Login.vue";
export default {
  components: {
    Login,
  },
  data() {
    return {
      statLogin: false,
    };
  },
  methods: {
    disableRTL() {
      if (!this.$rtl.isRTL) {
        this.$rtl.disableRTL();
      }
    },
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    },
    checkLocalNetWork() {
      let local = window.location.hostname;
      const conIp = `http://${local}:3015/services/mongo`;
      this.axios
        .get(conIp)
        .then((response) => {
          console.log(`Can get it!! ${window.location.hostname}`);
        })
        .catch((error) => {
          console.log(`err ${window.location.host}`);
          local = "localhost";
        });

      this.axios.defaults.baseURL = `http://${local}:3015/services/mongo`;
    },
  },
  updated() {
    
  },

  mounted() {
    this.statLogin = this.$cookies.get("state");

    this.$watch("$route", this.disableRTL, { immediate: true });
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);
  },
  created() {
    this.checkLocalNetWork();
  },
};
</script>

<style lang="scss"></style>
