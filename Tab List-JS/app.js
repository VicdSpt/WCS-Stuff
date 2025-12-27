const buttons = document.querySelectorAll(".tab-btn");
const aboutContainer = document.querySelector(".about");
const contentTabs = document.querySelectorAll(".content");

aboutContainer.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    event.target.classList.add("active");

    contentTabs.forEach((contentTab) => {
      contentTab.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});
