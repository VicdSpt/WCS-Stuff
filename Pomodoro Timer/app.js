const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnReset = document.getElementById("btn-reset");
const displayTimer = document.getElementById("timer");

let interval;
let timeLeft = 30000;

function runTimer() {
  let minutes = Math.floor(timeLeft / 60000);
  let seconds = Math.floor((timeLeft % 60000) / 1000);
  let milliseconds = Math.floor((timeLeft % 1000) / 10)
  let updateTimer = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")} : ${milliseconds.toString().padStart(2, "0")}`;

  displayTimer.innerHTML = updateTimer;
}

function startTimer() {
  interval = setInterval(() => {
    timeLeft-= 10;
    runTimer();
    if (timeLeft === 0) {
      clearInterval(interval);
      alert("Time is up!");
      timeLeft = 30000;
      runTimer();
    }
  }, 10);
}

function stopTimer() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  timeLeft = 30000;
  runTimer();
}

btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);
btnReset.addEventListener("click", resetTimer);
