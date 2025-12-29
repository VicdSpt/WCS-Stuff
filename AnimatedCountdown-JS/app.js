const numbers = document.querySelectorAll(".numbers span");
const counter = document.querySelector(".counter-container");
const finalMessage = document.querySelector(".final");
const replayButton = document.getElementById("replay");

runAnimation();

function resetDOM() {
  counter.classList.remove("hide");
  finalMessage.classList.remove("show");

  numbers.forEach((numbers) => {
    numbers.classList.value = "";
  });

  numbers[0].classList.add("in");
}

function runAnimation() {
  numbers.forEach((number, index) => {
    const nextToLast = numbers.length - 1;

    number.addEventListener("animationend", (event) => {
      if (event.animationName === "goIn" && index !== nextToLast) {
        number.classList.remove("in");
        number.classList.add("out");
      } else if (event.animationName === "goOut" && number.nextElementSibling) {
        number.nextElementSibling.classList.add("in");
      } else {
        counter.classList.add("hide");
        finalMessage.classList.add("show");
      }
    });
  });
}

replayButton.addEventListener("click", () => {
  resetDOM();
  runAnimation();
});
