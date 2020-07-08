class Animation {
    options;
    $canvas;
    ctx;
    images;
    length;
    width;
    height;
    activeIndex = 0;
    step = 100;
    startTime = 0;
    animationId = 0;
    isLoadCompleted = false;
    playAfterLoaded = false;
    constructor(options) {
        this.$canvas = document.getElementById(options.canvasId);
        this.ctx = this.$canvas.getContext("2d");
        this.images = options.images;
        this.length = this.images.length;
        this.width = options.width || 600;
        this.height = options.height || 400;
        this.$canvas.width = this.width;
        this.$canvas.height = this.height;
        this.$canvas.style.width = this.width + "px";
        this.$canvas.style.height = this.height + "px";
        this.options = options;
        this.loadImages();
    }
    loadImages() {
        this.images = this.images.map((src) => {
            return new Promise((resolve) => {
                let img = new Image();
                img.src = src;
                img.addEventListener("load", () => {
                    resolve(img);
                });
            });
        });
        Promise.all(this.images).then((res) => {
            this.images = res;
            this.drawImage();
            this.isLoadCompleted = true;
            if (this.playAfterLoaded) {
                this.play();
            }
        });
    }
    drawImage() {
        let img = this.images[this.activeIndex];
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.save();
        this.ctx.scale(this.options.scaleX || 1, this.options.scaleY || 1);
        this.ctx.drawImage(img, 0, 0);
        this.ctx.restore();
        if (this.options.imageChange instanceof Function) {
            this.options.imageChange(img);
        }
    }
    run() {
        this.animationId = window.requestAnimationFrame((t) => {
            this.drawFrame(t);
        });
    }
    drawFrame(timestamp) {
        this.startTime = this.startTime || timestamp;
        if (timestamp - this.startTime > this.step) {
            this.drawImage();
            this.setActiveIndex();
            this.startTime = timestamp;
        }
        this.run();
    }
    setActiveIndex() {
        this.activeIndex =
            this.activeIndex + 1 >= this.length ? 0 : this.activeIndex + 1;
    }


    play() {
        if (!this.isLoadCompleted) {
            this.playAfterLoaded = true;
            return;
        }
        this.run();
    }
    pause() {
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
        }
    }
    stop() {
        this.pause();
        this.activeIndex = 0;
        this.drawImage();
    }
}

export  default  Animation;