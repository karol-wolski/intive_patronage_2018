import { removeArrayFromLocalStorage } from "./scripts/localStorage.js";
import { removeHero } from "./scripts/api.js";
import { addOptionToSelect } from "./scripts/api.js";
import { showBasket } from "./scripts/basket.js";
import { addToBasketFromLocalStorage } from "./scripts/basket.js";
import { countPrice } from "./scripts/basket.js";
import { showHeroes } from "./scripts/hero.js";
import { addHero } from "./scripts/hero.js";
import { editHero } from "./scripts/hero.js";
import { showError } from "./scripts/formValidation.js";

const api = "http://localhost:3000/heroes";
const addHeroButton = document.querySelector("#hero__add");
const sectionRemove = document.querySelector("#section__remove");
const sectionEdit = document.querySelector("#section__edit");

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function() {
  const navigation = document.querySelector(".navigation");
  this.classList.toggle("hamburger--active");
  navigation.classList.toggle("navigation__mobile");
});

// Scroll site
function scrollSite() {
  const header = document.querySelector(".header");
  const sticky = header.offsetTop;
  if (window.pageYOffset > sticky + 5 && window.innerWidth <= 760) {
    header.classList.add("header--fixed");
  } else {
    header.classList.remove("header--fixed");
  }
}
window.onscroll = () => scrollSite();
const sectionHeroes = document.querySelector("#heroes");
if (sectionHeroes) {
  initIndex();
}

if (addHeroButton) {
  initAdd();
}

if (sectionRemove) {
  initRemove();
}

if (sectionEdit) {
  initEdit();
}

function initIndex() {
  showHeroes();
  showBasket();
  addToBasketFromLocalStorage();
  countPrice();
}

function initAdd() {
  addHeroButton.addEventListener("click", addHero);
  showError("form__input");
  showError("form__textarea");
}

function initEdit() {
  const select = document.querySelector("#form__select");
  select.addEventListener("change", editHero);
  addOptionToSelect();
}

function initRemove() {
  const select = document.querySelector("#form__select");
  const removeHeroButton = document.querySelector("#hero__delete");
  addOptionToSelect();
  removeHeroButton.addEventListener("click", () =>
    removeHero(document.querySelector("#form__select").value)
  );
}
// Remove Hero/Heroes
const removeAllHeroesButton = document.querySelector("#removeAllHeroes");
if (removeAllHeroesButton) {
  removeAllHeroesButton.addEventListener(
    "click",
    () => (removeHero(), removeArrayFromLocalStorage("basketItem"))
  );
}
