// :::::: Scenario :::::: \\
let wall = [];
let water = [];
let bottles = [];
let enemies = [];
let poopingArea = [];

function setMap(map, blockSize) {
  let col = 0;
  let row = 0;
  let columns = 0;
  let rows = 0;

  wall.length = 0;
  water.length = 0;
  bottles.length = 0;
  enemies.length = 0;
  poopingArea.length = 0;

  for (row = 0, rows = map.length; row < rows; row++) {
    for (col = 0, columns = map[row].length; col < columns; col++) {
      if (map[row][col] === 1) {
        wall.push(
          new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize)
        );
      } else if (map[row][col] === 2) {
        water.push(
          new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize)
        );
      } else if (map[row][col] === 3) {
        bottles.push(
          new Rectangle(col * blockSize, row * blockSize, blockSize, blockSize)
        );
      } else if (map[row][col] > 3 && map[row][col] < 6) {
        const enemy = new Rectangle(
          col * blockSize,
          row * blockSize,
          blockSize,
          blockSize
        );
        if (map[row][col] === 4) {
          enemy.ex = randomFloat(0.5, 1);
        } else if (map[row][col] === 5) {
          enemy.ey = randomFloat(0.5, 1);
        }
        enemies.push(enemy);
      } else if (map[row][col] === 6) {
        poopingArea.push(
          new Rectangle(col * blockSize, row * blockSize, 20, 20)
        );
      }
    }
  }
}
