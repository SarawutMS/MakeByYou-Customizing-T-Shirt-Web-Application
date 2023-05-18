<template>
  <div v-if="pageCart">
    <div class="cart_show row mt-3 px-3">
      <div
        class="p-3 my-1 card col-9 overflow-auto text-dark addressValue"
        style="height: 80px; font-size: 10px"
      >
        <!-- F -->

        <p><b> ที่อยู่จัดส่ง</b>: {{ this.data.line1 }} {{ this.data.line2 }}</p>
        <p>
          <b> หมายเลขติดต่อ </b>:
          {{ this.data.phonenumber }}
        </p>
        <p><b> รหัสไปษณีย์ </b>: {{ this.data.zip }}</p>
      </div>

      <div class="col-3 align-self-center text-center">
        <!--  -->
        <Select_address @updateADD="getAddress" />
      </div>
    </div>
  </div>
</template>
<script scope>
import Select_address from "./Select_address.vue";
export default {
  name: "Address",
  components: {
    Select_address,
  },
  props: ["_id"],

  data() {
    return {
      AddressModal: false,
      pageCart: true,
      test: false,
      data: {
        line1: "",
        line2: "",
        zip: "",
        phonenumber: 0,
        user_id: {},
        youraddress: false,
      },
    };
  },
  computed: {},
  updated() {
   

    this.$emit("nowaddress", this.data._id);
  },
  mounted() {
    this.data["user_id"] = this._id;

    this.getAddress();
  },
  methods: {
    getAddress(ev) {
      this.axios
        .get(`/users/youraddress`, {
          params: {
            _id: this._id,
          },
        })
        .then((response) => {
          if (response.data) {
            this.data = response.data;
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
.addressValue {
  p {
    padding: 0;
    margin: 0;
  }
}
</style>
