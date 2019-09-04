class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
    this.vx = 0;
    this.vy = 0;

    this.health = 3;
    this.isPoopingArea = false;

    this.speed = 1.25;
    this.keyState = {
      keyLeft: false,
      keyRight: false,
      keyUp: false,
      keyDown: false,
      keySpace: false
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

  intersectionHandler(obstaclesArray, callback) {
    for (let i = 0; i < obstaclesArray.length; i++) {
      if (this.intersects(obstaclesArray[i])) {
        callback(obstaclesArray[i], i);
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
      this.intersectionHandler(wall, obstacle => {
        this.x = obstacle.x + obstacle.width;
      });
    }

    if (this.keyState.keyRight) {
      this.x += this.speed;
      this.intersectionHandler(wall, obstacle => {
        this.x = obstacle.x - this.width;
      });
    }

    if (this.keyState.keyUp) {
      this.y -= this.speed;
      this.intersectionHandler(wall, obstacle => {
        this.y = obstacle.y + obstacle.height;
      });
    }

    if (this.keyState.keyDown) {
      this.y += this.speed;
      this.intersectionHandler(wall, obstacle => {
        this.y = obstacle.y - this.height;
      });
    }

    // TODO: refactorizar codigo repetido
    this.intersectionHandler(enemies, () => {
      this.health--;

      pause = true;
      lifeReduced = true;

      this.health <= 0
        ? (gameEnded(), gameover = true)
        : this.health > 0 && this.health <= 3
        ? reset()
        : null;
    });

    // TODO: refactorizar codigo repetido
    this.intersectionHandler(water, () => {
      this.health--;

      pause = true;
      lifeReduced = true;

      this.health <= 0
        ? (gameEnded(), gameover = true)
        : this.health > 0 && this.health <= 3
        ? reset()
        : null;
    });

    this.intersectionHandler(bottles, (_, i) => {
      score++;
      bottles.splice(i, 1);
    });

    this.intersectionHandler(poopingArea, (_, i) => {
      if (score >= 1) {
        this.isPoopingArea = true;
        poopingArea.splice(i, 1);
      }
    });


// Move enemies
for (let i = 0; i < enemies.length; i++) {
  if (enemies[i].vx !== 0) {
      enemies[i].x += enemies[i].vx;

      for (let j = 0; j < wall.length; j++) {
          if (enemies[i].intersects(wall[j])) {
              enemies[i].vx *= -1;
              enemies[i].x += enemies[i].vx;
              break;
          }
      }
  }

  if (enemies[i].vy !== 0) {
      enemies[i].y += enemies[i].vy;

      for (let j = 0; j < wall.length; j++) {
          if (enemies[i].intersects(wall[j])) {
              enemies[i].vy *= -1;
              enemies[i].y += enemies[i].vy;
              break;
          }
      }
  }

  // Player Intersects Enemy
  if (player.intersects(enemies[i])) {
      gameover = true;
      pause = true;
  }
}



  }
}
