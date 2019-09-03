class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;

//     // :::::: Character :::::: \\
// const characterWidth = 10;
// const characterHeight = 10;

    this.keyState = {
      keyLeft: false,
      keyRight: false,
      keyUp: false,
      keyDown: false
    };

    this.speed = 1.5;
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
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isIntersection(obstacle) {
    for (let i = 0; i < obstacle.length; i++) {
      if (this.intersects(obstacle[i])) {
        switch(this.keyState) {
          case ["keyLeft"]:
            this.x -= this.speed;
            break;

            case ["keyRight"]:
            return this.x = wall[i].x - this.width;
            break;

            case ["keyUp"]:
            this.y -= this.speed;
            break;

            case ["keyDown"]:
            this.y += this.speed;
            break;
        }
      }
    }
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

    // if (this.keyState.keyLeft) this.x -= this.speed;
    // if (this.keyState.keyRight) this.x += this.speed;
    // if (this.keyState.keyUp) this.y -= this.speed;
    // if (this.keyState.keyDown) this.y += this.speed;

    // left
    if (this.keyState.keyLeft) {
      this.x -= this.speed;
      for (let i = 0; i < wall.length; i++) {
        if (this.intersects(wall[i])) {
          this.x = wall[i].x + wall[i].width;
        }
      }
    }

    // right
    if (this.keyState.keyRight) {
      this.x += this.speed;
      for (let i = 0; i < wall.length; i++) {
        if (this.intersects(wall[i])) {
          this.x = wall[i].x - this.width;
        }
      }
      // this.isIntersection(wall)
    }

    // up
    if (this.keyState.keyUp) {
      this.y -= this.speed;
      for (let i = 0; i < wall.length; i++) {
        if (this.intersects(wall[i])) {
          this.y = wall[i].y + wall[i].height;
        }
      }
    }

    // down
    if (this.keyState.keyDown) {
      this.y += this.speed;
      for (let i = 0; i < wall.length; i++) {
        if (this.intersects(wall[i])) {
          this.y = wall[i].y - this.height;
        }
      }
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
