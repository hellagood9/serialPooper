// :::::: Global :::::: \\
const font = "Blue Sky 8x8";
document.fonts.load('10pt "Blue Sky 8x8"');

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
// let canvasWidth = 960;
// let canvasHeigth = 704;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const canvasWidth = window.innerWidth;
// const canvasHeigth = window.innerHeight;
const ratio = window.devicePixelRatio;

function setCanvasDimensions() {
  canvas.setAttribute("width", `${canvasWidth}px`);
  canvas.setAttribute("height", `${canvasHeigth}px`);
}

setCanvasDimensions();

window.onresize = setCanvasDimensions;

canvas.width = canvasWidth * ratio;
canvas.height = canvasHeigth * ratio;
ctx.scale(ratio, ratio);
ctx.imageSmoothingEnabled = false;

// :::::: Character :::::: \\
const characterWidth = 10;
const characterHeight = 10;
const player = new Rectangle(40, 100, characterWidth, characterHeight);




function paint(ctx) {
  ctx.fillStyle = "#c5aea4";
  ctx.fillRect(0, 0, canvasWidth, canvasHeigth);

  // Draw bottleCounter status
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "start";
  // TODO
  ctx.font = `9px "${font}"`;
  ctx.fillText("Bottles: " + bottleCounter, 10, 20);
  ctx.closePath();

  // Draw life status
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.fillText("Life: " + player.life, 130, 20);
  ctx.closePath();

  // Draw pooping status
  if (bottleCounter >= 2) {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillText("Poo NOW!", 230, 20);
    ctx.closePath();
  }

  drawWalls();
  drawWater();
  drawEnemies();
  drawBottles();
  drawPoopingArea();
  // drawPlayer();

  player.draw();
  // enemy.draw();

  if (pause && lifeReduced && !gameover)
    drawState(lifeReduced, "OOOPS! TRY AGAIN");

  if (gameover) {
    drawState(gameover, "GAME OVER");
    gameover = !gameover;
  }
}

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
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].moveEnemy();
  }
  
  start();
}, 1000 / fps);
