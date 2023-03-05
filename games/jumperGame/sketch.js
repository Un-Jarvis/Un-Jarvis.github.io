// game settings
var canvasWidth = 1000;
var canvasHeight = 650;
var gameStatus = 0;
var score = -1;

// player settings
var playerX, playerY;
var speedX = 0;
var speedY = 0;
var playerSize = canvasWidth / 20;
var playerColor;
var pressedTime = 0;
var force = 0;
var moving = true;

// environment settings
var surfaces = [];
var surfaceWidthMin = canvasWidth / 10;
var surfaceWidthMax = canvasWidth / 4;
var surfaceHeightMin = canvasHeight / 10;
var surfaceHeightMax = canvasHeight / 2;
var surfaceThickness = canvasHeight / 40;
var surfaceColor;
var gravity = 0.75;

function setup() {
  var game = createCanvas(canvasWidth, canvasHeight);
  game.parent('game');

  // game settings

  // player settings
  playerX = canvasWidth / 5;
  playerY = playerSize / 2;
  playerColor = color(0);

  // environment settings
  surfaceColor = color(150);
}

function draw() {
  background(245);
  if (gameStatus == 0) {
    scoreText();
  } else {
    gameFailText();
  }

  // draw player
  drawPlayer();

  // draw surfaces
  addSurfaces();
  drawSurfaces();

  // detect collision
  detectCollision();
}

function init() {
  gameStatus = 0;
  score = -1;

  playerX = canvasWidth / 5;
  playerY = playerSize / 2;

  surfaces = [];

  speedX = 0;
  speedY = 0;
  force = 0;
}

// player
function drawPlayer() {
  // draw player
  fill(playerColor);
  ellipse(playerX, playerY, playerSize, playerSize);

  if (moving) {
    // apply gravity
    speedY += gravity;

    // apply force
    speedX = force;

    playerY += speedY;
  } else {
    speedY = 0;
    speedX = 0;
  }

  // game is over when the player falls to the ground
  if (playerY + playerSize / 2 > canvasHeight) {
    gameStatus = 1;
    speedX = 0;
  }
}

// surfaces
function addSurfaces() {
  if (surfaces.length == 0) {
    // Generate a random width, height, and position for the new surface
    var width = round(random(this.surfaceWidthMin, this.surfaceWidthMax));
    var height = round(random(this.surfaceHeightMin, this.surfaceHeightMax));
    var surface = new Surface(playerX, width, height);
    surfaces.push(surface);
  } else if (surfaces.length < 5) {
    // Generate a random width, height, and position for the new surface
    var width = round(random(this.surfaceWidthMin, this.surfaceWidthMax));
    var height = round(random(this.surfaceHeightMin, this.surfaceHeightMax));
    var heightDiff = abs(surfaces[surfaces.length - 1].height - height);
    var dist = round(random(300 + heightDiff, 600));
    var surface = new Surface(
      surfaces[surfaces.length - 1].posX + dist,
      width,
      height
    );
    surfaces.push(surface);
  }
}

function drawSurfaces() {
  for (var i = 0; i < surfaces.length; i++) {
    surfaces[i].display();
    surfaces[i].move();
    removeSurface(i);
  }
}

function removeSurface(index) {
  var surface = surfaces[index];
  if (surface.posX + surface.width / 2 < 0) {
    surfaces.splice(index, 1);
  }
}

// Mechanism
function keyPressed() {
  if (speedY == 0 && key == " " && pressedTime == 0) {
    pressedTime = millis();
  }
}

function keyReleased() {
  if (key == " ") {
    if (gameStatus == 0 && pressedTime != 0) {
      var interval = millis() - pressedTime;
      force = interval * 0.025;
      speedY = -force;
      moving = true;
      pressedTime = 0;
    } else if (gameStatus == 1) {
      init();
    }
  }
}

function scoreText() {
  textAlign(CENTER);
  fill(50, 220, 50);
  textSize(30);
  if (score <= 0) {
    text("Score: 0", canvasWidth / 2, 50);
  } else {
    text("Score: " + score, canvasWidth / 2, 50);
  }
}

function gameFailText() {
  textAlign(CENTER);
  fill(255, 50, 50);
  textSize(50);
  text("GAME OVER", canvasWidth / 2, 200);
  textSize(20);
  text("You got " + score + " points. Press space to restart.", canvasWidth / 2, 270);
  text("Press space to restart.", canvasWidth / 2, 300);
}

function detectCollision() {
  // find the surface closest to the player
  var dist = canvasWidth;
  var surface = surfaces[0];
  for (var i = 0; i < surfaces.length; i++) {
    if (abs(surfaces[i].posX - playerX) < dist) {
      dist = abs(surfaces[i].posX - playerX);
      surface = surfaces[i];
    }
  }

  collide(surface);
}

function collide(surface) {
  if (
    playerY + playerSize / 2 > canvasHeight - surface.height &&
    playerY + playerSize / 2 <= canvasHeight - surface.height + 50 &&
    playerX > surface.posX - surface.width / 2 &&
    playerX < surface.posX + surface.width / 2
  ) {
    // fix player's position
    playerY = canvasHeight - surface.height - playerSize / 2;
    // stop moving
    force = 0;
    speedX = 0;
    moving = false;
    if (!surface.scoreCollected) {
      incrementScore();
      surface.scoreCollected = true;
    }
  }
}

function incrementScore() {
  score++;
}
