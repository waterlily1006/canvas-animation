import * as PIXI from "pixi.js";

class animate {
  constructor(id) {
    if (window.pixiUrlList === undefined) {
      window.pixiUrlList = {};
    }
    this.picInfo = {
      pu: {
        width: 1000,
        height: 1642,
        folderu: "p1pu/",
        imgnum: 30,
        rwurl: "@/assets/p1pu/pu0.png"
      },
      hu: {
        width: 1400,
        height: 1308,
        folderu: "p5hu/",
        imgnum: 48,
        rwurl: "@/assets/p5hu/hu0.png"
      },
      an: {
        width: 700,
        height: 1570,
        folderu: "p5an/",
        imgnum: 31,
        rwurl: "@/assets/p5an/an0.png"
      },
      sh: {
        width: 880,
        height: 1512,
        folderu: "p5sh/",
        imgnum: 31,
        rwurl: "@/assets/p5sh/sh0.png"
      },
      wu: {
        width: 920,
        height: 1689,
        folderu: "p5wu/",
        imgnum: 30,
        rwurl: "@/assets/p5wu/wu0.png"
      },
      you: {
        width: 650,
        height: 1308,
        folderu: "p5you/",
        imgnum: 47,
        rwurl: "@/assets/p5hu/hu0.png"
      },
      la: {
        width: 780,
        height: 1352,
        folderu: "p5la/",
        imgnum: 65,
        rwurl: "@/assets/p5hu/hu0.png"
      },
      bai: {
        width: 1330,
        height: 1756,
        folderu: "p5bai/",
        imgnum: 50,
        rwurl: "@/assets/p5hu/hu0.png"
      },
      le: {
        width: 830,
        height: 1302,
        folderu: "p5le/",
        imgnum: 30,
        rwurl: "@/assets/p5hu/hu0.png"
      },
      be: {
        width: 930,
        height: 1174,
        folderu: "p5be/",
        imgnum: 33,
        rwurl: "@/assets/p5hu/hu0.png"
      }
    };
    this.id = id;
    this.app = new PIXI.Application({
      transparent: true
    });
    this.anim = null;
    this.firstFrame = null;
    document.getElementById(this.id).innerHTML = "";
    document.getElementById(this.id).appendChild(this.app.view);
  }

  render(type) {
    this.app.stage.removeChild(this.firstFrame);
    this.app.stage.removeChild(this.anim);
    this.resize(type);

    let imgs = [];
    let frames = [];
    let start = 0;

    if (document.getElementById(this.id).style.background != "") {
      this.firstFrame = PIXI.Sprite.from(
        require("@/assets/" + this.picInfo[type].folderu + type + "0.png")
      );
      this.app.stage.addChild(this.firstFrame);
      start = 1;
    }

    for (let $i = start; $i <= this.picInfo[type].imgnum; $i++) {
      let imgUrl = require("@/assets/" +
        this.picInfo[type].folderu +
        type +
        $i +
        ".png");

      if (
        window.pixiUrlList[imgUrl] === undefined ||
        window.pixiUrlList[imgUrl] === false
      ) {
        window.pixiUrlList[imgUrl] = true;
        imgs.push(imgUrl);
      }
    }

    this.app.loader.destroy();
    this.app.loader.add(imgs).load(() => {
      this.app.stage.removeChild(this.firstFrame);
      this.app.stage.removeChild(this.anim);
      this.resize(type);

      let dirty = false;

      for (let $i = 0; $i <= this.picInfo[type].imgnum; $i++) {
        let imgUrl = require("@/assets/" +
            this.picInfo[type].folderu +
            type +
            $i +
            ".png"),
          textrue = PIXI.Texture.from(imgUrl);
        if (textrue.orig.width === 1) {
          window.pixiUrlList[imgUrl] = false;
          PIXI.Texture.removeFromCache(imgUrl);
          if (dirty === false) {
            dirty = true;
          }
        }

        frames.push(textrue);
      }

      if (dirty) {
        return;
      }

      document.getElementById(this.id).style.background = "none";

      this.anim = new PIXI.AnimatedSprite(frames);
      this.anim.animationSpeed = 0.15;
      this.app.stage.addChild(this.anim);
      this.anim.play();
    });
  }

  resize(type) {
    let width = document.getElementById(this.id).offsetWidth;
    let height = document.getElementById(this.id).offsetHeight;

    this.app.renderer.resize(width, height);
    this.app.stage.scale.x = this.app.renderer.width / this.picInfo[type].width;
    this.app.stage.scale.y =
      this.app.renderer.height / this.picInfo[type].height;
  }
}

const animateObj = id => {
  return new animate(id);
};

export default animateObj;
