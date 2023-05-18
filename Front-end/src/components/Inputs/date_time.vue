<template>
  <div class="row text-center py-2">
    <text class="text-start">บัญชีที่โอนเงิน* :</text>
    <div class="col">
      <input
        type="radio"
        id="KBANK"
        value="KBANK"
        v-model="picked"
        @change="banKPick"
      />&nbsp;
      <img
        v-bind:src="require('@/assets/img/Bank/KBANK.png')"
        alt="Bootstrap"
        width="30"
        height="30"
      />

      <text class="bank"
        ><label for="KBANK">ธ.กสิกรไทย ศราวุธ มูลสิงห์ 502-1-98227-6</label></text
      >
    </div>
    <div class="col">
      <input
        type="radio"
        id="KTB"
        value="KTB"
        v-model="picked"
        @change="banKPick"
      />&nbsp;

      <img
        v-bind:src="require('@/assets/img/Bank/KTB.png')"
        alt="Bootstrap"
        width="30"
        height="30"
      />
      <text class="bank">
        <label for="KTB">ธ.กรุงไทย ศราวุธ มูลสิงห์ 693-0-33035-3</label></text
      >
    </div>
  </div>

  <text style="font-size: smaller;">วันที่ชำระเงิน* :</text>
  <VueDatePicker v-model="date" :format="format" input-class-name="dp-custom-inpu" disabled>
    <template #input-icon></template> </VueDatePicker
  ><br />
  <text style="font-size: smaller;">เวลา(โดยประมาณ)* :</text>

  <VueDatePicker v-model="time" time-picker input-class-name="dp-custom-inpu" disabled>
    <template #input-icon></template> </VueDatePicker
  ><br />
  จำนวนเงิน* :

  <input
    type="Number"
    placeholder="0.00"
    input-class-name="dp-custom-inpu"
    v-model="totalMoney"
    disabled
  />
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
const props = defineProps({ totalMoney: Number });
const emit = defineEmits(["inFocus", "update"]);
let picked = ref("");
const date = ref(new Date());
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const time = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
});

const banKPick = (ev) => {
  emit("update", { bank: picked.value });
};

onMounted(() => {
  banKPick();
  // datetime();
});
</script>

<style lang="scss" scoped>
.bank {
  font-size: 1.8vmax;
  @media screen and (min-width: 770px) {
    font-size: 13px;
  }
}

.dp-custom-input {
  box-shadow: 0 0 6px #ffc000;
  color: #000000;

  &:hover {
    border-color: #ffffff;
  }
}
</style>
