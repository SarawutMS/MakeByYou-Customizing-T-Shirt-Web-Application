<template>
  <transition name="bounce">
    <div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                ตัวอักษร

                <span @click="$emit('close')"
                  ><i class="bi bi-x-lg text-warning"></i>
                </span>
              </slot>
            </div>

            <div class="modal-body overflow-auto">
              <slot name="body">
                <div class="py-3 px-5">
                  <div class="text-center">
                    <text class="text-dark fw-bold pe-1"> ข้อความ</text>

                    <div class="border">
                      <input
                        class="px-1 text-center"
                        style="width: 100%"
                        type="text"
                        placeholder=""
                        name="text"
                        id="text"
                        maxlength="15"
                        :style="Property"
                        v-model="text_value"
                      />
                    </div>
                  </div>
                  <div class="text-center d-flex justify-content-end py-2">
                    <div>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="$emit('del')"
                      >
                        ลบข้อความ
                      </button>
                    </div>
                  </div>
                </div>

                <div name="font_label" class="d-flex align-items-center py-2">
                  <text class="text-dark fw-bold pe-1"> Font </text>
                  <div class="py-1" style="width: 90%">
                    <select
                      name="font"
                      id="font"
                      class="p-1"
                      style="width: 100%; font-size: large"
                      v-model="font"
                    >
                      <option value="Prompt">Prompt</option>
                      <option value="Serif">Serif</option>
                      <option value="Sans-Serif">Sans-Serif</option>
                      <option value="Monospace">Monospace</option>
                      <option value="Cursive">Cursive</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="MS">MS</option>
                    </select>
                  </div>
                </div>
                <div class="d-flex px-5" style="width: fit-content">
                  <button
                    type="button"
                    class="btn btn-sm mx-1"
                    :class="Action(F_Bold)"
                    @click="F_Bold = !F_Bold"
                  >
                    <img :src="require(`@/assets/icons/bold.png`)" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm mx-1"
                    :class="Action(F_italic)"
                    @click="F_italic = !F_italic"
                  >
                    <img :src="require(`@/assets/icons/italic.png`)" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm mx-1"
                    :class="Action(F_underline)"
                    @click="F_underline = !F_underline"
                  >
                    <img :src="require(`@/assets/icons/strikethrough.png`)" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm mx-1"
                    :class="Action(F_lineThrough)"
                    @click="F_lineThrough = !F_lineThrough"
                  >
                    <img :src="require(`@/assets/icons/underline.png`)" />
                  </button>
                </div>
                <div name="color_label " class="pt-4">
                  <div class="">
                    <div class="d-flex">
                      <text class="text-dark fw-bold"> สีข้อความ </text>
                      <div class="text-center px-2">
                        <input
                          style="width: 30px"
                          type="color"
                          id="font_color"
                          name="font_color"
                          v-model="font_color"
                        />
                      </div>

                      <!--
                      <div>
                        <input
                          style="width: 30px"
                          type="color"
                          id="bg_color"
                          name="bg_color"
                          v-model="bg_color"
                        />
                      </div> -->
                    </div>
                  </div>
                </div>

                <div name="color_label " class="py-3">
                  <div class="">
                    <div class="d-flex align-items-center">
                      <text class="text-dark fw-bold"> จัดข้อมูล</text>

                      <div class="text-center px-1">
                        <button type="button" class="btn btn-dark" style="font-size: 70%" @click="$emit('Back')">
                          Send to Back
                        </button>
                      </div>
                      <div class="text-center px-1">
                        <button
                          type="button"
                          class="btn btn-warning fw-bold"
                          style="font-size: 70%"

                          @click="$emit('Front')"
                        >
                          Bring to Front
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <div class="text-center position">
                  <div
                    class="btn btn-warning p-3 rounded-0"
                    style="width: 100%"
                    @click="$emit('update', PropertyNew)"
                  >
                    <small class="fw-bold"> ตกลง</small>
                  </div>
                
                  <!--  
                  <div class="btn btn-warning text-white p-3 rounded-0" style="width: 100%"   @click="this.on_edit_text = false">
                    <small class="fw-bold"> ยกเลิก</small>
                  </div>-->
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <div
    class="static"
    :class="{
      active: isActive,
      'text-danger': hasError,
    }"
  ></div>
</template>

<script scope>
export default {
  name: "text_edit",
  props: {
    showModal: Boolean,
    poperty: Object,
  },
  computed: {
    Property() {
      
      if (this.font_color || this.bg_color) {
        const hexToRgb = (hex) => {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
              }
            : null;
        };
        let RgbaBG = "";
        if (this.bg_color) {
          RgbaBG = `background-color:rgba(${hexToRgb(this.bg_color).r},${
            hexToRgb(this.bg_color).g
          },${hexToRgb(this.bg_color).b},0.${this.bgOpacity});`;

          this.bgO = RgbaBG;
          if (this.bgOpacity <= 1) {
            RgbaBG = `background-color:null`;
            this.bgO = null;
          }
        }
        let bold = `bold`;
        if (!this.F_Bold) {
          bold = "normal";
        }
        let lineThrough = "";
        if (this.F_lineThrough) {
          lineThrough = "line-through";
        }
        let underline = "";
        if (this.F_underline) {
          underline = "underline";
        }

        let italic = `normal`;
        if (this.F_italic) {
          italic = "italic";
        }
        this.PropertyNew = {
          fontWeight: `${bold}`,
          fontStyle: `${italic}`,
          linethrough: this.F_lineThrough,
          underline: this.F_underline,
          fill: this.font_color,
          text: this.text_value,
        };
        let RgbaFont = `rgba(${hexToRgb(this.font_color).r},${
          hexToRgb(this.font_color).g
        },${hexToRgb(this.font_color).b},0.${this.textOpacity})`;
        return `textDecoration:${lineThrough} ${underline};fontStyle:${italic};fontWeight:${bold};color: ${RgbaFont}; font-family: ${this.font};${RgbaBG}
                       `;
      }
    },
  },
  data() {
    return {
      F_italic: false,
      F_underline: false,
      F_lineThrough: false,
      F_Bold: false,
      PropertyNew: {},
      count: 0,
      font_color: this.poperty.font_color,
      bg_color: this.poperty.font_color,
      font: this.poperty.font,
      text_value: this.poperty.text_value,
      textOpacity: 9,
      bgOpacity: 9,
      bgO: null,
    };
  },
  updated() {
    this.ClearDatA();

    this.text_value = this.poperty.text_value;
    this.font_color = this.poperty.font_color;
    this.bg_color = this.poperty.bg_color;
    this.font = this.poperty.font;

    if (this.poperty.F_italic == "italic") {
      this.F_italic = true;
    }
    if (this.poperty.F_Bold == "bold") {
      this.F_Bold = true;
    }

    this.F_underline = this.poperty.F_underline;

    this.F_lineThrough = this.poperty.F_lineThrough;
  },
  mounted() {},
  methods: {
    ClearDatA(ev) {
      this.text_value = "";
      this.font_color = "";
      this.bg_color = "";
      this.font = "";
      this.F_italic = false;
      this.F_underline = false;
      this.F_lineThrough = false;
      this.F_Bold = false;
    },
    Action(ev) {
      if (ev) {
        return "btn-warning";
      } else {
        return "btn-outline-secondary";
      }
    },
    onClickClose(event) {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
/* we will explain what these classes do next! */

.container {
  margin: auto;
}
.detail {
  height: 200px;
}

input {
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: rgb(255, 255, 255);
  width: 100%;
}

.no-outline:focus {
  outline: none;
}

.modal-footer {
  position: absolute;

  bottom: 0;
  width: 100%;
  display: block;
}
.display {
  position: relative;
}
.btn-upload {
  background-color: #ffc107 !important;
  color: rgb(0, 0, 0) !important;
  width: 100%;
}

.btn-confirm {
  background-color: #ffc107 !important;
  color: rgb(0, 0, 0) !important;
  width: 100%;
}

.modal-mask {
  @media screen and (max-width: 999px) {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 1s ease;
  }
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px auto;

  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;

  @media screen and (min-width: 1000px) {
    min-width:320px;
    min-height:500px;
    @media screen and (max-height: 750px) {
      height: 100%;
    }
  }
}

.modal-header {
  color: #030303;
  font-size: large;
  font-weight: 900;
  padding: 20px 30px;
}

.modal-body {
  padding: 20px 20px;
  position: absolute;
  width: 100%;
}

.modal-default-button {
  float: right;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;

  @media screen and (max-width: 999px) {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    transition: opacity 1s ease;
  }
}

.bounce-leave-active {
  @media screen and (max-width: 999px) {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    transition: opacity 1s ease;
  }
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
</style>
