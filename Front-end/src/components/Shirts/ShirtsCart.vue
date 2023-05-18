<template>
  <div class="col" @click="StoreRouter">
    <div class="custtom row">
      <div class="col">
        <img :src="Shirt.front" class="img-top" alt="..." />
      </div>
      <div class="col">
        <img :src="Shirt.back" class="img-top" alt="..." />
      </div>
    </div>

    <div class="nameTag">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    Shirt() {
      let Shirts = {
        front: require(`@/assets/img/crew_front.png`),
        back: require(`@/assets/img/crew_back.png`),
      };
      return Shirts;
    },

    ShirtColor() {},
    Button() {
      let Text = "Add Cart";
      if (this.pages == "Cart") {
        Text = "Update";
      }
      return Text;
    },
  },
  data() {
    return {};
  },

  mounted() {},
  updated() {},
  methods: {
   
  },
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
}
.shirt {
  position: absolute;
}

@media (max-width: 600px) {
}

.card {
  width: 100%;
}

.img-top {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
