// Get the canvas and its context (what we use to draw)
const canvasDisplay = document.getElementById("game-canvas");
const context = canvasDisplay.getContext("2d");

// Get HTML elements
const displayCurrentScore = document.getElementById("current-score");
const displayHighScore = document.getElementById("high-score");
const restartButton = document.getElementById("restart");
const gameOverScreen = document.getElementById("game-over");
const displayFinalScore = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again");

// Game settings
const squareGridSize = 20; // Size of each square on the grid
const numberTileCount = canvasDisplay.width / squareGridSize; // Number of tiles (20x20 grid)

// Snake variables
let snakeX = 10; // Snake head X position
let snakeY = 10; // Snake head Y position
let snakeBody = []; // Array to store snake body segments
let snakeLength = 4; // Starting length of snake

// Food variables
let foodX = 15;
let foodY = 15;

// Movement variables
let movementX = 0;
let movementY = 0;

// Game state

let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
let gameRunning = false;
let gameLoop;

// Display the high score
displayHighScore.textContent = highScore;

// Function to start the game
function startGame() {
  snakeX = 10;
  snakeY = 10;
  snakeBody = [];
  snakeLength = 4;
  movementX = 1;
  movementY = 0;
  score = 0;
  displayCurrentScore.textContent = score;
  gameOverScreen.classList.add("hidden");

  // Place food in random location
  placeRandomFood();

  // Start the game loop (runs every 100ms)
  gameRunning = true;
  gameLoop = setInterval(updateGame, 100);
}

// Function to place food in a random location
function placeRandomFood() {
  foodX = Math.floor(Math.random() * numberTileCount);
  foodY = Math.floor(Math.random() * numberTileCount);

  // Make sure food doesn't spawn on snake
  for (let i = 0; i < snakeBody.length; i++) {
    if (foodX === snakeBody[i].x && foodY === snakeBody[i].y) {
      placeRandomFood();
      return;
    }
  }
}

// Main game loop - runs every 100ms
function updateGame() {
  // Move the snake
  snakeX += movementX;
  snakeY += movementY;

  // Check if snake hits walls
  //   if (snakeX < 0 || snakeX >= numberTileCount || snakeY < 0 || snakeY >= numberTileCount) {
  //     gameOver();
  //     return;
  //   }

  // Wrap around walls (teleport to other side)
  if (snakeX < 0) {
    snakeX = numberTileCount - 1; // If goes left, appear on right
  }
  if (snakeX >= numberTileCount) {
    snakeX = 0; // If goes right, appear on left
  }
  if (snakeY < 0) {
    snakeY = numberTileCount - 1; // If goes up, appear on bottom
  }
  if (snakeY >= numberTileCount) {
    snakeY = 0; // If goes down, appear on top
  }

  // Check if snake hits itself
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      gameOver();
      return;
    }
  }

  // Add new head position to body
  snakeBody.push({ x: snakeX, y: snakeY });

  while (snakeBody.length > snakeLength) {
    snakeBody.shift();
  }

  // Check if snake ate food
  if (snakeX === foodX && snakeY === foodY) {
    snakeLength++;
    score++;
    displayCurrentScore.textContent = score;
    placeRandomFood();

    // Update high score if needed
    if (score > highScore) {
      highScore = score;
      displayHighScore.textContent = highScore;
      localStorage.setItem("snakeHighScore", highScore); // Save high score
    }
  }

  drawGame();
}

// Function to draw the game
function drawGame() {
  context.fillStyle = "#1a1a1a";
  context.fillRect(0, 0, canvasDisplay.width, canvasDisplay.height);

  context.fillStyle = "#4CAF50";
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(
      snakeBody[i].x * squareGridSize,
      snakeBody[i].y * squareGridSize,
      squareGridSize - 2,
      squareGridSize - 2
    );
  }

  context.fillStyle = "#ff4444";
  context.fillRect(
    foodX * squareGridSize,
    foodY * squareGridSize,
    squareGridSize - 2,
    squareGridSize - 2
  );
}

// Function to handle game over
function gameOver() {
  gameRunning = false;
  clearInterval(gameLoop);
  displayFinalScore.textContent = score;
  gameOverScreen.classList.remove("hidden");
}

// Listen for arrow key presses
document.addEventListener("keydown", function (event) {
  // Only allow changing direction if game is running
  if (!gameRunning) return;

  // Get the key that was pressed
  const key = event.key;

  // Arrow Up - only if not moving down
  if (key === "ArrowUp" && movementY !== 1) {
    movementX = 0;
    movementY = -1;
  }

  // Arrow Down - only if not moving up
  if (key === "ArrowDown" && movementY !== -1) {
    movementX = 0;
    movementY = 1;
  }

  // Arrow Left - only if not moving right
  if (key === "ArrowLeft" && movementX !== 1) {
    movementX = -1;
    movementY = 0;
  }

  // Arrow Right - only if not moving left
  if (key === "ArrowRight" && movementX !== -1) {
    movementX = 1;
    movementY = 0;
  }
});

// Restart button click
restartButton.addEventListener("click", function () {
  if (gameRunning) {
    clearInterval(gameLoop);
  }
  startGame();
});

// Play again button click
playAgainButton.addEventListener("click", function () {
  startGame();
});

// Start the game when page loads
startGame();
