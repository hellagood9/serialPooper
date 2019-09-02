class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 0;
    this.height = height || 0;

    this.keyState = {
      keyLeft: false,
      keyRight: false,
      keyUp: false,
      keyDown: false
    };

    this.speed = 2;
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

  fill(ctx) {
    if (ctx == null) {
      window.console.warn("Missing parameters on function fill");
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  movePlayer() {
    // TEST
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.keyState.keyLeft = true;
      }
      if (e.keyCode === 38) {
        this.keyState.keyUp = true;
      }
      if (e.keyCode === 39) {
        this.keyState.keyRight = true;
      }
      if (e.keyCode === 40) {
        this.keyState.keyDown = true;
      }
    });
    document.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.keyState.keyLeft = false;
      }
      if (e.keyCode === 38) {
        this.keyState.keyUp = false;
      }
      if (e.keyCode === 39) {
        this.keyState.keyRight = false;
      }
      if (e.keyCode === 40) {
        this.keyState.keyDown = false;
      }
    });

    if (this.keyState.keyLeft) {
      this.x -= this.speed;
    }
    if (this.keyState.keyRight) {
      this.x += this.speed;
    }

    if (this.keyState.keyUp) {
      this.y -= this.speed;
    }

    if (this.keyState.keyDown) {
      this.y += this.speed;
    }

    // :::::: Handling out of canvas :::::: \\

    // "Out of grid" restrictions
    if (this.x > canvasWidth - characterWidth)
      this.x = canvasWidth - characterWidth;
    if (this.y > canvasHeigth - characterHeight)
      this.y = canvasHeigth - characterHeight;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;

    // No "Out of grid" restrictions
    // if (this.x > canvasWidth - characterWidth) this.x = 0;
    // if (this.y > canvasHeigth - characterHeight) this.y = 0;
    // if (this.x < 0) this.x = canvasWidth - characterWidth;
    // if (this.y < 0) this.y = canvasHeigth - characterHeight;
  }
}
