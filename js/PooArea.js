//Creating an Image object for our enemy
let pooAreaImg = new Image();
pooAreaImg.src = "../assets/grass.png";

class PooArea {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
  }

  draw() {
    ctx.drawImage(
      pooAreaImg,
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
