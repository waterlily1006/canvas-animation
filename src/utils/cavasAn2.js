class cavasAnimate {
    constructor(id, activeRw) {
        // console.log(id, activeRw)
        // this.rwList = rwList;
        this.id = id;
        this.sourcesRw = [];
        this.canvas = null;
        this.ctx = null;
        this.timer = null;
        this.loadedImages = 0;
        this.numImages = 0;
        this.images = [];
        this.activeRw = activeRw;
        this.init(id)
    }

    init(id) {
        //创建画布
        this.canvas = document.getElementById(id);
        this.canvas.width = this.activeRw.width;
        this.canvas.height = this.activeRw.height;
        this.ctx = this.canvas.getContext("2d");
        this.changeRw(this.activeRw, id);
    }

    changeRw(activeRw) {
        console.log(activeRw)
        // this.timer = null;
        clearInterval(this.timer)
        this.sourcesRw = [];
        this.canvas.width = activeRw.width;
        this.canvas.height = activeRw.height;
        console.log(2)
        this.ctx.clearRect(0, 0, this.activeRw.width, this.activeRw.height);

        for (let i = 0; i <= activeRw.num; i++) {
            this.sourcesRw[i] = require('@/assets/images/' + activeRw.key + '/' + activeRw.key + i + '.png');
        }
        console.log(this.sourcesRw)

        //执行图片预加载，加载完成后播放图片
        this.loadImg(this.sourcesRw, (images) => {
            // console.log(1,this.sourcesRw)
            this.activeRw = activeRw;
            console.log(document.getElementById(this.id).parentElement)
            clearInterval(this.timer)
            this.playImg(images)
        });
    }

    loadImg(sourcesRw, callback) {
        this.loadedImages = 0;
        this.numImages = 0;
        this.images = [];
        this.numImages = this.sourcesRw.length;
        for (let i = 0, len = sourcesRw.length; i < len; i++) {
            this.images[i] = new Image();
            //当一张图片加载完成时执行
            this.images[i].onload = () => {
                //当所有图片加载完成时，执行回调函数callback
                console.log(this.numImages)
                this.loadedImages++;
                if (this.loadedImages >= this.numImages) {
                    callback(this.images);
                }
            };
            //把sourcesRw中的图片信息导入images数组
            this.images[i].src = this.sourcesRw[i];
        }
    }

    playImg(images) {
        let imageNum = images.length;
        let imageNow = 0;
        this.timer = setInterval(() => {
            this.ctx.clearRect(0, 0, this.activeRw.width, this.activeRw.height);
            // this.ctx.globalAlpha=0.9
            this.ctx.drawImage(images[imageNow], 0, 0, this.activeRw.width, this.activeRw.height);
            if (document.getElementById(this.id).parentElement.style.background !== "none") {
                document.getElementById(this.id).parentElement.style.background = "none";
            }

            imageNow++;
            if (imageNow >= imageNum) {
                imageNow = 0;
            }
        }, 70)
    }

    resize() {

    }
}

const animateObj = (id, rwList) => {
    return new cavasAnimate(id, rwList);
};

export default animateObj;
