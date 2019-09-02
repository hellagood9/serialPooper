// :::::: Global :::::: \\
let counter = 0;
let canvasWidth = 500;
let canvasHeigth = 400;
let fps = 60;
let score = 0;
let stars = [];
let gameover = true;
let pause = false;
let intervalId = undefined;

// :::::: Canvas :::::: \\
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeigth;

let canvasPosX = 0;
let canvasPosY = 0;

function paint(ctx) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeigth);

  for (i = 0, l = stars.length; i < l; i++) {
    let c = 255 - Math.abs(100 - stars[i].timer);
    ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
    ctx.fillRect(stars[i].x, stars[i].y, 1, 1);
  }

  // Draw score
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "start"
  ctx.fillText("SCORE: " + score, 10, 20);
  ctx.closePath();

  drawPlayer();
  drawJagger();
  drawWalls();
}

// :::::: Character :::::: \\
const characterWidth = 20;
const characterHeight = 20;

// Moving Character
// window.onkeydown = moveCharacter;

function moveCharacter(e) {
  if (!pause) {
    switch (e.code) {
      case "ArrowLeft":
        player.x -= speed;

        for (i = 0, l = wall.length; i < l; i += 1) {
          if (player.intersects(wall[i])) {
            player.x = wall[i].x + wall[i].width;
          }
        }
        break;
      case "ArrowRight":
        player.x += speed;
        for (i = 0, l = wall.length; i < l; i += 1) {
          if (player.intersects(wall[i])) {
            player.x = wall[i].x - player.width;
          }
        }
        break;
      case "ArrowUp":
        player.y -= speed;
        for (i = 0, l = wall.length; i < l; i += 1) {
          if (player.intersects(wall[i])) {
            player.y = wall[i].y + wall[i].height;
          }
        }
        break;
      case "ArrowDown":
        player.y += speed;
        for (i = 0, l = wall.length; i < l; i += 1) {
          if (player.intersects(wall[i])) {
            player.y = wall[i].y - player.height;
          }
        }
        break;
      // case "KeyR":
      //   player.x += speed * 2;
      //   break;
    }
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    pause = !pause;

    if (pause) {
      ctx.beginPath();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvasWidth, canvasHeigth);
      ctx.closePath();

      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.fillStyle = "#ff00ff";
      // ctx.font = "30px Arial";
      ctx.textAlign = "center"
      ctx.fillText("PAUSE", canvasWidth / 2, canvasHeigth / 2);
      ctx.closePath();
    } 
  }
});

const player = new Rectangle(
  canvasPosX,
  canvasPosY,
  characterWidth,
  characterHeight
);

const bottle = new Rectangle(80, 80, 10, 10);

// Draw player
function drawPlayer() {
  ctx.beginPath();
  ctx.fillStyle = "#fbba18";
  player.fill(ctx);
  ctx.closePath();

  // Jagger Intersects
  if (player.intersects(bottle)) {
    score++;
    bottle.x = random(canvasWidth / 10 - 1) * 10;
    bottle.y = random(canvasHeigth / 10 - 1) * 10;
  }
}

// Draw Jagger
function drawJagger() {
  ctx.beginPath();
  ctx.fillStyle = "#f00";
  bottle.fill(ctx);
  ctx.closePath();
}

// Draw walls
function drawWalls() {
  ctx.fillStyle = "#999";
  for (i = 0, l = wall.length; i < l; i += 1) {
    wall[i].fill(ctx);
  }

  // The bottle does not match the position of the wall.
  for (i = 0, l = wall.length; i < l; i += 1) {
    if (bottle.intersects(wall[i])) {
      bottle.x = random(canvas.width / characterWidth - 1) * characterWidth;
      bottle.y = random(canvas.height / characterHeight - 1) * characterHeight;
    }

    if (player.intersects(wall[i])) {
      pause = true;

      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center"
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeigth / 2);
      ctx.closePath();

      reset();
    }
  }
}

// :::::: Stars :::::: \\
class Star {
  constructor(x, y, timer) {
    this.x = x == null ? 0 : x;
    this.y = y == null ? 0 : y;
    this.timer = timer == null ? 0 : timer;
  }
}

// Create stars
Array(200)
  .fill()
  .forEach((x, idx) => {
    return stars.push(
      new Star(random(canvas.width), random(canvas.height), random(100))
    );
  });

// Move Stars
for (i = 0, l = stars.length; i < l; i++) {
  stars[i].y++;
  if (stars[i].y > canvas.height) stars[i].y = 0;
  stars[i].timer += 10;
  if (stars[i].timer > 100) stars[i].timer -= 100;
}

// :::::: Wall :::::: \\
let wall = [];

// Create walls
wall.push(new Rectangle(170, 30, 120, 10));
wall.push(new Rectangle(90, 100, 100, 30));
wall.push(new Rectangle(230, 60, 60, 80));
wall.push(new Rectangle(200, 190, 30, 30));

// Game Over
function reset() {
  score = 0;
  player.x = 40;
  player.y = 40;
  bottle.x = random(canvas.width / 10 - 1) * 10;
  bottle.y = random(canvas.height / 10 - 1) * 10;
  gameover = false;
}

// :::::: RUN :::::: \\
function run() {
  paint(ctx);
}

intervalId = setInterval(() => {
  if (pause) return;

  ctx.clearRect(canvasPosX, canvasPosY, canvasWidth, canvasHeigth);

  run();
  player.movePlayer();
  // counter++;
}, 1000 / fps);
