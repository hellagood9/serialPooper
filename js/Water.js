//Creating an Image object for our enemy
let waterImg = new Image();
waterImg.src = "../assets/water.png";

class Water {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
  }

  draw() {
    ctx.drawImage(
      waterImg,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      10,
      10
    );
  }
}
