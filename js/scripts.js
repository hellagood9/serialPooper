// :::::: Global :::::: \\
let currentMap = 0;
let fps = 60;

let gameover = false;
let pause = false;
let lifeReduced = false;
let bottleCounter = 0;
let intervalId = undefined;

// :::::: Canvas :::::: \\
let canvasWidth = 300;
let canvasHeigth = 200;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeigth;

function paint(ctx) {
  ctx.fillStyle = "#c5aea4";
  ctx.fillRect(0, 0, canvasWidth, canvasHeigth);

  // Draw bottleCounter status
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "start";
  ctx.fillText("BOTTLES: " + bottleCounter, 10, 20);
  ctx.closePath();

  // Draw life status
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.fillText("LIFE: " + player.life, 130, 20);
  ctx.closePath();

  // Draw pooping status
  if (bottleCounter >= 2 && bottleCounter % 2 == 0) {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillText("POO NOW!", 230, 20);
    ctx.closePath();
  }

  drawWalls();
  drawWater();
  drawEnemies();
  drawBottles();
  drawPoopingArea();
  drawPlayer();

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
const player = new Rectangle(40, 100, characterWidth, characterHeight);

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    pause = !pause;

    drawState(pause, "PAUSE");
  } else if (e.code === "Enter") return reset();
});

function reset() {
  bottleCounter = 0;
  player.x = 40;
  player.y = 100;
}

function gameEnded() {
  bottleCounter = 0;
  player.life = 3;
  player.x = 40;
  player.y = 95;
}

// :::::: MAPS :::::: \\
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

// :::::: START :::::: \\
function start() {
  paint(ctx);
}

intervalId = setInterval(() => {
  if (pause) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeigth);

  loadMaps();

  player.movePlayer();
  player.moveEnemy();
  start();
}, 1000 / fps);
