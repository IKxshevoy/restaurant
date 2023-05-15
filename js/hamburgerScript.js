const hamburger = document.querySelector('.hamburger');
const menuList = document.querySelector('.menu__list');

hamburger.addEventListener('click', ()=> {
    hamburger.classList.toggle("active");
    menuList.classList.toggle("active");
})