// Array of emojis - each one appears twice to create pairs
const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🍟",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "💖",
  "🎉",
  "😶‍🌫️",
  "👻",
  "👽",
  "⛷️",
  "👺",
  "🚀"
];
const cardEmojis = [...emojis, ...emojis]; // Create pairs by duplicating the array

// Game state variables
let flippedCards = []; // Stores currently flipped cards
let matchedPairs = 0; // Count of matched pairs
let moves = 0; // Count of moves made
let canFlip = true; // Prevents flipping during comparison

const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const restartButton = document.getElementById("restart");

// Function to shuffle the cards randomly
function shuffleCardsArray(array) {
  for (let index = array.length - 1; index > 0; index--) {
    // Pick a random index from 0 to i
    const jeu = Math.floor(Math.random() * (index + 1));
    // Swap elements at i and j
    [array[index], array[jeu]] = [array[jeu], array[index]];
  }
  return array;
}

// Function to create the game board
function createBoardGame() {
  // Clear the board first
  gameBoard.innerHTML = "";

  // Shuffle the emojis
  const shuffleEmojis = shuffleCardsArray([...cardEmojis]);

  // Create a card for each emoji
  shuffleEmojis.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji; // Store emoji in a data attribute
    card.dataset.index = index; // Store card index

    // Create emoji span inside the card
    const emojiSpan = document.createElement("span");
    emojiSpan.classList.add("emoji");
    emojiSpan.textContent = emoji;

    card.appendChild(emojiSpan);

    // Add click event to card
    card.addEventListener("click", flipCard);

    // Add card to game board
    gameBoard.appendChild(card);
  });
}

// Function to flip a card
function flipCard() {
  // Don't allow flipping if:
  // - We're comparing cards
  // - Card is already flipped
  // - Card is already matched
  if (!canFlip || this.classList.contains("flipped") || this.classList.contains("matched")) {
    return;
  }

  // Flip the card
  this.classList.add("flipped");
  flippedCards.push(this);

  // If two cards are flipped, check for match
  if (flippedCards.length === 2) {
    canFlip = false;
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
  }
}

// Function to check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const emoji1 = card1.dataset.emoji;
  const emoji2 = card2.dataset.emoji;

  // Check if emojis match
  if (emoji1 === emoji2) {
    // Match found!
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    matchesDisplay.textContent = matchedPairs;

    // Reset flipped cards
    flippedCards = [];
    canFlip = true;

    // Check if game is won
    if (matchedPairs === emojis.length) {
      setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves`);
      }, 500);
    }
  } else {
    // No match - flip cards back after delay
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      canFlip = true;
    }, 1000);
  }
}

// Function to restart the game
function restartGame() {
  // Reset game state
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  canFlip = true;

  // Update displays
  movesDisplay.textContent = moves;
  matchesDisplay.textContent = matchedPairs;

  // Create new board
  createBoardGame();
}

// Add event listener to restart button
restartButton.addEventListener("click", restartGame);

// Start the game when page loads
createBoardGame();
