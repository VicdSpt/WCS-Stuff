// List of possible 5-letter words
const wordList = [
  "APPLE",
  "BEACH",
  "CHAIR",
  "DANCE",
  "EARTH",
  "FLAME",
  "GRAPE",
  "HAPPY",
  "IVORY",
  "JOLLY",
  "KNIFE",
  "LEMON",
  "MAGIC",
  "NIGHT",
  "OCEAN",
  "PIANO",
  "QUEEN",
  "RIVER",
  "SMILE",
  "TIGER",
  "UNCLE",
  "VOICE",
  "WATER",
  "YOUTH",
  "ZEBRA",
  "BREAD",
  "CLOUD",
  "STONE",
  "PLANT",
  "SHEEP",
  "HORSE",
  "BRAVE",
  "LIGHT",
  "SWEET",
  "SHORE",
  "FIELD",
  "GREEN",
  "BLOOM",
  "FROST",
  "STORM",
  "TRAIL",
  "SPARK",
  "HEART",
  "PEACE",
  "LAUGH",
  "FRUIT",
  "SOUND",
  "ROUND",
  "TRACE",
  "WORLD",
  "BRICK",
  "CROWN",
  "DREAM",
  "FEAST",
  "GLASS",
  "HONEY",
  "JUDGE",
  "LUNCH",
  "METAL",
  "NOVEL",
  "PRIDE",
  "ROUGH",
  "SLEEP",
  "TRAIN",
  "VALUE",
  "WHEAT",
  "CLEAN",
  "SHARP",
  "QUICK",
  "FRESH",
  "ALERT",
  "BLISS",
  "CHESS",
  "DEPTH",
  "ELDER",
  "FORCE",
  "GIANT",
  "HUMAN",
  "IDEAL",
  "JOINT",
  "LAYER",
  "MARCH",
  "NURSE",
  "OPERA",
  "POWER",
  "QUIET",
  "SOLID",
  "TRUST",
  "UNITY",
  "VIVID",
];

let targetWord = "";
let currentRow = 0;
let maxTry = 6;
let gameOver = false;

const gameBoard = document.getElementById("game-board");
const guessWord = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-btn");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");

function startGame() {
  // Pick a random word from the list
  targetWord = wordList[Math.floor(Math.random() * wordList.length)];

  // reset game
  currentRow = 0;
  gameOver = false;
  message.textContent = "";
  message.className = "";
  restartButton.classList.add("hidden");
  guessWord.value = "";
  guessWord.disabled = false;
  submitButton.disabled = false;

  createGameBoard();

  guessWord.focus();
}

function createGameBoard() {
  gameBoard.innerHTML = "";

  for (let i = 0; i < maxTry; i++) {
    const row = document.createElement("div");
    row.className = "row";

    for (let l = 0; l < 5; l++) {
      const box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    gameBoard.appendChild(row);
  }
}

function checkGuess() {
  const guess = guessWord.value.toUpperCase().trim();

  if (guess.length !== 5) {
    showMessage("Please enter a 5 letter word !");
    return;
  }
  if (!isValidWord(guess)) {
    showMessage("Please enter only letters !");
    return;
  }

  const row = gameBoard.children[currentRow];
  const boxes = row.children;

  // Fill in the letters and check each one
  for (let i = 0; i < 5; i++) {
    const letter = guess[i];
    boxes[i].textContent = letter;

    // Check if letter is in the correct position
    if (letter === targetWord[i]) {
      boxes[i].classList.add("correct");
    }
    // Check if letter is in the word but wrong position
    else if (targetWord.includes(letter)) {
      boxes[i].classList.add("present");
    }
    // Letter is not in the word
    else {
      boxes[i].classList.add("absent");
    }
  }

  // Check if the player won
  if (guess === targetWord) {
    endGame(true);
    return;
  }

  currentRow++;

  // Check if the player lost
  if (currentRow >= maxTry) {
    endGame(false);
    return;
  }

  guessWord.value = "";
  guessWord.focus();
}

// Validate if the input contains only letters
function isValidWord(word) {
  return /^[A-Z]+$/.test(word);
}

// Show a message to the player
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    message.textContent = "";
  }, 2000);
}

// End the game
function endGame(won) {
  gameOver = true;
  guessWord.disabled = true;
  submitButton.disabled = true;
  restartButton.classList.remove("hidden");

  if (won) {
    message.textContent = "🎉 Congratulations! You won!";
    message.className = "win";
  } else {
    message.textContent = `Game Over! The word was: ${targetWord}`;
    message.className = "lose";
  }
}

// Event listeners
submitButton.addEventListener("click", checkGuess);

guessWord.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

restartButton.addEventListener("click", startGame);

// Start the game when page loads
startGame();
