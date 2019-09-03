class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;

    this.speed = 1.5;
    this.keyState = {
      keyLeft: false,
      keyRight: false,
      keyUp: false,
      keyDown: false
    };
  }

  intersects(obstacle) {
    if (obstacle !== undefined) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      );
    }
  }

  isIntersection(direction, obstacle) {
    for (let i = 0; i < obstacle.length; i++) {
      if (this.intersects(obstacle[i])) {
        switch (direction) {
          case "left":
            return (this.x = obstacle[i].x + obstacle[i].width);
          case "right":
            return (this.x = obstacle[i].x - this.width);
          case "up":
            return (this.y = obstacle[i].y + obstacle[i].height);
          case "down":
            return (this.y = obstacle[i].y - this.height);
        }
      }
    }
  }

  fill(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
      this.isIntersection("left", wall);
    }

    if (this.keyState.keyRight) {
      this.x += this.speed;
      this.isIntersection("right", wall);
    }

    if (this.keyState.keyUp) {
      this.y -= this.speed;
      this.isIntersection("up", wall);
    }

    if (this.keyState.keyDown) {
      this.y += this.speed;
      this.isIntersection("down", wall);
    }

    // "Out of grid" restrictions
    // if (this.x > canvasWidth - characterWidth) this.x = canvasWidth - characterWidth;
    // if (this.y > canvasHeigth - characterHeight) this.y = canvasHeigth - characterHeight;
    // if (this.x < 0) this.x = 0;
    // if (this.y < 0) this.y = 0;

    // No "Out of grid" restrictions
    // if (this.x > canvasWidth - characterWidth) this.x = 0;
    // if (this.y > canvasHeigth - characterHeight) this.y = 0;
    // if (this.x < 0) this.x = canvasWidth - characterWidth;
    // if (this.y < 0) this.y = canvasHeigth - characterHeight;
  }
}
