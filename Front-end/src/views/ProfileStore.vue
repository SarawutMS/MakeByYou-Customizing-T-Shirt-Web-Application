<!-- Office -->
<template>
  <div class="container text-center">
    <div class="row m-2">
      <b class="col align-self-center">
        <i class="bi bi-person-fill"></i>
        {{ `${this.user.name} ${this.user.last_name}` }}
      </b>

      <div class="col text-end"></div>

      <b class="col-12 text-center p-2 border-bottom">
        <font-awesome-icon :icon="['fas', 'shirt']" class="px-1" @click="log" />
        รายการที่ออกแบบ
      </b>
    </div>

    <div>
      <div class="row g-3 py-5">
        <span
          @click="StoreRouter(shirt._id)"
          class="col-sm-4 col-md-3 col-6 text-center d-flex py-3 justify-content-center"
          v-for="(shirt, $index) in list"
          :key="$index"
        >
          <Shitrts
            :data="
              DataCovert(
                shirt.property._type,
                shirt.shirt_path.front,
                shirt.property.color,
                'front'
              )
            "
            width="140px"
          >
          </Shitrts>
        </span>
      </div>
    </div>
    <div class="text-center load">
      <infinite-loading @infinite="infiniteHandler">
        <template #spinner>
          <span>loading...</span>
        </template>
        <template #complete>
          <span></span>
        </template>
      </infinite-loading>
    </div>
  </div>
</template>
<script scope>
import Shitrts from "@/components/Shirts/Shirts.vue";

export default {
  name: "StoreProfile",

  components: {
    Shitrts,
  },
  emits: ["cart"],
  data() {
    return {
      data: [],
      user: {},
      update: false,
      list: [],
      page: "profile",
      _name: String,
      scrollX: "",
      _id: this.$route.params._id,
      loaction: this.$route.params._id,
    };
  },
  updated() {
    if (this.loaction != this.$route.params._id) {
      location.reload();
    }

    //
  },
  created() {},
  mounted() {
    console.log(this._id);
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

    infiniteHandler($state) {
      setTimeout(() => {
        this.axios
          .get(`/users/office/`, {
            params: {
              _id: this._id,
            },
          })
          .then(({ data }) => {
            this.user = data[0];

            if (this.list.length < data[0].shirts.length) {
              this.list.push(...data[0].shirts);
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch((error) => {
            $state.error();
          });
      }, 100);
    },
    res_Data(data) {
      this._name = data.user_name;
    },
  },
};
</script>

<style lang="scss" scoped>
.nametag {
  padding: 0 20%;
  @media screen and (max-width: 770px) {
    padding: 0;
  }
}
.container {
  margin: auto;
}
.load {
  margin-top: 50%;
}

@media (min-width: 650px) {
  .load {
    margin-top: 20%;
  }
  .container {
    padding-inline: 100px;
  }
}
</style>
