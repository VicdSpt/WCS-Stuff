const clickButton = document.getElementById("btnPush");

clickButton.addEventListener("click", animateBtn);

function animateBtn(){
    clickButton.classList.add("animationjs");

    setTimeout(() => {
        clickButton.style.backgroundColor = "#930d21ff";
        clickButton.classList.remove = ("animationjs");
    }, 1500);
}