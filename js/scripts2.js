// :::::: Global :::::: \\
let counter = 0;

let canvasWidth = 300;
let canvasHeigth = 200;

let fps = 60;
let score = 0;
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
  ctx.fillStyle = "#c5aea4";
  ctx.fillRect(0, 0, canvasWidth, canvasHeigth);

  // Draw score
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "start";
  ctx.fillText("SCORE: " + score, 10, 20);
  ctx.closePath();

  // Draw walls
  ctx.fillStyle = "#b29a6d";
  for (i = 0; i < wall.length; i += 1) {
    wall[i].fill(ctx);
  }

  // Draw lava
  ctx.fillStyle = "#bd7631";
  for (i = 0; i < lava.length; i += 1) {
    lava[i].fill(ctx);
  }
  drawPlayer();
  drawJagger();
  // drawWalls();
}

// :::::: Character :::::: \\
const characterWidth = 10;
const characterHeight = 10;

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
      ctx.textAlign = "center";
      ctx.fillText("PAUSE", canvasWidth / 2, canvasHeigth / 2);
      ctx.closePath();
    }
  } else if (e.code === "Enter") return reset();
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
  ctx.fillStyle = "#4caf50";
  bottle.fill(ctx);
  ctx.closePath();
}

// Player Intersects Lava
for (i = 0; i < lava.length; i += 1) {
  if (player.intersects(lava[i])) {
    gameover = true;
    pause = true;
  }
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
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeigth / 2);
      ctx.closePath();

      reset();
    }
  }
}

// :::::: Wall :::::: \\
// let wall = [];

// // Create walls
// wall.push(new Rectangle(170, 30, 120, 10));
// wall.push(new Rectangle(90, 100, 100, 30));
// wall.push(new Rectangle(230, 60, 60, 80));
// wall.push(new Rectangle(200, 190, 30, 30));

// Game Over
function reset() {
  score = 0;
  player.x = 40;
  player.y = 40;
  bottle.x = random(canvas.width / 10 - 1) * 10;
  bottle.y = random(canvas.height / 10 - 1) * 10;
  setMap(maps[0], 10);
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

  // Set map
  // setMap(maps[0], 10);

  // Out Screen
  if (player.x > canvasWidth) {
    currentMap += 1;
    if (currentMap > maps.length - 1) {
      currentMap = 0;
    }
    setMap(maps[currentMap], 10);
    player.x = 0;
  }

  if (player.x < 0) {
    currentMap -= 1;
    if (currentMap < 0) {
      currentMap = maps.length - 1;
    }
    setMap(maps[currentMap], 10);
    player.x = canvasWidth;
  }

  player.movePlayer();
}, 1000 / fps);
