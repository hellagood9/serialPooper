//Creating an Image object for our enemy
let enemy = new Image();
enemy.src = "../assets/enemy.png";

let spriteWidth = 66;
let spriteHeight = 44;

let spriteCols = 4;
let spriteRows = 2;

let enemySpriteWidth = spriteWidth / spriteCols;
let enemySpriteHeight = spriteHeight / spriteRows;

class Enemy {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
    this.ex = 0;
    this.ey = 0;
    this.currentFrame = 0;
    this.speed = 1.25;
    this.spriteX = 0;
    this.spriteY = 0;
  }

  draw() {
    ctx.drawImage(
      enemy,
      this.currentFrame * enemySpriteWidth,
      this.spriteY,
      enemySpriteWidth,
      enemySpriteHeight,
      this.x,
      this.y,
      10,
      10
    );
  }

  collision(obstacle) {
    if (obstacle !== undefined) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      );
    }
  }

  moveEnemy() {
    if (this.ex !== 0) {
      this.x += this.ex;

      // TODO: refactorizar codigo repetido
      for (let j = 0; j < wall.length; j++) {
        if (this.collision(wall[j])) {
          this.ex *= -1;
          this.x += this.ex;
          break;
        }
      }
      // TODO: refactorizar codigo repetido
      for (let j = 0; j < spike.length; j++) {
        if (this.collision(spike[j])) {
          this.ex *= -1;
          this.x += this.ex;
          break;
        }
      }
      // TODO: refactorizar codigo repetido
      for (let j = 0; j < bottles.length; j++) {
        if (this.collision(bottles[j])) {
          this.ex *= -1;
          this.x += this.ex;
          break;
        }
      }

      if (this.ex > 0) {
        this.spriteY = 0;
      } else {
        this.spriteY = 22;
      }

    }

    if (this.ey !== 0) {
      this.y += this.ey;

      // TODO: refactorizar codigo repetido
      for (let j = 0; j < wall.length; j++) {
        if (this.collision(wall[j])) {
          this.ey *= -1;
          this.y += this.ey;
          break;
        }
      }

      // TODO: refactorizar codigo repetido
      for (let j = 0; j < spike.length; j++) {
        if (this.collision(spike[j])) {
          this.ey *= -1;
          this.y += this.ey;
          break;
        }
      }

      // TODO: refactorizar codigo repetido
      for (let j = 0; j < bottles.length; j++) {
        if (this.collision(bottles[j])) {
          this.ey *= -1;
          this.y += this.ey;
          break;
        }
      }

      if (this.ey > 0) {
        this.spriteY = 0;
      } else {
        this.spriteY = 22;
      }
    }
  }
}
