import { getHero } from "./api.js";
import { postHero } from "./api.js";
import { putHero } from "./api.js";
import { modal } from "./modal.js";
import { formCheckEmpty } from "./formValidation.js";
import { formCheckPrice } from "./formValidation.js";

export async function showHeroes() {
  const sectionHeroes = document.querySelector("#heroes");
  const heroesData = await getHero();
  for (let hero of heroesData) {
    let div = document.createElement("div");
    div.classList.add("hero");
    sectionHeroes.appendChild(div);
    let img = document.createElement("img");
    img.src = `images/${hero.image}`;
    img.alt = `${hero.name}`;
    img.classList.add("hero__image");
    img.addEventListener("click", () => modal(`${hero.name}`));
    let title = document.createElement("h2");
    title.classList.add("hero__name");
    title.innerHTML = `${hero.name}`;
    let desc = document.createElement("p");
    desc.classList.add("hero_price");
    desc.innerHTML = `Cena wynajmu: ${hero.price} zł/h`;
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(desc);
  }
}

export async function addHero(e) {
  e.preventDefault();
  let name = formCheckEmpty(document.querySelector("#hero__name"));
  let photo = formCheckEmpty(document.querySelector("#hero__photo"));
  let price =
    formCheckEmpty(document.querySelector("#hero__price")) &&
    formCheckPrice(document.querySelector("#hero__price"));
  let desc = formCheckEmpty(document.querySelector("#hero__desc"));
  const isAvailable = true;
  let obj;
  if (
    name !== undefined &&
    photo !== undefined &&
    price !== undefined &&
    desc !== undefined
  ) {
    obj = {
      name: name,
      description: desc,
      image: `${photo}.jpg`,
      price: price,
      isAvailable: isAvailable
    };
    await postHero(obj);
    let inputs = document.querySelectorAll(".form > input");
    inputs.forEach(function(input) {
      input.value = "";
    });
    let textarea = document.querySelector(".form > textarea");
    textarea.value = "";
  }
}

export async function editHero(e) {
  e.preventDefault();
  const hero = await getHero(document.querySelector("#form__select").value);
  const oldDesc = (document.querySelector("#hero__desc").value =
    hero.description);
  const oldImage = (document.querySelector("#hero__photo").value = hero.image);
  const oldPrice = (document.querySelector("#hero__price").value = hero.price);

  const saveButton = document.querySelector("#hero__edit");
  saveButton.addEventListener("click", function() {
    const name = hero.name;
    const photo = formCheckEmpty(document.querySelector("#hero__photo"));
    const price =
      formCheckEmpty(document.querySelector("#hero__price")) &&
      formCheckPrice(document.querySelector("#hero__price"));
    const desc = formCheckEmpty(document.querySelector("#hero__desc"));
    const isAvailable = hero.isAvailable;
    saveEditHero(name, photo, price, desc, isAvailable);
  });
}

export async function saveEditHero(...params) {
  let obj;
  const param = params;
  if (
    param[0] !== undefined &&
    param[3] !== undefined &&
    param[1] !== undefined &&
    param[2] !== undefined
  ) {
    obj = {
      name: param[0],
      description: param[3],
      image: param[1],
      price: param[2],
      isAvailable: param[4]
    };
    await putHero(param[0], obj);
    let inputs = document.querySelectorAll(".form > input");
    inputs.forEach(function(input) {
      input.value = "";
    });
    let textarea = document.querySelector(".form > textarea");
    textarea.value = "";
    return true;
  }
}
