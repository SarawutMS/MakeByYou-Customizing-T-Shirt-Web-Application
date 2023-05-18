<template>
  <div class="d-lg-flex">
    <div class="nameSLot">
      <div class="py-5 px-lg-5">
        <div class="px-lg-5" v-for="item in data">
          <div class="card bg-white p-3" v-if="item.Bank">
            <div class="row py-3">
              <div class="col-4">
                <b> ธนาคาร </b>
              </div>
              <div class="col-8">
                <b> {{ item.Bank.Bank }} </b>
              </div>

              <div class="col-4">
                <b> ชื่อบัญชี </b>
              </div>
              <div class="col-8">
                <b> {{ item.User[0].name }} </b>
              </div>
              <div class="col-4">
                <b> เลขบัญชี </b>
              </div>
              <div class="col-8">
                <span class="text-secodary"> {{ item.Bank.banknumber }} </span>
              </div>
              <div class="col-4">
                <b> จำนวนเงิน </b>
              </div>
              <div class="col-8">
                <span class="text-secodary">
                  {{ item.Bank.countmoney }} <b class="mx-3">บาท </b></span
                >
              </div>
            </div>

            <div class="action d-flex">
              <div>
                <button
                  type="button"
                  class="btn btn-warning text-white btn-sm"
                  style="font-size: xx-small"
                  @click="moreInformation(item)"
                >
                  ข้อมูล
                </button>
              </div>

              <div class="ml-auto">
                <button
                  @click="UpdatePayment(`success`,item._id)"
                  type="button"
                  class="btn btn-success text-white btn-sm"
                  style="font-size: xx-small"
                >
                  เสร็จสิ้น
                </button>

                <button
                  @click="UpdatePayment(`cancel`,item._id)"
                  type="button"
                  class="btn btn-danger text-white btn-sm"
                  style="font-size: xx-small"
        
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="" style="width: 100%; height: 100%">
      <div class="p-5">
        <div class="card bg-white" style="min-height: 50vmin">
          <div class="head text-center pt-5">
            <div style="font-size: 30px"><b> ข้อมูล </b></div>
          </div>

          <Transition name="fade">
            <div v-if="state">
              <div class="body">
                <div class="p-5">
                  <div>ข้อมูลวอลเล็ท</div>
                  <div class="detail">
                    <div class="row">
                      <div class="col-4">ไอดีวอลเล็ท</div>
                      <div class="col">{{ information._id }}</div>
                    </div>
                    <div class="row">
                      <div class="col-4">ไอดีผู้ใช้</div>
                      <div class="col">{{ information.user_id }}</div>
                    </div>
                    <div class="row">
                      <div class="col-4">วอลเล็ททั้งหมด</div>
                      <div class="col">{{ information.AllMoney }}</div>
                    </div>
                    <div class="row">
                      <div class="col-4">วอลเล็ทที่ได้รับ</div>
                      <div class="col">{{ information.OwnMoney }}</div>
                    </div>
                    <div class="row">
                      <div class="col-4">วอลเล็ท</div>
                      <div class="col">{{ information.storeMoney }}</div>
                    </div>
                  </div>
                </div>
                <div class="p-5">
                  <div>ข้อมูลผู้ใช้งาน</div>

                  <div class="detail">
                    <div class="row">
                      <div class="col-2">อีเมล</div>
                      <div class="col">{{ information.User[0].email }}</div>
                    </div>
                    <div class="row">
                      <div class="col-2">ชื่อ</div>
                      <div class="col">{{ information.User[0].name }}</div>
                    </div>
                    <div class="row">
                      <div class="col-2">นามสกุล</div>
                      <div class="col">{{ information.User[0].last_name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script scope>
export default {
  name: "CreaditManage",

  data() {
    return {
      data: [],
      information: null,
      state: false,
    };
  },
  created() {},
  computed: {},
  updated() {},
  methods: {
    UpdatePayment(ev,payment_id) {
      console.log('test')
      this.axios
        .post(`/payments/UpdatePayment`, { state: ev,payment_id:payment_id })
        .then((response) => {
          this.getPayment();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    moreInformation(ev) {
      this.state = !this.state;
      if (this.state) {
        this.information = ev;
      }
    },

    getPayment(ev) {
      this.axios
        .get(`/payments/paymentB`)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
  },
  mounted() {
    this.getPayment();
  },
};
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
.nameSLot {
  overflow: auto;
  height: 750px;
  width: 100%;
  @media screen and (max-width: 500px) {
    height: fit-content;
  }
}
</style>
