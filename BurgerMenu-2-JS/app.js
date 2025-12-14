const burger = document.getElementById("burgerMenu");
const navMenu = document.getElementById("navMenu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Optional: Close menu when a link is clicked
const navLinks = document.querySelectorAll(".navMenu a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Optional: Close menu when clicking outside
document.addEventListener("click", (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);

    if(!isClickInsideMenu && !isClickOnBurger && navMenu.classList.contains("active")){
        burger.classList.remove("active");
        navMenu.classList.remove("active");
    }
})