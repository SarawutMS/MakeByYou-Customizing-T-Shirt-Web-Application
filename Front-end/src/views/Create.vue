<template>
  <div class="pagecreate d-flex justify-content-center">
    <div class="customs">
      <div class="body row d-flex" style="height: 100%">
        <div class="px-1 col order-sm-1 order-lg-3 p-0 m-0 d-flex align-items-center">
          <Text_Edit
            :show-modal="on_edit_text"
            :poperty="poperty"
            @close="on_edit_text = !on_edit_text"
            @update="UpdateNew"
            @del="delObj"
            @Front="sendTOFront"
            @Back="sendTOBack"
          />
        </div>
        <div
          class="col-12 col-lg-6 order-md-2 order-2 d-flex justify-content-center align-items-center shirtsM"
        >
          <div class="p-5 pb-0 bg-white shirt-card" style="border-radius: 10px">
            <!-- SHIRTS-->
            <div
              class="text-center d-flex justify-content-center align-items-center"
              style="position: relative"
            >
              <img :src="shirt_swarp" class="shirt01" />
              <canvas
                class="m-1"
                :style="ShirtColor"
                style="position: absolute; width: 90%; height: 90%"
              >
              </canvas>
              <div
                style="position: absolute; z-index: 6"
                :style="[state_shirt ? 'display:block' : 'display:none']"
              >
                <canvas ref="front" class="demo"></canvas>
                <div style="background-color: #a1a1a1; width: 100%">
                  <text class="text-white" style="font-size: small"> Paintable Area</text>
                </div>
              </div>

              <div
                style="position: absolute; z-index: 6"
                :style="[!state_shirt ? 'display:block' : 'display:none']"
              >
                <canvas ref="back" class="demo"></canvas>

                <div style="background-color: #a1a1a1; width: 100%">
                  <text class="text-white" style="font-size: small"> Paintable Area</text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="d-lg-flex left-menu col-lg text-end order-lg-1 order-3 justify-content-end align-items-center"
        >
          <div class="">
            <nav class="g-1 mx-0 row buttonS">
              <div class="col iconsSize">
                <!-- Exits Icon -->
                <div class="px-3 exit_Arrow" @click="$router.go(-1)">
                  <i class="bi bi-box-arrow-left"></i>
                  <small style="font-size: 18px"> Exit</small>
                </div>

                <!-- -->

                <div>
                  <Shirt_ChoiceVue
                    v-bind:type="type_shirt"
                    @choiceshirt="Change_type"
                    @click="Hide = !Hide"
                  />

                  <i
                    @click="state_shirt = !State_canvas()"
                    class="bi"
                    style="font-size: 25px"
                    :class="[state_shirt ? 'bi-front' : 'bi-back']"
                  ></i>
                </div>

                <div>
                  <i
                    @click="this.color_shirt = 'rgb(28, 28, 28)'"
                    class="bi bi-circle-fill mx-2"
                    style="font-size: 25px"
                  ></i>
                  <i
                    @click="this.color_shirt = 'rgb(255, 255, 255)'"
                    style="font-size: 25px"
                    class="bi bi-circle"
                  ></i>
                </div>

                <div class="my-1 mb-3">
                  <img
                    @click="sendTOFront"
                    :src="require('@/assets/icons/Bring_to_front.png')"
                    class="ms-3 ms-lg-0"
                    width="25"
                    style="opacity: 85%"
                  />
                  <img
                    @click="sendTOBack"
                    class="ms-1 "
                    :src="require('@/assets/icons/send_to_back.png')"
                    width="25"
                    style="opacity: 85%"
                  />
                </div>
              </div>

              <div class="col">
                <button
                  type="button"
                  class="btn btn-outline-dark bi bi-fonts p-3"
                  @click="Addtext()"
                ></button>
              </div>

              <div class="col">
                <button
                  type="button"
                  class="btn btn-outline-dark bi bi-image p-3"
                  @click="popFileSelector()"
                ></button>
              </div>

              <!-- -->
              <div class="col">
                <button
                  type="button"
                  class="btn btn-outline-dark bi bi-sticky p-3"
                  @click="cliptArt = !cliptArt"
                ></button>
              </div>
              <div class="col">
                <button
                  type=" button"
                  class="btn btn-outline-dark bi bi-check-lg text-warning p-3"
                  @click="Save_Fn"
                ></button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div>
      <form>
        <input type="hidden" id="myfile" name="myfile" v-model="this.data" />
      </form>
    </div>

    <Save
      v-bind:savemenu="on_save"
      :typeshirt="type_shirt"
      :canvasdata="DataC"
      :property="{ color: color_shirt }"
      @close="on_save = !on_save"
      @save="Alert"
      @alert="Alert"
      @login="$emit(`update`)"
      @Buy_now="Mongo_DB('buy')"
    />

    <AlertVue
      :showAlert="showAlert"
      :data="Data"
      @close="showAlert = !showAlert"
      @confirm="Mongo_DB('save')"
    >
    </AlertVue>
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

    <Shirt_ComponentVue
      :showModals="BuyNow"
      :pages="'buynow'"
      :data_="_data"
      @close="Buy_now"
    />

    <ClipartSlortVue
      :showModal="cliptArt"
      @addCliptArt="ClipArtADD"
      @close="cliptArt = !cliptArt"
    />
  </div>
</template>
<script>
import { fabric } from "fabric";
import Shirt_ChoiceVue from "@/components/Create/Shirt_Choice.vue";
import Text_Edit from "@/components/Create/Text_Edit.vue";
import Save from "@/components/Create/Save_.vue";

import AlertVue from "@/components/Alert.vue";
import Shirt_ComponentVue from "@/components/Menu_bar/Shirt_Component.vue";
import ClipartSlortVue from "@/components/Create/ClipartSlort.vue";
var FormData = require("form-data");

var canvas = [];
var __canvases = [];
const del = () => {
  __canvases[0].getActiveObjects().forEach((obj) => {
    __canvases[0].remove(obj);
  });
  __canvases[0].discardActiveObject().renderAll();
};

const stoDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export default {
  name: "Create",
  components: {
    Shirt_ComponentVue,
    Shirt_ChoiceVue,
    Text_Edit,
    Save,
    AlertVue,
    ClipartSlortVue,
  },
  inject: ["user_provide"],
  updated() {
    console.log("this.BuyNow");
  },
  data() {
    return {
      poperty: {},

      bgOpasity: 0,
      textOpasity: 0,

      cliptArt: false,

      _data: null,
      font: "Serif",
      Data: [],
      showAlert: false,
      on_save: false,
      fisrt_text: "ข้อความ",
      state_shirt: true,
      color_shirt: "rgb(255,255,255)",
      open_shirt: false,
      on_edit_text: false,
      text: "1",

      show_text: "",

      position: { left: "", top: "" },
      data: require("../assets/img/crew_front.png"),
      send: "",
      isActive: true,
      hasError: true,

      canvas_e: null,
      old_canvas: canvas,
      localhost: window.location.host,
      img: [],
      cookies: this.$cookies,
      shirt: true,
      fornt_back_shirt: 0,
      type_shirt: "crew_",
      DataC: { front: "", back: "" },

      customIcon: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiNFNTczNzMiIGQ9Ik00Mi41ODMsOS4wNjdsLTMuNjUxLTMuNjVjLTAuNTU1LTAuNTU2LTEuNDU5LTAuNTU2LTIuMDE1LDBsLTEuNzE4LDEuNzJsNS42NjQsNS42NjRsMS43Mi0xLjcxOEM0My4xMzksMTAuNTI2LDQzLjEzOSw5LjYyNSw0Mi41ODMsOS4wNjciLz48cGF0aCBmaWxsPSIjRkY5ODAwIiBkPSJNNC40NjUgMjEuNTI0SDQwLjQ3MTk5OTk5OTk5OTk5NFYyOS41MzVINC40NjV6IiB0cmFuc2Zvcm09InJvdGF0ZSgxMzQuOTk5IDIyLjQ2OSAyNS41MykiLz48cGF0aCBmaWxsPSIjQjBCRUM1IiBkPSJNMzQuNjEgNy4zNzlIMzguNjE2VjE1LjM5MkgzNC42MXoiIHRyYW5zZm9ybT0icm90YXRlKC00NS4wMiAzNi42MSAxMS4zODUpIi8+PHBhdGggZmlsbD0iI0ZGQzEwNyIgZD0iTTYuOTA1IDM1LjQzTDUgNDMgMTIuNTcxIDQxLjA5NHoiLz48cGF0aCBmaWxsPSIjMzc0NzRGIiBkPSJNNS45NjUgMzkuMTcyTDUgNDMgOC44MjcgNDIuMDM1eiIvPjwvc3ZnPg==`,

      BuyNow: false,
      Hide: true,
      property_menuSet: false,
      deleteIcon: `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN'
             'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg'
              xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470'
              xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)'
              style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)'
             style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E`,
    };
  },
  computed: {
    ShirtColor() {
      return `background-color: ${this.color_shirt};`;
    },
    property_menu() {
      if (this.property_menu) return "property-menu";
    },
    shirt_swarp() {
      if (this.state_shirt) {
        this.data = require(`../assets/img/${this.type_shirt}front.png`);
      } else {
        this.data = require(`../assets/img/${this.type_shirt}back.png`);
      }

      return this.data;
    },
    canvas_swarp() {
      return "back";
    },

    size_re() {
      if (this.type_shirt == "mens_tank_") {
        return "_tank";
      } else if (this.type_shirt == "womens_crew_") {
        return "_woman";
      }
    },
    canvas_sb() {
      if (this.state_shirt) {
        return "display:none";
      } else {
        return "display:block";
      }
    },
    canvas_sf() {
      if (!this.state_shirt) {
        return "display:none";
      } else {
        return "display:block;";
      }
    },
  },

  mounted() {
    ///

    ////

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "black";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerSize = 10;

    var canvas1 = new fabric.Canvas(this.$refs.front);
    var canvas2 = new fabric.Canvas(this.$refs.back);

    __canvases[0] = canvas1;
    __canvases[0].setDimensions({ width: 140, height: 250 });
    __canvases[1] = canvas2;
    __canvases[1].setDimensions({ width: 140, height: 250 });
    //canvas = new fabric.Canvas(this.$refs.demo);

    var imageURL = require("../assets/img/crew_front.png");
    var image = new Image();
    image.src = require("../assets/img/crew_front.png");

    //canvas.on('mouse:down', this.Mouse_d_HavehoverCorsor);

    __canvases[0].on("mouse:down", this.testClick);
    __canvases[1].on("mouse:down", this.testClick);
    /*  canvas.on('mouse:dblclick', function (obj) {
              console.log("dbl_check");
              let i = 0;
              alert("test")
          });*/
  },
  methods: {
    myEventHandler(e) {
      //this.Create_Icon();
    },

    Edit_text(ev, obj) {
      
      this.on_edit_text = !this.on_edit_text;
    },

    deleteObject(eventData, transform) {
      var target = transform.target;
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    },
    testClick(ev) {
      let width = screen.width;
    
      if (ev.target != null && ev.target.type != "image") {
        this.poperty = {
          font: ev.target.fontFamily,
          text_value: ev.target.text,
          font_color: ev.target.fill,
          bg_color: ev.target.backgroundColor,
          F_italic: ev.target.fontStyle,
          F_underline: ev.target.underline,
          F_lineThrough: ev.target.linethrough,
          F_Bold: ev.target.fontWeight,
        };

        if (width >= 1000) {
          this.on_edit_text = true;
        }

        this.property_menuSet = true;

        this.Create_Icon("cus");
      } else {
        this.property_menuSet = false;
        this.Create_Icon("null");
        this.on_edit_text = false;
      }
    },
    delObj(ev) {
      __canvases[this.fornt_back_shirt].getActiveObjects().forEach((obj) => {
        __canvases[this.fornt_back_shirt].remove(obj);
      });

      this.on_edit_text = !this.on_edit_text;

      __canvases[0].renderAll();
      __canvases[1].renderAll();
    },

    UpdateNew(ev) {
      let width = screen.width;

      __canvases[this.fornt_back_shirt].getActiveObjects().forEach((obj) => {
        //__canvases[0].remove(obj);
        obj.set(ev);
      });

      __canvases[0].renderAll();
      __canvases[1].renderAll();
      if (width <= 900) {
        this.on_edit_text = !this.on_edit_text;
      }
    },
    Buy_now(ev) {
      if (ev._id != "") {
        console.log("dell");
        this.axios
          .get(`delshirts/${ev._id}`)
          .then((shirt) => {
            this.BuyNow = !this.BuyNow;
          })

          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$emit("cart");
        this.BuyNow = !this.BuyNow;
        this.$router.push({ path: "/" });
      }
    },
    Create_Icon(type) {
      var customImg = document.createElement("img");
      var deleteImg = document.createElement("img");
      var arrow_right = document.createElement("img");
      var arrow_left = document.createElement("img");
      let width = screen.width;
      deleteImg.src = this.deleteIcon;
      /*
      arrow_right.src = require(`@/assets/icons/arrow-right.png`);
      arrow_left.src = require(`@/assets/icons/arrow-left.png`);
     */
      customImg.src = this.customIcon;
      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.7,
        offsetY: -10,
        cursorStyle: "pointer",
        mouseUpHandler: this.deleteObject,
        render: this.renderIcon(deleteImg),
        cornerSize: 15,
      });
      /*
      fabric.Object.prototype.controls.back = new fabric.Control({
        x: 0.5,
        y: -0.7,
        offsetY: -5,
        cursorStyle: "pointer",
        mouseUpHandler: this.sendTOFront,
        render: this.renderIcon(arrow_right),
        cornerSize: 15,
      });
      fabric.Object.prototype.controls.front = new fabric.Control({
        x: 0.3,
        y: -0.7,
        offsetY: -5,
        cursorStyle: "pointer",
        mouseUpHandler: this.sendTOBack,
        render: this.renderIcon(arrow_left),
        cornerSize: 15,
      });*/

      let w = {
        x: -0.5,
        y: -0.7,
        offsetY: -10,
        cursorStyle: "pointer",

        render: this.renderIcon(customImg),
        cornerSize: 0,
      };

      if (width < 1000 && type != "null") {
        w = {
          x: -0.5,
          y: -0.7,
          offsetY: -10,
          cursorStyle: "pointer",
          mouseUpHandler: this.Edit_text,
          render: this.renderIcon(customImg),
          cornerSize: 15,
        };
      }
      fabric.Object.prototype.controls.menucustom = new fabric.Control(w);
    },

    sendTOFront(ev) {
      let width = screen.width;

      __canvases[this.fornt_back_shirt].getActiveObjects().forEach((obj) => {
        //__canvases[0].remove(obj);
        __canvases[this.fornt_back_shirt].bringForward(obj);
      });

      __canvases[0].renderAll();
      __canvases[1].renderAll();
    },
    sendTOBack(ev) {
      let width = screen.width;

      __canvases[this.fornt_back_shirt].getActiveObjects().forEach((obj) => {
        //__canvases[0].remove(obj);
        __canvases[this.fornt_back_shirt].sendBackwards(obj);
      });

      __canvases[0].renderAll();
      __canvases[1].renderAll();
    },

    renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    },

    Save_Fn(ev) {
      this.DataC.front = __canvases[0].toDataURL({
        format: "png",
        enableRetinaScaling: true,
        multiplier: 1,
      });

      this.DataC.back = __canvases[1].toDataURL({
        format: "png",
        enableRetinaScaling: true,
        multiplier: 1,
      });

      this.on_save = !this.on_save;
    },
    Change_type(ev) {
      this.type_shirt = ev.type;

      switch (this.type_shirt) {
        case "womens_crew_": {
          __canvases[0].setDimensions({ width: 135, height: 250 });

          __canvases[1].setDimensions({ width: 135, height: 250 });

          break;
        }
        case "mens_tank_": {
          __canvases[0].setDimensions({ width: 140, height: 200 });

          __canvases[1].setDimensions({ width: 140, height: 200 });
          break;
        }
        default: {
          __canvases[0].setDimensions({ width: 140, height: 250 });

          __canvases[1].setDimensions({ width: 140, height: 250 });
          break;
        }
      }
    },

    State_canvas() {
      if (this.state_shirt) {
        this.fornt_back_shirt = 1;
      } else {
        this.fornt_back_shirt = 0;
      }
      return this.state_shirt;
    },
    Check() {
      this.front_c.forEach((obj) => {
        canvas.add(obj);
      });
    },
    Alert(ev) {
      this.Data = ev;
      this.showAlert = !this.showAlert;
    },

    ClipArtADD(ev) {
      this.cliptArt = !this.cliptArt;

      fabric.Image.fromURL(
        ev,
        (img) => {
          img.scaleToWidth(60);
          img.scaleToHeight(60);
          img.set({ left: 20 });
          img.set({ top: 20 });
          __canvases[this.fornt_back_shirt].add(img).renderAll().setActiveObject(img);
        },
        { crossOrigin: "anonymous" }
      );
    },

    handleFiles(event) {
      var data = event.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          img.scaleToWidth(60);
          img.scaleToHeight(60);
          img.set({ left: 20 });
          img.set({ top: 20 });
          __canvases[this.fornt_back_shirt].add(img).renderAll().setActiveObject(img);
        });
      };
    },
    popFileSelector() {
      var el = document.getElementById("fileElem");
      if (el) {
        el.click();
      }
    },

    add_stiker() {
      console.log(this.__canvases[0].getObjects());
      /* let token = "JAfreOCefsj3bMqD6usegzhajzzh4sGYGc8Sp4fG"
             axios.get(`https://search.icons8.com/api/iconsets/v5/search?term=cart&token=${token}`)
                 .then(response => {
                     console.log(response.data);
                 })
                 .catch(error => {
                     console.log(error);
                 }); */
    },

    imporT_() {
      //for image out side canvas;
      stoDataURL(this.canvas_e.toDataURL()).then((dataUrl) => {
        let datas = new FormData();
        datas.append("fileuploads", dataUrl);
        this.axios
          .post("upload", datas, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    check_text(obj) {
      this.show_text = obj;
      if (obj == "") {
        this.show_text = "แสดงตัวอย่าง";
      }
    },
    Update_text() {
      del();
      this.Create_Icon();
      //cc
      let width = screen.width;
      if (width < 1000) {
        this.on_edit_text = !this.on_edit_text;
      }

      var text = new fabric.IText(this.text_value, {
        fontFamily: this.font,
        left: this.position.left,
        top: this.position.top,
        fontSize: 26,
        fill: this.font_color,
        backgroundColor: this.bg_color,
        fontFamily: this.font,
      });

      __canvases[this.fornt_back_shirt].add(text);
    },
    Obj_delete() {
      (this.on_edit_text = false), del();
    },
    Addtext() {
      var text = new fabric.IText(this.fisrt_text, {
        fontFamily: this.font,

        left: 25,
        top: 100,
        fontSize: 26,
        fill: "#000000",
        //backgroundColor: "#ffffff",
      });
      __canvases[this.fornt_back_shirt].add(text);
    },

    Mongo_DB(tool) {
      let front = __canvases[0].toDataURL({
        format: "png",
      });
      let back = __canvases[1].toDataURL({
        format: "png",
      });

      let permission = "";
      let detail = "";
      let price = "";
      let nameshirt_ = "";
      let type_shirt = "";
      /*
      datas.append("type_shirt", this.type_shirt);
      datas.append("user_id", this.user_provide._id);
      datas.append("email", userEmail);
      datas.append("color", this.color_shirt);
      datas.append("for_edit", JSON.stringify(__canvases[0].toJSON()));
           datas.append("permission", permission);
      datas.append("detail", detail);
      datas.append("nameshirt_", nameshirt_);
      */

      if (tool == "buy") {
        permission = "false";
        detail = null;
        nameshirt_ = null;
      } else {
        permission = this.Data.container.permission;
        detail = this.Data.container.detail;

        nameshirt_ = this.Data.container.nameshirt_;
        price = this.Data.container.price;

        type_shirt = this.type_shirt;
      }

      let datas = {
        _id: this.user_provide._id,
        front: front,
        back: back,
        detail: detail,
        nameshirt_: nameshirt_,
        price: price,
        color: this.color_shirt,
        permission: permission,
        type_shirt: type_shirt,
        //test: JSON.stringify(__canvases[0].toJSON()),
        SvF: __canvases[0].toSVG(),
        SvB: __canvases[1].toSVG(),
      };

      this.axios
        .post(`shirts/create_shirt`, datas, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (tool == "buy") {
            this.axios
              .get(`/buynow/${response.data.insertedId}`)
              .then((shirt) => {
                this._data = shirt.data;
                this.BuyNow = !this.BuyNow;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.$router.push({ path: "/" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  updated() {},

  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
};
//handler for moving objects on canvas
var moveHandler = function (evt) {
  var movingObject = evt.target;
  console.log(movingObject.get("left"), movingObject.get("top"));
};
//handler for done modifying objects on canvas

var customEvtHandler = function (evt) {
  console.log("I was triggered by a custom event.");
};
//css
</script>

<style lang="scss" scoped>
.tranfrom {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.exit_Arrow {
  //
  position: fixed;
  z-index: 9997;
  border-radius: 30px;

  font-size: xx-large;
  color: red;

  left: 10%;
  top: 1%;
  small {
    display: none;
  }
  @media (min-width: 976px) {
    left: 25%;
    top: 8%;
    background-color: white;

    box-shadow: 0 2px 8px rgba(255, 0, 0, 0.911);
    small {
      display: inline;
    }
  }
}
.shirtsM {
  width: fit-content;
  @media screen and (max-width: 991px) {
    width: 100%;
  }
}
.shirt-card {
  box-shadow: 0 2px 8px rgba(14, 14, 14, 0.445);
  @media (max-width: 976px) {
    box-shadow: none;
  }
}
.buttonS {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(14, 14, 14, 0.445);
  padding: 15px;
  border-radius: 25px;

  width: 100px;
  top: 20%;
  .btn {
    box-shadow: 0 2px 8px rgba(175, 175, 175, 0.445);
    width: 60px;
    height: 60px;
  }
  @media (max-width: 991px) {
    position: static;
    padding: 0 10% 0 10%;
    box-shadow: none;
    .btn {
      box-shadow: 0 2px 8px rgba(175, 175, 175, 0.445);
      width: 60px;
      height: 60px;
    }

    .iconsSize {
      position: fixed;
      top: 60px;
      right: 0;
      z-index: 7;
      width: 25%;
    }

    .col {
      text-align: center;
      padding: 0;
    }
    width: 100%;
  }
}

.shirt01 {
  width: 300px;
  z-index: 5;
  position: static;
}
.pagecreate {
  position: fixed;
  z-index: 9996;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(167, 167, 167, 0.966);
  display: table;
  transition: opacity 1s ease;
  align-items: center;
  @media (max-width: 1000px) {
    background-color: rgb(255, 255, 255);
  }
}
.shirt {
  width: 150px;
}
.customs {
  height: 80%;
  min-width: 80%;
  position: relative;

  @media (max-width: 976px) {
    height: 100%;
    width: 100%;
  }
}

.body {
  padding: 20px;
  @media (max-width: 976px) {
    padding: 0;
  }
}

template {
  z-index: -1;
}

.parent {
  position: relative;
  width: auto;
}

.child {
  position: relative;
  top: 50%;
  left: 49.5%;
  transform: translate(-50%, -50%);

  height: 70%;
  text-align: center;
}

._tank {
  left: 50%;
  top: 67%;
}

._woman {
  left: 50%;
}

.btn {
  width: 100%;
  height: 100%;
}

@media (max-height: 500px) {
  .fixed-bottom {
    display: none;
  }
}

@media (min-width: 1400px) {
  .reposive {
    padding-right: 35%;
    padding-left: 35%;
    padding-bottom: 30px;
    position: absolute;
    z-index: 778;
  }
}

.property-menu {
  position: fixed;
  z-index: 9999999;
  height: 100%;
  width: 100%;
}
/*
@media screen and (max-width: 1000px) {
  .property-menu {
    display: none;
  }
}*/
.back_demo {
  //relative

  border: 1px solid #318cc0;

  z-index: -1;
  position: relative;
}

.demo {
  //relative

  border: 1px solid #ffc000;
  position: absolute;
  z-index: 0;
}

.img {
  width: 75%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.text {
  top: 100%;
  width: 100%;
  font-size: 18px;
  text-align: center;
}

#text {
  color: v-bind(color);
  /* wrapped in quotes */
}

input {
  /*
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: solid;
  background-color: rgb(255, 255, 255);

  margin-left: 15px;
  width: 50%;*/
}

.no-outline:focus {
  outline: none;
}
.canvas01 {
  width: 60px;
}

//ffc000

.label_pain {
  text {
    background-color: rgb(161, 161, 161);
    color: white;
    padding: 2px 12px 5px 10px;
  }

  text-align: center !important;
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
