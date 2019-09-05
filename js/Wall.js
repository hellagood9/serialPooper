//Creating an Image object for our enemy
let wallImg = new Image();
wallImg.src = "../assets/wall.png";

class Wall {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
  }

  draw() {
    ctx.drawImage(
      wallImg,
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
