const api = "http://localhost:3000/heroes";

export async function removeHero(hero) {
  try {
    const res = await fetch(`${api}/${hero || ""}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    });
    location.reload();
  } catch {
    throw Error(e);
  }
}

export async function getHero(hero) {
  try {
    const res = await fetch(`${api}/${hero || ""}`, {
      method: "GET"
    });
    return await res.json();
  } catch (e) {
    throw Error(e);
  }
}

export async function postHero(hero) {
  try {
    const res = await fetch(`${api}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(hero)
    });
  } catch (e) {
    throw Error(e);
  }
}

export async function putHero(hero, data) {
  try {
    const res = await fetch(`${api}/${hero}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(data)
    });
  } catch (e) {
    throw Error(e);
  }
}

export async function addOptionToSelect() {
  const select = document.querySelector("#form__select");
  const heroesData = await getHero();
  for (let hero of heroesData) {
    let option = document.createElement("option");
    option.value = `${hero.name}`;
    option.innerHTML = `${hero.name}`;
    select.appendChild(option);
  }
}
