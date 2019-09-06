//Creating an Image object for our character
let character = new Image();
character.src = "../assets/character.png";

const sprite = {
  width: 64,
  height: 44,
  cols: 4,
  rows: 2
};

let characterSpriteWidth = sprite.width / sprite.cols;
let characterSpriteHeight = sprite.height / sprite.rows;

class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
    this.ex = 0;
    this.ey = 0;
    this.currentFrame = 0;
    this.spriteY = 0;

    this.life = 3;
    this.isPoopingArea = false;

    this.speed = 1;
    this.keyState = {
      keyLeft: false,
      keyRight: false,
      keyUp: false,
      keyDown: false,
      keySpace: false
    };
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

  collisionHandler(obstaclesArray, callback) {
    for (let i = 0; i < obstaclesArray.length; i++) {
      if (this.collision(obstaclesArray[i])) {
        callback(obstaclesArray[i], i);
      }
    }
  }

  fill(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  draw() {
    ctx.drawImage(
      character,
      this.currentFrame * characterSpriteWidth,
      this.spriteY,
      characterSpriteWidth,
      characterSpriteHeight,
      this.x,
      this.y,
      9,
      9
    );
  }

  movePlayer() {
    document.addEventListener("keydown", e => {
      e.preventDefault();

      switch (e.keyCode) {
        case 37:
          this.keyState.keyLeft = true;
          break;
        case 38:
          this.keyState.keyUp = true;
          break;
        case 39:
          this.keyState.keyRight = true;
          break;
        case 40:
          this.keyState.keyDown = true;
          break;
      }
    });

    document.addEventListener("keyup", e => {
      e.preventDefault();

      switch (e.keyCode) {
        case 37:
          this.keyState.keyLeft = false;
          break;
        case 38:
          this.keyState.keyUp = false;
          break;
        case 39:
          this.keyState.keyRight = false;
          break;
        case 40:
          this.keyState.keyDown = false;
          break;
      }
    });

    if (this.keyState.keyLeft) {
      this.x -= this.speed;
      this.spriteY = 21;

      this.currentFrame--;
      if (this.currentFrame < 0) this.currentFrame = 2;

      this.collisionHandler(wall, obstacle => {
        this.x = obstacle.x + obstacle.width;
      });
    }

    if (this.keyState.keyRight) {
      this.x += this.speed;
      this.spriteY = 0;

      this.currentFrame++;
      if (this.currentFrame > 2) this.currentFrame = 0;

      this.collisionHandler(wall, obstacle => {
        this.x = obstacle.x - this.width;
      });
    }

    if (this.keyState.keyUp) {
      this.y -= this.speed;

      this.currentFrame--;
      if (this.currentFrame < 0) this.currentFrame = 2;

      this.collisionHandler(wall, obstacle => {
        this.y = obstacle.y + obstacle.height;
      });
    }

    if (this.keyState.keyDown) {
      this.y += this.speed;

      this.currentFrame--;
      if (this.currentFrame < 0) this.currentFrame = 2;

      this.collisionHandler(wall, obstacle => {
        this.y = obstacle.y - this.height;
      });
    }

    // TODO: refactorizar codigo repetido
    this.collisionHandler(enemies, () => {
      this.life--;

      pause = true;
      lifeReduced = true;

      this.life <= 0
        ? (gameEnded(), (gameover = true))
        : this.life > 0 && this.life <= 3
        ? reset()
        : null;
    });

    // TODO: refactorizar codigo repetido
    this.collisionHandler(spike, () => {
      this.life--;

      pause = true;
      lifeReduced = true;

      this.life <= 0
        ? (gameEnded(), (gameover = true))
        : this.life > 0 && this.life <= 3
        ? reset()
        : null;
    });

    this.collisionHandler(bottles, (_, i) => {
      bottleCounter++;
      bottles.splice(i, 1);
    });

    this.collisionHandler(poopingArea, (_, i) => {
      if (bottleCounter >= 2) {
        this.isPoopingArea = true;
        poopingArea.splice(i, 1);
      }
    });
  }
}
