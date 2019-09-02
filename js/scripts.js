// ::: Global ::: \\
let movingRigth = true;
let counter = 0;
let canWidth = 650;
let canHeigth = 300;
let fps = 10;
let pause = false;

// ::: Canvas ::: \\
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canWidth;
canvas.height = canHeigth;
// const canvasX = 0;
// const canvasY = 0;
let canvasX = 0;
let canvasY = 0;

// ::: Image ::: \\
let spriteWidth = 576;
let spriteHeight = 256;

let spriteCols = 9;
let spriteRows = 4;

let sprite1Col = spriteWidth / spriteCols;
let sprite1Row = spriteHeight / spriteRows;

let currentFrame = 0;
let imgPosX = 0; // initial x coordinate
let imgPosY = 192; // initial y coordinate

const character = new Image();
character.src = "../img/skeleton.png";

function drawImage() { 
  updateFrame();
  ctx.drawImage(
    character, // img to use
    imgPosX, // x coordinate where to start clipping
    imgPosY, // y coordinate where to start clipping
    sprite1Col, // width of the clipped image
    sprite1Row, // height of the clipped image
    canvasX, // x coordinate where to place the image on the canvas
    canvasY, // y coordinate where to place the image on the canvas
    sprite1Col, // the width of the image to use
    sprite1Row // the height of the image to use
  );
}

function updateFrame() {
  currentFrame = ++currentFrame % spriteCols;
  // canvasX = 0
  moveCharacter();
  ctx.clearRect(canvasX, canvasX, canWidth, canHeigth);
}

function moveCharacter() {
  window.onkeydown = function(e) {
    switch (e.code) {
      case "ArrowLeft":
        imgPosX = currentFrame * sprite1Col;
        imgPosY = sprite1Row * 1;
        break;
      case "ArrowRight":
        imgPosX = currentFrame * sprite1Col;
        imgPosY = sprite1Row * 3;
        break;
      case "ArrowUp":
        imgPosX = currentFrame * sprite1Col;
        imgPosY = sprite1Row * 0;
        break;
      case "ArrowDown":
        imgPosX = currentFrame * sprite1Col;
        imgPosY = sprite1Row * 2;
        break;
      case "Space":
        pause = !pause;
        break;
    }
  };
}

setInterval(() => {
  if (pause) return;

  ctx.clearRect(canvasX, canvasX, canWidth, canHeigth);

  drawImage();
  counter++;
}, 1000 / fps);
