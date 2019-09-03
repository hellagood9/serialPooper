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
      this.isIntersection("right", lava);

      // @@@@@@ test
      // Player Intersects Lava
      // for (let i = 0; i < lava.length; i++) {
      //   if (this.intersects(lava[i])) {
      //     pause = true;

      //     ctx.beginPath();
      //     ctx.fillStyle = "#ffffff";
      //     ctx.textAlign = "center";
      //     ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeigth / 2);
      //     ctx.closePath();

      //     reset();
      //   }
      // }


      // Player Intersects bottle
      for (let i = 0; i < jagger.length; i++) {
        if (this.intersects(jagger[i])) {
          score++;
          jagger.splice(i,1);
          // ctx.clearRect(jagger[i].width, jagger[i].height, 0, 0);
        }
      }

      // @@@@@@ end test
    }

    if (this.keyState.keyUp) {
      this.y -= this.speed;
      this.isIntersection("up", wall);
    }

    if (this.keyState.keyDown) {
      this.y += this.speed;
      this.isIntersection("down", wall);
    }
  }
}
