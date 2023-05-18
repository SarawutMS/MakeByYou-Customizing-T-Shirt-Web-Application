<template>
  <transition name="bounce">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                <div class="d-flex justify-content-between">
                  <div class="p-2">
                    <b> Clipart</b>
                  </div>

                  <div class="p-2" @click="showModal = onClickClose()">
                    <i class="bi bi-x-lg text-warning"></i>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                <div
                  class="row my-2 text-center overflow-auto p-lg-5"
                  style="height: 90%; position: absolute"
                >
                  <div class="col-4" v-for="item in cliptart">
                    <div
                      class="text-center d-flex align-items-center"
                      style="height: 100%"
                    >
                      <div class="mx-auto">
                        <img
                          crossorigin="anonymous"
                          @click="$emit('addCliptArt', item.path)"
                          :src="item.path"
                          class="img-fluid d-block img-thumbnail"
                          alt="..."
                        />
                      </div>
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
</template>

<script scope>
export default {
  name: "ClipartSlort",
  props: ["type", "showModal"],
  emits: ["close", "choiceshirt", "addCliptArt"],

  data() {
    return {
      count: 0,

      cliptart: null,
    };
  },
  computed: {},
  updated() {},
  mounted() {
    this.type_shirt = this.type;
    this.getCliptArt();
  },
  methods: {
    getCliptArt(ev) {
      this.axios
        .get(`/images/cliptart`)
        .then((response) => {
          this.cliptart = response.data;
       
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
.row {
  .px-1 {
    font-size: 100px;
  }
  @media screen and (max-width: 1000px) {
    .px-1 {
      font-size: 15vmin;
    }
  }
}

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
  background-color: rgba(0, 0, 0, 0.226) !important;
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
    @media screen and (max-height: 750px) {
      height: 100%;
    }
  }
}

.modal-header {
  display: block;
  color: #030303;
  font-size: large;
  font-weight: 900;
  width: 100%;
}

.modal-body {
  position: relative;
  height: 100%;
  width: 100%;
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
.modal-mask {
  background-color: rgba(0, 0, 0, 0);
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  transition: opacity 1s ease;
}

.bounce-leave-active {
  position: fixed;
  width: 100%;
  z-index: 9998;
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
</style>
