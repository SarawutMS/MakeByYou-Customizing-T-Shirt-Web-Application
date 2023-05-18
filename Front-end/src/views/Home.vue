<template>
  <transition>
  

    <div class="home container mb-5 text-center">
      <div class="main_product">
        <carousel :items-to-show="1" :wrap-around="true" :autoplay="5000" >
          <slide v-for="num in 3" :key="num">
            <div class="carousel__item">
              <img
                :src="require(`@/assets/0${num}.jpg`)"
                style="width: 95%; border: solid 1.5px"
              />
            </div> </slide
        ></carousel>
        <!-- img <div class="border border-5" style="width: 800px;height: 400px;"></div> -->
      </div>

      <div class="container mt-4">
        <h5 class="row text-start px-5">
          <b class="col"> Product </b>
          <router-link class="col-2 text-dark" :to="{ name: 'Gallery' }">
            <i class="bi bi-grid-3x2-gap col-2"></i>
          </router-link>
        </h5>
        <hr />
        <carousel
          v-bind:items-to-show="3.5"
          :autoplay="Randdom()"
          :wrapAround="true"
          v-if="data.length"
        >
          <slide v-for="item in data" :key="item">
            <div @click="StoreRouter(item._id)" class="Mobile">
              {{ this.data.property }}
              <Shirts
                :data="
                  DataCovert(
                    item.property._type,
                    item.shirt_path.front,
                    item.property.color,
                    'front'
                  )
                "
                width="100%"
              />
            </div>

            <div @click="StoreRouter(item._id)" class="Com">
              <Shirts
                :data="
                  DataCovert(
                    item.property._type,
                    item.shirt_path.front,
                    item.property.color,
                    'front'
                  )
                "
                width="180px"
              />
            </div>
          </slide>
        </carousel>
        <div class="row">
          <div class="col-4 d-flex"><i class="bi bi-arrow-left"></i></div>
          <div class="col-4"></div>
          <div class="col-4 d-flex flex-row-reverse">
            <i class="bi bi-arrow-right"></i>
          </div>
        </div>
      </div>

      <div class="container mt-3">
        <h5 class="row text-start px-5">
          <b class="col"> Featured Creators </b>
        </h5>
        <hr />
        <div class="row">
          <div
            v-for="item in users"
            :key="item"
            class="col-sm-4 col-md-3 col-6 text-center d-flex justify-content-center"
          >
            <div class="mx-1 card my-3" v-if="item.Shirts.length != 0">
              <carousel v-bind:items-to-show="1" :wrap-around="true" class="py-3">
                <slide v-for="itemc in item.Shirts" :key="itemc">
                  <div @click="StoreRouter(itemc._id)">
                    <Shirts
                      :data="
                        DataCovert(
                          itemc.property._type,
                          itemc.shirt_path.front,
                          itemc.property.color,
                          'front'
                        )
                      "
                      width="140px"
                    />
                  </div>
                </slide>
              </carousel>
              <div @click="Profile_nav(item._id)">{{ item.name }}</div>
            </div>

            <!--  
        <div class="col-12">
          <carousel
            v-bind:items-to-show="1"
            :autoplay="Randdom()"
            :wrap-around="true"
            class="m-5 mb-0"
          >
            <slide v-for="slide in 3" :key="slide">
              <Image v-bind:_data="{ _id: cards._id, num: slide }" />
            </slide>
          </carousel>

          <h5 class="text-secondary col-6 border-bottom text-center" style="width: 100%">
            <b>{{ cards.name }} </b>
          </h5>
        </div>
-->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Image from "@/components/Menu_bar/Image.vue";
import Cart_Modal from "@/components/Payment/Cart_modal.vue";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import Shirts from "@/components/Shirts/Shirts.vue";
export default {
  name: "Home",
  emits: ["cart"],
  components: {
    Image,
    Cart_Modal,
    Shirts,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      data_users: [],
      data: [],
      cards_id: "",
      keySlide: 0,
      showM: { bol: false, num: 0 },
      items_advance_modal: [],
      img: [],
      users: [],
    };
  },
  computed: {
    Value() {
      let test = "sadsad";
      setTimeout(() => {
        test = "this.data[0]._id";
      }, 1000);
      setTimeout(1);
      return test;
    },

    keySlide_() {
      setTimeout(() => {}, 1000);

      setTimeout("");
    },
  },

  async mounted() {
    await this.axios
      .get(`/shirts/slide`)
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    await this.axios
      .get(`/users/homeshirts`)
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    StoreRouter(_id) {
      this.$router.push({
        path: `/store_shirts/${_id}`,
      });
    },
    DataCovert(_type, shirt, color, position) {
      return { _type: _type, shirt: shirt, color: color, position: position };
    },
    closeFn(ev) {
      this.showM.bol = false;
      this.$emit("cart");
    },

    SlideImage(ev) {
      let permission = true;

      this.img = ev._id;
    },
    Profile_nav(ev) {
      this.$router.push({ name: "Store", params: { id: ev._id } });
    },
    Show(slide, type) {
      this.showM.bol = true;
      this.showM.num = slide - 1;
    },
    Randdom(ev) {
      //this.items_advance_modal.push(ev);
      //console.log(this.items_advance_modal)
      var items = Array(4000, 6000, 5000);

      var item = items[Math.floor(Math.random() * items.length)];
      return item;
    },
    dataRespone(rep) {
      console.log(rep);
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel__item {
  width: 100%;

  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.Mobile {
  display: none;
  @media (max-width: 850px) {
    display: block;
  }
}

.container {
  margin: auto;
}

.Com {
  display: block;
  @media (max-width: 850px) {
    display: none;
  }
}

.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 70%;
  text-align: center;
}

.main_product {
  .border {
    background-color: rgb(201, 201, 201);
  }
}

@media (min-width: 1400px) {
  .home {
    padding-inline: 10%;
  }
}

.creator {
  .border {
    background-color: rgb(201, 201, 201);
  }
}

#mdiv {
  width: 25px;
  height: 25px;
  background-color: red;
  border: 1px solid black;
}

.mdiv {
  height: 85px;
  width: 2px;
  margin-left: 50%;
  background-color: rgb(126, 126, 126);
  transform: rotate(45deg);
  z-index: 1;
}

.md {
  height: 85px;
  width: 2px;
  background-color: rgb(126, 126, 126);
  transform: rotate(90deg);
  z-index: 2;
}

.hero {
  background-attachment: fixed;
  position: relative;
  height: 100vh;

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    h4 {
      text-transform: uppercase;
      font-size: 22px;
      padding-bottom: 4px;
    }

    h2 {
      font-size: 50px;

      @media (min-width: 550px) {
        font-size: 85px;
      }
    }

    hr:nth-child(2) {
      max-width: 365px;
      margin-bottom: 16px;
    }

    hr:nth-child(4) {
      height: 6px;
      background-color: #fff;
      border: none;
      max-width: 85px;
      margin-top: 16px;
    }
  }
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
