<template>
    <div class=" parent">

        <img :class="size_re(_type[Slide])" v-bind:src="this.img_canvas[Slide]" />


        <div class="shirt_position" :style='_color'> </div>
        <img v-bind:src="this.image[Slide]" style="width:100%">

    </div>
</template>
  
<script scope>
import axios from 'axios';

export default {
    name: "Image",
    component: {

    },
    props: {

        _data: Object,
    },

    computed: {
        _color() {

            let color = ` background-color:${this.color_shirt[this.Slide]};`
            return color;
        },
        Slide() {
            let slide = this._data.num - 1;

            if (this._data.num > this.data.length) {

                slide = 0;

            }
            return slide
        },
    },
    data() {
        return {
            data: [],
            image: [],
            img: null,
            img_canvas: [],
            localhost:window.location.host,
            color_shirt: [], _type: [],
        }

    },
    mounted() {
        axios.get(`http://${this.localhost}/services/arm_service/searchshirt/${this._data._id}`)
            .then(response => {
                this.data = response.data;
                for (let i in this.data) {


                    this._type.push(this.data[i].property._type);
                    this.image.push(require(`@/assets/img/${this.data[i].property._type}front.png`));
                    this.color_shirt.push(this.data[i].property.color);
                    this.img_canvas.push(`http://${this.localhost}/images/${this.data[i].shirt_path.front}.png`)

                }

            })
            .catch(error => {
                console.log(error);
            });

    },
    methods: {
        size_re(ev) {
      
            if (ev == 'mens_tank_') {
                return '_tank'
            } else if (ev == 'womens_crew_') {
                return '_woman'
            } else {
                return 'crew'
            }
        },
    }
};
</script>
  
  
<style scoped>
/* we will explain what these classes do next! */

._tank {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 50%;
    text-align: center;
}

._woman {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 70%;
    text-align: center;

}

.crew {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45%;
    height: 70%;
    text-align: center;
}

.shirt_position {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    text-align: center;
    z-index: -1;
}


.shirt_add {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 90%;
    text-align: center;
    z-index: -1;
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
</style>