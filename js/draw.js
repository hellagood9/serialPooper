//Draw walls
function drawWalls() {
  for (let i = 0; i < wall.length; i++) {
    wall[i].draw();
  }
}

// Draw spike
function drawWater() {
  for (let i = 0; i < spike.length; i++) {
    spike[i].draw();
  }
}

// Draw enemies
function drawEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

// Draw bottle
function drawBottles() {
  for (let i = 0; i < bottles.length; i++) {
    bottles[i].draw();
  }
}

// Draw pooping area
function drawPoopingArea() {
  for (let i = 0; i < poopingArea.length; i++) {
    poopingArea[i].draw();
  }
}

// Draw state
function drawState(state, string) {
  if (state == true) {
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeigth);
    ctx.closePath();

    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.fillStyle = "#ffca8f";
    ctx.textAlign = "center";
    ctx.fillText(`${string}`, canvasWidth / 2, canvasHeigth / 2);
    ctx.closePath();
  }
}
