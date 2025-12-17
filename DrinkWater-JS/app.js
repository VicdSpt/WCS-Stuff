const smallCups = document.querySelectorAll(".cup-small");
const showLiters = document.getElementById("liters");
const showPercentageDrank = document.getElementById("percentage");
const restToDrank = document.getElementById("remained");
const goalWin = document.getElementById("goalwon");

updateBigCup();

// will show cups drank today in %
smallCups.forEach((cup, index) => {
  cup.addEventListener("click", () => selectCups(index));
});

// select the cups
function selectCups(index) {
  if (index === 7 && smallCups[index].classList.contains("full")) index--;
  else if (
    smallCups[index].classList.contains("full") &&
    !smallCups[index].nextElementSibling.classList.contains("full")
  ) {
    index--;
  }

  smallCups.forEach((cup, index2) => {
    if (index2 <= index) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}

// function will show the glass getting full when selecting cups below it
function updateBigCup() {
  const waterDrank = document.querySelectorAll(".cup-small.full").length;
  const totalSmallCups = smallCups.length;

  if (waterDrank === 0) {
    showPercentageDrank.style.visibility = "hidden";
    showPercentageDrank.style.height = 0;
  } else {
    showPercentageDrank.style.visibility = "visible";
    showPercentageDrank.style.height = `${
      (waterDrank / totalSmallCups) * 330
    }px`;
    showPercentageDrank.innerText = `${(waterDrank / totalSmallCups) * 100}%`;
  }

  if (waterDrank === totalSmallCups) {
    restToDrank.style.visibility = "hidden";
    restToDrank.style.height = 0;
  } else {
    restToDrank.style.visibility = "visible";
    showLiters.innerText = `${2 - (250 * waterDrank) / 1000}L`;
  }
  goal();
}

// will change the color of h3 if you drank 2L
function goal() {
  const waterDrank = document.querySelectorAll(".cup-small.full").length;
  const totalSmallCups = smallCups.length;
  const goalText = document.getElementById("goalwon");

  if (waterDrank === totalSmallCups) {
    goalText.style.color = "white";
    goalText.innerText = "You drank it all !";
  } else if (waterDrank === 1) {
    goalText.style.color = "";
    goalText.innerText = "Keep drinking !";
  }
}
