<template>
  <div>
    <div class="bg-white">
      <form>
        <input
          type="file"
          @change="handleFiles"
          id="fileElem"
          multiple
          accept="image/*"
          style="display: none"
        />
      </form>
      <div class="p-5 pb-3 text-center">
        <button @click="popFileSelector()" type="button" class="btn btn-primary">
          เพิ่ม
        </button>
      </div>
      <div class="row p-5">
        <div class="col-lg-1 p-2 col-4" v-for="img in imgs">
          <div>
            <img class="p-2 rounded" :src="img.path" height="150" width="150" />
          </div>
          <div class="actionMenu text-center">
            <div>
              <button
                type="button"
                class="btn btn-danger"
                @click="DeleteImg(img.data.name)"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script scope>
export default {
  name: "ImgManage",

  data() {
    return {
      ses: "",
      shirt: null,
      bills: "",
      imgs: [],
    };
  },
  created() {
    this.getOrder();
  },
  computed: {
    Canvas() {
      const port = 3015;
      console.log(this.shirt.shirt_path);
      return `http://${window.location.hostname}:${port}/shirts/${this.shirt.shirt_path.front}.png`;
    },
    Canvas_() {
      const port = 3015;
      console.log(this.shirt.shirt_path);
      return `http://${window.location.hostname}:${port}/shirts/${this.shirt.shirt_path.back}.png`;
    },
    Shirt() {
      return require(`@/assets/img/${this.shirt.property._type}.png`);
    },
    ShirtColor() {
      return `background-color:${this.shirt.property.color};

      `;
    },
  },
  mounted() {
    this.GetImg();
  },
  updated() {},
  methods: {
    handleFiles(event) {
      var data = event.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = async (e) => {
        console.log(reader.result);
        this.axios
          .post(`/upload/img`, { data: reader.result })
          .then((response) => {
            this.GetImg();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      };
    },
    popFileSelector(ev) {
      var el = document.getElementById("fileElem");
      if (el) {
        el.click();
      }
    },
    GetImg(ev) {
      this.axios
        .get(`/images/cliptart/`)
        .then((response) => {
          console.log((this.imgs = response.data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    DeleteImg(name) {
      this.axios
        .delete(`/delete/img`, { params: { name: name } })
        .then((response) => {
          this.GetImg();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    Id_Search(ev) {
      this.sas = ev;

      this.servay();
    },
    getOrder(ev) {
      this.axios
        .get(`/orders/bills`)
        .then((response) => {
          this.bills = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    servay(ev) {
      if (this.sas.length >= 23) {
        this.axios
          .post(`/shirts/findshirts`, { _id: this.sas })
          .then((response) => {
            this.shirt = response.data[0];
            console.log(response.data);
            if (!this.shirt) {
              this.shirt = null;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
p {
  color: black;
  font-size: small;
}
input,
input::placeholder {
  font: 10px sans-serif;
}

.bills {
  height: 100%;

  overflow: auto;
  width: 100%;
  padding: 6%;
  border-radius: 10px;
}
.list {
  width: 100%;
  height: 500px;
}
@media screen and (min-width: 1000px) {
  .list {
    width: 40%;
    height: 800px;
  }
  .search {
    width: 30%;
  }
  .user_slot {
    padding: 18px;
    border-radius: 100px !important;
  }
}
.custtom {
  position: relative;
}
.canvas {
  position: absolute;
  width: 70px;
  right: 25%;
  top: 10%;
  border-style: solid;
  border-color: rgb(255, 255, 255);
}

.img-top {
  margin-left: auto;
  margin-right: auto;
}
</style>
