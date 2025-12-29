const textBox = document.getElementById("text");
const textSpeed = document.getElementById("speed");
const autoText = "We Love Food !!!";
let index = 0;
// higher number will show slower animation
let speed = 400 / textSpeed.value;

writeAutoText();

function writeAutoText() {
  textBox.innerText = autoText.slice(0, index);
  index++;
  if (index > autoText.length) {
    index = 1;
  }
  setTimeout(writeAutoText, speed);
}

textSpeed.addEventListener(
  "input",
  (event) => (speed = 400 / event.target.value)
);
