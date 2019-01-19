import { getHero } from "./api.js";
import { addToBasket } from "./basket.js";
import { countPrice } from "./basket.js";

export async function modal(i) {
  const hero = await getHero(i);
  let body = document.querySelector("body");
  let div = document.createElement("div");
  div.id = "modal";
  div.classList.add("modal", "modal--visible");
  let container = document.createElement("div");
  container.classList.add("modal__container");
  let header = document.createElement("div");
  header.classList.add("modal__header");
  let close = document.createElement("span");
  close.classList.add("modal__close");
  close.innerHTML = "X";
  close.addEventListener("click", () => div.remove());
  let content = document.createElement("div");
  content.classList.add("modal__content");
  let img = document.createElement("img");
  img.src = `images/${hero.image}`;
  img.alt = `${hero.name}`;
  img.classList.add("modal__image");
  let details = document.createElement("div");
  details.classList.add("modal__details");
  let title = document.createElement("h2");
  title.classList.add("modal__title");
  title.innerHTML = `I'm the ${hero.name}`;
  let desc = document.createElement("p");
  desc.classList.add("modal__desc");
  desc.innerHTML = `${hero.description}`;
  let price = document.createElement("p");
  price.classList.add("modal__price");
  price.innerHTML = `Wynajem: <span>${hero.price} zł/h</span>`;
  header.appendChild(close);
  body.appendChild(div);
  content.appendChild(img);
  details.appendChild(title);
  details.appendChild(desc);
  details.appendChild(price);
  if (!document.querySelector(`#${hero.name}`)) {
    if (hero.isAvailable === true) {
      let button = document.createElement("button");
      button.id = "modal__button";
      button.classList.add("btn", "btn--green");
      button.innerHTML = "Dodaj do koszyka";
      button.addEventListener("click", () => {
        addToBasket(i);
        countPrice(hero.price);
        button.remove();
        details.innerHTML += "<p>Hero jest już w Twoim koszyku.</p>";
      });
      details.appendChild(button);
    } else {
      let info = document.createElement("p");
      info.innerHTML = "Hero jest obecnie niedostępny.";
      details.appendChild(info);
    }
  } else {
    let info = document.createElement("p");
    info.innerHTML = "Hero jest już w Twoim koszyku.";
    details.appendChild(info);
  }
  container.appendChild(header);
  content.appendChild(details);
  container.appendChild(content);
  div.appendChild(container);
}
