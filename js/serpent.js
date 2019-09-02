// var KEY_ENTER = 13,
//     KEY_LEFT = 37,
//     KEY_UP = 38,
//     KEY_RIGHT = 39,
//     KEY_DOWN = 40,
    
//     canvas = null,
//     ctx = null,
//     lastPress = null,
//     pause = true,
//     gameover = true,
//     dir = 0,
//     score = 0,
//     //wall = new Array(),
//     body = new Array(),
//     food = null,
//     iBody = new Image(),
//     iFood = new Image(),
//     aEat = new Audio(),
//     aDie = new Audio();

// window.requestAnimationFrame = (function () {
//     return window.requestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         function (callback) {
//             window.setTimeout(callback, 17);
//         };
// }());

// document.addEventListener('keydown', function (evt) {
//     lastPress = evt.which;
// }, false);

// function Rectangle(x, y, width, height) {
//     this.x = (x == null) ? 0 : x;
//     this.y = (y == null) ? 0 : y;
//     this.width = (width == null) ? 0 : width;
//     this.height = (height == null) ? this.width : height;

//     this.intersects = function (rect) {
//         if (rect == null) {
//             window.console.warn('Missing parameters on function intersects');
//         } else {
//             return (this.x < rect.x + rect.width &&
//                 this.x + this.width > rect.x &&
//                 this.y < rect.y + rect.height &&
//                 this.y + this.height > rect.y);
//         }
//     };

//     this.fill = function (ctx) {
//         if (ctx == null) {
//             window.console.warn('Missing parameters on function fill');
//         } else {
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     };
// }

// function random(max) {
//     return Math.floor(Math.random() * max);
// }

// function reset() {
//     score = 0;
//     dir = 1;
//     body.length = 0;
//     body.push(new Rectangle(40, 40, 10, 10));
//     body.push(new Rectangle(0, 0, 10, 10));
//     body.push(new Rectangle(0, 0, 10, 10));
//     food.x = random(canvas.width / 10 - 1) * 10;
//     food.y = random(canvas.height / 10 - 1) * 10;
//     gameover = false;
// }

// function paint(ctx) {
//     var i = 0,
//         l = 0;
    
//     // Clean canvas
//     ctx.fillStyle = '#000';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
//     // Draw player
//     //ctx.fillStyle = '#0f0';
//     for (i = 0, l = body.length; i < l; i += 1) {
//         //body[i].fill(ctx);
//         ctx.drawImage(iBody, body[i].x, body[i].y);
//     }
    
//     // Draw walls
//     //ctx.fillStyle = '#999';
//     //for(i = 0 ,l = wall.length; i < l; i += 1) {
//     //    wall[i].fill(ctx);
//     //}
    
//     // Draw food
//     //ctx.fillStyle = '#f00';
//     //food.fill(ctx);
//     ctx.drawImage(iFood, food.x, food.y);

//     // Debug last key pressed
//     ctx.fillStyle = '#fff';
//     //ctx.fillText('Last Press: ' + lastPress, 0, 20);
    
//     // Draw score
//     ctx.fillText('Score: ' + score, 0, 10);
    
//     // Draw pause
//     if (pause) {
//         ctx.textAlign = 'center';
//         if (gameover) {
//             ctx.fillText('GAME OVER', 150, 75);
//         } else {
//             ctx.fillText('PAUSE', 150, 75);
//         }
//         ctx.textAlign = 'left';
//     }
// }

// function act() {
//     var i = 0,
//         l = 0;
    
//     if (!pause) {
//         // GameOver Reset
//         if (gameover) {
//             reset();
//         }

//         // Move Body
//         for (i = body.length - 1; i > 0; i -= 1) {
//             body[i].x = body[i - 1].x;
//             body[i].y = body[i - 1].y;
//         }

//         // Change Direction
//         if (lastPress == KEY_UP && dir != 2) {
//             dir = 0;
//         }
//         if (lastPress == KEY_RIGHT && dir != 3) {
//             dir = 1;
//         }
//         if (lastPress == KEY_DOWN && dir != 0) {
//             dir = 2;
//         }
//         if (lastPress == KEY_LEFT && dir != 1) {
//             dir = 3;
//         }

//         // Move Head
//         if (dir == 0) {
//             body[0].y -= 10;
//         }
//         if (dir == 1) {
//             body[0].x += 10;
//         }
//         if (dir == 2) {
//             body[0].y += 10;
//         }
//         if (dir == 3) {
//             body[0].x -= 10;
//         }

//         // Out Screen
//         if (body[0].x > canvas.width - body[0].width) {
//             body[0].x = 0;
//         }
//         if (body[0].y > canvas.height - body[0].height) {
//             body[0].y = 0;
//         }
//         if (body[0].x < 0) {
//             body[0].x = canvas.width - body[0].width;
//         }
//         if (body[0].y < 0) {
//             body[0].y = canvas.height - body[0].height;
//         }

//         // Wall Intersects
//         //for(i = 0, l = wall.length; i < l; i += 1){
//         //    if (food.intersects(wall[i])) {
//         //        food.x = random(canvas.width / 10 - 1) * 10;
//         //        food.y = random(canvas.height / 10 - 1) * 10;
//         //    }
//         //  
//         //    if(body[0].intersects(wall[i])){
//         //        gameover = true;
//         //        pause = true;
//         //    }
//         //}

//         // Body Intersects
//         for (i = 2, l = body.length; i < l; i += 1) {
//             if (body[0].intersects(body[i])) {
//                 gameover = true;
//                 pause = true;
//                 aDie.play();
//             }
//         }

//         // Food Intersects
//         if (body[0].intersects(food)) {
//             body.push(new Rectangle(food.x, food.y, 10, 10));
//             score += 1;
//             food.x = random(canvas.width / 10 - 1) * 10;
//             food.y = random(canvas.height / 10 - 1) * 10;
//             aEat.play();
//         }
//     }
    
//     // Pause/Unpause
//     if (lastPress == KEY_ENTER) {
//         pause = !pause;
//         lastPress = null;
//     }
// }

// function repaint() {
//     window.requestAnimationFrame(repaint);
//     paint(ctx);
// }

// function run() {
//     setTimeout(run, 50);
//     act();
// }

// function init() {
//     // Get canvas and context
//     canvas = document.getElementById('canvas');
//     ctx = canvas.getContext('2d');

//     // Load assets
//     iBody.src = 'assets/body.png';
//     iFood.src = 'assets/fruit.png';
//     aEat.src = 'assets/chomp.oga';
//     aDie.src = 'assets/dies.oga';
    
//     // Create food
//     food = new Rectangle(80, 80, 10, 10);

//     // Create walls
//     //wall.push(new Rectangle(100, 50, 10, 10));
//     //wall.push(new Rectangle(100, 100, 10, 10));
//     //wall.push(new Rectangle(200, 50, 10, 10));
//     //wall.push(new Rectangle(200, 100, 10, 10));
    
//     // Start game
//     run();
//     repaint();
// }

// window.addEventListener('load', init, false);






// (function(){
//     'use strict';
//     window.addEventListener('load',init,false);
//     var KEY_ENTER=13;
//     var KEY_SPACE=32;
//     var KEY_LEFT=37;
//     var KEY_UP=38;
//     var KEY_RIGHT=39;
//     var KEY_DOWN=40;

//     var canvas=null,ctx=null;
//     var lastPress=null;
//     var pressing=[];
//     var pause;
//     var player=new Rectangle(90,280,10,10);
//     var shots=[];

//     function init(){
//         canvas=document.getElementById('canvas');
//         ctx=canvas.getContext('2d');
//         canvas.width=200;
//         canvas.height=300;
        
//         run();
//         repaint();
//     }

//     function run(){
//         setTimeout(run,50);
//         act();
//     }

//     function repaint(){
//         requestAnimationFrame(repaint);
//         paint(ctx);
//     }

//     function act(){
//         if(!pause){
//             // Move Rect
//             //if(pressing[KEY_UP])
//             //    player.y-=10;
//             if(pressing[KEY_RIGHT])
//                 player.x+=10;
//             //if(pressing[KEY_DOWN])
//             //    player.y+=10;
//             if(pressing[KEY_LEFT])
//                 player.x-=10;

//             // Out Screen
//             if(player.x>canvas.width-player.width)
//                 player.x=canvas.width-player.width;
//             if(player.x<0)
//                 player.x=0;
            
//             // New Shot
//             if(lastPress==KEY_SPACE){
//                 shots.push(new Rectangle(player.x+3,player.y,5,5));
//                 lastPress=null;
//             }
            
//             // Move Shots
//             for(var i=0,l=shots.length;i<l;i++){
//                 shots[i].y-=10;
//                 if(shots[i].y<0){
//                     shots.splice(i--,1);
//                     l--;
//                 }
//             }
//         }
//         // Pause/Unpause
//         if(lastPress==KEY_ENTER){
//             pause=!pause;
//             lastPress=null;
//         }
//     }

//     function paint(ctx){
//         ctx.fillStyle='#000';
//         ctx.fillRect(0,0,canvas.width,canvas.height);
        
//         ctx.fillStyle='#0f0';
//         player.fill(ctx);
//         ctx.fillStyle='#f00';
//         for(var i=0,l=shots.length;i<l;i++)
//             shots[i].fill(ctx);
        
//         ctx.fillStyle='#fff';
//         ctx.fillText('Last Press: '+lastPress,0,20);
//         ctx.fillText('Shots: '+shots.length,0,30);
//         if(pause){
//             ctx.textAlign='center';
//             ctx.fillText('PAUSE',100,150);
//             ctx.textAlign='left';
//         }
//     }

//     document.addEventListener('keydown',function(evt){
//         lastPress=evt.keyCode;
//         pressing[evt.keyCode]=true;
//     },false);

//     document.addEventListener('keyup',function(evt){
//         pressing[evt.keyCode]=false;
//     },false);

//     function Rectangle(x,y,width,height){
//         this.x=(x==null)?0:x;
//         this.y=(y==null)?0:y;
//         this.width=(width==null)?0:width;
//         this.height=(height==null)?this.width:height;
//     }

//     Rectangle.prototype.intersects=function(rect){
//         if(rect!=null){
//             return(this.x<rect.x+rect.width&&
//                 this.x+this.width>rect.x&&
//                 this.y<rect.y+rect.height&&
//                 this.y+this.height>rect.y);
//         }
//     }
    
//     Rectangle.prototype.fill=function(ctx){
//         ctx.fillRect(this.x,this.y,this.width,this.height);
//     }

//     window.requestAnimationFrame=(function(){
//         return window.requestAnimationFrame || 
//             window.webkitRequestAnimationFrame || 
//             window.mozRequestAnimationFrame || 
//             function(callback){window.setTimeout(callback,17);};
//     })();
// })();




/*jslint bitwise: true, es5: true */
(function (window, undefined) {
    'use strict';
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
    
    window.addEventListener('load', init, false);
}(window));
