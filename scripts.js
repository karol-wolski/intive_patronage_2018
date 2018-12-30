const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation')
hamburger.addEventListener('click', function(){
    this.classList.toggle("hamburger--active");
    navigation.classList.toggle("navigation__mobile");
});

const header = document.querySelector(".header");
const sticky = header.offsetTop;

window.onscroll = function() {
    scrollSite();
}

function scrollSite() {
  if (window.pageYOffset > sticky) {
    header.classList.add("header--fixed");

    if (window.innerWidth > 760) {
        header.classList.remove("header--fixed");
    }
  } else {
    header.classList.remove("header--fixed");
  }

}