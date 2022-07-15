const menuButton = document.querySelector(".hamburger");
const active = document.querySelector(".active");
const closeButton = document.querySelector(".fullscreen-menu__close");

menuButton.addEventListener("click", e => {
    active.style.display = "flex";
})

closeButton.addEventListener("click", e => {
    active.style.display = "none";
})
