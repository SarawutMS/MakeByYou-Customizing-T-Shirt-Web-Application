<template>
  <div class="container text-center">
    <b class="border-bottom p-2">
      <i class="bi bi-shop-window"></i>
      Design Gallery
    </b>
    <p class="pt-2 text-secondary">หน้าออกแบบ</p>

    <div class="row g-3">
      <span
        class="col-sm-4 col-md-3 col-6 text-center d-flex justify-content-center"
        v-for="(item, $index) in list"
        :key="$index"
      >
        <div @click="StoreRouter(item._id)">
          <Shirts
            :data="
              DataCovert(
                item.property._type,
                item.shirt_path.front,
                item.property.color,
                'front'
              )
            "
            width="140px"
          >
          </Shirts>
        </div>
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
</template>

<script>
import Shirts from "@/components/Shirts/Shirts.vue";
export default {
  name: "DesightGallery",
  emits: ["cart"],
  inject: ["state"],
  components: {
    Shirts,
  },
  data() {
    return {
      page: 1,
      list: [],
      _id: "none",
      datas: [],
    };
  },
  mounted() {
    if (this.state) {
      this._id = this.$cookies.get("Logon")._id;
    }

   
  },
  beforeUpdate() {
    this.datas = this.list;
   
  },
  methods: {
    DataCovert(_type, shirt, color, position) {
      return { _type: _type, shirt: shirt, color: color, position: position };
    },
    StoreRouter(_id) {
      this.$router.push({
        path: `/store_shirts/${_id}`,
      });
    },
    infiniteHandler($state) {
      setTimeout(() => {
        this.axios
          .get(`shirts/gallery`, {})
          .then(({ data }) => {
            if (this.list.length < data.length) {
              this.list.push(...data);

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
  },
};
</script>

<style lang="scss" scoped>
.load {
  margin-top: 50%;
}

@media (min-width: 768px) {
  .container {
    padding-inline: 100px;
  }

  .load {
    margin-top: 20%;
  }
}
</style>
