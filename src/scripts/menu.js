const menuButton = document.querySelector(".hamburger");
const active = document.querySelector(".active");
const closeButton = document.querySelector(".fullscreen-menu__close");
const fullscreenMenu = document.querySelector(".fullscreen-menu");

menuButton.addEventListener("click", e => {
    active.style.display = "flex";
    document.body.classList.add('locked');
})

closeButton.addEventListener("click", e => {
    active.style.display = "none";
    document.body.classList.remove('locked');
})

fullscreenMenu.addEventListener("click", e => {
    e.preventDefault();

    if (e.target.classList.contains('menu__link')) {
        active.style.display = "none";
        document.body.classList.remove('locked');
    }
})