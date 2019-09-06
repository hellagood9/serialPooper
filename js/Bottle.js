//Creating an Image object for our enemy
let bottleImg = new Image();
bottleImg.src = "../assets/bottle.png";

class Bottle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
  }

  draw() {
    ctx.drawImage(
      bottleImg,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      6,
      6
    );
  }
}
