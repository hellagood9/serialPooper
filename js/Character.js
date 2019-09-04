class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 10;
    this.height = height || 10;
    this.ex = 0;
    this.ey = 0;

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
      this.collisionHandler(wall, obstacle => {
        this.x = obstacle.x + obstacle.width;
      });
    }

    if (this.keyState.keyRight) {
      this.x += this.speed;
      this.collisionHandler(wall, obstacle => {
        this.x = obstacle.x - this.width;
      });
    }

    if (this.keyState.keyUp) {
      this.y -= this.speed;
      this.collisionHandler(wall, obstacle => {
        this.y = obstacle.y + obstacle.height;
      });
    }

    if (this.keyState.keyDown) {
      this.y += this.speed;
      this.collisionHandler(wall, obstacle => {
        this.y = obstacle.y - this.height;
      });
    }

    // TODO: refactorizar codigo repetido
    this.collisionHandler(enemies, () => {
      this.health--;

      pause = true;
      lifeReduced = true;

      this.health <= 0
        ? (gameEnded(), (gameover = true))
        : this.health > 0 && this.health <= 3
        ? reset()
        : null;
    });

    // TODO: refactorizar codigo repetido
    this.collisionHandler(water, () => {
      this.health--;

      pause = true;
      lifeReduced = true;

      this.health <= 0
        ? (gameEnded(), (gameover = true))
        : this.health > 0 && this.health <= 3
        ? reset()
        : null;
    });

    this.collisionHandler(bottles, (_, i) => {
      score++;
      bottles.splice(i, 1);
    });

    this.collisionHandler(poopingArea, (_, i) => {
      if (score >= 1) {
        this.isPoopingArea = true;
        poopingArea.splice(i, 1);
      }
    });
  }

  moveEnemy() {
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].ex !== 0) {
        enemies[i].x += enemies[i].ex;

        for (let j = 0; j < wall.length; j++) {
          if (enemies[i].collision(wall[j])) {
            enemies[i].ex *= -1;
            enemies[i].x += enemies[i].ex;
            break;
          }
        }
      }

      if (enemies[i].ey !== 0) {
        enemies[i].y += enemies[i].ey;

        for (let j = 0; j < wall.length; j++) {
          if (enemies[i].collision(wall[j])) {
            enemies[i].ey *= -1;
            enemies[i].y += enemies[i].ey;
            break;
          }
        }
      }

      // Player collision Enemy
      if (player.collision(enemies[i])) {
        gameover = true;
        pause = true;
      }
    }
  }
}
