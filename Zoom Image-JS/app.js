const zoomOnContainer = document.querySelector(".zoom-container");
const zoomOnImage = document.getElementById("zoom-image");

const zoomOnContainerTwo = document.querySelector(".zoom-container-two");
const zoomOnImageTwo = document.getElementById("zoom-image-two");

zoomOnContainer.addEventListener("mousemove", zoomImage);
zoomOnContainerTwo.addEventListener("mousemove", zoomImageTwo);

function zoomImage(event) {
  const zoomContainer = zoomOnContainer.getBoundingClientRect();

  const axeX = event.clientX - zoomContainer.left;
  const axeY = event.clientY - zoomContainer.top;

  const percentageXContainer = (axeX / zoomContainer.width) * 100;
  const percentageYContainer = (axeY / zoomContainer.height) * 100;

  zoomOnImage.style.transformOrigin = `${percentageXContainer}% ${percentageYContainer}%`;
}

function zoomImageTwo(event) {
  const zoomContainerTwo = zoomOnContainerTwo.getBoundingClientRect();

  const axeX = event.clientX - zoomContainerTwo.left;
  const axeY = event.clientY - zoomContainerTwo.top;

  const percentageXContainer = (axeX / zoomContainerTwo.width) * 100;
  const percentageYContainer = (axeY / zoomContainerTwo.height) * 100;

  zoomOnImageTwo.style.transformOrigin = `${percentageXContainer}% ${percentageYContainer}%`;
}
