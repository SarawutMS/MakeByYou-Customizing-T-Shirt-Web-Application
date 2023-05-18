<template>
  <transition name="modal">
    <div v-if="showAlert">
      <div class="alert-mask">
        <div class="alert-wrapper">
          <div class="alert-container">
            <div class="alert-header p-3 shadow" :class="Type_Head">
              <slot name="header">
                <div class="center text-white">
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
                  <div class="btn btn-danger mx-2 btn-sm btn-simple" @click="Close">
                    ยกเลิก
                  </div>
                  <div class="btn btn-info btn-sm btn-simple" @click="Confirm">
                    ยืนยัน
                  </div>
                </div>
                <div v-else>
                  <div class="btn btn-simple mx-2" @click="Close">ตกลง</div>
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
/*   
    data = {'head':'[Head(text)]',
            'body':'[Body(text)]',
            'type':'[color]',
            'tool':[button],
            'arguments':[Data],
             }
     <AlertVue 
        :showAlert="showAlert" 
        :data="Data" 
        @close="showAlert = !showAlert" 
        @confirm="Mongo_DB('save')">
*/
export default {
  name: "Alert_T",
  props: ["showAlert", "data"],
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
      //Delete for service delete

      const table = this.$route.name;
      const _id = this.data.arguments._id;

      this.axios
        .delete(`/drop`, { params: { db: table, _id: _id } })
        .then((response) => {
          console.log(response.data);
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
          this.$emit("close");
        })
        .finally(function () {
          // always executed
        });

      // this.$emit("confirm")
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
  background-color: rgba(0, 0, 0, 0.5);
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
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.alert-header {
  margin-top: 5%;
  border-radius: 20px 20px 0 0;
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.01s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
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
