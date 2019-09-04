// :::::: Global :::::: \\
let counter = 0;
let currentMap = 0;
let canvasWidth = 300;
let canvasHeigth = 200;

let fps = 60;
let score = 0;

let lifeReduced = false;
let gameover = false;
let pause = false;

let intervalId = undefined;

// :::::: Canvas :::::: \\
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeigth;

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
  for (let i = 0; i < wall.length; i++) {
    wall[i].fill(ctx);
  }

  // Draw enemies
  ctx.fillStyle = "#000";
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].fill(ctx);
  }

  // Draw water
  ctx.fillStyle = "#bfe9fb";
  for (let i = 0; i < water.length; i++) {
    water[i].fill(ctx);
  }

  // Draw bottle
  ctx.fillStyle = "#f6bffb";
  for (let i = 0; i < bottles.length; i++) {
    bottles[i].fill(ctx);
  }

  // Draw pooping area
  ctx.fillStyle = "#4caf50";
  for (let i = 0; i < poopingArea.length; i++) {
    poopingArea[i].fill(ctx);
  }

  // Draw life
  ctx.beginPath();
  ctx.fillText("Health: " + player.health, 150, 20);
  ctx.closePath();

  drawPlayer();
  // drawBottle();
  // drawWalls();

  if (pause && lifeReduced && !gameover)
    drawState(lifeReduced, "OOOPS! TRY AGAIN");

  if (gameover) {
    drawState(gameover, "GAME OVER");
    gameover = !gameover;
  }
}

// :::::: Character :::::: \\
const characterWidth = 10;
const characterHeight = 10;

function drawState(state, string) {
  if (state == true) {
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeigth);
    ctx.closePath();

    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.fillStyle = "#ff00ff";
    ctx.textAlign = "center";
    ctx.fillText(`${string}`, canvasWidth / 2, canvasHeigth / 2);
    ctx.closePath();
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    pause = !pause;

    drawState(pause, "PAUSE");
  } else if (e.code === "Enter") return reset();
});

const player = new Rectangle(40, 100, characterWidth, characterHeight);

// const bottle = new Rectangle(80, 80, 10, 10);

// Draw player
function drawPlayer() {
  ctx.beginPath();
  ctx.fillStyle = "#fbba18";
  player.fill(ctx);
  ctx.closePath();
}

// Draw Bottle
// function drawBottle() {
//   ctx.beginPath();
//   ctx.fillStyle = "#4caf50";
//   bottle.fill(ctx);
//   ctx.closePath();
// }

// Draw walls
// function drawWalls() {
//   ctx.fillStyle = "#999";
//   for (let i = 0; i < wall.length; i ++) {
//     wall[i].fill(ctx);
//   }
// }

// Game Over
function reset() {
  score = 0;
  player.x = 40;
  player.y = 100;
  // player.health = 3
}

function gameEnded() {
  score = 0;

  player.health = 3;
  player.x = 40;
  player.y = 95;
}

// :::::: START :::::: \\
function start() {
  paint(ctx);
  // loadMaps()
}

function loadMaps() {
  if (player.x > canvasWidth) {
    currentMap++;
    if (currentMap > maps.length - 1) {
      currentMap = 0;
    }
    setMap(maps[currentMap], 10);
    player.x = 0;
  }

  if (player.x < 0) {
    currentMap--;
    if (currentMap < 0) {
      currentMap = maps.length - 1;
    }
    setMap(maps[currentMap], 10);
    player.x = canvasWidth;
  }
}

setMap(maps[currentMap], 10);

intervalId = setInterval(() => {
  if (pause) return;
  counter++;

  ctx.clearRect(0, 0, canvasWidth, canvasHeigth);

  loadMaps();

  player.movePlayer();
  player.moveEnemy();
  start();
}, 1000 / fps);
