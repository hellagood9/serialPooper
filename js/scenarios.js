// :::::: Scenario :::::: \\
let wall = [];
let water = [];
let poopingArea = [];
let bottles = [];
let enemies = []

function setMap(map, blockSize) {
  let col = 0;
  let row = 0;
  let columns = 0;
  let rows = 0;
  wall.length = 0;
  water.length = 0;
  bottles.length = 0;
  for (row = 0, rows = map.length; row < rows; row ++) {
    for (col = 0, columns = map[row].length; col < columns; col ++) {
      if (map[row][col] === 1) {
        wall.push(
          new Rectangle(
            col * blockSize,
            row * blockSize,
            blockSize,
            blockSize,
            true
          )
        );
      } else if (map[row][col] === 2) {
        water.push(
          new Rectangle(
            col * blockSize,
            row * blockSize,
            blockSize,
            blockSize,
            true
          )
        );
      } else if (map[row][col] === 3) {
        bottles.push(
          new Rectangle(
            col * blockSize,
            row * blockSize,
            blockSize,
            blockSize,
            true
          )
        );
      } 
      else if (map[row][col] === 6) {
        poopingArea.push(
          new Rectangle(
            col * blockSize,
            row * blockSize,
            20,
            20,
            true
          )
        );
      } 

      else if (map[row][col] === 4) {
        enemies.push(
          new Rectangle(
            col * blockSize,
            row * blockSize,
            blockSize,
            blockSize,
            true
          )
        );
      } 

      

      // TODO: revisar que funcione
      // else if (map[row][col] > 3 && map[row][col] < 7) {
        
      //   if (map[row][col] === 4) {
      //       // enemies.vx = 5;
      //       enemies.x = 5;
      //   } else if (map[row][col] === 5) {
      //       // enemies.vy = 5;
      //       enemies.y = 5;
      //   }
      //     enemies.push(
      //       new Rectangle(
      //         col * blockSize,
      //         row * blockSize,
      //         blockSize,
      //         blockSize,
      //         true
      //       )
      //     )
      //   }
    }
    
  }
}