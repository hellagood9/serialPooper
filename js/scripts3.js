
  var KEY_ENTER = 13,
      KEY_LEFT = 37,
      KEY_UP = 38,
      KEY_RIGHT = 39,
      KEY_DOWN = 40,
      
      canvas = null,
      ctx = null,
      lastPress = null,
      pressing = [],
      pause = false,
      player = null,
      wall = [],
      i = 0,
      l = 0;
  
  function Rectangle2D(x, y, width, height, createFromTopLeft) {
      this.width = (width === undefined) ? 0 : width;
      this.height = (height === undefined) ? this.width : height;
      if (createFromTopLeft) {
          this.left = (x === undefined) ? 0 : x;
          this.top = (y === undefined) ? 0 : y;
      } else {
          this.x = (x === undefined) ? 0 : x;
          this.y = (y === undefined) ? 0 : y;
      }
  }
  
  Rectangle2D.prototype = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      
      get x() {
          return this.left + this.width / 2;
      },
      set x(value) {
          this.left = value - this.width / 2;
      },
      
      get y() {
          return this.top + this.height / 2;
      },
      set y(value) {
          this.top = value - this.height / 2;
      },
      
      get right() {
          return this.left + this.width;
      },
      set right(value) {
          this.left = value - this.width;
      },
      
      get bottom() {
          return this.top + this.height;
      },
      set bottom(value) {
          this.top = value - this.height;
      },
      
      intersects: function (rect) {
          if (rect !== undefined) {
              return (this.left < rect.right &&
                  this.right > rect.left &&
                  this.top < rect.bottom &&
                  this.bottom > rect.top);
          }
      },
      
      fill: function (ctx) {
          if (ctx !== undefined) {
              ctx.fillRect(this.left, this.top, this.width, this.height);
          }
      }
  };

  document.addEventListener('keydown', function (evt) {
      lastPress = evt.keyCode;
      pressing[evt.keyCode] = true;

      if (lastPress >= 37 && lastPress <= 40) {
          evt.preventDefault();
      }
  }, false);

  document.addEventListener('keyup', function (evt) {
      pressing[evt.keyCode] = false;
  }, false);

  function paint(ctx) {
      // Clean canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = '#0f0';
      player.fill(ctx);
      
      // Draw walls
      ctx.fillStyle = '#999';
      for (i = 0, l = wall.length; i < l; i += 1) {
          wall[i].fill(ctx);
      }

      // Debug last press
      ctx.fillStyle = '#fff';
      ctx.fillText('Last Press: ' + lastPress, 0, 20);
      
      // Pause
      if (pause) {
          ctx.textAlign = 'center';
          ctx.fillText('PAUSE', 200, 75);
          ctx.textAlign = 'left';
      }
  }

  function act(deltaTime) {
      if (!pause) {
          // Move Rect
          if (pressing[KEY_UP]) {
              player.y -= 5;
              for (i = 0, l = wall.length; i < l; i += 1) {
                  if (player.intersects(wall[i])) {
                      player.top = wall[i].bottom;
                  }
              }
          }
          if (pressing[KEY_RIGHT]) {
              player.x += 5;
              for (i = 0, l = wall.length; i < l; i += 1) {
                  if (player.intersects(wall[i])) {
                      player.right = wall[i].left;
                  }
              }
          }
          if (pressing[KEY_DOWN]) {
              player.y += 5;
              for (i = 0, l = wall.length; i < l; i += 1) {
                  if (player.intersects(wall[i])) {
                      player.bottom = wall[i].top;
                  }
              }
          }
          if (pressing[KEY_LEFT]) {
              player.x -= 5;
              for (i = 0, l = wall.length; i < l; i += 1) {
                  if (player.intersects(wall[i])) {
                      player.left = wall[i].right;
                  }
              }
          }

          // Out Screen
          if (player.x > canvas.width) {
              player.x = 0;
          }
          if (player.y > canvas.height) {
              player.y = 0;
          }
          if (player.x < 0) {
              player.x = canvas.width;
          }
          if (player.y < 0) {
              player.y = canvas.height;
          }
      }
      // Pause/Unpause
      if (lastPress === KEY_ENTER) {
          pause = !pause;
          lastPress = null;
      }
  }

  function repaint() {
      window.requestAnimationFrame(repaint);
      paint(ctx);
  }

  function run() {
      setTimeout(run, 50);
      act(0.05);
  }

  function init() {
      // Get canvas and context
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 200;
      
      // Create player
      player = new Rectangle2D(80, 80, 10, 10, true);

      // Create walls
      // wall.push(new Rectangle2D(100, 50, 10, 10, true));
      // wall.push(new Rectangle2D(100, 150, 10, 10, true));
      // wall.push(new Rectangle2D(200, 50, 10, 10, true));
      // wall.push(new Rectangle2D(200, 150, 10, 10, true));

      wall.push(new Rectangle2D(170, 50, 100, 70, true));
      wall.push(new Rectangle2D(90, 100, 40, 15, true));
      wall.push(new Rectangle2D(230, 50, 30, 35, true));
      wall.push(new Rectangle2D(200, 100, 10, 60, true));

      // Start game
      run();
      repaint();
  }
  
  intervalId = setInterval(() => {
    if (pause) return;
  
    ctx.clearRect(canvasPosX, canvasPosY, canvasWidth, canvasHeigth);
    paint(ctx);
    init();
    // counter++;
  }, 1000);
