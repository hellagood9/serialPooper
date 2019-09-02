class Rectangle {
  constructor(x, y, width, height) {
    this.y = y || 0;
    this.x = x || 0;
    this.width = width || 0; 
    this.height = height || 0;
  }

  intersects(obstacle) {
    if (obstacle !== undefined) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + this.width > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + this.height > obstacle.y
      );
    } 
  }

  fill(ctx) {
    if (ctx == null) {
      window.console.warn("Missing parameters on function fill");
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}