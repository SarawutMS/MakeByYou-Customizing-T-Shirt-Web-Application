<template>
  <button @click="logInWithFacebook">
    <slot />
  </button>

</template>
<script>
export default {
  name: "facebookLogin",
  mounted() {
    this.initFacebook();
    this.loadFacebookSDK(document, "script", "facebook-jssdk");
  },
  methods: {
    logInWithFacebook() {
      FB.login((response) => {
        if (response.authResponse) {
        this.getAPI();
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      });
      return false;
    },
    getAPI() {
      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
      console.log("Welcome!  Fetching your information.... ");

      FB.api("/me/", (response) => {
        if (response && !response.error) {
          console.log(response);
        }
      });
    },
    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "5840183859412824", //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v16.0",
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
  },
};
</script>
<style>
.button {
  color: white;
  min-width: 150px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>
