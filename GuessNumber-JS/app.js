// variables for the game to work
let secretNumber = 0;
let tryGuess = 0;
let guessHistory = [];

// function to generate random number between 1 & 100
function generateRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

// function to start the game
function startGame(){
    secretNumber = generateRandomNumber();
    tryGuess = 0;
    guessHistory = [];
    updateDisplay()
}

// function to check player's guess
function checkGuess(){
    const inputNumber = document.getElementById("guessInput");
    const userGuess = parseInt(inputNumber.value);

    if(isNaN(userGuess) || userGuess < 1 || userGuess > 100){
        showMessage("Please enter a valid number betwee 1 and 100 !" );
        return;
    }

    // increments guesses
    tryGuess = tryGuess + 1;

    // add guess to guess history
    guessHistory.push(userGuess);

    // check if guess is correct
    if(userGuess === secretNumber){
        showMessage(`🎉 Correct ! You won in ${tryGuess} attemps, success`);
        endGame();
    } else if(userGuess < secretNumber){
        showMessage(`Too low ! Try a higher number !`)
    } else{
        showMessage(`Too high ! try a lower number !`)
    }

    // update screen
    updateDisplay()

    // clear input typed
    inputNumber.value = "";
}

// function to show the message
function showMessage(text, type){
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = text;
    messageDiv.className = "message" + type;
    messageDiv.classList.remove("hidden");
}

// function to update the display
function updateDisplay(){
    // Update attempts
    document.getElementById("attempts").textContent = tryGuess;
    document.getElementById("totalGuesses").textContent = guessHistory.length;

    // update history
    const historyContainer = document.getElementById("historyContainer");
    historyContainer.innerHTML = "";

    if(guessHistory.length === 0){
        historyContainer.innerHTML = '<span style="color: #999;">No guesses yet...</span>';
    } else {
        for(let i = 0; i < guessHistory.length; i++){
            const guess = guessHistory[i];
            const span = document.createElement("span");
            span.className = "hitory-items";
            span.textContent = guess;

            // add class base on comparison
            if(guess === secretNumber){
                span.className = span.className + "correctr";
            } else if(guess < secretNumber){
                span.className = span.className + "low";
            } else {
                span.className = span.className + "high";
            }

            historyContainer.appendChild(span)
        }
    }
}

// function to end the game
function endGame(){
    document.getElementById("gameInput").classList.add("hidden")
    document.getElementById("restartBtn").classList.remove("hidden")
}

// function to restart the game
function restartGame(){
    document.getElementById("gameInput").classList.remove("hidden");
    document.getElementById("restartBtn").classList.add("hidden");
    document.getElementById("message").classList.add("hidden");
    startGame();
}

// allow to use ENTER to submit your answer
document.getElementById("guessInput").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        checkGuess()
    }
})

// Start the game when page loads
startGame()