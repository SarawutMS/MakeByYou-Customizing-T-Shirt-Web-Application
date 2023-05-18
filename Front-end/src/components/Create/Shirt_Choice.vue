<template>
  <transition name="modal">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header d-flex justify-content-end">
              <slot name="header">
                <span @click="showModal = onClickClose()"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body  d-flex py-5" style="height: 90%">
              <slot name="body">
                <div class="row  p-3">
                  <div
                    class="col-12 "
                    @click="Choice_(`crew_`)"
                    :class="[Active_type(`crew_`) ? 'shirt_choice' : '']"
                  >
                    <div class="text-center">
                      <img src="../../assets/img/crew_front.png" width="120" />
                      <img src="../../assets/img/crew_back.png" width="120" />
                      <br />
                      <small> เสื้อผู้ชาย</small>
                    </div>
                  </div>

                  <div
                    class="col-12"
                    @click="Choice_(`womens_crew_`)"
                    :class="[Active_type(`womens_crew_`) ? 'shirt_choice' : '']"
                  >
                    <div class="text-center">
                      <img src="../../assets/img/womens_crew_front.png" width="120" />
                      <img src="../../assets/img/womens_crew_back.png" width="120" />
                      <br />
                      <small> เสื้อผู้หญิง </small>
                    </div>
                  </div>
                 
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <slot />

  <font-awesome-icon
    :icon="['fas', 'shirt']"
    style="font-size: 25px"
    class="px-1"
    @click="log"
  />
</template>

<script>
export default {
  name: "shirt_choice",
  props: ["type"],
  emits: ["close", "choiceshirt"],

  data() {
    return {
      count: 0,
      showModal: false,
      shirt: null,
      type_shirt: null,
    };
  },
  computed: {},
  updated() {},
  mounted() {
    this.type_shirt = this.type;
  },
  methods: {
    log() {
      this.showModal = !this.showModal;

      this.$emit("on");
    },

    Active_type(obj) {
      if (this.type_shirt == obj) {
        return true;
      }
    },

    Choice_(obj) {
      this.type_shirt = obj;
      this.showModal = !this.showModal;
      this.$emit(`choiceshirt`, { type: obj });
      this.$emit("on");
    },
    onClickClose(event) {
      this.$emit("close", { name: "this.showLogin", state: false });
      this.$emit("on");
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
}
.detail {
  height: 200px;
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
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(61, 61, 61, 0.685);
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
    width: 550px;
    height: 75%;
    border-radius: 5%;
    @media screen and (max-height: 900px) {
      height: 95%;
    }
  }
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

.position {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  .btn {
    width: 200px;
    margin: 25px;
    margin-left: 20%;
  }
  @media (max-width: 700px) {
    position: fixed;
    .btn {
      width: 100%;
      margin: 0px;
      border-radius: 0px !important;
    }
  }
}
</style>
