const monthName = document.getElementById("month-name");
const dayName = document.getElementById("day-name");
const dayDate = document.getElementById("day-number");
const year = document.getElementById("year");
const actualTime = document.getElementById("actual-time");

// function to update time in real time
function realTime() {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const secondes = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  actualTime.innerText = `${hours} : ${minutes < 10 ? "0" + minutes : minutes} : ${secondes < 10 ? "0" + secondes : secondes}.${milliseconds < 100 ?(milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds}`;
}

realTime()

setInterval(realTime, 1)

const date =new Date();

const month = date.getMonth();
monthName.innerText = date.toLocaleString("be", {month: "long",});

dayName.innerText = date.toLocaleString("be", {weekday: "long",});

dayDate.innerText = date.getDate();
year.innerText = date.getFullYear();
