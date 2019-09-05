// let wallImg = new Image();
// wallImg.src = "../assets/wall.png";

// function draw(what, whereX, whereY, itWidth, itHeight, itX, itY, sizeX, sizeY) {
//   ctx.drawImage(
//     what, whereX, whereY, itWidth, itHeight, itX, itY, sizeX, sizeY
//   );
// }

//Draw walls
function drawWalls() {
  ctx.fillStyle = "#b29a6d";
  for (let i = 0; i < wall.length; i++) {
    //  wall[i].fill(ctx);
    
    wall[i].draw()

    
      // wall[i] = new Image();
      // wall[i].onload = function() {
      //     ctx.drawImage(this, this.x, this.y);         
      // };
      // wall[i].src = "../assets/wall.png";
  
    

  }
}





// Draw water
function drawWater() {
  // ctx.fillStyle = "#bfe9fb";
  for (let i = 0; i < water.length; i++) {
    // water[i].fill(ctx);

    water[i].draw()
  }
}

// Draw enemies
function drawEnemies() {
  // ctx.fillStyle = "#000";
  for (let i = 0; i < enemies.length; i++) {
    // enemies[i].fill(ctx);
    enemies[i].draw();
  }
}

// Draw bottle
function drawBottles() {
  ctx.fillStyle = "#f6bffb";
  for (let i = 0; i < bottles.length; i++) {
    bottles[i].fill(ctx);
  }
}

// Draw pooping area
function drawPoopingArea() {
  ctx.fillStyle = "#4caf50";
  for (let i = 0; i < poopingArea.length; i++) {
    poopingArea[i].fill(ctx);
  }
}

// Draw player
// function drawPlayer() {
//   ctx.beginPath();
//   ctx.fillStyle = "#fbba18";
//   player.fill(ctx);
//   ctx.closePath();
// }

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
    ctx.fillStyle = "#ff00ff";
    ctx.textAlign = "center";
    ctx.fillText(`${string}`, canvasWidth / 2, canvasHeigth / 2);
    ctx.closePath();
  }
}
