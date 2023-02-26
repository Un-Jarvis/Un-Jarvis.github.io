function Surface(posX, width, height) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = height - surfaceThickness / 2;
    this.scoreCollected = false;
  
    this.move = function () {
      this.posX -= speedX;
    };
  
    this.display = function () {
      noStroke();
      rectMode(CENTER);
      fill(surfaceColor);
      rect(this.posX, canvasHeight - this.posY, this.width, surfaceThickness, 10);
    };
  }
  