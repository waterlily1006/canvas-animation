<template>
    <div class="part1">
        <ul>
            <li v-for="(item,index) in rwArr" :key="item.key" @click="chooseRw(index)">
                {{item.key}}
            </li>
        </ul>
        <div id="out" :class="rwArr[activeIndex].key+'_bg'">
            <canvas id="animation_canvas" width="1400" height="1308"></canvas>
        </div>
        <div class="ready" v-show="false">
            <img src="@/assets/images/hu/hu0.png" alt="">
            <img src="@/assets/images/al/al0.png" alt="">
            <img src="@/assets/images/ll/ll0.png" alt="">
        </div>

    </div>
</template>

<script>
    import cavasAnimation from "@/utils/cavasAn4";

    export default {
        name: "Rw",
        props: {
            msg: String
        },
        data() {
            return {
                canvasAniObj: null,
                canvasAniObj2: null,
                canvasAniObj3: null,
                activeIndex: 0,
                timer: null,
                rwArr: [
                    {
                        key: 'hu',
                        width: 1400,
                        height: 1308,
                        num: 107
                    }, {
                        key: 'al',
                        width: 950,
                        height: 1628,
                        num: 66
                    },
                    {
                        key: 'll',
                        width: 1400,
                        height: 1564,
                        num: 67
                    }

                ],
                loaded: false
            };
        },
        watch: {
            // loaded(val) {
            //     if (val) {
            //         console.log('watch', val)
            //         this.canvasAniObj.playImg(this.canvasAniObj.images)
            //         clearInterval(this.timer)
            //     }
            // }
        },
        methods: {
            chooseRw(index) {
                console.log(index)
                this.activeIndex = index;
                this.canvasAniObj.changeRw(this.rwArr[index])
                let imgUrl = require('@/assets/images/' + this.rwArr[index].key + '/' + this.rwArr[index].key + '0.png');
                document.getElementById('animation_canvas').parentElement.style.backgroundImage = 'url(' + imgUrl + ')';
                // clearInterval(this.timer);
                // clearInterval(this.canvasAniObj2.timer);
                // clearInterval(this.canvasAniObj3.timer);
                // clearInterval(this.canvasAniObj.timer);
                // switch (index) {
                //     case 0:
                //         this.canvasAniObj.playImg(this.canvasAniObj.images);
                //         break;
                //     case 1:
                //         this.canvasAniObj2.playImg(this.canvasAniObj2.images);
                //         break;
                //     case 2:
                //         this.canvasAniObj3.playImg(this.canvasAniObj3.images);
                //         break;
                // }
            }
        },
        mounted() {
            this.canvasAniObj = cavasAnimation("animation_canvas", this.rwArr[0])
            /*this.canvasAniObj2 = cavasAnimation("animation_canvas", this.rwArr[1])
            this.canvasAniObj3 = cavasAnimation("animation_canvas", this.rwArr[2])
            console.log(this.canvasAniObj.loadedSuccess)


            this.timer = setInterval(() => {
                this.loaded = this.canvasAniObj.loadedSuccess;
            }, 50)*/
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .part1 {
        /*background: url("~@/assets/images/part1_bg.jpg") no-repeat center;*/
        /*background-size: cover;*/
        height: 100vh;
        margin: 0 auto;
        /*overflow: hidden;*/
    }

    .hu_bg {
        background: url("~@/assets/images/hu/hu0.png") no-repeat center;
        background-size: 100% 100%;
        width: 1400px;
        height: 1308px;
    }

    .al_bg {
        background: url("~@/assets/images/al/al0.png") no-repeat center;
        background-size: 100% 100%;
        width: 950px;
        height: 1628px;
    }

    .ll_bg {
        background: url("~@/assets/images/ll/ll0.png") no-repeat center;
        background-size: 100% 100%;
        width: 1400px;
        height: 1574px;
    }
</style>
