const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('.navigation')
hamburger.addEventListener('click', function(){
    this.classList.toggle("hamburger--active");
    navigation.classList.toggle("navigation__mobile");
});