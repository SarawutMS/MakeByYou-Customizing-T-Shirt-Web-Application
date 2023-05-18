<template>
  <div class="container">
    <div class="row head">
      <div class="col-8 px-5"><i class="bi bi-person-fill"></i><b> ชื่อผู้ใช้</b></div>
    </div>
    <div class="py-2 text-center" >
      <button type="button" class="btn btn-success mx-2" style="font-size: small">
        บันทึก
      </button>
      <button
        type="button"
        class="btn btn-secondary mx-2"
        style="font-size: small"
        @click="SetUser()"
      >
        รีเซ็ต
      </button>
    </div>
    <div class="row head py-3 px-4">
      <div class="col-4">
        <label for="staticEmail">
          <small> <b class="px-2"> Email </b> </small>
        </label>
      </div>
      <div class="col-8">
        <input
          type="text"
          class="form-control-plaintext"
          id="staticEmail"
          placeholder="Email"
          v-model="_email"
        />
      </div>

      <hr />

      <div class="col-4">
        <label for="name">
          <small> <b class="px-2"> ชื่อ </b> </small>
        </label>
      </div>
      <div class="col-8">
        <input
          type="text"
          class="form-control-plaintext"
          id="editname"
          placeholder="ชื่อ"
          v-model="_name"
        />
      </div>

      <hr />

      <div class="col-4">
        <label for="lastname">
          <small> <b class="px-2"> นามสกุล </b> </small>
        </label>
      </div>
      <div class="col-8">
        <input
          type="text"
          class="form-control-plaintext"
          id="editlastname"
          placeholder="นามสกุล"
          v-model="_lastname"
        />
      </div>

      <hr />

      <div class="col-12" style="padding: 20px 2%">
        <!-- :_id="user_id" --><AddressVue :_id="user_id" />
      </div>
    </div>
  </div>
</template>

<script scope>
import AddressVue from "@/components/Create/Address/Address.vue";
import Add_address from "../Create/Address/Add_address.vue";
export default {
  name: "edit_modal",
  components: { AddressVue, Add_address },
  inject: ["user_provide"],
  data() {
    return {
      showModal: false,

      _email: "",
      _password: 0,
      _name: "",
      _lastname: "",
      userdata: null,
      user_id: this.user_provide._id,
    };
  },
  mounted() {
    this.getUser();
  },
  created() {},
  methods: {
    SetUser() {
      this._email = this.userdata.email;
      this._name = this.userdata.name;
      this._lastname = this.userdata.last_name;
    },
    getUser() {
      this.axios
        .get(`/users/user/${this.user_id}`)
        .then((response) => {
         
          this.userdata = response.data;
          this.SetUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clear_value() {},
    onClickClose(ev) {
      this.showModal = false;
    },

    onConfirm(ev) {},
  },
};
</script>

<style lang="scss" scoped>
/* we will explain what these classes do next! */

@media screen and (min-width: 900px) {
  .container {
  padding: 10px 15% 0 15% !important;
  
}
}


.paper {
  padding: 0;
  @media screen and (min-width: 1000px) {
    margin: 0 15%;
    padding: 15px 15px 8%;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 10px #b4b4b44d;
  }
}

.head {
  padding: 0;
  @media screen and (min-width: 1000px) {
    margin: 0 15%;
  }
}

input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: rgba(243, 243, 243, 0.5);
  padding-left: 15px;
  width: 100%;
  color: rgb(58, 58, 58);
}

.no-outline:focus {
  outline: none;
}

hr {
  display: block;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}
</style>
