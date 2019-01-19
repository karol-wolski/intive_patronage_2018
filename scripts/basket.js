import { getFromLocalStorage } from "./localStorage.js";
import { saveToLocalStorage } from "./localStorage.js";
import { removeItemFromLocalStorageArray } from "./localStorage.js";
import { getHero } from "./api.js";

export function showBasket() {
  const body = document.querySelector(".banner");
  const createSection = document.createElement("section");
  createSection.id = "basket";
  createSection.classList.add("basket");
  const basketDetail = document.createElement("div");
  basketDetail.classList.add("basket__detail");
  const basketTitle = document.createElement("h2");
  basketTitle.classList.add("basket__title");
  basketTitle.innerHTML = "Koszyk";
  const basketPrice = document.createElement("p");
  basketPrice.classList.add("basket__price");
  basketPrice.innerHTML = "Do zapłaty: ";
  const basketPriceSpan = document.createElement("span");
  const basketItems = document.createElement("div");
  basketItems.id = "basket__items";
  basketItems.classList.add("basket__items");
  const basketEmpty = document.createElement("p");
  basketEmpty.id = "basket__empty";
  basketEmpty.classList.add("basket__empty");
  basketEmpty.innerHTML = "Twój koszyk jest pusty.";
  basketPrice.appendChild(basketPriceSpan);
  basketDetail.appendChild(basketTitle);
  basketDetail.appendChild(basketPrice);
  createSection.appendChild(basketDetail);
  basketItems.appendChild(basketEmpty);
  createSection.appendChild(basketItems);
  body.after(createSection);
}

export async function addToBasket(i) {
  const basketSection = document.querySelector("#basket__items");
  const hero = await getHero(i);
  if (document.querySelector("#basket__empty")) {
    document.querySelector("#basket__empty").remove();
  }

  let div = document.createElement("div");
  div.id = `${hero.name}`;
  div.classList.add("item", "hero");
  let content = document.createElement("div");
  content.classList.add("item__content");
  let img = document.createElement("img");
  img.src = `images/${hero.image}`;
  img.alt = `${hero.name}`;
  img.classList.add("item__image");
  let details = document.createElement("div");
  details.classList.add("item__details");
  let title = document.createElement("h2");
  title.classList.add("item__title");
  title.innerHTML = `${hero.name}`;
  let desc = document.createElement("p");
  desc.classList.add("item__desc");
  desc.innerHTML = `${hero.description}`;
  let button = document.createElement("button");
  div.id = `${hero.name}`;
  button.classList.add("btn", "btn--red");
  button.innerHTML = "Usuń z koszyka";
  button.addEventListener(
    "click",
    () => (
      removeItemFromBasket(`${hero.name}`, `${hero.price}`),
      removeItemFromLocalStorageArray("basketItem", `${hero.name}`)
    )
  );
  details.appendChild(title);
  details.appendChild(desc);
  details.appendChild(button);
  content.appendChild(img);
  content.appendChild(details);
  div.appendChild(content);
  basketSection.appendChild(div);
  saveToLocalStorage("basketItem", hero);
}

export function addToBasketFromLocalStorage() {
  const basketSection = document.querySelector("#basket__items");
  const heroesData = getFromLocalStorage("basketItem");
  if (heroesData) {
    document.querySelector("#basket__empty").remove();
    for (let hero of heroesData) {
      let div = document.createElement("div");
      div.id = `${hero.name}`;
      div.classList.add("item", "hero");
      let content = document.createElement("div");
      content.classList.add("item__content");
      let img = document.createElement("img");
      img.src = `images/${hero.image}`;
      img.alt = `${hero.name}`;
      img.classList.add("item__image");
      let details = document.createElement("div");
      details.classList.add("item__details");
      let title = document.createElement("h2");
      title.classList.add("item__title");
      title.innerHTML = `${hero.name}`;
      let desc = document.createElement("p");
      desc.classList.add("item__desc");
      desc.innerHTML = `${hero.description}`;
      let button = document.createElement("button");
      div.id = `${hero.name}`;
      button.classList.add("btn", "btn--red");
      button.innerHTML = "Usuń z koszyka";
      button.addEventListener(
        "click",
        () => (
          removeItemFromBasket(`${hero.name}`, `${hero.price}`),
          removeItemFromLocalStorageArray("basketItem", `${hero.name}`)
        )
      );
      details.appendChild(title);
      details.appendChild(desc);
      details.appendChild(button);
      content.appendChild(img);
      content.appendChild(details);
      div.appendChild(content);
      basketSection.appendChild(div);
      countPrice(hero.price);
    }
  }
}

export function removeItemFromBasket(name, price) {
  countPrice(-price);
  document.querySelector(`#${name}`).remove();
}

let price = 0;
export function countPrice(i) {
  const basketPrice = document.querySelector(".basket__price span");
  price = parseFloat(price || 0) + parseFloat(i || 0);
  basketPrice.innerHTML = `${price} zł`;
  return price;
}
