<template>
  <div class="custtom">
    <canvas
      class="m-1"
      :style="ShirtColor"
      style="position: absolute; width: 90%; height: 90%"
    >
    </canvas>
    <img :src="Canvas" style="opacity: 0.95" :style="Canvastype" alt="..." />
    <img :src="Shirt" class="img-top custtom" alt="..." :style="Size" />
  </div>
  <slot />
</template>
<script scope>
export default {
  name: "Shirts",
  props: ["showModals", "data", "pages", "width", "base64"],
  computed: {
    Size() {
      return `width:${this.width};


      `;
    },
    Canvastype() {
      let type = "";
      switch (this.data._type) {
        case "womens_crew_": {
          type = `position: absolute;
          width: 43%;
                  right: 28%;
                  top: 15%;`;

          break;
        }
        case "mens_tank_": {
          type = `position: absolute;
                  width: 45%;
                  right: 25%;
                  top: 25%;`;
          break;
        }
        default: {
          type = `position: absolute;
                  width: 45%;
                  right: 28%;
                  top: 15%;`;
          break;
        }
      }
      return type;
    },
    Canvas() {
      if (this.base64 != null) {
        return this.base64;
      } else {
        const port = 3015;

      

        return `http://${window.location.hostname}:${port}/shirts/${this.shirt_path}.png`;
      }
    },
    Shirt() {
      return require(`@/assets/img/${this._type + this.position}.png`);
    },
    ShirtColor() {
      return `background-color:${this.color};

    `;
    },
  },

  data() {
    return {
      shirt_path: this.data.shirt,
      _type: this.data._type,
      color: this.data.color,
      position: this.data.position,
      base64: this.data.base64,
    };
  },
  mounted() {},
  updated() {
    this.shirt_path = this.data.shirt;
    this._type = this.data._type;
    this.color = this.data.color;
    this.position = this.data.position;
    this.base64 = this.data.base64;
  },
  methods: {},
};
</script>

<style scoped>
/* we will explain what these classes do next! */
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
