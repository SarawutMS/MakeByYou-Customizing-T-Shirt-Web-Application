<template>
        <transition name="bounce">
  <div v-if="showAlert">
    <div class="alert-mask">
      <div class="alert-wrapper">
    
          <div class="alert-container">
            <div class="alert-header p-3 shadow" :class="Type_Head">
              <slot name="header">
                <div class="d-flex justify-content-center text-white">
                  {{ head_show }}
                </div>
              </slot>
            </div>

            <div class="alert-body">
              <slot name="body">
                {{ body_show }}
              </slot>
            </div>

            <div class="alert-footer">
              <slot name="footer">
                <div v-if="Button_Type">
                  <div class="btn btn-outline-danger mx-2" @click="Close">ยกเลิก</div>

                  <div class="btn btn-outline-success" @click="Confirm">ตกลง</div>
                </div>
                <div v-else>
                  <div class="btn btn-outline-secondary mx-2" @click="Close">ตกลง</div>
                </div>
              </slot>
            </div>
          </div>
        
      </div>
    </div>
  </div>
</transition>
</template>

<script scoped>
export default {
  name: "Alert_show",
  props: ["showAlert", "data", "order_id"],
  emits: ["close", "confirm"],
  updated() {},
  data() {
    return {};
  },
  computed: {
    Button_Type() {
      let bt = true;
      if (this.data.tool == "some") {
        return false;
      }
      return bt;
    },
    Type_Head() {
      const type = `bg-${this.data.type}`;

      return type;
    },
    head_show() {
      return this.data.head;
    },
    body_show() {
      return this.data.body;
    },
  },
  mounted() {},
  methods: {
    Close(ev) {
      this.$emit("close");
    },
    Confirm(ev) {
      this.$emit("confirm", { order_id: this.order_id });
    },
  },
};
</script>

<style scoped>
/* we will explain what these classes do next! */
input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: rgb(255, 255, 255);
  width: 100%;
}

.alert-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.219);
  display: table;
  transition: opacity 1s ease;
}

.alert-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.alert-container {
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0px auto;

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.alert-header {
  margin-top: 5%;

  color: #030303;
  font-size: large;
  font-weight: 900;
}

.alert-body {
  margin: 30px 20px 10px 20px;
}

.alert-footer {
  position: absolute;
  bottom: 0;
  padding-bottom: 20px;
  right: 0;
  padding-right: 20px;
}

.no-outline:focus {
  outline: none;
}

.modal-footer {
  padding: 10px;
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
  width: 80%;
  height: 30%;
  margin: 0px auto;

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 5%;

  color: #030303;
  font-size: large;
  font-weight: 900;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.modal-body {
  margin: 30px 20px 10px 20px;
}

.modal-default-button {
  float: right;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

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
    transform: scale(1.2);
  }
100% {
    transform: scale(1);
  }
}

@media (min-width: 600px) {
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

  .modal-container {
    width: 30%;
    height: 80%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
}
</style>
