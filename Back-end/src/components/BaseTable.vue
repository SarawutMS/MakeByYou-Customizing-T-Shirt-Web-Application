<template >
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns" :key="index" v-if="hasValue(item, column)">
            <div>

              <base-input :value='itemValue(item, column)' placeholder="null" v-if="inputS(item, column)"
                @click="itemOld(item, column)" @change="Update_">

              </base-input>
              <base-checkbox class='text-center ' :data="{ 'key': column, '_id': item._id }"
                v-if="checkBoxValue(item, column)" :checked="itemValue(item, column)" @input="CheckBOx">
              </base-checkbox>

              <div class=" px-1 bt pt-2 " v-if="column == 'action'">
              
                <button @click="Trash_(item)"
                  class="btn   btn-simple btn-danger  tim-icons  icon-trash-simple   btn-sm  mx-1">
                </button>


              </div>
            </div>
            <!-- Action tool -->


          </td>
          <ALert_T :showAlert="showAlert" :data="Data" @close="showAlert = !showAlert" @update="Update" />
        </slot>
      </tr>
    </tbody>
  </table>


</template>
<script>


import ALert_T from './Alert_T.vue'
import typeinput from './Inputs/TypeInput.js'


export default {
  name: 'base-table',
  components: {
    ALert_T
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns"
    },
    data: {
      type: Array,

      default: () => [],
      description: "Table data"
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type"
    },
    theadClasses: {
      type: String,
      default: '',
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: "<tbody> css classes"
    }
  },
  data() {
    return {
      showAlert: false,
      baseType: ['base-input'],
      test: [],
      old: {},
      Data: {
        'head': '! แจ้งเตือน',
        'body': 'คุณต้องการลบข้อมูลในระบบ',
        'type': 'warning',
        'arguments': '',
        'tool': ''
      },
    }
  },
  computed: {

    tableClass() {
      return this.type && `table-${this.type}`;
    }
  },
  updated() {

  },
  methods: {
    CheckBOx(ev) {



      let value = [{ [ev.data.key]: ev.checked }, { _id: ev.data._id }]
      this.Axios(value);
    },
    checkBoxValue(item, column) {
      if (this.typeinputs(item[column.toLowerCase()]) == 'boolean') {
        return true
      }

    },
    inputS(item, column) {

      if (column == 'action' || this.typeinputs(item[column.toLowerCase()]) == 'boolean') {
        return false
      }

      return true

    },
    typeinputs(val) {


      return typeof (val);
    },

    check(ev) {
      console.log('')
    },
    Update(ev) {
    
   



      this.$emit('update');
      this.showAlert = !this.showAlert;
    },
    Trash_(ev) {
      this.Data.arguments = ev;
      this.showAlert = !this.showAlert
    },
    Update_(ev) {

      const key = this.old.old.key;
      const newValue = ev.target.value;
      const _id = this.old._id
      let value = [{ [key]: newValue }, { _id: _id }]
      this.Axios(value)


    },
    Axios(value) {
      this.axios.put(`/update/${this.$route.name}`, value)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('update');
        });
    },
    hasValue(item, column) {
      return item[column] !== "undefined";
    },
    itemValue(item, column) {
      let value = item[column];
      if (typeof(item[column]) == 'object') {
        value = JSON.stringify(value);
      }
      return value
    },
    itemOld(item, column) {



      this.old =
      {
        'old': {
          'key': column,
          'value': item
        },
        '_id': item._id
      }
        ;
      console.log(this.old)
    },

  }
};
</script>

<style>
.bt {
  width: 150px;
  height: 45px;
}
</style>