function cavasAnimation(id, rw) {

    document.getElementById('out').innerHTML = "";
    document.getElementById('out').innerHTML= '  <canvas id="animation_canvas" width="1400" height="1308"></canvas>'
    let sourcesRw = [];

    for (let i = 0; i <= rw.num; i++) {
        sourcesRw[i] = require('@/assets/images/' + rw.key + '/' + rw.key + i + '.png');
    }
    //创建画布
    var canvas = document.getElementById(id);
    canvas.width = rw.width;
    canvas.height = rw.height;

    let ctx = canvas.getContext("2d");
    //执行
    loadImages(sourcesRw, function (images) {
        playImages(images)
    });


//预加载图片
    function loadImages(sourcesRw, callback) {
        let loadedImages = 0;
        let numImages = 0;
        let images = [];
        numImages = sourcesRw.length;
        for (let i = 0, len = sourcesRw.length; i < len; i++) {
            images[i] = new Image();
            images[i].onload = () => {
                console.log(numImages)
                loadedImages++;
                if (loadedImages >= numImages) {
                    callback(images);
                }
            };
            //把sourcesRw中的图片信息导入images数组
            images[i].src = sourcesRw[i];
        }
    }

//播放图片
    function playImages(images) {
        let imageNum = images.length;
        let imageNow = 0;
        setInterval(() => {
           ctx.clearRect(0, 0, rw.width, rw.height);
            ctx.drawImage(images[imageNow], 0, 0, rw.width, rw.height);
            imageNow++;
            if (imageNow >= imageNum) {
                imageNow = 0;
            }
        }, 50)
    }
}

export default cavasAnimation