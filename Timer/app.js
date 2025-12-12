const displayTime = document.getElementById("display");
const progressCircle = document.getElementById("progressCircle");

let totalTime = 10;
let timeLeft = totalTime;

// calculate circle circumference
const circleRadius = 140;
const circumference = 2 * Math.PI * circleRadius;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;

// Function to get color based on time left
function showColors() {
  const percentage = (timeLeft / totalTime) * 100;

  if (percentage > 50) {
    return "#4CAF50";
  } else if (percentage > 25) {
    return "#FFC107";
  } else {
    return "#f44336";
  }
}

// function to update the display and the progress around it
function updateDisplay() {
  displayTime.textContent = timeLeft;

  const percentage = timeLeft / totalTime;
  const offset = circumference * (1 - percentage);

  progressCircle.style.strokeDashoffset = offset;
  progressCircle.style.stroke = showColors();
}

// Start the countdown automatically
let timerInterval;

function startTimer() {
  // Run this code every 1000 milliseconds (1 second)
  timerInterval = setInterval(function () {
    timeLeft = timeLeft - 1; // Subtract 1 second
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      displayTime.textContent = "0";

      setTimeout(function () {
        displayTime.textContent = "Done";
        displayTime.classList.add = "Done";
      });
    }
  }, 1000);
}

updateDisplay();
startTimer();
